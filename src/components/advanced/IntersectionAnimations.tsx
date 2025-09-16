import * as React from 'react';
import { cn } from '@/lib/utils';

interface IntersectionAnimationProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in' | 'rotate-in';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export function IntersectionAnimation({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.1,
  triggerOnce = true
}: IntersectionAnimationProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold, triggerOnce]);

  const animations = {
    'fade-up': {
      initial: 'opacity-0 translate-y-8',
      animate: 'opacity-100 translate-y-0'
    },
    'fade-in': {
      initial: 'opacity-0',
      animate: 'opacity-100'
    },
    'slide-left': {
      initial: 'opacity-0 -translate-x-8',
      animate: 'opacity-100 translate-x-0'
    },
    'slide-right': {
      initial: 'opacity-0 translate-x-8',
      animate: 'opacity-100 translate-x-0'
    },
    'scale-in': {
      initial: 'opacity-0 scale-95',
      animate: 'opacity-100 scale-100'
    },
    'rotate-in': {
      initial: 'opacity-0 rotate-6 scale-95',
      animate: 'opacity-100 rotate-0 scale-100'
    }
  };

  const currentAnimation = animations[animation];

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all ease-out',
        isVisible ? currentAnimation.animate : currentAnimation.initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
}

// Staggered animations for lists
export function StaggeredAnimation({
  children,
  className,
  staggerDelay = 100,
  ...animationProps
}: IntersectionAnimationProps & { 
  staggerDelay?: number;
}) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <IntersectionAnimation
          key={index}
          delay={index * staggerDelay}
          {...animationProps}
        >
          {child}
        </IntersectionAnimation>
      ))}
    </div>
  );
}

// Parallax scroll effect
export function ParallaxScroll({
  children,
  className,
  speed = 0.5,
  direction = 'up'
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const [offset, setOffset] = React.useState(0);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        
        let transform = '';
        switch (direction) {
          case 'up':
            transform = `translateY(${-rate}px)`;
            break;
          case 'down':
            transform = `translateY(${rate}px)`;
            break;
          case 'left':
            transform = `translateX(${-rate}px)`;
            break;
          case 'right':
            transform = `translateX(${rate}px)`;
            break;
        }
        
        elementRef.current.style.transform = transform;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return (
    <div ref={elementRef} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
}