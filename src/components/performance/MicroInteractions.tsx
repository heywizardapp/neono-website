import * as React from 'react';
import { cn } from '@/lib/utils';

interface MicroInteractionsProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'lift' | 'scale' | 'glow' | 'bounce' | 'shimmer';
  disabled?: boolean;
}

export function MicroInteractions({ 
  children, 
  className, 
  variant = 'lift',
  disabled = false 
}: MicroInteractionsProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  const variants = {
    lift: 'transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md',
    scale: 'transform transition-all duration-200 hover:scale-105 active:scale-95',
    glow: 'transition-all duration-300 hover:shadow-glow hover:shadow-primary/25',
    bounce: 'transition-all duration-300 hover:animate-pulse active:scale-95',
    shimmer: 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:before:translate-x-full before:transition-transform before:duration-700'
  };

  return (
    <div
      className={cn(
        variants[variant],
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => !disabled && setIsPressed(false)}
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </div>
  );
}

// Enhanced button with micro-interactions
export function InteractiveButton({
  children,
  className,
  variant = 'default',
  size = 'default',
  disabled = false,
  onClick,
  ...props
}: any) {
  return (
    <MicroInteractions variant="lift" disabled={disabled}>
      <button
        className={cn(
          'relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md': variant === 'default',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'text-primary underline-offset-4 hover:underline': variant === 'link',
          },
          {
            'h-9 px-4 py-2 text-sm': size === 'default',
            'h-8 px-3 text-xs': size === 'sm',
            'h-11 px-8 text-base': size === 'lg',
          },
          className
        )}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    </MicroInteractions>
  );
}

// Animated card container
export function AnimatedCard({
  children,
  className,
  delay = 0,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  [key: string]: any;
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <MicroInteractions variant="lift">
      <div
        ref={cardRef}
        className={cn(
          'transition-all duration-700 ease-out',
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </MicroInteractions>
  );
}