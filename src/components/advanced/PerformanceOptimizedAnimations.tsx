import * as React from "react";
import { cn } from '@/lib/utils';

// GPU-accelerated smooth animations
interface GPUAnimationProps {
  children: ReactNode;
  className?: string;
  effect?: 'float' | 'rotate' | 'pulse' | 'wave' | 'shimmer';
  duration?: number;
  delay?: number;
  paused?: boolean;
}

export function GPUAnimation({
  children,
  className,
  effect = 'float',
  duration = 3000,
  delay = 0,
  paused = false
}: GPUAnimationProps) {
  const elementRef = React.useRef<HTMLDivElement>(null);
  const animationRef = React.useRef<number>();
  const startTimeRef = React.useRef<number>();

  React.useEffect(() => {
    if (paused || !elementRef.current) return;

    const element = elementRef.current;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp + delay;
      }
      
      if (timestamp >= startTimeRef.current) {
        const elapsed = timestamp - startTimeRef.current;
        const progress = (elapsed % duration) / duration;
        
        applyTransform(element, effect, progress);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [effect, duration, delay, paused]);

  const applyTransform = (element: HTMLElement, effect: string, progress: number) => {
    const angle = progress * 2 * Math.PI;
    
    switch (effect) {
      case 'float':
        element.style.transform = `translate3d(0, ${Math.sin(angle) * 8}px, 0)`;
        break;
      case 'rotate':
        element.style.transform = `rotate(${progress * 360}deg)`;
        break;
      case 'pulse':
        element.style.transform = `scale(${1 + Math.sin(angle) * 0.05})`;
        break;
      case 'wave':
        element.style.transform = `translate3d(${Math.sin(angle) * 4}px, ${Math.cos(angle * 0.5) * 2}px, 0)`;
        break;
      case 'shimmer':
        element.style.backgroundPosition = `${progress * 200 - 100}%`;
        break;
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        'will-change-transform',
        effect === 'shimmer' && 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-size-200',
        className
      )}
    >
      {children}
    </div>
  );
}

// Optimized Intersection Observer with RAF
interface OptimizedInViewProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade' | 'slide' | 'scale' | 'blur';
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function OptimizedInView({
  children,
  className,
  animation = 'fade',
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true
}: OptimizedInViewProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);
  const observerRef = React.useRef<IntersectionObserver>();

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          // Use RAF for smooth animation start
          requestAnimationFrame(() => {
            setIsVisible(true);
          });
          
          if (triggerOnce) {
            observerRef.current?.unobserve(element);
          }
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, isVisible]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out will-change-transform';
    
    switch (animation) {
      case 'fade':
        return cn(
          baseClasses,
          isVisible ? 'opacity-100' : 'opacity-0'
        );
      case 'slide':
        return cn(
          baseClasses,
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        );
      case 'scale':
        return cn(
          baseClasses,
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        );
      case 'blur':
        return cn(
          baseClasses,
          isVisible 
            ? 'opacity-100 blur-0' 
            : 'opacity-0 blur-sm'
        );
      default:
        return baseClasses;
    }
  };

  return (
    <div ref={elementRef} className={cn(getAnimationClasses(), className)}>
      {children}
    </div>
  );
}

// Smooth Momentum Scrolling Hook
export function useSmoothScroll() {
  const scrollTo = (target: string | HTMLElement, offset = 0) => {
    const element = typeof target === 'string' 
      ? document.querySelector(target) as HTMLElement
      : target;
      
    if (!element) return;

    const targetPosition = element.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = Math.min(Math.abs(distance) * 0.5, 1200);
    
    let start: number;
    
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  };

  return { scrollTo };
}

// Easing function
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// Virtualized List for Performance
interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
}

export function VirtualizedList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      className={cn('overflow-auto', className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
              className="flex items-center"
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Performance Monitor Component
export function PerformanceMonitor() {
  const [fps, setFps] = React.useState(60);
  const [memoryUsage, setMemoryUsage] = React.useState(0);
  
  React.useEffect(() => {
    let frames = 0;
    let lastTime = Date.now();
    
    const measureFPS = () => {
      frames++;
      const currentTime = Date.now();
      
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (currentTime - lastTime)));
        frames = 0;
        lastTime = currentTime;
        
        // Memory usage (if available)
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          setMemoryUsage(Math.round(memory.usedJSHeapSize / 1024 / 1024));
        }
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs p-2 rounded font-mono z-50">
      <div>FPS: {fps}</div>
      {memoryUsage > 0 && <div>Memory: {memoryUsage}MB</div>}
    </div>
  );
}