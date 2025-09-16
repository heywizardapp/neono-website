import { cn } from '@/lib/utils';

interface SmartSkeletonProps {
  className?: string;
  variant?: 'text' | 'circle' | 'rect' | 'card' | 'button' | 'avatar' | 'testimonial' | 'feature';
  lines?: number;
  animate?: boolean;
}

export function SmartSkeleton({ 
  className, 
  variant = 'rect', 
  lines = 1,
  animate = true 
}: SmartSkeletonProps) {
  const baseClasses = cn(
    "bg-gradient-to-r from-muted via-muted/60 to-muted rounded-md",
    animate && "animate-pulse",
    className
  );

  if (variant === 'text') {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i}
            className={cn(
              baseClasses,
              "h-4",
              i === lines - 1 && lines > 1 ? "w-3/4" : "w-full"
            )} 
          />
        ))}
      </div>
    );
  }

  if (variant === 'circle') {
    return <div className={cn(baseClasses, "rounded-full aspect-square")} />;
  }

  if (variant === 'card') {
    return (
      <div className={cn("space-y-4 p-6 rounded-2xl border bg-card", className)}>
        <div className={cn(baseClasses, "h-6 w-12 rounded-xl")} />
        <div className={cn(baseClasses, "h-8 w-full")} />
        <div className="space-y-2">
          <div className={cn(baseClasses, "h-4 w-full")} />
          <div className={cn(baseClasses, "h-4 w-3/4")} />
        </div>
        <div className={cn(baseClasses, "h-10 w-24 rounded-lg")} />
      </div>
    );
  }

  if (variant === 'button') {
    return <div className={cn(baseClasses, "h-10 w-24 rounded-lg")} />;
  }

  if (variant === 'avatar') {
    return <div className={cn(baseClasses, "rounded-full w-16 h-16")} />;
  }

  if (variant === 'testimonial') {
    return (
      <div className="space-y-6 p-8 rounded-3xl bg-gradient-card">
        {/* Rating stars */}
        <div className="flex justify-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={cn(baseClasses, "w-6 h-6")} />
          ))}
        </div>
        
        {/* Quote */}
        <div className="space-y-3 max-w-4xl mx-auto">
          <div className={cn(baseClasses, "h-6 w-full")} />
          <div className={cn(baseClasses, "h-6 w-full")} />
          <div className={cn(baseClasses, "h-6 w-3/4 mx-auto")} />
        </div>

        {/* Author */}
        <div className="flex items-center justify-center space-x-4">
          <div className={cn(baseClasses, "w-16 h-16 rounded-full")} />
          <div className="space-y-2">
            <div className={cn(baseClasses, "h-5 w-32")} />
            <div className={cn(baseClasses, "h-4 w-24")} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'feature') {
    return (
      <div className="space-y-4 p-8 rounded-2xl bg-gradient-card">
        <div className={cn(baseClasses, "w-12 h-12 rounded-xl")} />
        <div className={cn(baseClasses, "h-6 w-3/4")} />
        <div className="space-y-2">
          <div className={cn(baseClasses, "h-4 w-full")} />
          <div className={cn(baseClasses, "h-4 w-2/3")} />
        </div>
      </div>
    );
  }

  return <div className={baseClasses} />;
}

// Prebuilt skeleton layouts
export function TestimonialSkeleton() {
  return <SmartSkeleton variant="testimonial" />;
}

export function FeatureGridSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <SmartSkeleton key={i} variant="feature" />
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SmartSkeleton key={i} variant="card" />
      ))}
    </div>
  );
}