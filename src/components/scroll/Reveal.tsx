import * as React from 'react';
import { cn } from '@/lib/utils';
import { observeInView } from '@/lib/scroll/observer';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'custom';
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  onReveal?: () => void;
  customAnimation?: string;
}

export function Reveal({
  children,
  className,
  animation = 'fade',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  onReveal,
  customAnimation
}: RevealProps) {
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [hasTriggered, setHasTriggered] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  // Check if user prefers reduced motion
  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Get animation classes
  const getAnimationClasses = () => {
    if (prefersReducedMotion) {
      return 'opacity-100 transform-none';
    }

    const baseClasses = `transition-all duration-[${duration}ms] ease-out`;
    
    if (customAnimation) {
      return `${baseClasses} ${customAnimation}`;
    }

    switch (animation) {
      case 'slide-up':
        return `${baseClasses} ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
      case 'slide-down':
        return `${baseClasses} ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`;
      case 'slide-left':
        return `${baseClasses} ${isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`;
      case 'slide-right':
        return `${baseClasses} ${isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`;
      case 'scale':
        return `${baseClasses} ${isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`;
      case 'fade':
      default:
        return `${baseClasses} ${isRevealed ? 'opacity-100' : 'opacity-0'}`;
    }
  };

  // Set up intersection observer
  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const cleanup = observeInView(
      element,
      (isIntersecting) => {
        if (isIntersecting && (!triggerOnce || !hasTriggered)) {
          const timeoutId = setTimeout(() => {
            setIsRevealed(true);
            setHasTriggered(true);
            onReveal?.();
          }, delay);
          
          return () => clearTimeout(timeoutId);
        } else if (!triggerOnce && !isIntersecting) {
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    return cleanup;
  }, [threshold, rootMargin, triggerOnce, hasTriggered, delay, onReveal]);

  // Immediately show if reduced motion is preferred
  React.useEffect(() => {
    if (prefersReducedMotion) {
      setIsRevealed(true);
      setHasTriggered(true);
    }
  }, [prefersReducedMotion]);

  return (
    <div
      ref={elementRef}
      className={cn(getAnimationClasses(), className)}
      data-revealed={isRevealed}
    >
      {children}
    </div>
  );
}

// Staggered reveal for lists of items
interface StaggeredRevealProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
  itemClassName?: string;
  animation?: RevealProps['animation'];
  threshold?: number;
  rootMargin?: string;
}

export function StaggeredReveal({
  children,
  staggerDelay = 100,
  className,
  itemClassName,
  animation = 'slide-up',
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px'
}: StaggeredRevealProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <Reveal
          key={index}
          animation={animation}
          delay={index * staggerDelay}
          threshold={threshold}
          rootMargin={rootMargin}
          className={itemClassName}
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
}

// Text reveal with word-by-word animation
interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  staggerDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  staggerDelay = 50,
  as: Component = 'div'
}: TextRevealProps) {
  const words = text.split(' ');
  
  return (
    <Component className={className}>
      {words.map((word, index) => (
        <Reveal
          key={index}
          animation="slide-up"
          delay={delay + (index * staggerDelay)}
          className={cn('inline-block mr-1', wordClassName)}
        >
          {word}
        </Reveal>
      ))}
    </Component>
  );
}

// Counter reveal with number animation
interface CounterRevealProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  separator?: string;
  decimals?: number;
}

export function CounterReveal({
  from = 0,
  to,
  duration = 2000,
  delay = 0,
  className,
  suffix = '',
  prefix = '',
  separator = ',',
  decimals = 0
}: CounterRevealProps) {
  const [count, setCount] = React.useState(from);
  const [hasStarted, setHasStarted] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals);
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  };

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const cleanup = observeInView(
      element,
      (isIntersecting) => {
        if (isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          const startTime = Date.now() + delay;
          const difference = to - from;
          
          const updateCount = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            
            if (elapsed < 0) {
              requestAnimationFrame(updateCount);
              return;
            }
            
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = from + (difference * easeOutQuart);
            
            setCount(current);
            
            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              setCount(to);
            }
          };
          
          requestAnimationFrame(updateCount);
        }
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    return cleanup;
  }, [from, to, duration, delay, hasStarted]);

  return (
    <div ref={elementRef} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </div>
  );
}