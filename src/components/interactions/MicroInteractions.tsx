import * as React from "react";
import { cn } from '@/lib/utils';

interface MicroInteractionsProps {
  children: ReactNode;
  variant?: 'lift' | 'scale' | 'glow' | 'bounce' | 'tilt' | 'pulse';
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
  disabled?: boolean;
}

export function MicroInteractions({ 
  children, 
  variant = 'lift', 
  intensity = 'medium',
  className,
  disabled = false 
}: MicroInteractionsProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  const getIntensityValues = (base: number) => {
    switch (intensity) {
      case 'subtle': return base * 0.5;
      case 'strong': return base * 1.5;
      default: return base;
    }
  };

  const getVariantClasses = () => {
    if (disabled) return '';

    const liftAmount = getIntensityValues(8);
    const scaleAmount = getIntensityValues(1.05);
    
    switch (variant) {
      case 'lift':
        return cn(
          'transition-all duration-300 ease-out',
          isHovered && `-translate-y-${Math.round(liftAmount)}px shadow-medium`,
          isPressed && 'scale-95'
        );
      
      case 'scale':
        return cn(
          'transition-transform duration-200 ease-out',
          isHovered && `scale-${scaleAmount.toFixed(2).replace('.', '')}`,
          isPressed && 'scale-95'
        );
      
      case 'glow':
        return cn(
          'transition-all duration-300 ease-out',
          isHovered && 'shadow-glow',
          isPressed && 'scale-98'
        );
      
      case 'bounce':
        return cn(
          'transition-all duration-300 ease-out',
          isHovered && 'animate-bounce',
          isPressed && 'scale-95'
        );
      
      case 'tilt':
        return cn(
          'transition-transform duration-300 ease-out',
          isHovered && 'rotate-1 scale-105',
          isPressed && 'rotate-0 scale-95'
        );
      
      case 'pulse':
        return cn(
          'transition-all duration-300 ease-out',
          isHovered && 'animate-pulse scale-105',
          isPressed && 'scale-95'
        );
      
      default:
        return '';
    }
  };

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      className={cn(getVariantClasses(), className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {children}
    </div>
  );
}

// Specialized hover cards for different use cases
interface HoverCardProps {
  children: ReactNode;
  effect?: 'lift' | 'scale' | 'glow' | 'tilt';
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

export function HoverCard({ 
  children, 
  effect = 'lift',
  intensity = 'medium',
  className 
}: HoverCardProps) {
  return (
    <MicroInteractions variant={effect} intensity={intensity} className={className}>
      {children}
    </MicroInteractions>
  );
}

// Button interaction wrapper
interface InteractiveButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function InteractiveButton({ 
  children, 
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false 
}: InteractiveButtonProps) {
  const [isPressed, setIsPressed] = React.useState(false);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-4 py-2 text-sm';
      case 'lg': return 'px-8 py-4 text-lg';
      default: return 'px-6 py-3 text-base';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft hover:shadow-medium';
      case 'secondary':
        return 'bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border';
      case 'ghost':
        return 'hover:bg-accent/50 text-foreground';
      default:
        return '';
    }
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-ring',
        'active:scale-95 hover:-translate-y-1',
        getSizeClasses(),
        getVariantClasses(),
        isPressed && 'scale-95 translate-y-0',
        disabled && 'opacity-50 cursor-not-allowed hover:translate-y-0 active:scale-100',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {children}
    </button>
  );
}

// Loading button with micro-interactions
interface LoadingButtonProps extends InteractiveButtonProps {
  loading?: boolean;
  loadingText?: string;
}

export function LoadingButton({ 
  children, 
  loading = false,
  loadingText = 'Loading...',
  disabled,
  ...props 
}: LoadingButtonProps) {
  return (
    <InteractiveButton 
      {...props}
      disabled={loading || disabled}
      className={cn(props.className, loading && 'cursor-wait')}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </InteractiveButton>
  );
}

// Pulsing dot component
interface PulsingDotProps {
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PulsingDot({ className, color = 'bg-primary', size = 'md' }: PulsingDotProps) {
  const sizeClasses = { sm: 'h-2 w-2', md: 'h-3 w-3', lg: 'h-4 w-4' };
  return (
    <div className={cn('relative inline-flex', className)}>
      <div className={cn('rounded-full animate-pulse', color, sizeClasses[size])} />
    </div>
  );
}