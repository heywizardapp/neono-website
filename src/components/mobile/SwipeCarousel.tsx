import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { selection } from '@/lib/haptics/taptic';

interface SwipeCarouselProps {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  showNavigation?: boolean;
  showIndicators?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  onSlideChange?: (index: number) => void;
  initialSlide?: number;
  spaceBetween?: number;
  slidesPerView?: number | 'auto';
  centeredSlides?: boolean;
  ariaLabel?: string;
}

export function SwipeCarousel({
  children,
  className,
  itemClassName,
  showNavigation = true,
  showIndicators = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  loop = true,
  onSlideChange,
  initialSlide = 0,
  spaceBetween = 16,
  slidesPerView = 1,
  centeredSlides = false,
  ariaLabel = 'Carousel'
}: SwipeCarouselProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = React.useState(initialSlide);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [translateX, setTranslateX] = React.useState(0);
  const [draggedDistance, setDraggedDistance] = React.useState(0);
  const autoPlayRef = React.useRef<NodeJS.Timeout>();

  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;
  
  // Calculate slide width
  const getSlideWidth = React.useCallback(() => {
    if (!containerRef.current) return 0;
    const containerWidth = containerRef.current.offsetWidth;
    
    if (slidesPerView === 'auto') {
      return containerWidth; // Let CSS handle auto sizing
    }
    
    const visibleSlides = typeof slidesPerView === 'number' ? slidesPerView : 1;
    const totalSpacing = spaceBetween * (visibleSlides - 1);
    return (containerWidth - totalSpacing) / visibleSlides;
  }, [slidesPerView, spaceBetween]);

  // Get transform value for current slide
  const getTransformValue = React.useCallback((slideIndex: number, dragOffset = 0) => {
    const slideWidth = getSlideWidth();
    const baseTransform = -(slideIndex * (slideWidth + spaceBetween));
    return baseTransform + dragOffset;
  }, [getSlideWidth, spaceBetween]);

  // Navigate to specific slide
  const goToSlide = React.useCallback((index: number) => {
    if (index < 0 || index >= totalSlides) return;
    
    setCurrentSlide(index);
    setTranslateX(getTransformValue(index));
    onSlideChange?.(index);
    selection(); // Haptic feedback
  }, [totalSlides, getTransformValue, onSlideChange]);

  // Navigate to next slide
  const nextSlide = React.useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    } else if (loop) {
      goToSlide(0);
    }
  }, [currentSlide, totalSlides, loop, goToSlide]);

  // Navigate to previous slide
  const previousSlide = React.useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    } else if (loop) {
      goToSlide(totalSlides - 1);
    }
  }, [currentSlide, totalSlides, loop, goToSlide]);

  // Auto play functionality
  React.useEffect(() => {
    if (autoPlay && !isDragging) {
      autoPlayRef.current = setInterval(nextSlide, autoPlayInterval);
      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [autoPlay, autoPlayInterval, nextSlide, isDragging]);

  // Drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setDraggedDistance(0);
    
    // Stop autoplay during drag
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    
    const currentX = clientX;
    const diff = currentX - startX;
    setDraggedDistance(diff);
    setTranslateX(getTransformValue(currentSlide, diff));
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const threshold = getSlideWidth() * 0.2; // 20% of slide width
    
    if (Math.abs(draggedDistance) > threshold) {
      if (draggedDistance > 0) {
        previousSlide();
      } else {
        nextSlide();
      }
    } else {
      // Snap back to current slide
      setTranslateX(getTransformValue(currentSlide));
    }
    
    setDraggedDistance(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    handleDragMove(e.clientX);
  }, [handleDragMove]);

  const handleMouseUp = React.useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = React.useCallback((e: TouchEvent) => {
    e.preventDefault();
    handleDragMove(e.touches[0].clientX);
  }, [handleDragMove]);

  const handleTouchEnd = React.useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Global event listeners for drag
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

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          previousSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('keydown', handleKeyDown);
      return () => {
        containerRef.current?.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [previousSlide, nextSlide, goToSlide, totalSlides]);

  // Initialize transform
  React.useEffect(() => {
    setTranslateX(getTransformValue(initialSlide));
  }, [getTransformValue, initialSlide]);

  // Update transform on resize
  React.useEffect(() => {
    const handleResize = () => {
      setTranslateX(getTransformValue(currentSlide));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentSlide, getTransformValue]);

  return (
    <div
      className={cn('relative w-full', className)}
      role="region"
      aria-label={ariaLabel}
    >
      {/* Main carousel container */}
      <div
        ref={containerRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        tabIndex={0}
        role="tablist"
        aria-live="polite"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={cn(
            'flex transition-transform duration-300 ease-out',
            isDragging && 'transition-none'
          )}
          style={{
            transform: `translateX(${translateX}px)`,
            gap: `${spaceBetween}px`
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              role="tabpanel"
              aria-hidden={index !== currentSlide}
              className={cn(
                'flex-shrink-0 select-none',
                slidesPerView === 'auto' ? 'w-auto' : '',
                itemClassName
              )}
              style={{
                width: slidesPerView === 'auto' ? undefined : `${getSlideWidth()}px`
              }}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      {showNavigation && (
        <>
          <Button
            variant="outline"
            size="sm"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={previousSlide}
            disabled={!loop && currentSlide === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={nextSlide}
            disabled={!loop && currentSlide === totalSlides - 1}
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && (
        <div className="flex justify-center space-x-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                'h-2 w-2 rounded-full transition-all duration-200',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring',
                index === currentSlide
                  ? 'bg-primary w-6'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite">
        Slide {currentSlide + 1} of {totalSlides}
      </div>
    </div>
  );
}