import * as React from 'react';
import { useWebVitals } from '@/lib/performance/webVitals';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface PerformanceMonitorProps {
  showInProduction?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export function PerformanceMonitor({ 
  showInProduction = false,
  position = 'bottom-right'
}: PerformanceMonitorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const metrics = useWebVitals();

  // Only show in development unless explicitly enabled for production
  if (!showInProduction && process.env.NODE_ENV === 'production') {
    return null;
  }

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  const getScoreColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'bg-green-500';
      case 'needs-improvement': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getOverallScore = () => {
    if (metrics.length === 0) return 0;
    const scores = metrics.map(m => {
      switch (m.rating) {
        case 'good': return 90;
        case 'needs-improvement': return 50;
        case 'poor': return 10;
        default: return 0;
      }
    });
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const overallScore = getOverallScore();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'p') {
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className={`fixed ${positionClasses[position]} z-50 font-mono`}>
      {!isOpen ? (
        // Collapsed state - floating performance badge
        <button
          onClick={() => setIsOpen(true)}
          className={`
            w-16 h-16 rounded-full text-white font-bold text-sm
            shadow-lg hover:shadow-xl transition-all duration-200
            flex items-center justify-center
            ${overallScore >= 80 ? 'bg-green-500 hover:bg-green-600' :
              overallScore >= 50 ? 'bg-yellow-500 hover:bg-yellow-600' :
              'bg-red-500 hover:bg-red-600'}
          `}
          title="Performance Monitor (Alt+P)"
        >
          {overallScore}
        </button>
      ) : (
        // Expanded state
        <Card className="w-80 p-4 bg-white/95 backdrop-blur-sm border shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Performance Monitor</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {showDetails ? 'Hide' : 'Details'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Overall Score */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Score</span>
              <span className="text-lg font-bold">{overallScore}</span>
            </div>
            <Progress value={overallScore} className="h-2" />
          </div>

          {/* Core Web Vitals */}
          <div className="space-y-2">
            {metrics.slice(0, showDetails ? metrics.length : 3).map((metric) => (
              <div key={metric.id} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getScoreColor(metric.rating)}`} />
                  <span className="text-xs font-medium">{metric.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">
                    {metric.value.toFixed(0)}
                    {metric.name.includes('CLS') ? '' : 'ms'}
                  </span>
                  <Badge 
                    variant={metric.rating === 'good' ? 'default' : 'secondary'}
                    className="text-xs px-1 py-0"
                  >
                    {metric.rating === 'good' ? '✓' : 
                     metric.rating === 'needs-improvement' ? '⚠' : '✗'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Resource Stats */}
          {showDetails && (
            <div className="mt-4 pt-3 border-t space-y-2">
              <div className="text-xs text-muted-foreground">
                Memory: {(performance as any).memory ? 
                  `${Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)}MB` : 
                  'N/A'}
              </div>
              <div className="text-xs text-muted-foreground">
                Connection: {(navigator as any).connection?.effectiveType || 'Unknown'}
              </div>
              <div className="text-xs text-muted-foreground">
                Resources: {performance.getEntriesByType('resource').length}
              </div>
            </div>
          )}

          <div className="mt-3 pt-2 border-t text-xs text-muted-foreground">
            Press Alt+P to toggle • Dev Mode Only
          </div>
        </Card>
      )}
    </div>
  );
}

// React Error Boundary for performance monitoring
export class PerformanceErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Track performance impact of errors
    if ('sendBeacon' in navigator) {
      navigator.sendBeacon('/api/analytics/errors', JSON.stringify({
        error: error.message,
        stack: error.stack,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent
      }));
    }

    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Performance Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback;
      
      if (FallbackComponent) {
        return <FallbackComponent error={this.state.error!} />;
      }

      return (
        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-red-600 text-sm">
            The performance monitor encountered an error. Please refresh the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}