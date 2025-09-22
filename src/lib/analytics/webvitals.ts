import { analytics } from './core';

// Web Vitals types
export interface WebVitalMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'INP' | 'LCP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  entries?: PerformanceEntry[];
}

interface WebVitalsConfig {
  sampleRate: number;
  reportAllChanges: boolean;
}

class WebVitalsMonitor {
  private config: WebVitalsConfig;
  private vitalsBuffer: Map<string, WebVitalMetric> = new Map();
  private enabled = false;

  constructor(config: Partial<WebVitalsConfig> = {}) {
    this.config = {
      sampleRate: 0.5,
      reportAllChanges: false,
      ...config
    };

    // Listen for consent changes
    window.addEventListener('analytics:enabled', () => {
      this.enabled = true;
      this.flushBuffer();
    });

    this.checkInitialConsent();
    this.initWebVitals();
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

  private async initWebVitals() {
    try {
      // Dynamic import for better code splitting
      const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import('web-vitals');

      // Set up all web vitals listeners
      onCLS(this.handleVital.bind(this), { reportAllChanges: this.config.reportAllChanges });
      onFCP(this.handleVital.bind(this), { reportAllChanges: this.config.reportAllChanges });
      onINP(this.handleVital.bind(this), { reportAllChanges: this.config.reportAllChanges });
      onLCP(this.handleVital.bind(this), { reportAllChanges: this.config.reportAllChanges });
      onTTFB(this.handleVital.bind(this), { reportAllChanges: this.config.reportAllChanges });

      // Web Vitals monitoring initialized
    } catch (error) {
      console.warn('Failed to initialize Web Vitals:', error);
    }
  }

  private handleVital(metric: WebVitalMetric) {
    // Apply sampling
    if (Math.random() > this.config.sampleRate) {
      return;
    }

    // Store in buffer
    this.vitalsBuffer.set(metric.name, metric);

    // Send immediately if enabled, otherwise buffer
    if (this.enabled) {
      this.sendVital(metric);
    }

    // Emit to dev panel
    window.dispatchEvent(new CustomEvent('webvitals:metric', { detail: metric }));
  }

  private sendVital(metric: WebVitalMetric) {
    const deviceInfo = this.getDeviceInfo();
    const networkInfo = this.getNetworkInfo();

    analytics.track('web_vital', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      // Device context
      device_type: deviceInfo.type,
      device_memory: deviceInfo.memory,
      hardware_concurrency: deviceInfo.concurrency,
      // Network context
      connection_type: networkInfo.effectiveType,
      connection_downlink: networkInfo.downlink,
      connection_rtt: networkInfo.rtt,
      navigation_type: networkInfo.navigationType,
      // Page context
      page_visibility: document.visibilityState,
      page_loaded: Date.now() - performance.timeOrigin,
    }, { 
      sample: 1 // Already sampled above
    });
  }

  private getDeviceInfo() {
    return {
      type: this.getDeviceType(),
      memory: (navigator as any).deviceMemory || null,
      concurrency: navigator.hardwareConcurrency || null,
    };
  }

  private getDeviceType(): string {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private getNetworkInfo() {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    return {
      effectiveType: connection?.effectiveType || 'unknown',
      downlink: connection?.downlink || null,
      rtt: connection?.rtt || null,
      navigationType: this.getNavigationType(),
    };
  }

  private getNavigationType(): string {
    if (!window.performance || !window.performance.navigation) {
      return 'unknown';
    }

    const navType = window.performance.navigation.type;
    switch (navType) {
      case 0: return 'navigate';
      case 1: return 'reload';
      case 2: return 'back_forward';
      case 255: return 'reserved';
      default: return 'unknown';
    }
  }

  private flushBuffer() {
    if (!this.enabled) return;

    this.vitalsBuffer.forEach(metric => {
      this.sendVital(metric);
    });

    this.vitalsBuffer.clear();
  }

  // Public API
  getCurrentVitals(): Record<string, WebVitalMetric> {
    const vitals: Record<string, WebVitalMetric> = {};
    this.vitalsBuffer.forEach((metric, name) => {
      vitals[name] = metric;
    });
    return vitals;
  }

  // Get thresholds for rating vitals
  getThresholds() {
    return {
      CLS: { good: 0.1, poor: 0.25 },
      FID: { good: 100, poor: 300 },
      FCP: { good: 1800, poor: 3000 },
      INP: { good: 200, poor: 500 },
      LCP: { good: 2500, poor: 4000 },
      TTFB: { good: 800, poor: 1800 },
    };
  }

  // Force measurement for testing
  forceMeasurement() {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('forceMeasurement only available in development');
      return;
    }

    // Force CLS measurement by triggering a layout shift
    const testElement = document.createElement('div');
    testElement.style.cssText = 'position: absolute; top: 0; left: 0; width: 1px; height: 1px;';
    document.body.appendChild(testElement);
    
    // Force reflow
    testElement.offsetHeight;
    
    // Move element to trigger CLS
    testElement.style.top = '10px';
    testElement.offsetHeight;
    
    // Clean up
    setTimeout(() => {
      testElement.remove();
    }, 100);
  }
}

// Initialize Web Vitals monitoring
export function initWebVitals(config?: Partial<WebVitalsConfig>) {
  return new WebVitalsMonitor(config);
}

// Global instance
export const webVitals = initWebVitals();

// Development helpers
if (process.env.NODE_ENV === 'development') {
  (window as any).__webVitals = webVitals;
}