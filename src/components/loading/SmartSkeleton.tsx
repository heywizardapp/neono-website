import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SmartSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'card' | 'avatar' | 'button' | 'image';
  lines?: number;
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

function SmartSkeleton({ 
  className, 
  variant = 'text',
  lines = 1,
  width,
  height,
  animate = true,
  ...props 
}: SmartSkeletonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return "h-4 rounded";
      case 'card':
        return "h-32 rounded-lg";
      case 'avatar':
        return "h-12 w-12 rounded-full";
      case 'button':
        return "h-10 rounded-md";
      case 'image':
        return "aspect-video rounded-lg";
      default:
        return "h-4 rounded";
    }
  };

  const baseClasses = cn(
    "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]",
    animate && "animate-shimmer",
    getVariantClasses(),
    className
  );

  const style = {
    width: width,
    height: height,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2" {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              i === lines - 1 && "w-3/4" // Last line is shorter
            )}
            style={style}
          />
        ))}
      </div>
    );
  }

  return <div className={baseClasses} style={style} {...props} />;
}

interface SkeletonGroupProps {
  children: ReactNode;
  stagger?: boolean;
  staggerDelay?: number;
}

function SkeletonGroup({ children, stagger = false, staggerDelay = 100 }: SkeletonGroupProps) {
  if (!stagger) return <>{children}</>;

  return (
    <div className="space-y-4">
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * staggerDelay}ms` }}
              className="animate-fade-in"
            >
              {child}
            </div>
          ))
        : children
      }
    </div>
  );
}

// Pre-built skeleton layouts
function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("p-6 space-y-4", className)}>
      <SmartSkeleton variant="avatar" className="mx-auto" />
      <SmartSkeleton variant="text" lines={2} />
      <SmartSkeleton variant="button" />
    </div>
  );
}

function ListSkeleton({ items = 3, className }: { items?: number; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          <SmartSkeleton variant="avatar" className="h-8 w-8" />
          <div className="flex-1 space-y-2">
            <SmartSkeleton variant="text" width="60%" />
            <SmartSkeleton variant="text" width="40%" className="h-3" />
          </div>
        </div>
      ))}
    </div>
  );
}

function TableSkeleton({ rows = 5, cols = 4, className }: { rows?: number; cols?: number; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols }).map((_, i) => (
          <SmartSkeleton key={i} variant="text" className="h-6" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <SmartSkeleton key={colIndex} variant="text" />
          ))}
        </div>
      ))}
    </div>
  );
}

export { SmartSkeleton, SkeletonGroup, CardSkeleton, ListSkeleton, TableSkeleton };