import * as React from "react";
import { Star, ChevronLeft, ChevronRight, Quote, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/useInView';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { useI18n } from '@/hooks/useI18n';

interface EnhancedTestimonial {
  id: string;
  quote: string;
  author: string;
  business: string;
  role: string;
  rating: number;
  avatar: string;
  stat?: string;
  businessType: string;
}

export function EnhancedTestimonials() {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { ref, inView } = useInView<HTMLElement>('50px');
  const autoRef = React.useRef<number | null>(null);

  const testimonials: EnhancedTestimonial[] = [
    {
      id: '1',
      quote: t('enhancedTestimonials.t1.quote'),
      author: t('enhancedTestimonials.t1.author'),
      business: "",
      role: t('enhancedTestimonials.t1.role'),
      rating: 5,
      avatar: "https://images.pexels.com/photos/7440054/pexels-photo-7440054.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      stat: t('enhancedTestimonials.t1.stat'),
      businessType: t('enhancedTestimonials.t1.businessType')
    },
    {
      id: '2',
      quote: t('enhancedTestimonials.t2.quote'),
      author: t('enhancedTestimonials.t2.author'),
      business: "",
      role: t('enhancedTestimonials.t2.role'),
      rating: 5,
      avatar: "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      stat: t('enhancedTestimonials.t2.stat'),
      businessType: t('enhancedTestimonials.t2.businessType')
    },
    {
      id: '3',
      quote: t('enhancedTestimonials.t3.quote'),
      author: t('enhancedTestimonials.t3.author'),
      business: "",
      role: t('enhancedTestimonials.t3.role'),
      rating: 5,
      avatar: "https://images.pexels.com/photos/5069494/pexels-photo-5069494.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      stat: t('enhancedTestimonials.t3.stat'),
      businessType: t('enhancedTestimonials.t3.businessType')
    },
    {
      id: '4',
      quote: t('enhancedTestimonials.t4.quote'),
      author: t('enhancedTestimonials.t4.author'),
      business: "",
      role: t('enhancedTestimonials.t4.role'),
      rating: 5,
      avatar: "https://images.pexels.com/photos/4586741/pexels-photo-4586741.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      stat: t('enhancedTestimonials.t4.stat'),
      businessType: t('enhancedTestimonials.t4.businessType')
    }
  ];

  // Respect user preferences
  const reducedMotion = typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  // Auto-advance testimonials
  React.useEffect(() => {
    if (!inView || reducedMotion) return;

    function start() {
      stop();
      autoRef.current = window.setInterval(() => {
        setCurrentIndex((i) => (i + 1) % testimonials.length);
      }, 6000);
    }

    function stop() {
      if (autoRef.current) {
        clearInterval(autoRef.current);
        autoRef.current = null;
      }
    }

    start();
    return stop;
  }, [inView, reducedMotion]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gradient-subtle">
      <div className="container">
        <ScrollReveal animation="fade-up" className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {t('enhancedTestimonials.title')}
          </h2>
          <p className="font-display text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('enhancedTestimonials.subtitle')}
          </p>
        </ScrollReveal>

        <div className="relative max-w-6xl mx-auto">
          {/* Main testimonial card */}
          <ScrollReveal animation="scale-in" delay={200}>
            <div className="relative bg-gradient-card rounded-3xl p-8 lg:p-12 shadow-large border border-border/40 overflow-hidden">
              {/* Background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl" />

              {/* Quote icon */}
              <div className="absolute top-8 left-8 opacity-10">
                <Quote className="w-16 h-16 text-primary" />
              </div>

              <div className="relative z-10">
                {/* Quote */}
                <blockquote className="font-display text-xl lg:text-2xl font-medium leading-relaxed text-center text-foreground mb-8 max-w-4xl mx-auto">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Author info */}
                <div className="flex items-center justify-center space-x-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shadow-medium">
                        <BarChart3 className="w-7 h-7 text-primary" />
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="font-semibold text-lg text-foreground">
                        {currentTestimonial.author}
                      </div>
                      <div className="text-muted-foreground">
                        {currentTestimonial.role}
                      </div>
                    </div>
                  </div>

                  {/* Stat highlight */}
                  {currentTestimonial.stat && (
                    <div className="hidden sm:block">
                      <div className="bg-primary/10 rounded-2xl px-6 py-4 border border-primary/20">
                        <div className="text-sm font-medium text-primary mb-1">
                          {t('enhancedTestimonials.keyResult')}
                        </div>
                        <div className="text-lg font-bold text-foreground">
                          {currentTestimonial.stat}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={goToPrevious}
              aria-label={t('enhancedTestimonials.prevAriaLabel')}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-110 hover:bg-white focus-ring"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>

            <div className="flex space-x-3" role="tablist" aria-label="Expected outcomes">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to outcome: ${testimonial.businessType}`}
                  onClick={() => setCurrentIndex(index)}
                  className="group focus-ring p-2 transition-all duration-300"
                >
                  <div className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "bg-primary scale-125"
                      : "bg-border/60 hover:bg-primary/40 hover:scale-110"
                  )} />
                </button>
              ))}
            </div>

            <button
              onClick={goToNext}
              aria-label={t('enhancedTestimonials.nextAriaLabel')}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-110 hover:bg-white focus-ring"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>

          {/* Testimonial grid preview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={cn(
                "text-center p-4 rounded-xl transition-all duration-300 cursor-pointer hover-lift",
                index === currentIndex
                  ? "bg-primary/10 border-2 border-primary/30"
                  : "bg-white/40 border border-border/30 hover:bg-white/60"
              )}
              onClick={() => setCurrentIndex(index)}
            >
              <ScrollReveal
                animation="fade-up"
                delay={index * 100}
              >
                <div className="text-sm font-medium text-foreground mb-1">
                  {testimonial.businessType}
                </div>
                <div className="text-xs text-muted-foreground">
                  {testimonial.business}
                </div>
                {testimonial.stat && (
                  <div className="text-xs text-primary font-medium mt-2">
                    {testimonial.stat}
                  </div>
                )}
              </ScrollReveal>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
