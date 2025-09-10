export type AnalyticsEvent = {
  name: 
    | "page_view" | "scroll_depth" | "section_dwell"
    | "click" | "tap_heat"
    | "form_focus" | "form_error" | "form_submit" | "form_abandon"
    | "newsletter_signup" | "share_click" | "chat_open" | "install_prompt";
  props: Record<string, string | number | boolean | null>;
  ts: number;
  sessionId: string;
};

class AnalyticsCore {
  private queue: AnalyticsEvent[] = [];
  private sessionId: string;
  private enabled = false;
  private reducedData = false;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.reducedData = this.checkReducedData();
    
    // Listen for consent changes
    window.addEventListener('analytics:enabled', () => {
      this.enabled = true;
      this.flushQueue();
    });

    // Check if consent already granted
    this.checkInitialConsent();
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2)}`;
  }

  private checkReducedData(): boolean {
    return typeof window !== 'undefined' && 
           window.matchMedia && 
           window.matchMedia('(prefers-reduced-data: reduce)').matches;
  }

  private checkInitialConsent() {
    try {
      const consent = localStorage.getItem('neono-consent');
      if (consent) {
        const parsed = JSON.parse(consent);
        this.enabled = parsed.analytics === true;
      }
    } catch {
      // Ignore
    }
  }

  track(name: AnalyticsEvent['name'], props: Record<string, any> = {}) {
    if (this.reducedData && name !== 'page_view') {
      return; // Respect reduced data preference
    }

    const event: AnalyticsEvent = {
      name,
      props: this.sanitizeProps(props),
      ts: Date.now(),
      sessionId: this.sessionId,
    };

    if (this.enabled) {
      this.sendEvent(event);
    } else {
      this.queue.push(event);
    }
  }

  private sanitizeProps(props: Record<string, any>): Record<string, string | number | boolean | null> {
    const sanitized: Record<string, string | number | boolean | null> = {};
    
    for (const [key, value] of Object.entries(props)) {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null) {
        sanitized[key] = value;
      } else {
        sanitized[key] = String(value);
      }
    }
    
    return sanitized;
  }

  private sendEvent(event: AnalyticsEvent) {
    // In development, log to console and window object for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event);
      
      if (!window.__neonoEvents) {
        window.__neonoEvents = [];
      }
      window.__neonoEvents.push(event);
    }

    // In production, this would send to your analytics service
    // For now, it's a no-op stub
  }

  private flushQueue() {
    while (this.queue.length > 0) {
      const event = this.queue.shift();
      if (event) {
        this.sendEvent(event);
      }
    }
  }

  // Public method to check if analytics is enabled
  isEnabled(): boolean {
    return this.enabled;
  }
}

// Global analytics instance
export const analytics = new AnalyticsCore();

// Add type for development debugging
declare global {
  interface Window {
    __neonoEvents?: AnalyticsEvent[];
  }
}