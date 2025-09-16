// Enhanced Web Vitals monitoring with real-time reporting
import * as React from 'react';

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

interface PerformanceEntry extends globalThis.PerformanceEntry {
  processingStart?: number;
  processingEnd?: number;
  interactionId?: number;
}

class WebVitalsReporter {
  private metrics: Map<string, WebVitalMetric> = new Map();
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // Largest Contentful Paint (LCP)
    this.observeMetric('largest-contentful-paint', (entries) => {
      const entry = entries[entries.length - 1];
      this.reportMetric({
        name: 'LCP',
        value: entry.startTime,
        rating: this.getLCPRating(entry.startTime),
        delta: entry.startTime,
        id: this.generateId(),
        navigationType: this.getNavigationType()
      });
    });

    // First Input Delay (FID) / Interaction to Next Paint (INP)
    this.observeMetric('first-input', (entries) => {
      const entry = entries[0];
      const delay = entry.processingStart ? entry.processingStart - entry.startTime : 0;
      this.reportMetric({
        name: 'FID',
        value: delay,
        rating: this.getFIDRating(delay),
        delta: delay,
        id: this.generateId(),
        navigationType: this.getNavigationType()
      });
    });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];
    
    this.observeMetric('layout-shift', (entries) => {
      for (const entry of entries) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          clsEntries.push(entry);
        }
      }
      
      this.reportMetric({
        name: 'CLS',
        value: clsValue,
        rating: this.getCLSRating(clsValue),
        delta: clsValue,
        id: this.generateId(),
        navigationType: this.getNavigationType()
      });
    });

    // Custom metrics
    this.measureCustomMetrics();
  }

  private observeMetric(type: string, callback: (entries: PerformanceEntry[]) => void) {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      
      observer.observe({ type, buffered: true });
      this.observers.push(observer);
    } catch (e) {
      console.warn(`Could not observe ${type}:`, e);
    }
  }

  private measureCustomMetrics() {
    // Time to Interactive (TTI) approximation
    this.measureTTI();
    
    // First Paint & First Contentful Paint
    this.measurePaintMetrics();
    
    // Bundle loading time
    this.measureBundleMetrics();
  }

  private measureTTI() {
    window.addEventListener('load', () => {
      const navigationStart = performance.timeOrigin;
      const loadComplete = performance.now();
      
      // Simple TTI estimation
      setTimeout(() => {
        this.reportMetric({
          name: 'TTI',
          value: loadComplete,
          rating: this.getTTIRating(loadComplete),
          delta: loadComplete,
          id: this.generateId(),
          navigationType: this.getNavigationType()
        });
      }, 5000);
    });
  }

  private measurePaintMetrics() {
    const paintEntries = performance.getEntriesByType('paint');
    
    paintEntries.forEach((entry) => {
      if (entry.name === 'first-paint') {
        this.reportMetric({
          name: 'FP',
          value: entry.startTime,
          rating: 'good',
          delta: entry.startTime,
          id: this.generateId(),
          navigationType: this.getNavigationType()
        });
      } else if (entry.name === 'first-contentful-paint') {
        this.reportMetric({
          name: 'FCP',
          value: entry.startTime,
          rating: this.getFCPRating(entry.startTime),
          delta: entry.startTime,
          id: this.generateId(),
          navigationType: this.getNavigationType()
        });
      }
    });
  }

  private measureBundleMetrics() {
    const resourceEntries = performance.getEntriesByType('resource');
    const jsResources = resourceEntries.filter(entry => 
      entry.name.includes('.js') || entry.name.includes('main')
    );

    jsResources.forEach((entry) => {
      this.reportMetric({
        name: 'Bundle Load',
        value: entry.duration,
        rating: entry.duration < 1000 ? 'good' : entry.duration < 3000 ? 'needs-improvement' : 'poor',
        delta: entry.duration,
        id: this.generateId(),
        navigationType: this.getNavigationType()
      });
    });
  }

  private getLCPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 2500) return 'good';
    if (value <= 4000) return 'needs-improvement';
    return 'poor';
  }

  private getFIDRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 100) return 'good';
    if (value <= 300) return 'needs-improvement';
    return 'poor';
  }

  private getCLSRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }

  private getFCPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 1800) return 'good';
    if (value <= 3000) return 'needs-improvement';
    return 'poor';
  }

  private getTTIRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 3800) return 'good';
    if (value <= 7300) return 'needs-improvement';
    return 'poor';
  }

  private getNavigationType(): string {
    const navigation = performance.getEntriesByType('navigation')[0] as any;
    return navigation?.type || 'unknown';
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private reportMetric(metric: WebVitalMetric) {
    this.metrics.set(metric.name, metric);
    
    // Send to analytics
    this.sendToAnalytics(metric);
    
    // Log to console in dev
    if (process.env.NODE_ENV === 'development') {
      const color = metric.rating === 'good' ? 'green' : 
                   metric.rating === 'needs-improvement' ? 'orange' : 'red';
      console.log(
        `%c${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`,
        `color: ${color}; font-weight: bold;`
      );
    }
  }

  private sendToAnalytics(metric: WebVitalMetric) {
    // Send to Google Analytics if available
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.rating,
        value: Math.round(metric.value)
      });
    }

    // Send to custom analytics endpoint
    if ('sendBeacon' in navigator) {
      navigator.sendBeacon('/api/analytics/webvitals', JSON.stringify(metric));
    }
  }

  getMetrics(): WebVitalMetric[] {
    return Array.from(this.metrics.values());
  }

  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
  }
}

// Export singleton instance
export const webVitalsReporter = new WebVitalsReporter();

// React hook for Web Vitals
export function useWebVitals(onMetric?: (metric: WebVitalMetric) => void) {
  const [metrics, setMetrics] = React.useState<WebVitalMetric[]>([]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const currentMetrics = webVitalsReporter.getMetrics();
      setMetrics(currentMetrics);
      
      if (onMetric) {
        currentMetrics.forEach(onMetric);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      webVitalsReporter.disconnect();
    };
  }, [onMetric]);

  return metrics;
}

// Initialize on import
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    webVitalsReporter.disconnect();
  });
}