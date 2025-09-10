import * as React from 'react';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: number;
  easing?: 'linear' | 'ease-out' | 'ease-in-out';
  disabled?: boolean;
}

export function Parallax({
  children,
  speed = 0.5,
  direction = 'up',
  className,
  offset = 0,
  easing = 'linear',
  disabled = false
}: ParallaxProps) {
  const elementRef = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState('translate3d(0, 0, 0)');
  const requestRef = React.useRef<number>();
  const isInViewRef = React.useRef(false);

  // Check if user prefers reduced motion
  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const shouldDisable = disabled || prefersReducedMotion;

  // Easing functions
  const easingFunctions = {
    linear: (t: number) => t,
    'ease-out': (t: number) => 1 - Math.pow(1 - t, 3),
    'ease-in-out': (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  };

  const updateTransform = React.useCallback(() => {
    if (!elementRef.current || shouldDisable || !isInViewRef.current) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how much of the element is visible
    const elementTop = rect.top;
    const elementHeight = rect.height;
    const viewportProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
    
    // Apply easing
    const easedProgress = easingFunctions[easing](Math.max(0, Math.min(1, viewportProgress)));
    
    // Calculate movement based on direction and speed
    const movement = (easedProgress - 0.5) * speed * 100 + offset;
    
    let translateX = 0;
    let translateY = 0;
    
    switch (direction) {
      case 'up':
        translateY = -movement;
        break;
      case 'down':
        translateY = movement;
        break;
      case 'left':
        translateX = -movement;
        break;
      case 'right':
        translateX = movement;
        break;
    }
    
    setTransform(`translate3d(${translateX}px, ${translateY}px, 0)`);
  }, [speed, direction, offset, easing, shouldDisable]);

  // Throttled scroll handler
  const handleScroll = React.useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    requestRef.current = requestAnimationFrame(updateTransform);
  }, [updateTransform]);

  // Intersection observer to only animate when in view
  React.useEffect(() => {
    if (shouldDisable || !elementRef.current) return;

    const element = elementRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isInViewRef.current = entry.isIntersecting;
        
        if (entry.isIntersecting) {
          updateTransform();
        }
      },
      {
        rootMargin: '100px 0px',
        threshold: 0
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [shouldDisable, updateTransform]);

  // Scroll event listener
  React.useEffect(() => {
    if (shouldDisable) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [handleScroll, shouldDisable]);

  return (
    <div
      ref={elementRef}
      className={cn('will-change-transform', className)}
      style={{
        transform: shouldDisable ? 'none' : transform,
      }}
    >
      {children}
    </div>
  );
}

// Background parallax component for hero sections
interface ParallaxBackgroundProps {
  src: string;
  alt?: string;
  speed?: number;
  className?: string;
  overlay?: boolean;
  overlayClassName?: string;
  children?: React.ReactNode;
}

export function ParallaxBackground({
  src,
  alt = '',
  speed = 0.5,
  className,
  overlay = false,
  overlayClassName = 'bg-black/40',
  children
}: ParallaxBackgroundProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Parallax speed={speed} className="absolute inset-0 w-full h-full">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover scale-110" // Scale to prevent gaps
          loading="eager"
        />
      </Parallax>
      
      {overlay && (
        <div className={cn('absolute inset-0', overlayClassName)} />
      )}
      
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}

// Parallax container for multiple elements with different speeds
interface ParallaxContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ParallaxContainer({ children, className }: ParallaxContainerProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
    </div>
  );
}

// Multi-layer parallax for complex scenes
interface ParallaxLayerProps {
  children: React.ReactNode;
  speed: number;
  className?: string;
  zIndex?: number;
}

export function ParallaxLayer({ children, speed, className, zIndex = 0 }: ParallaxLayerProps) {
  return (
    <div
      className={cn('absolute inset-0', className)}
      style={{ zIndex }}
    >
      <Parallax speed={speed}>
      {children}
    </Parallax>
  );
}

// Hook for custom parallax effects
export function useParallax(options: {
  speed?: number;
  direction?: ParallaxProps['direction'];
  easing?: ParallaxProps['easing'];
  disabled?: boolean;
} = {}) {
  const {
    speed = 0.5,
    direction = 'up',
    easing = 'linear',
    disabled = false
  } = options;

  const [offset, setOffset] = React.useState(0);
  const elementRef = React.useRef<HTMLElement>(null);
  const requestRef = React.useRef<number>();

  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const shouldDisable = disabled || prefersReducedMotion;

  const updateOffset = React.useCallback(() => {
    if (!elementRef.current || shouldDisable) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    const elementTop = rect.top;
    const elementHeight = rect.height;
    const viewportProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
    
    const easingFunctions = {
      linear: (t: number) => t,
      'ease-out': (t: number) => 1 - Math.pow(1 - t, 3),
      'ease-in-out': (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    };

    const easedProgress = easingFunctions[easing](Math.max(0, Math.min(1, viewportProgress)));
    const movement = (easedProgress - 0.5) * speed * 100;
    
    setOffset(movement);
  }, [speed, easing, shouldDisable]);

  const handleScroll = React.useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    requestRef.current = requestAnimationFrame(updateOffset);
  }, [updateOffset]);

  React.useEffect(() => {
    if (shouldDisable) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [handleScroll, shouldDisable]);

  const getTransform = () => {
    if (shouldDisable) return 'none';
    
    switch (direction) {
      case 'up':
        return `translateY(${-offset}px)`;
      case 'down':
        return `translateY(${offset}px)`;
      case 'left':
        return `translateX(${-offset}px)`;
      case 'right':
        return `translateX(${offset}px)`;
      default:
        return 'none';
    }
  };

  return {
    elementRef,
    offset,
    transform: getTransform(),
    style: { transform: getTransform() }
  };
}