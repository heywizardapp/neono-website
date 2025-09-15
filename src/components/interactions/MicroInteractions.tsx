import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface InteractiveButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'bounce' | 'scale' | 'rotate' | 'glow' | 'ripple';
  intensity?: 'subtle' | 'medium' | 'strong';
  onClick?: () => void;
  disabled?: boolean;
}

export function InteractiveButton({
  children,
  className,
  variant = 'scale',
  intensity = 'medium',
  onClick,
  disabled = false,
}: InteractiveButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const getVariantClasses = () => {
    const intensityMap = {
      subtle: { scale: 'active:scale-98', bounce: 'active:translate-y-0.5', rotate: 'active:rotate-1', glow: 'active:shadow-sm' },
      medium: { scale: 'active:scale-95', bounce: 'active:translate-y-1', rotate: 'active:rotate-2', glow: 'active:shadow-md' },
      strong: { scale: 'active:scale-90', bounce: 'active:translate-y-2', rotate: 'active:rotate-3', glow: 'active:shadow-lg' },
    };

    const baseClasses = {
      bounce: 'hover:-translate-y-1 transition-all duration-200 ease-out',
      scale: 'hover:scale-105 transition-transform duration-200 ease-out',
      rotate: 'hover:rotate-1 transition-transform duration-200 ease-out',
      glow: 'hover:shadow-glow transition-all duration-300 ease-out',
      ripple: 'relative overflow-hidden transition-all duration-200 ease-out',
    };

    return cn(
      baseClasses[variant],
      intensityMap[intensity][variant as keyof typeof intensityMap.medium],
      'will-change-transform gpu-accelerated'
    );
  };

  return (
    <button
      className={cn(
        getVariantClasses(),
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      disabled={disabled}
    >
      {children}
      {variant === 'ripple' && isPressed && (
        <span className="absolute inset-0 bg-white/20 animate-ping rounded-inherit" />
      )}
    </button>
  );
}

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  effect?: 'lift' | 'tilt' | 'glow' | 'border';
  intensity?: 'subtle' | 'medium' | 'strong';
}

export function HoverCard({
  children,
  className,
  effect = 'lift',
  intensity = 'medium',
}: HoverCardProps) {
  const getEffectClasses = () => {
    const intensityMap = {
      subtle: {
        lift: 'hover:-translate-y-1 hover:shadow-md',
        tilt: 'hover:rotate-1 hover:-translate-y-0.5',
        glow: 'hover:shadow-glow/30',
        border: 'hover:border-primary/50',
      },
      medium: {
        lift: 'hover:-translate-y-2 hover:shadow-lg',
        tilt: 'hover:rotate-2 hover:-translate-y-1',
        glow: 'hover:shadow-glow/50',
        border: 'hover:border-primary',
      },
      strong: {
        lift: 'hover:-translate-y-4 hover:shadow-xl',
        tilt: 'hover:rotate-3 hover:-translate-y-2',
        glow: 'hover:shadow-glow',
        border: 'hover:border-primary hover:shadow-md',
      },
    };

    return cn(
      'transition-all duration-300 ease-out will-change-transform gpu-accelerated',
      intensityMap[intensity][effect]
    );
  };

  return (
    <div className={cn(getEffectClasses(), className)}>
      {children}
    </div>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
}

export function FloatingElement({
  children,
  className,
  direction = 'up',
  distance = 10,
  duration = 3000,
}: FloatingElementProps) {
  const getAnimationClasses = () => {
    const directionMap = {
      up: `animate-[float-up_${duration}ms_ease-in-out_infinite]`,
      down: `animate-[float-down_${duration}ms_ease-in-out_infinite]`,
      left: `animate-[float-left_${duration}ms_ease-in-out_infinite]`,
      right: `animate-[float-right_${duration}ms_ease-in-out_infinite]`,
    };

    return directionMap[direction];
  };

  return (
    <div
      className={cn(getAnimationClasses(), 'will-change-transform', className)}
      style={{
        '--float-distance': `${distance}px`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

interface PulsingDotProps {
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  intensity?: 'subtle' | 'medium' | 'strong';
}

export function PulsingDot({
  className,
  color = 'bg-primary',
  size = 'md',
  intensity = 'medium',
}: PulsingDotProps) {
  const sizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
  };

  const intensityClasses = {
    subtle: 'animate-pulse',
    medium: 'animate-bounce-subtle',
    strong: 'animate-glow',
  };

  return (
    <div className={cn('relative inline-flex', className)}>
      <div className={cn('rounded-full', color, sizeClasses[size], intensityClasses[intensity])} />
      <div className={cn('absolute inset-0 rounded-full animate-ping opacity-75', color, sizeClasses[size])} />
    </div>
  );
}

// Utility component for adding press feedback to any element
interface PressableProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  onPress?: () => void;
}

export function Pressable({
  children,
  className,
  scale = 0.95,
  onPress,
}: PressableProps) {
  return (
    <div
      className={cn(
        'cursor-pointer transition-transform duration-100 ease-out active:scale-95 will-change-transform',
        className
      )}
      style={{
        '--press-scale': scale,
      } as React.CSSProperties}
      onMouseDown={onPress}
    >
      {children}
    </div>
  );
}