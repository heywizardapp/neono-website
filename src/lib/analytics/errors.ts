import { analytics } from './core';

interface ErrorInfo {
  message: string;
  source?: string;
  lineno?: number;
  colno?: number;
  stack?: string;
  timestamp: number;
  url: string;
  userAgent: string;
  hash: string;
}

interface ErrorConfig {
  maxErrors: number;
  sampleRate: number;
  ignorePatterns: RegExp[];
}

class ErrorTracker {
  private config: ErrorConfig;
  private errorCounts: Map<string, number> = new Map();
  private enabled = false;
  private lastErrors: ErrorInfo[] = [];

  constructor(config: Partial<ErrorConfig> = {}) {
    this.config = {
      maxErrors: 50,
      sampleRate: 1.0,
      ignorePatterns: [
        /Script error/i,
        /Non-Error promise rejection captured/i,
        /ResizeObserver loop limit exceeded/i,
        /ChunkLoadError/i,
        /Loading chunk \d+ failed/i,
        // Ad blockers and extensions
        /extension\//i,
        /moz-extension:/i,
        /chrome-extension:/i,
      ],
      ...config
    };

    this.setupErrorHandlers();

    // Listen for consent changes
    window.addEventListener('analytics:enabled', () => {
      this.enabled = true;
    });

    this.checkInitialConsent();
  }

  private checkInitialConsent() {
    try {
      const consent = localStorage.getItem('neono-consent');
      if (consent) {
        const parsed = JSON.parse(consent);
        this.enabled = parsed.analytics === true;
      }
    } catch {
      // Check for dev override
      const urlParams = new URLSearchParams(window.location.search);
      this.enabled = urlParams.get('analytics') === 'on';
    }
  }

  private setupErrorHandlers() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.handleError({
        message: event.message,
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        hash: '',
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      let message = 'Unhandled Promise Rejection';
      let stack = '';

      if (event.reason) {
        if (typeof event.reason === 'string') {
          message = event.reason;
        } else if (event.reason instanceof Error) {
          message = event.reason.message;
          stack = event.reason.stack || '';
        } else {
          message = JSON.stringify(event.reason);
        }
      }

      this.handleError({
        message,
        stack,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        hash: '',
      });
    });

    // React error boundary integration
    window.addEventListener('react:error', (event: any) => {
      const { error, errorInfo } = event.detail || {};
      
      this.handleError({
        message: error?.message || 'React Error',
        stack: error?.stack || '',
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        hash: '',
      });
    });
  }

  private handleError(errorInfo: ErrorInfo) {
    // Apply sampling
    if (Math.random() > this.config.sampleRate) {
      return;
    }

    // Check ignore patterns
    if (this.shouldIgnoreError(errorInfo.message)) {
      return;
    }

    // Generate hash for deduplication
    errorInfo.hash = this.generateErrorHash(errorInfo);

    // Check if we've seen this error too many times
    const count = this.errorCounts.get(errorInfo.hash) || 0;
    if (count >= this.config.maxErrors) {
      return;
    }

    this.errorCounts.set(errorInfo.hash, count + 1);

    // Add to recent errors for dev panel
    this.lastErrors.unshift(errorInfo);
    if (this.lastErrors.length > 20) {
      this.lastErrors = this.lastErrors.slice(0, 20);
    }

    // Emit to dev panel
    window.dispatchEvent(new CustomEvent('error:captured', { detail: errorInfo }));

    // Send to analytics if enabled
    if (this.enabled) {
      this.sendError(errorInfo);
    }
  }

  private shouldIgnoreError(message: string): boolean {
    return this.config.ignorePatterns.some(pattern => pattern.test(message));
  }

  private generateErrorHash(errorInfo: ErrorInfo): string {
    // Create hash from message + first line of stack
    const stackFirstLine = errorInfo.stack?.split('\n')[0] || '';
    const hashInput = `${errorInfo.message}|${stackFirstLine}|${errorInfo.source}|${errorInfo.lineno}`;
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < hashInput.length; i++) {
      const char = hashInput.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  private sendError(errorInfo: ErrorInfo) {
    const count = this.errorCounts.get(errorInfo.hash) || 1;
    
    // Get additional context
    const context = this.getErrorContext();
    
    analytics.track('error', {
      message: this.sanitizeMessage(errorInfo.message),
      source: errorInfo.source || null,
      lineno: errorInfo.lineno || null,
      colno: errorInfo.colno || null,
      hash: errorInfo.hash,
      count,
      // Context
      build_version: process.env.VITE_BUILD_VERSION || 'dev',
      page_path: window.location.pathname,
      page_title: document.title,
      device_type: context.deviceType,
      browser_name: context.browserName,
      browser_version: context.browserVersion,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      // Stack trace (first few lines only)
      stack_preview: this.sanitizeStack(errorInfo.stack),
    });
  }

  private sanitizeMessage(message: string): string {
    // Remove potential PII from error messages
    return message
      .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]')
      .replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[PHONE]')
      .replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, '[CARD]')
      .substring(0, 200); // Limit length
  }

  private sanitizeStack(stack?: string): string | null {
    if (!stack) return null;
    
    // Take first 5 lines and remove file paths that might contain sensitive info
    return stack
      .split('\n')
      .slice(0, 5)
      .map(line => line.replace(/file:\/\/.*?\/([^\/]+)$/, '$1'))
      .join('\n')
      .substring(0, 500); // Limit length
  }

  private getErrorContext() {
    const userAgent = navigator.userAgent;
    
    return {
      deviceType: this.getDeviceType(),
      browserName: this.getBrowserName(userAgent),
      browserVersion: this.getBrowserVersion(userAgent),
    };
  }

  private getDeviceType(): string {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private getBrowserName(userAgent: string): string {
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'chrome';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'safari';
    if (userAgent.includes('Firefox')) return 'firefox';
    if (userAgent.includes('Edg')) return 'edge';
    return 'unknown';
  }

  private getBrowserVersion(userAgent: string): string {
    const matches = userAgent.match(/(Chrome|Safari|Firefox|Edg)\/(\d+)/);
    return matches ? matches[2] : 'unknown';
  }

  // Public API
  getRecentErrors(): ErrorInfo[] {
    return [...this.lastErrors];
  }

  getErrorCounts(): Record<string, number> {
    const counts: Record<string, number> = {};
    this.errorCounts.forEach((count, hash) => {
      counts[hash] = count;
    });
    return counts;
  }

  // Manual error reporting
  reportError(error: Error | string, context?: Record<string, any>) {
    const errorInfo: ErrorInfo = {
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'string' ? '' : error.stack,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      hash: '',
    };

    if (context) {
      // Add context to message
      errorInfo.message += ` | Context: ${JSON.stringify(context)}`;
    }

    this.handleError(errorInfo);
  }

  // Clear error history (for testing)
  clearErrors() {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('clearErrors only available in development');
      return;
    }

    this.errorCounts.clear();
    this.lastErrors = [];
  }
}

// Initialize error tracking
export const errorTracker = new ErrorTracker();

// Export for manual error reporting
export function reportError(error: Error | string, context?: Record<string, any>) {
  errorTracker.reportError(error, context);
}

// Development helpers
if (process.env.NODE_ENV === 'development') {
  (window as any).__errorTracker = errorTracker;
}