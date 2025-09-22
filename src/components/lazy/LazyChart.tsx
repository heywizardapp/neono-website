import * as React from 'react';
import { cn } from '@/lib/utils';

// Loading skeleton for charts
const ChartFallback = ({ className }: { className?: string }) => (
  <div className={cn("flex aspect-video justify-center items-center animate-pulse", className)}>
    <div className="space-y-3 w-full p-4">
      <div className="flex justify-between">
        <div className="h-4 bg-muted rounded w-1/4"></div>
        <div className="h-4 bg-muted rounded w-1/6"></div>
      </div>
      <div className="space-y-2">
        <div className="h-32 bg-gradient-to-t from-muted/50 to-muted rounded"></div>
        <div className="flex justify-between space-x-2">
          <div className="h-3 bg-muted rounded flex-1"></div>
          <div className="h-3 bg-muted rounded flex-1"></div>
          <div className="h-3 bg-muted rounded flex-1"></div>
          <div className="h-3 bg-muted rounded flex-1"></div>
        </div>
      </div>
    </div>
  </div>
);

// Lazy load chart components
const LazyChartContainer = React.lazy(() => 
  import('../ui/chart').then(module => ({
    default: module.ChartContainer
  }))
);

const LazyChartTooltip = React.lazy(() => 
  import('../ui/chart').then(module => ({
    default: module.ChartTooltip
  }))
);

const LazyChartTooltipContent = React.lazy(() => 
  import('../ui/chart').then(module => ({
    default: module.ChartTooltipContent
  }))
);

const LazyChartLegend = React.lazy(() => 
  import('../ui/chart').then(module => ({
    default: module.ChartLegend
  }))
);

const LazyChartLegendContent = React.lazy(() => 
  import('../ui/chart').then(module => ({
    default: module.ChartLegendContent
  }))
);

// Wrapper components with suspense
export function ChartContainer(props: React.ComponentProps<any>) {
  return (
    <React.Suspense fallback={<ChartFallback className={props.className} />}>
      <LazyChartContainer {...props} />
    </React.Suspense>
  );
}

export function ChartTooltip(props: React.ComponentProps<any>) {
  return (
    <React.Suspense fallback={null}>
      <LazyChartTooltip {...props} />
    </React.Suspense>
  );
}

export function ChartTooltipContent(props: React.ComponentProps<any>) {
  return (
    <React.Suspense fallback={null}>
      <LazyChartTooltipContent {...props} />
    </React.Suspense>
  );
}

export function ChartLegend(props: React.ComponentProps<any>) {
  return (
    <React.Suspense fallback={null}>
      <LazyChartLegend {...props} />
    </React.Suspense>
  );
}

export function ChartLegendContent(props: React.ComponentProps<any>) {
  return (
    <React.Suspense fallback={null}>
      <LazyChartLegendContent {...props} />
    </React.Suspense>
  );
}

// Export for easier importing
export * from '../ui/chart';