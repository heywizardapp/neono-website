import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';
import { impact } from '@/lib/haptics/taptic';

interface FABProps extends Omit<ButtonProps, 'size'> {
  size?: 'default' | 'sm' | 'lg';
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  extended?: boolean;
  icon?: React.ReactNode;
  label?: string;
  hideOnScroll?: boolean;
  offset?: {
    bottom?: number;
    right?: number;
    left?: number;
  };
}

export function FAB({
  size = 'default',
  position = 'bottom-right',
  extended = false,
  icon,
  label,
  hideOnScroll = false,
  offset = {},
  className,
  onClick,
  children,
  ...props
}: FABProps) {
  const [isHidden, setIsHidden] = React.useState(false);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  // Handle scroll hiding
  React.useEffect(() => {
    if (!hideOnScroll) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY && currentScrollY > 100;
      
      setIsHidden(isScrollingDown);
      setLastScrollY(currentScrollY);
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [hideOnScroll, lastScrollY]);

  // Handle click with haptic feedback
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    impact(); // Haptic feedback
    onClick?.(e);
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return extended ? 'h-12 px-4' : 'h-12 w-12';
      case 'lg':
        return extended ? 'h-16 px-6' : 'h-16 w-16';
      default:
        return extended ? 'h-14 px-5' : 'h-14 w-14';
    }
  };

  // Get position classes
  const getPositionClasses = () => {
    const { bottom = 24, right = 24, left = 24 } = offset;
    
    switch (position) {
      case 'bottom-left':
        return `bottom-[${bottom}px] left-[${left}px]`;
      case 'bottom-center':
        return `bottom-[${bottom}px] left-1/2 -translate-x-1/2`;
      default:
        return `bottom-[${bottom}px] right-[${right}px]`;
    }
  };

  // Get icon size classes
  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4';
      case 'lg':
        return 'h-6 w-6';
      default:
        return 'h-5 w-5';
    }
  };

  return (
    <Button
      className={cn(
        'fixed z-50 shadow-lg hover:shadow-xl',
        'transition-all duration-300 ease-out',
        'touch-feedback no-zoom', // Mobile optimizations
        getSizeClasses(),
        getPositionClasses(),
        extended ? 'rounded-full' : 'rounded-full',
        isHidden && 'translate-y-20 opacity-0',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {extended ? (
        <div className="flex items-center gap-2">
          {icon && <span className={getIconSize()}>{icon}</span>}
          {label && <span className="font-medium">{label}</span>}
          {children}
        </div>
      ) : (
        <>
          {icon && <span className={getIconSize()}>{icon}</span>}
          {children}
        </>
      )}
    </Button>
  );
}

// Extended FAB variant
export function ExtendedFAB(props: Omit<FABProps, 'extended'>) {
  return <FAB {...props} extended={true} />;
}

// Mini FAB variant
export function MiniFAB(props: Omit<FABProps, 'size'>) {
  return <FAB {...props} size="sm" />;
}

// FAB Group for multiple related actions
interface FABGroupProps {
  children: React.ReactNode;
  position?: FABProps['position'];
  direction?: 'up' | 'down' | 'left' | 'right';
  spacing?: number;
  className?: string;
}

export function FABGroup({
  children,
  position = 'bottom-right',
  direction = 'up',
  spacing = 16,
  className
}: FABGroupProps) {
  const getGroupLayout = () => {
    switch (direction) {
      case 'up':
        return 'flex-col-reverse';
      case 'down':
        return 'flex-col';
      case 'left':
        return 'flex-row-reverse';
      case 'right':
        return 'flex-row';
      default:
        return 'flex-col-reverse';
    }
  };

  const getSpacingClass = () => {
    if (direction === 'up' || direction === 'down') {
      return `space-y-${spacing === 16 ? '4' : spacing === 12 ? '3' : '2'}`;
    } else {
      return `space-x-${spacing === 16 ? '4' : spacing === 12 ? '3' : '2'}`;
    }
  };

  return (
    <div
      className={cn(
        'fixed z-40 flex',
        getGroupLayout(),
        getSpacingClass(),
        position === 'bottom-right' && 'bottom-6 right-6',
        position === 'bottom-left' && 'bottom-6 left-6',
        position === 'bottom-center' && 'bottom-6 left-1/2 -translate-x-1/2',
        className
      )}
    >
      {children}
    </div>
  );
}

// Speed Dial FAB - reveals multiple actions on click
interface SpeedDialFABProps extends Omit<FABProps, 'onClick'> {
  actions: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    disabled?: boolean;
  }>;
  closeOnAction?: boolean;
}

export function SpeedDialFAB({
  actions,
  closeOnAction = true,
  icon,
  className,
  ...props
}: SpeedDialFABProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleMainClick = () => {
    setIsOpen(!isOpen);
    impact();
  };

  const handleActionClick = (action: SpeedDialFABProps['actions'][0]) => {
    action.onClick();
    if (closeOnAction) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Action buttons */}
      {isOpen && (
        <div className="fixed z-50 bottom-20 right-6 flex flex-col-reverse space-y-3 space-y-reverse">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center justify-end space-x-3 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="bg-background text-foreground px-3 py-1 rounded-full text-sm font-medium shadow-md">
                {action.label}
              </span>
              <Button
                size="sm"
                variant="secondary"
                disabled={action.disabled}
                className="h-10 w-10 rounded-full shadow-md"
                onClick={() => handleActionClick(action)}
              >
                {action.icon}
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <FAB
        {...props}
        icon={icon}
        onClick={handleMainClick}
        className={cn(
          'transition-transform duration-200',
          isOpen && 'rotate-45',
          className
        )}
      />
    </>
  );
}

// Utility function for throttling
function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}