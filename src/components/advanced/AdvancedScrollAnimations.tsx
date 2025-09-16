import { useEffect, useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/useInView';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  animation?: 'parallax' | 'reveal' | 'counter' | 'stagger' | 'magnetic';
  speed?: number;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export function ScrollAnimation({
  children,
  className,
  animation = 'reveal',
  speed = 0.5,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true
}: ScrollAnimationProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [isVisible, setIsVisible] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (inView && !isVisible) {
      setTimeout(() => setIsVisible(true), delay);
    }
  }, [inView, delay, isVisible]);

  useEffect(() => {
    if (animation === 'parallax') {
      const handleScroll = () => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const scrolled = window.pageYOffset;
          const rate = scrolled * speed;
          setOffset(rate);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [animation, speed]);

  const getAnimationClasses = () => {
    switch (animation) {
      case 'parallax':
        return 'will-change-transform';
      case 'reveal':
        return cn(
          'transition-all duration-1000 ease-out',
          isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-12 scale-95'
        );
      case 'magnetic':
        return 'transition-transform duration-300 ease-out hover:scale-105';
      default:
        return '';
    }
  };

  const style = animation === 'parallax' 
    ? { transform: `translateY(${offset}px)` }
    : {};

  return (
    <div
      ref={ref}
      className={cn(getAnimationClasses(), className)}
      style={style}
    >
      {children}
    </div>
  );
}

// Animated Counter Component
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView<HTMLSpanElement>();

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    const startCount = 0;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeOutExpo * (end - startCount) + startCount));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// Staggered Children Animation
interface StaggeredAnimationProps {
  children: ReactNode[];
  staggerDelay?: number;
  baseDelay?: number;
  className?: string;
}

export function StaggeredAnimation({
  children,
  staggerDelay = 100,
  baseDelay = 0,
  className
}: StaggeredAnimationProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!inView) return;

    children.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => new Set([...prev, index]));
      }, baseDelay + (index * staggerDelay));
    });
  }, [inView, children, staggerDelay, baseDelay]);

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            'transition-all duration-700 ease-out',
            visibleItems.has(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          )}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// Magnetic Effect Component
interface MagneticProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
}

export function Magnetic({ children, intensity = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * intensity;
    const deltaY = (e.clientY - centerY) * intensity;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={cn('will-change-transform transition-transform duration-300 ease-out', className)}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// Scroll Progress Indicator
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
      <div
        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}