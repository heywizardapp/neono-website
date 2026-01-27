import * as React from "react";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// Enhanced Button with advanced interactions
interface EnhancedButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'magnetic' | 'warm';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  ripple?: boolean;
  glow?: boolean;
  magnetic?: boolean;
}

export function EnhancedButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
  ripple = true,
  glow = false,
  magnetic = false
}: EnhancedButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);
  const [magneticOffset, setMagneticOffset] = React.useState({ x: 0, y: 0 });
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const rippleId = React.useRef(0);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;

    // Ripple effect
    if (ripple && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: rippleId.current++, x, y };
      
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    }

    // Handle async onClick
    if (onClick) {
      try {
        setIsLoading(true);
        await onClick();
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    
    setMagneticOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    if (magnetic) {
      setMagneticOffset({ x: 0, y: 0 });
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return cn(
          'bg-gradient-hero text-white shadow-medium hover:shadow-glow',
          'border border-primary/20 hover:border-primary/40',
          glow && 'shadow-glow-strong'
        );
      case 'secondary':
        return 'bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border';
      case 'ghost':
        return 'hover:bg-accent/10 text-foreground border border-transparent hover:border-border/40';
      case 'magnetic':
        return cn(
          'bg-gradient-to-r from-primary to-accent text-white shadow-medium',
          'hover:shadow-glow transform-gpu hover:scale-105 transition-all duration-300'
        );
      case 'warm':
        return cn(
          'bg-warm-accent text-white shadow-medium hover:shadow-glow',
          'border border-warm-accent/20 hover:border-warm-accent/40',
          glow && 'shadow-glow-strong'
        );
      default:
        return '';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-4 py-2 text-sm h-9';
      case 'lg': return 'px-8 py-4 text-lg h-12';
      default: return 'px-6 py-3 text-base h-10';
    }
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        'relative inline-flex items-center justify-center rounded-2xl font-semibold',
        'transition-all duration-300 ease-out focus-ring overflow-hidden',
        'active:scale-95 will-change-transform',
        getSizeClasses(),
        getVariantClasses(),
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      style={{
        transform: `translate3d(${magneticOffset.x}px, ${magneticOffset.y}px, 0)`
      }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || isLoading}
    >
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <span className="block w-0 h-0 rounded-full bg-white/30 animate-ping" 
                style={{ animationDuration: '600ms' }} />
        </span>
      ))}
      
      {/* Content */}
      <span className="relative flex items-center gap-2">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </span>
    </button>
  );
}

// Floating Action Button
interface FloatingButtonProps {
  children: ReactNode;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
  onClick?: () => void;
}

export function FloatingButton({ 
  children, 
  position = 'bottom-right',
  className,
  onClick 
}: FloatingButtonProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right': return 'bottom-8 right-8';
      case 'bottom-left': return 'bottom-8 left-8';
      case 'top-right': return 'top-8 right-8';
      case 'top-left': return 'top-8 left-8';
    }
  };

  return (
    <button
      className={cn(
        'fixed z-50 w-14 h-14 rounded-full bg-gradient-hero text-white shadow-glow',
        'flex items-center justify-center transition-all duration-300 ease-out',
        'hover:scale-110 hover:shadow-glow-strong active:scale-95',
        'transform-gpu will-change-transform',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        getPositionClasses(),
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Interactive Card with advanced hover effects
interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: boolean;
  lift?: boolean;
  spotlight?: boolean;
}

export function InteractiveCard({ 
  children, 
  className,
  tilt = false,
  glow = false,
  lift = true,
  spotlight = false
}: InteractiveCardProps) {
  const [transform, setTransform] = React.useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (spotlight) {
      setPosition({ x, y });
      setOpacity(1);
    }

    if (tilt) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateY = ((e.clientX - centerX) / rect.width) * 20;
      const rotateX = ((centerY - e.clientY) / rect.height) * 20;
      setTransform({ rotateX, rotateY, scale: 1.02 });
    }
  };

  const handleMouseLeave = () => {
    if (spotlight) {
      setOpacity(0);
    }
    if (tilt) {
      setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border/40 bg-card',
        'transition-all duration-300 ease-out transform-gpu will-change-transform',
        lift && 'hover:-translate-y-2 hover:shadow-large',
        glow && 'hover:shadow-glow',
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      {/* Spotlight Effect */}
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(124, 124, 242, 0.15), transparent 40%)`,
          }}
        />
      )}
      
      {children}
    </div>
  );
}

// Loading Dots Animation
export function LoadingDots() {
  return (
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

// Pulse Ring Effect
interface PulseRingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PulseRing({ className, size = 'md' }: PulseRingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className={cn('relative inline-flex', className)}>
      <div className={cn('rounded-full bg-primary', sizeClasses[size])} />
      <div className={cn(
        'absolute inset-0 rounded-full border-2 border-primary',
        'animate-ping opacity-75',
        sizeClasses[size]
      )} />
    </div>
  );
}