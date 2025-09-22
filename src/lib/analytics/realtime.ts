import { analytics } from './core';

interface MetricPoint {
  timestamp: number;
  value: number;
}

interface RealtimeMetrics {
  requestsPerMinute: MetricPoint[];
  errorsPerMinute: MetricPoint[];
  routeChanges: MetricPoint[];
  lcpP95: MetricPoint[];
  activeUsers: number;
  currentPage: string;
}

interface SSEConfig {
  endpoint?: string;
  reconnectDelay: number;
  maxReconnectAttempts: number;
}

class RealtimeMonitor {
  private metrics: RealtimeMetrics;
  private bufferDuration = 2 * 60 * 1000; // 2 minutes
  private enabled = false;
  private eventSource?: EventSource;
  private sseConfig: SSEConfig;
  private reconnectAttempts = 0;

  constructor(sseConfig: Partial<SSEConfig> = {}) {
    this.sseConfig = {
      reconnectDelay: 5000,
      maxReconnectAttempts: 3,
      ...sseConfig
    };

    this.metrics = {
      requestsPerMinute: [],
      errorsPerMinute: [],
      routeChanges: [],
      lcpP95: [],
      activeUsers: 1,
      currentPage: window.location.pathname,
    };

    this.setupEventListeners();

    // Listen for consent changes
    window.addEventListener('analytics:enabled', () => {
      this.enabled = true;
      if (this.sseConfig.endpoint) {
        this.connectSSE();
      }
    });

    this.checkInitialConsent();
    this.startMetricsCollection();
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

  private setupEventListeners() {
    // Listen to analytics events for real-time metrics
    window.addEventListener('analytics:event', (event: any) => {
      const analyticsEvent = event.detail;
      this.processAnalyticsEvent(analyticsEvent);
    });

    // Listen to web vitals
    window.addEventListener('webvitals:metric', (event: any) => {
      const metric = event.detail;
      this.processWebVital(metric);
    });

    // Listen to errors
    window.addEventListener('error:captured', (event: any) => {
      this.recordError();
    });

    // Track route changes
    window.addEventListener('popstate', () => {
      this.recordRouteChange();
      this.metrics.currentPage = window.location.pathname;
    });

    // Track page visibility for active users
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.recordPageActive();
      }
    });
  }

  private processAnalyticsEvent(event: any) {
    if (!this.enabled) return;

    switch (event.name) {
      case 'page_view':
        this.recordPageView();
        break;
      case 'route_change':
        this.recordRouteChange();
        this.metrics.currentPage = event.path;
        break;
    }
  }

  private processWebVital(metric: any) {
    if (!this.enabled) return;

    if (metric.name === 'LCP') {
      this.addMetricPoint(this.metrics.lcpP95, metric.value);
    }
  }

  private recordPageView() {
    this.addMetricPoint(this.metrics.requestsPerMinute, 1);
  }

  private recordRouteChange() {
    this.addMetricPoint(this.metrics.routeChanges, 1);
  }

  private recordError() {
    this.addMetricPoint(this.metrics.errorsPerMinute, 1);
  }

  private recordPageActive() {
    // Send heartbeat to indicate active user
    if (this.enabled) {
      analytics.track('page_view', {
        timestamp: Date.now(),
        page: window.location.pathname,
      });
    }
  }

  private addMetricPoint(metricArray: MetricPoint[], value: number) {
    const now = Date.now();
    const minute = Math.floor(now / 60000) * 60000; // Round to minute

    // Find or create point for this minute
    const existingPoint = metricArray.find(point => point.timestamp === minute);
    if (existingPoint) {
      existingPoint.value += value;
    } else {
      metricArray.push({ timestamp: minute, value });
    }

    // Remove old points
    const cutoff = now - this.bufferDuration;
    metricArray.splice(0, metricArray.findIndex(point => point.timestamp >= cutoff));
  }

  private startMetricsCollection() {
    // Aggregate and clean up metrics every minute
    setInterval(() => {
      this.cleanupOldMetrics();
      this.emitMetricsUpdate();
    }, 60000);

    // Emit initial metrics
    setTimeout(() => this.emitMetricsUpdate(), 1000);
  }

  private cleanupOldMetrics() {
    const cutoff = Date.now() - this.bufferDuration;
    
    Object.values(this.metrics).forEach(metricArray => {
      if (Array.isArray(metricArray)) {
        const index = metricArray.findIndex(point => point.timestamp >= cutoff);
        if (index > 0) {
          metricArray.splice(0, index);
        }
      }
    });
  }

  private emitMetricsUpdate() {
    // Emit metrics update for dev panel
    window.dispatchEvent(new CustomEvent('realtime:metrics', { 
      detail: { ...this.metrics }
    }));
  }

  // SSE Connection for real-time updates (optional)
  private connectSSE() {
    if (!this.sseConfig.endpoint) return;

    try {
      this.eventSource = new EventSource(this.sseConfig.endpoint);
      
      this.eventSource.onopen = () => {
        // Real-time analytics connected
        this.reconnectAttempts = 0;
      };

      this.eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleSSEUpdate(data);
        } catch (error) {
          console.warn('Failed to parse SSE data:', error);
        }
      };

      this.eventSource.onerror = () => {
        console.warn('SSE connection error');
        this.eventSource?.close();
        this.scheduleReconnect();
      };

    } catch (error) {
      console.warn('Failed to establish SSE connection:', error);
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts >= this.sseConfig.maxReconnectAttempts) {
      console.warn('Max SSE reconnect attempts reached');
      return;
    }

    this.reconnectAttempts++;
    setTimeout(() => {
      if (this.enabled) {
        this.connectSSE();
      }
    }, this.sseConfig.reconnectDelay * this.reconnectAttempts);
  }

  private handleSSEUpdate(data: any) {
    // Handle real-time updates from server
    if (data.activeUsers) {
      this.metrics.activeUsers = data.activeUsers;
    }

    if (data.metrics) {
      // Merge server metrics with local ones
      Object.assign(this.metrics, data.metrics);
    }

    this.emitMetricsUpdate();
  }

  // Public API
  getMetrics(): RealtimeMetrics {
    return { ...this.metrics };
  }

  getSparklineData(metricName: keyof RealtimeMetrics): number[] {
    const metric = this.metrics[metricName];
    if (Array.isArray(metric)) {
      return metric.map(point => point.value);
    }
    return [];
  }

  // Get summary stats
  getSummaryStats() {
    const now = Date.now();
    const lastMinute = now - 60000;
    const last5Minutes = now - 5 * 60000;

    return {
      requestsLastMinute: this.getMetricSum(this.metrics.requestsPerMinute, lastMinute),
      requestsLast5Minutes: this.getMetricSum(this.metrics.requestsPerMinute, last5Minutes),
      errorsLastMinute: this.getMetricSum(this.metrics.errorsPerMinute, lastMinute),
      errorsLast5Minutes: this.getMetricSum(this.metrics.errorsPerMinute, last5Minutes),
      averageLCP: this.getMetricAverage(this.metrics.lcpP95, last5Minutes),
      activeUsers: this.metrics.activeUsers,
      currentPage: this.metrics.currentPage,
    };
  }

  private getMetricSum(metricArray: MetricPoint[], since: number): number {
    return metricArray
      .filter(point => point.timestamp >= since)
      .reduce((sum, point) => sum + point.value, 0);
  }

  private getMetricAverage(metricArray: MetricPoint[], since: number): number {
    const filtered = metricArray.filter(point => point.timestamp >= since);
    if (filtered.length === 0) return 0;
    
    const sum = filtered.reduce((sum, point) => sum + point.value, 0);
    return sum / filtered.length;
  }

  // Simulate server data for development
  simulateRealtimeData() {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('simulateRealtimeData only available in development');
      return;
    }

    setInterval(() => {
      // Simulate some random activity
      if (Math.random() < 0.3) {
        this.addMetricPoint(this.metrics.requestsPerMinute, Math.floor(Math.random() * 5) + 1);
      }
      
      if (Math.random() < 0.1) {
        this.addMetricPoint(this.metrics.errorsPerMinute, 1);
      }

      if (Math.random() < 0.2) {
        this.addMetricPoint(this.metrics.lcpP95, Math.random() * 3000 + 1000);
      }

      this.metrics.activeUsers = Math.floor(Math.random() * 50) + 10;
      this.emitMetricsUpdate();
    }, 5000);
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = undefined;
    }
  }

  destroy() {
    this.disconnect();
  }
}

// Initialize real-time monitoring
export const realtimeMonitor = new RealtimeMonitor();

// Development helpers
if (process.env.NODE_ENV === 'development') {
  (window as any).__realtimeMonitor = realtimeMonitor;
  
  // Auto-start simulation in dev
  setTimeout(() => {
    realtimeMonitor.simulateRealtimeData();
  }, 2000);
}