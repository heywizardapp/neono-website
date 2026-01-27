import * as React from "react";
import { SmartSkeleton } from './SmartSkeleton';
import { cn } from '@/lib/utils';

interface ProgressiveLoaderProps {
  children: ReactNode;
  skeleton: ReactNode;
  delay?: number;
  className?: string;
  fadeIn?: boolean;
}

export function ProgressiveLoader({
  children,
  skeleton,
  delay = 0,
  className,
  fadeIn = true,
}: ProgressiveLoaderProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isLoaded) {
    return <div className={className}>{skeleton}</div>;
  }

  return (
    <div 
      className={cn(
        fadeIn && 'animate-fade-in',
        className
      )}
    >
      {children}
    </div>
  );
}

interface ContentLoaderProps {
  isLoading: boolean;
  children: ReactNode;
  skeleton?: ReactNode;
  lines?: number;
  className?: string;
}

export function ContentLoader({
  isLoading,
  children,
  skeleton,
  lines = 3,
  className,
}: ContentLoaderProps) {
  if (isLoading) {
    return (
      <div className={className}>
        {skeleton || <SmartSkeleton variant="text" lines={lines} />}
      </div>
    );
  }

  return (
    <div className={cn('animate-fade-in', className)}>
      {children}
    </div>
  );
}

interface LazyLoaderProps {
  children: ReactNode;
  skeleton: ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

export function LazyLoader({
  children,
  skeleton,
  rootMargin = '50px',
  threshold = 0.1,
  className,
}: LazyLoaderProps) {
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const [ref, setRef] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.unobserve(ref);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(ref);

    return () => {
      observer.unobserve(ref);
    };
  }, [ref, rootMargin, threshold]);

  return (
    <div ref={setRef} className={className}>
      {shouldLoad ? (
        <div className="animate-fade-in">
          {children}
        </div>
      ) : (
        skeleton
      )}
    </div>
  );
}