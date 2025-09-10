export type EventName =
  | "page_view" | "scroll_depth" | "section_dwell"
  | "tap_heat" | "click"
  | "form_focus" | "form_error" | "form_submit" | "form_abandon"
  | "exp_exposure" | "exp_goal"
  | "web_vital"   // {name: 'LCP'|'CLS'|'INP'|'TTFB'|'FID', value}
  | "error" | "unhandled_rejection"
  | "perf_mark" | "route_change"
  | "newsletter_signup" | "share_click" | "chat_open" | "install_prompt"
  | "funnel_advanced" | "funnel_completed";

export type EventPayload = Record<string, string | number | boolean | null>;

export type AnalyticEvent = {
  name: EventName;
  props: EventPayload;
  ts: number;              // epoch ms
  sid: string;             // sessionId
  vid: string;             // visitId
  path: string;            // location.pathname
  ref?: string | null;     // document.referrer
};

// Configuration interface
export interface AnalyticsConfig {
  sampleRateHeatmap: number;
  sampleRateErrors: number;
  sampleRateWebVitals: number;
  maxQueueSize: number;
  flushInterval: number;
  retryDelay: number;
  maxRetries: number;
}

const DEFAULT_CONFIG: AnalyticsConfig = {
  sampleRateHeatmap: 0.2,
  sampleRateErrors: 1.0,
  sampleRateWebVitals: 0.5,
  maxQueueSize: 100,
  flushInterval: 5000,
  retryDelay: 1000,
  maxRetries: 3,
};

class AnalyticsCore {
  private queue: AnalyticEvent[] = [];
  private sessionId: string;
  private visitId: string;
  private enabled = false;
  private reducedData = false;
  private config: AnalyticsConfig;
  private flushTimer?: number;
  private isOnline = true;
  private retryTimeouts: Map<string, number> = new Map();

  constructor() {
    this.sessionId = this.generateId();
    this.visitId = this.generateId();
    this.reducedData = this.checkReducedData();
    this.config = { ...DEFAULT_CONFIG, ...(window.__analyticsConfig || {}) };
    
    this.setupEventListeners();
    this.checkInitialConsent();
    this.startFlushTimer();
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  private checkReducedData(): boolean {
    return typeof window !== 'undefined' && 
           window.matchMedia && 
           (window.matchMedia('(prefers-reduced-data: reduce)').matches ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  private setupEventListeners() {
    // Listen for consent changes
    window.addEventListener('analytics:enabled', () => {
      this.enabled = true;
      this.flushQueue();
    });

    // Network status monitoring
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Page visibility for queue management
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flushQueue(true); // Force flush on page hide
      }
    });

    // Route changes
    window.addEventListener('popstate', () => {
      this.track('route_change', { to: window.location.pathname });
    });
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

  private startFlushTimer() {
    this.flushTimer = window.setInterval(() => {
      if (this.enabled && this.isOnline && this.queue.length > 0) {
        this.flushQueue();
      }
    }, this.config.flushInterval);
  }

  track(name: EventName, props: EventPayload = {}, options: { sample?: number; force?: boolean } = {}) {
    if (this.reducedData && !options.force && !['page_view', 'error', 'unhandled_rejection'].includes(name)) {
      return; // Respect reduced data preference
    }

    // Apply sampling
    const sampleRate = options.sample || this.getSampleRate(name);
    if (Math.random() > sampleRate) {
      return;
    }

    const event: AnalyticEvent = {
      name,
      props: this.sanitizeProps(props),
      ts: Date.now(),
      sid: this.sessionId,
      vid: this.visitId,
      path: window.location.pathname,
      ref: document.referrer || null,
    };

    if (this.enabled && this.isOnline) {
      this.sendEvent(event);
    } else {
      this.queueEvent(event);
    }

    // Emit to dev panel if available
    window.dispatchEvent(new CustomEvent('analytics:event', { detail: event }));
  }

  private getSampleRate(name: EventName): number {
    switch (name) {
      case 'tap_heat':
        return this.config.sampleRateHeatmap;
      case 'error':
      case 'unhandled_rejection':
        return this.config.sampleRateErrors;
      case 'web_vital':
        return this.config.sampleRateWebVitals;
      default:
        return 1.0;
    }
  }

  private sanitizeProps(props: EventPayload): EventPayload {
    const sanitized: EventPayload = {};
    
    for (const [key, value] of Object.entries(props)) {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null) {
        // Remove PII patterns
        if (typeof value === 'string' && this.containsPII(value)) {
          sanitized[key] = '[REDACTED]';
        } else {
          sanitized[key] = value;
        }
      } else {
        sanitized[key] = String(value);
      }
    }
    
    return sanitized;
  }

