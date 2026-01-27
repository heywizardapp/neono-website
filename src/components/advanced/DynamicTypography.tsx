import * as React from "react";
import { cn } from '@/lib/utils';

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
}

export function Typewriter({
  text,
  className,
  speed = 50,
  delay = 0,
  cursor = true,
  onComplete,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = React.useState('');
  const [isComplete, setIsComplete] = React.useState(false);
  const [showCursor, setShowCursor] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;

        if (index === text.length) {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay, onComplete]);

  // Cursor blinking effect
  React.useEffect(() => {
    if (!cursor) return;

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [cursor]);

  return (
    <span className={cn('inline-block', className)}>
      {displayedText}
      {cursor && !isComplete && (
        <span className={cn('ml-1 border-r-2 border-current', showCursor ? 'opacity-100' : 'opacity-0')}>
          &nbsp;
        </span>
      )}
    </span>
  );
}

interface TextRevealProps {
  children: string;
  className?: string;
  animation?: 'slide-up' | 'fade' | 'scale' | 'blur';
  stagger?: number;
  trigger?: 'scroll' | 'hover' | 'immediate';
  threshold?: number;
}

export function TextReveal({
  children,
  className,
  animation = 'slide-up',
  stagger = 50,
  trigger = 'scroll',
  threshold = 0.1,
}: TextRevealProps) {
  const [isVisible, setIsVisible] = React.useState(trigger === 'immediate');
  const ref = React.useRef<HTMLDivElement>(null);
  const words = children.split(' ');

  React.useEffect(() => {
    if (trigger !== 'scroll') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [trigger, threshold]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsVisible(true);
    }
  };

  const getAnimationClasses = (index: number) => {
    const baseClasses = 'inline-block transition-all duration-700 ease-out';
    const delay = `delay-[${index * stagger}ms]`;

    switch (animation) {
      case 'slide-up':
        return cn(
          baseClasses,
          delay,
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        );
      case 'fade':
        return cn(
          baseClasses,
          delay,
          isVisible ? 'opacity-100' : 'opacity-0'
        );
      case 'scale':
        return cn(
          baseClasses,
          delay,
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        );
      case 'blur':
        return cn(
          baseClasses,
          delay,
          isVisible ? 'blur-0 opacity-100' : 'blur-sm opacity-0'
        );
      default:
        return baseClasses;
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={handleMouseEnter}
    >
      {words.map((word, index) => (
        <span key={index} className={getAnimationClasses(index)}>
          {word}
          {index < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </div>
  );
}

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  trigger?: 'scroll' | 'immediate';
  onComplete?: () => void;
}

export function CountUp({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  trigger = 'scroll',
  onComplete,
}: CountUpProps) {
  const [count, setCount] = React.useState(start);
  const [hasStarted, setHasStarted] = React.useState(trigger === 'immediate');
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (trigger !== 'scroll') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [trigger]);

  React.useEffect(() => {
    if (!hasStarted) return;

    const timer = setTimeout(() => {
      const startTime = Date.now();
      const startValue = start;
      const endValue = end;
      const diff = endValue - startValue;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + diff * easeOut;

        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(endValue);
          onComplete?.();
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [hasStarted, start, end, duration, delay, onComplete]);

  const formatNumber = (num: number) => {
    return num.toFixed(decimals);
  };

  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}

interface GlitchTextProps {
  children: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  trigger?: 'hover' | 'scroll' | 'continuous';
  duration?: number;
}

export function GlitchText({
  children,
  className,
  intensity = 'medium',
  trigger = 'hover',
  duration = 300,
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = React.useState(trigger === 'continuous');
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (trigger === 'continuous') {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), duration);
      }, 3000);

      return () => clearInterval(interval);
    }

    if (trigger === 'scroll') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), duration);
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }
  }, [trigger, duration]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), duration);
    }
  };

  const getIntensityClasses = () => {
    const baseClasses = 'relative inline-block';
    
    if (!isGlitching) return baseClasses;

    switch (intensity) {
      case 'low':
        return cn(baseClasses, 'animate-pulse');
      case 'medium':
        return cn(
          baseClasses,
          'before:content-[attr(data-text)] before:absolute before:left-0 before:top-0 before:text-red-500 before:animate-bounce before:mix-blend-multiply',
          'after:content-[attr(data-text)] after:absolute after:left-0 after:top-0 after:text-blue-500 after:mix-blend-multiply after:animate-pulse'
        );
      case 'high':
        return cn(
          baseClasses,
          'animate-bounce',
          'before:content-[attr(data-text)] before:absolute before:left-1 before:-top-0.5 before:text-red-500 before:mix-blend-multiply before:animate-ping',
          'after:content-[attr(data-text)] after:absolute after:-left-1 after:top-0.5 after:text-blue-500 after:mix-blend-multiply after:animate-bounce'
        );
      default:
        return baseClasses;
    }
  };

  return (
    <span
      ref={ref}
      className={cn(getIntensityClasses(), className)}
      data-text={children}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </span>
  );
}

interface WaveTextProps {
  children: string;
  className?: string;
  delay?: number;
  amplitude?: number;
  frequency?: number;
}

export function WaveText({
  children,
  className,
  delay = 100,
  amplitude = 10,
  frequency = 1,
}: WaveTextProps) {
  const letters = children.split('');

  return (
    <span className={cn('inline-block', className)}>
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-block animate-bounce will-change-transform"
          style={{
            animationDelay: `${index * delay}ms`,
            animationDuration: `${1000 / frequency}ms`,
            transform: `translateY(${Math.sin(index * 0.5) * amplitude}px)`,
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  );
}