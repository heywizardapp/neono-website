import * as React from "react";
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'scale-in' | 'slide-left' | 'slide-right';
  delay?: number;
  stagger?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

const animationClasses = {
  'fade-up': 'translate-y-8 opacity-0 transition-all duration-700 ease-out',
  'fade-in': 'opacity-0 transition-opacity duration-600 ease-out',
  'scale-in': 'scale-95 opacity-0 transition-all duration-500 ease-out',
  'slide-left': 'translate-x-8 opacity-0 transition-all duration-600 ease-out',
  'slide-right': '-translate-x-8 opacity-0 transition-all duration-600 ease-out',
};

const visibleClasses = {
  'fade-up': 'translate-y-0 opacity-100',
  'fade-in': 'opacity-100',
  'scale-in': 'scale-100 opacity-100',
  'slide-left': 'translate-x-0 opacity-100',
  'slide-right': 'translate-x-0 opacity-100',
};

export function ScrollReveal({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  stagger = 0,
  threshold = 0.1,
  triggerOnce = true,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({
    delay,
    stagger,
    threshold,
    triggerOnce,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        animationClasses[animation],
        isVisible && visibleClasses[animation],
        className
      )}
    >
      {children}
    </div>
  );
}

interface StaggeredRevealProps {
  children: ReactNode[];
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'scale-in' | 'slide-left' | 'slide-right';
  baseDelay?: number;
  staggerDelay?: number;
  threshold?: number;
}

export function StaggeredReveal({
  children,
  className,
  animation = 'fade-up',
  baseDelay = 0,
  staggerDelay = 150,
  threshold = 0.1,
}: StaggeredRevealProps) {
  return (
    <>
      {children.map((child, index) => (
        <ScrollReveal
          key={index}
          className={className}
          animation={animation}
          delay={baseDelay + (index * staggerDelay)}
          threshold={threshold}
        >
          {child}
        </ScrollReveal>
      ))}
    </>
  );
}