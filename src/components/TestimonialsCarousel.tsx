import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/useInView';
import { useI18n } from '@/hooks/useI18n';

import { Testimonial } from '@/templates/types';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView<HTMLElement>('50px');
  const autoRef = useRef<number | null>(null);
  
  // Respect user preferences
  const reducedMotion = typeof window !== 'undefined' && 
    window.matchMedia && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
  const reducedData = typeof window !== 'undefined' && 
    window.matchMedia && 
    window.matchMedia('(prefers-reduced-data: reduce)').matches;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-advance testimonials when in view (respecting user preferences)
  useEffect(() => {
    if (!inView || reducedMotion || reducedData) return;
    
    function start() {
      stop();
      autoRef.current = window.setInterval(() => {
        setCurrentIndex((i) => (i + 1) % testimonials.length);
      }, 5000);
    }
    
    function stop() {
      if (autoRef.current) {
        clearInterval(autoRef.current);
        autoRef.current = null;
      }
    }
    
    start();
    return stop;
  }, [inView, testimonials.length, reducedMotion, reducedData]);

  // Swipe handling
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);
  
  function onPointerDown(e: React.PointerEvent) {
    startX.current = e.clientX;
    deltaX.current = 0;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }
  
  function onPointerMove(e: React.PointerEvent) {
    if (startX.current != null) {
      deltaX.current = e.clientX - startX.current;
    }
  }
  
  function onPointerUp() {
    if (startX.current != null) {
      if (deltaX.current > 50) goToPrevious();
      else if (deltaX.current < -50) goToNext();
    }
    startX.current = null;
    deltaX.current = 0;
  }

  // Keyboard navigation
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrevious();
    }
  }

  return (
    <section ref={ref} className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div 
          className="relative max-w-4xl mx-auto"
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          onKeyDown={onKeyDown}
          tabIndex={0}
        >
          <div className="overflow-hidden rounded-2xl">
            <div 
              className={`flex will-change-transform ${!reducedMotion ? 'transition-transform duration-300 ease-out' : ''}`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 px-4"
                  role="tabpanel"
                  aria-hidden={index !== currentIndex}
                  aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
                >
                  <div className="text-center space-y-6">
                    {/* Rating */}
                    <div className="flex justify-center space-x-1" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-5 w-5",
                            i < testimonial.rating 
                              ? "text-yellow-500 fill-current" 
                              : "text-muted-foreground"
                          )} 
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-base sm:text-xl lg:text-2xl font-medium leading-relaxed text-foreground">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author */}
                     <div className="space-y-2">
                       <div className="font-semibold text-base sm:text-lg">{testimonial.author}</div>
                       {testimonial.business && (
                         <div className="text-sm sm:text-base text-muted-foreground">{testimonial.business}</div>
                       )}
                       {testimonial.stat && (
                         <div className="text-xs sm:text-sm text-primary font-medium">{testimonial.stat}</div>
                       )}
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={goToPrevious}
              aria-label="Previous testimonial"
              className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full border bg-background/80 backdrop-blur-sm shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex space-x-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => setCurrentIndex(index)}
                  className="min-w-[44px] min-h-[44px] p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-all duration-200"
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    index === currentIndex ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )} />
                </button>
              ))}
            </div>

            <button
              onClick={goToNext}
              aria-label="Next testimonial"
              className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full border bg-background/80 backdrop-blur-sm shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Screen reader announcements */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Testimonial {currentIndex + 1} of {testimonials.length}
          </div>
        </div>
      </div>
    </section>
  );
}