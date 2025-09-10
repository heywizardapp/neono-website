import * as React from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { success, impact } from '@/lib/haptics/taptic';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  resistance?: number;
  className?: string;
  disabled?: boolean;
  refreshingText?: string;
  pullText?: string;
  releaseText?: string;
}

export function PullToRefresh({
  children,
  onRefresh,
  threshold = 80,
  resistance = 2.5,
  className,
  disabled = false,
  refreshingText = 'Refreshing...',
  pullText = 'Pull to refresh',
  releaseText = 'Release to refresh'
}: PullToRefreshProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [pullDistance, setPullDistance] = React.useState(0);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [canPull, setCanPull] = React.useState(false);
  const [startY, setStartY] = React.useState(0);
  const [isPulling, setIsPulling] = React.useState(false);
  const [hasTriggeredHaptic, setHasTriggeredHaptic] = React.useState(false);

  // Check if we can start pulling (at top of scroll)
  const checkCanPull = React.useCallback(() => {
    if (!containerRef.current || disabled || isRefreshing) return false;
    return containerRef.current.scrollTop === 0;
  }, [disabled, isRefreshing]);

  // Handle touch start
  const handleTouchStart = React.useCallback((e: TouchEvent) => {
    if (!checkCanPull()) return;
    
    setCanPull(true);
    setStartY(e.touches[0].clientY);
    setHasTriggeredHaptic(false);
  }, [checkCanPull]);

  // Handle touch move
  const handleTouchMove = React.useCallback((e: TouchEvent) => {
    if (!canPull || !containerRef.current) return;

    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    // Only handle downward pulls when at top
    if (deltaY > 0 && containerRef.current.scrollTop === 0) {
      e.preventDefault(); // Prevent default scroll behavior
      
      // Apply resistance curve
      const distance = Math.min(deltaY / resistance, threshold * 1.5);
      setPullDistance(distance);
      setIsPulling(true);

      // Haptic feedback when threshold is reached
      if (distance >= threshold && !hasTriggeredHaptic) {
        impact();
        setHasTriggeredHaptic(true);
      }
    } else {
      // Reset if scrolling up or not at top
      setPullDistance(0);
      setIsPulling(false);
      setCanPull(false);
    }
  }, [canPull, startY, resistance, threshold, hasTriggeredHaptic]);

  // Handle touch end
  const handleTouchEnd = React.useCallback(async () => {
    if (!isPulling) {
      setCanPull(false);
      return;
    }

    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      success(); // Success haptic for refresh trigger
      
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
      }
    }

    // Reset state
    setPullDistance(0);
    setIsPulling(false);
    setCanPull(false);
    setHasTriggeredHaptic(false);
  }, [isPulling, pullDistance, threshold, isRefreshing, onRefresh]);

  // Add event listeners
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Get refresh status text
  const getStatusText = () => {
    if (isRefreshing) return refreshingText;
    if (pullDistance >= threshold) return releaseText;
    return pullText;
  };

  // Get rotation angle for refresh icon
  const getIconRotation = () => {
    if (isRefreshing) return 360;
    return (pullDistance / threshold) * 180;
  };

  // Get opacity for pull indicator
  const getIndicatorOpacity = () => {
    return Math.min(pullDistance / (threshold * 0.5), 1);
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Pull indicator */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 z-10',
          'flex items-center justify-center',
          'bg-background/95 backdrop-blur-sm border-b border-border',
          'transition-all duration-200 ease-out',
          'text-sm text-muted-foreground'
        )}
        style={{
          height: Math.max(0, pullDistance),
          opacity: getIndicatorOpacity(),
          transform: `translateY(${pullDistance - threshold}px)`
        }}
      >
        <div className="flex items-center gap-2">
          <RefreshCw
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              isRefreshing && 'animate-spin'
            )}
            style={{
              transform: `rotate(${getIconRotation()}deg)`
            }}
          />
          <span>{getStatusText()}</span>
        </div>
      </div>

      {/* Main content */}
      <div
        ref={containerRef}
        className={cn(
          'relative h-full overflow-auto',
          'transition-transform duration-200 ease-out'
        )}
        style={{
          transform: `translateY(${Math.max(0, pullDistance)}px)`
        }}
      >
        {children}
      </div>

      {/* Loading overlay when refreshing */}
      {isRefreshing && (
        <div className="absolute inset-0 z-20 bg-background/50 backdrop-blur-sm flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>{refreshingText}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Hook for programmatic refresh control
export function usePullToRefresh() {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const refresh = React.useCallback(async (refreshFn: () => Promise<void> | void) => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      await refreshFn();
      success(); // Haptic feedback on success
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing]);

  return {
    isRefreshing,
    refresh
  };
}