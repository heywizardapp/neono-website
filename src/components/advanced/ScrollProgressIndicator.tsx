import * as React from "react";
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
  className?: string;
  height?: number;
  color?: string;
  position?: 'top' | 'bottom';
}

export function ScrollProgress({ 
  className, 
  height = 4, 
  color = 'bg-gradient-to-r from-primary to-accent',
  position = 'top'
}: ScrollProgressProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));
    };

    const throttledUpdate = throttle(updateProgress, 16); // 60fps
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    
    // Initial calculation
    updateProgress();

    return () => window.removeEventListener('scroll', throttledUpdate);
  }, []);

  const positionClasses = position === 'top' ? 'top-0' : 'bottom-0';

  return (
    <div className={cn(
      'fixed left-0 w-full bg-border/20 z-50',
      positionClasses,
      className
    )} style={{ height }}>
      <div
        className={cn('h-full transition-all duration-100 ease-out', color)}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// Throttle utility
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }) as T;
}