  private containsPII(value: string): boolean {
    // Basic PII detection patterns
    const patterns = [
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email
      /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/, // Phone
      /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/, // Credit card
      /\b\d{3}-\d{2}-\d{4}\b/, // SSN
    ];
    return patterns.some(pattern => pattern.test(value));
  }

  private queueEvent(event: AnalyticEvent) {
    this.queue.push(event);
    
    // Trim queue if too large
    if (this.queue.length > this.config.maxQueueSize) {
      this.queue = this.queue.slice(-this.config.maxQueueSize);
    }

    // Persist to localStorage as backup
    try {
      const stored = JSON.parse(localStorage.getItem('neono-analytics-queue') || '[]');
      stored.push(event);
      localStorage.setItem('neono-analytics-queue', JSON.stringify(stored.slice(-50))); // Keep last 50
    } catch {
      // Ignore storage errors
    }
  }

  private async sendEvent(event: AnalyticEvent, retryCount = 0): Promise<void> {
    const eventId = `${event.ts}-${Math.random()}`;

    try {
      // Try navigator.sendBeacon first for better reliability
      const payload = JSON.stringify(event);
      const blob = new Blob([payload], { type: 'application/json' });
      
      let success = false;
      if (navigator.sendBeacon && event.name !== 'error') {
        success = navigator.sendBeacon('/api/analytics', blob);
      }

      // Fallback to fetch
      if (!success) {
        const response = await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
      }

      // Clear any retry timeout
      this.clearRetryTimeout(eventId);

      // In development, log to console and window object for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Analytics Event:', event);
        
        if (!window.__neonoEvents) {
          window.__neonoEvents = [];
        }
        window.__neonoEvents.push(event);
      }

    } catch (error) {
      console.warn('Analytics send failed:', error);

      // Retry with exponential backoff
      if (retryCount < this.config.maxRetries) {
        const delay = this.config.retryDelay * Math.pow(2, retryCount);
        const timeoutId = window.setTimeout(() => {
          this.sendEvent(event, retryCount + 1);
        }, delay);
        
        this.retryTimeouts.set(eventId, timeoutId);
      } else {
        // Give up and queue for next flush
        this.queueEvent(event);
      }
    }
  }

  private clearRetryTimeout(eventId: string) {
    const timeoutId = this.retryTimeouts.get(eventId);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.retryTimeouts.delete(eventId);
    }
  }

  private async flushQueue(force = false) {
    if (!this.enabled || (!this.isOnline && !force)) {
      return;
    }

    const batch = [...this.queue];
    this.queue = [];

    // Also load from localStorage backup
    try {
      const stored = JSON.parse(localStorage.getItem('neono-analytics-queue') || '[]');
      if (stored.length > 0) {
        batch.push(...stored);
        localStorage.removeItem('neono-analytics-queue');
      }
    } catch {
      // Ignore storage errors
    }

    // Send events in parallel with rate limiting
    const promises = batch.map((event, index) => {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          this.sendEvent(event).finally(() => resolve());
        }, index * 10); // 10ms stagger to avoid overwhelming
      });
    });

    await Promise.allSettled(promises);
  }

  // Public API
  isEnabled(): boolean {
    return this.enabled;
  }

  getSessionId(): string {
    return this.sessionId;
  }

  getVisitId(): string {
    return this.visitId;
  }

  getConfig(): AnalyticsConfig {
    return { ...this.config };
  }

  updateConfig(updates: Partial<AnalyticsConfig>) {
    this.config = { ...this.config, ...updates };
    window.__analyticsConfig = this.config;
  }

  // Manual flush for testing
  async flush(): Promise<void> {
    await this.flushQueue(true);
  }

  // Reset session (for testing)
  resetSession(): void {
    this.sessionId = this.generateId();
    this.visitId = this.generateId();
  }

  destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    
    this.retryTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.retryTimeouts.clear();
    
    // Final flush
    this.flushQueue(true);
  }
}

// Global analytics instance
export const analytics = new AnalyticsCore();

// Global interface extensions
declare global {
  interface Window {
    __neonoEvents?: AnalyticEvent[];
    __analyticsConfig?: Partial<AnalyticsConfig>;
    __analytics?: AnalyticsCore;
  }
}

// Expose for debugging
if (process.env.NODE_ENV === 'development') {
  window.__analytics = analytics;
}

// Initialize analytics modules when consent is granted
export async function initAnalytics(): Promise<void> {
  // Dynamic imports for code splitting
  console.log('📊 Analytics system initialized');
}