import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { impact, tick } from '@/lib/haptics/taptic';

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  snapPoints?: number[]; // Array of snap points as percentages (0-1)
  defaultSnapPoint?: number; // Index of default snap point
  title?: string;
  description?: string;
  className?: string;
  overlayClassName?: string;
  showDragHandle?: boolean;
  modal?: boolean;
  onSnapPointChange?: (snapPoint: number) => void;
}

export function BottomSheet({
  open,
  onOpenChange,
  children,
  snapPoints = [0.25, 0.6, 0.95],
  defaultSnapPoint = 1,
  title,
  description,
  className,
  overlayClassName,
  showDragHandle = true,
  modal = true,
  onSnapPointChange
}: BottomSheetProps) {
  const sheetRef = React.useRef<HTMLDivElement>(null);
  const [currentSnapPoint, setCurrentSnapPoint] = React.useState(defaultSnapPoint);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startY, setStartY] = React.useState(0);
  const [startHeight, setStartHeight] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  // Focus management
  const previouslyFocusedElementRef = React.useRef<HTMLElement | null>(null);
  const firstFocusableElementRef = React.useRef<HTMLElement | null>(null);

  // Get current height based on snap point
  const getCurrentHeight = React.useCallback(() => {
    return snapPoints[currentSnapPoint] * window.innerHeight;
  }, [snapPoints, currentSnapPoint]);

  // Handle snap point changes
  const snapToPoint = React.useCallback((pointIndex: number) => {
    if (pointIndex < 0 || pointIndex >= snapPoints.length) return;
    
    setCurrentSnapPoint(pointIndex);
    setIsAnimating(true);
    
    if (sheetRef.current) {
      const height = snapPoints[pointIndex] * window.innerHeight;
      sheetRef.current.style.height = `${height}px`;
      sheetRef.current.style.transform = `translateY(${window.innerHeight - height}px)`;
    }
    
    tick(); // Haptic feedback
    onSnapPointChange?.(pointIndex);
    
    // Reset animation flag after transition
    setTimeout(() => setIsAnimating(false), 300);
  }, [snapPoints, onSnapPointChange]);

  // Handle drag start
  const handleDragStart = React.useCallback((clientY: number) => {
    if (!sheetRef.current) return;
    
    setIsDragging(true);
    setStartY(clientY);
    setStartHeight(getCurrentHeight());
    
    // Disable transitions during drag
    sheetRef.current.style.transition = 'none';
  }, [getCurrentHeight]);

  // Handle drag move
  const handleDragMove = React.useCallback((clientY: number) => {
    if (!isDragging || !sheetRef.current) return;
    
    const deltaY = startY - clientY;
    const newHeight = Math.max(0, Math.min(window.innerHeight, startHeight + deltaY));
    
    sheetRef.current.style.height = `${newHeight}px`;
    sheetRef.current.style.transform = `translateY(${window.innerHeight - newHeight}px)`;
  }, [isDragging, startY, startHeight]);

  // Handle drag end
  const handleDragEnd = React.useCallback(() => {
    if (!isDragging || !sheetRef.current) return;
    
    setIsDragging(false);
    
    // Re-enable transitions
    sheetRef.current.style.transition = '';
    
    // Find closest snap point
    const currentHeight = parseFloat(sheetRef.current.style.height) || getCurrentHeight();
    const currentPercentage = currentHeight / window.innerHeight;
    
    let closestPointIndex = 0;
    let minDistance = Math.abs(snapPoints[0] - currentPercentage);
    
    snapPoints.forEach((point, index) => {
      const distance = Math.abs(point - currentPercentage);
      if (distance < minDistance) {
        minDistance = distance;
        closestPointIndex = index;
      }
    });
    
    // If dragged down significantly, close the sheet
    if (currentPercentage < snapPoints[0] * 0.7) {
      onOpenChange(false);
      return;
    }
    
    snapToPoint(closestPointIndex);
    impact(); // Haptic feedback for snap
  }, [isDragging, getCurrentHeight, snapPoints, onOpenChange, snapToPoint]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientY);
  };

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    handleDragMove(e.clientY);
  }, [handleDragMove]);

  const handleMouseUp = React.useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = React.useCallback((e: TouchEvent) => {
    e.preventDefault();
    handleDragMove(e.touches[0].clientY);
  }, [handleDragMove]);

  const handleTouchEnd = React.useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Add global event listeners for drag
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Focus management
  React.useEffect(() => {
    if (open) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
      
      // Focus first focusable element after animation
      setTimeout(() => {
        const firstFocusable = sheetRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        
        if (firstFocusable) {
          firstFocusable.focus();
          firstFocusableElementRef.current = firstFocusable;
        }
      }, 300);
    } else {
      // Return focus to previously focused element
      if (previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus();
      }
    }
  }, [open]);

  // Keyboard handling
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onOpenChange(false);
          break;
        case 'ArrowUp':
          if (e.altKey) {
            e.preventDefault();
            const nextPoint = Math.min(currentSnapPoint + 1, snapPoints.length - 1);
            snapToPoint(nextPoint);
          }
          break;
        case 'ArrowDown':
          if (e.altKey) {
            e.preventDefault();
            const prevPoint = Math.max(currentSnapPoint - 1, 0);
            if (prevPoint === 0 && currentSnapPoint === 0) {
              onOpenChange(false);
            } else {
              snapToPoint(prevPoint);
            }
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, currentSnapPoint, snapPoints.length, onOpenChange, snapToPoint]);

  // Initialize position when opened
  React.useEffect(() => {
    if (open && sheetRef.current) {
      const height = getCurrentHeight();
      sheetRef.current.style.height = `${height}px`;
      sheetRef.current.style.transform = `translateY(${window.innerHeight - height}px)`;
    }
  }, [open, getCurrentHeight]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      {modal && (
        <div
          className={cn(
            'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm',
            'animate-in fade-in-0',
            overlayClassName
          )}
          onClick={() => onOpenChange(false)}
          aria-hidden="true"
        />
      )}

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal={modal}
        aria-labelledby={title ? 'bottom-sheet-title' : undefined}
        aria-describedby={description ? 'bottom-sheet-description' : undefined}
        className={cn(
          'fixed left-0 right-0 bottom-0 z-50',
          'bg-background border-t border-border rounded-t-3xl',
          'shadow-2xl will-change-transform',
          'touch-none', // Prevent default touch behaviors
          !isDragging && !isAnimating && 'transition-all duration-300 ease-out',
          className
        )}
        style={{
          height: `${getCurrentHeight()}px`,
          transform: `translateY(${window.innerHeight - getCurrentHeight()}px)`
        }}
      >
        {/* Drag Handle */}
        {showDragHandle && (
          <div
            className="flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="w-12 h-1.5 bg-muted-foreground rounded-full opacity-40" />
          </div>
        )}

        {/* Header */}
        {(title || description) && (
          <div className="px-6 pb-4">
            {title && (
              <h2 id="bottom-sheet-title" className="text-lg font-semibold">
                {title}
              </h2>
            )}
            {description && (
              <p id="bottom-sheet-description" className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 w-8 h-8 p-0"
          onClick={() => onOpenChange(false)}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Content */}
        <div className="flex-1 overflow-auto px-6 pb-6 safe-bottom">
          {children}
        </div>
      </div>
    </>
  );
}