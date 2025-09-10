import * as React from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { success, error as errorHaptic, warning } from '@/lib/haptics/taptic';

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
  className?: string;
}

export function Toast({
  id,
  title,
  description,
  variant = 'default',
  duration = 5000,
  persistent = false,
  action,
  onDismiss,
  className
}: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isPaused, setIsPaused] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const startTimeRef = React.useRef<number>();
  const remainingTimeRef = React.useRef<number>(duration);

  // Get icon for variant
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100';
      case 'error':
        return 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100';
      case 'info':
        return 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100';
      default:
        return 'border-border bg-background text-foreground';
    }
  };

  // Haptic feedback on show
  React.useEffect(() => {
    switch (variant) {
      case 'success':
        success();
        break;
      case 'error':
        errorHaptic();
        break;
      case 'warning':
        warning();
        break;
    }
  }, [variant]);

  // Auto dismiss logic
  const startTimer = React.useCallback(() => {
    if (persistent || remainingTimeRef.current <= 0) return;
    
    startTimeRef.current = Date.now();
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onDismiss?.(), 300); // Wait for exit animation
    }, remainingTimeRef.current);
  }, [persistent, onDismiss]);

  const pauseTimer = React.useCallback(() => {
    if (!timeoutRef.current || !startTimeRef.current) return;
    
    clearTimeout(timeoutRef.current);
    remainingTimeRef.current -= Date.now() - startTimeRef.current;
    setIsPaused(true);
  }, []);

  const resumeTimer = React.useCallback(() => {
    setIsPaused(false);
    startTimer();
  }, [startTimer]);

  // Start initial timer
  React.useEffect(() => {
    startTimer();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [startTimer]);

  // Handle manual dismiss
  const handleDismiss = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
    setTimeout(() => onDismiss?.(), 300);
  };

  // Handle action click
  const handleAction = () => {
    action?.onClick();
    handleDismiss();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        'group pointer-events-auto relative flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg transition-all',
        'animate-in slide-in-from-right-full',
        !isVisible && 'animate-out slide-out-to-right-full',
        getVariantStyles(),
        className
      )}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
      onFocus={pauseTimer}
      onBlur={resumeTimer}
    >
      {/* Icon */}
      {getIcon() && (
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-semibold text-sm leading-5">
            {title}
          </div>
        )}
        {description && (
          <div className={cn(
            'text-sm leading-5',
            title ? 'mt-1 opacity-90' : ''
          )}>
            {description}
          </div>
        )}
        
        {/* Action button */}
        {action && (
          <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAction}
              className="h-8 px-3 text-xs"
            >
              {action.label}
            </Button>
          </div>
        )}
      </div>

      {/* Progress bar */}
      {!persistent && duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 rounded-b-lg overflow-hidden">
          <div
            className={cn(
              'h-full bg-current opacity-30 transition-all ease-linear',
              isPaused && 'transition-none'
            )}
            style={{
              width: '100%',
              animationName: isPaused ? 'none' : 'toast-progress',
              animationDuration: `${remainingTimeRef.current}ms`,
              animationTimingFunction: 'linear',
              animationFillMode: 'forwards'
            }}
          />
        </div>
      )}

      {/* Dismiss button */}
      <Button
        variant="ghost"
        size="sm"
        className="flex-shrink-0 h-6 w-6 p-0 opacity-70 hover:opacity-100"
        onClick={handleDismiss}
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </Button>

      <style>{`
        @keyframes toast-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}

// Toast container/provider
interface ToastContainerProps {
  toasts: ToastProps[];
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxToasts?: number;
  className?: string;
}

export function ToastContainer({
  toasts,
  position = 'top-right',
  maxToasts = 5,
  className
}: ToastContainerProps) {
  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 -translate-x-1/2';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  const displayedToasts = toasts.slice(0, maxToasts);

  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none',
        getPositionStyles(),
        className
      )}
    >
      {displayedToasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
      
      {toasts.length > maxToasts && (
        <div className="text-center text-sm text-muted-foreground bg-background/80 backdrop-blur-sm rounded-lg p-2 border pointer-events-auto">
          +{toasts.length - maxToasts} more notifications
        </div>
      )}
    </div>
  );
}

// Hook for managing toast state
export function useToasts() {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastProps, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastProps = {
      ...toast,
      id,
      onDismiss: () => {
        setToasts(prev => prev.filter(t => t.id !== id));
        toast.onDismiss?.();
      }
    };
    
    setToasts(prev => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearAllToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = React.useCallback((message: string, options?: Partial<ToastProps>) => {
    return addToast({ variant: 'success', description: message, ...options });
  }, [addToast]);

  const error = React.useCallback((message: string, options?: Partial<ToastProps>) => {
    return addToast({ variant: 'error', description: message, ...options });
  }, [addToast]);

  const warning = React.useCallback((message: string, options?: Partial<ToastProps>) => {
    return addToast({ variant: 'warning', description: message, ...options });
  }, [addToast]);

  const info = React.useCallback((message: string, options?: Partial<ToastProps>) => {
    return addToast({ variant: 'info', description: message, ...options });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info
  };
}