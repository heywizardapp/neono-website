import { ReactNode, useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EnhancedCarouselProps {
  children: ReactNode[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
  itemsToShow?: number;
  gap?: number;
  momentum?: boolean;
  magneticSnap?: boolean;
  loop?: boolean;
}

export function EnhancedCarousel({
  children,
  className,
  autoPlay = false,
  autoPlayInterval = 5000,
  showIndicators = true,
  showNavigation = true,
  itemsToShow = 1,
  gap = 16,
  momentum = true,
  magneticSnap = true,
  loop = true,
}: EnhancedCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const animationFrame = useRef<number>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  const totalItems = children.length;
  const maxIndex = Math.max(0, totalItems - itemsToShow);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, maxIndex]);

  // Smooth scroll to index
  const scrollToIndex = useCallback((index: number, smooth = true) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const itemWidth = container.scrollWidth / totalItems;
    const targetScroll = index * itemWidth;

    if (smooth) {
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    } else {
      container.scrollLeft = targetScroll;
    }

    setCurrentIndex(index);
  }, [totalItems]);

  // Momentum scrolling physics
  const applyMomentum = useCallback(() => {
    if (!containerRef.current || !momentum) return;

    const container = containerRef.current;
    const friction = 0.95;
    const minVelocity = 0.5;

    if (Math.abs(velocity.current) > minVelocity) {
      container.scrollLeft += velocity.current;
      velocity.current *= friction;

      animationFrame.current = requestAnimationFrame(applyMomentum);
    } else {
      velocity.current = 0;
      
      // Magnetic snap to nearest item
      if (magneticSnap) {
        const itemWidth = container.scrollWidth / totalItems;
        const currentScroll = container.scrollLeft;
        const nearestIndex = Math.round(currentScroll / itemWidth);
        scrollToIndex(Math.max(0, Math.min(nearestIndex, maxIndex)));
      }
    }
  }, [momentum, magneticSnap, scrollToIndex, maxIndex, totalItems]);

  // Mouse/Touch event handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current) return;

    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    lastX.current = e.pageX;
    lastTime.current = Date.now();
    velocity.current = 0;
    
    setIsAutoPlaying(false);
    
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    containerRef.current.style.cursor = 'grabbing';
    containerRef.current.style.userSelect = 'none';
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    e.preventDefault();
    
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    containerRef.current.scrollLeft = scrollLeft.current - walk;

    // Calculate velocity for momentum
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime.current;
    const deltaX = e.pageX - lastX.current;
    
    if (deltaTime > 0) {
      velocity.current = deltaX / deltaTime * 16; // Convert to pixels per frame (60fps)
    }
    
    lastX.current = e.pageX;
    lastTime.current = currentTime;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!containerRef.current) return;

    isDragging.current = false;
    containerRef.current.style.cursor = 'grab';
    containerRef.current.style.userSelect = '';
    
    // Apply momentum if enabled
    if (momentum && Math.abs(velocity.current) > 1) {
      applyMomentum();
    } else if (magneticSnap) {
      // Snap to nearest item
      const itemWidth = containerRef.current.scrollWidth / totalItems;
      const currentScroll = containerRef.current.scrollLeft;
      const nearestIndex = Math.round(currentScroll / itemWidth);
      scrollToIndex(Math.max(0, Math.min(nearestIndex, maxIndex)));
    }

    setTimeout(() => setIsAutoPlaying(autoPlay), 1000);
  }, [momentum, magneticSnap, applyMomentum, scrollToIndex, maxIndex, totalItems, autoPlay]);

  // Navigation functions
  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex <= 0 ? (loop ? maxIndex : 0) : currentIndex - 1;
    scrollToIndex(newIndex);
  }, [currentIndex, maxIndex, loop, scrollToIndex]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex >= maxIndex ? (loop ? 0 : maxIndex) : currentIndex + 1;
    scrollToIndex(newIndex);
  }, [currentIndex, maxIndex, loop, scrollToIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  return (
    <div className={cn('relative group', className)}>
      {/* Main carousel container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide cursor-grab will-change-scroll"
        style={{
          gap: `${gap}px`,
          scrollSnapType: magneticSnap ? 'x mandatory' : 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0 transition-transform duration-300 will-change-transform"
            style={{
              width: `calc(${100 / itemsToShow}% - ${gap * (itemsToShow - 1) / itemsToShow}px)`,
              scrollSnapAlign: magneticSnap ? 'start' : 'none',
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      {showNavigation && (
        <>
          <button
            onClick={goToPrevious}
            disabled={!loop && currentIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur shadow-lg hover:bg-background transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10 hover:scale-110 active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            disabled={!loop && currentIndex === maxIndex}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur shadow-lg hover:bg-background transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10 hover:scale-110 active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300 hover:scale-125 active:scale-95',
                index === currentIndex
                  ? 'w-8 bg-primary shadow-glow'
                  : 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground/60'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-background/20 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-transform duration-300 ease-out"
          style={{
            width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}