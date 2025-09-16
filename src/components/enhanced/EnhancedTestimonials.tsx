import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/useInView';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

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

const testimonials: EnhancedTestimonial[] = [
  {
    id: '1',
    quote: "NeonO transformed our salon completely. We've increased bookings by 85% and our no-show rate dropped to just 2%. The automated reminders and seamless booking experience keep our clients coming back.",
    author: "Sarah Martinez",
    business: "Luxe Hair Studio",
    role: "Salon Owner",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    stat: "85% increase in bookings",
    businessType: "Hair Salon"
  },
  {
    id: '2',
    quote: "The POS system is incredibly intuitive. My stylists love how easy it is to process payments and manage tips. We've seen a 40% increase in tip income since switching.",
    author: "Mike Chen",
    business: "Urban Cuts Barbershop",
    role: "Manager",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    stat: "40% increase in tips",
    businessType: "Barbershop"
  },
  {
    id: '3',
    quote: "Our spa's efficiency has improved dramatically. The staff scheduling and room management features alone have saved us 15 hours per week. ROI was immediate.",
    author: "Emma Thompson",
    business: "Serenity Day Spa",
    role: "Operations Director",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    stat: "15 hours saved per week",
    businessType: "Day Spa"
  },
  {
    id: '4',
    quote: "The marketing automation is game-changing. Our client retention increased by 60% with automated campaigns and review requests. It practically runs itself.",
    author: "David Rodriguez",
    business: "Elite Aesthetics",
    role: "Clinic Director",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    stat: "60% better retention",
    businessType: "Medical Spa"
  }
];

export function EnhancedTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView<HTMLElement>('50px');
  const autoRef = useRef<number | null>(null);
  
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
  useEffect(() => {
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
          <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
            Loved by thousands of beauty professionals
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how NeonO is helping businesses like yours thrive and grow.
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
                {/* Rating */}
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-1" role="img" aria-label={`${currentTestimonial.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-6 w-6 text-yellow-400 fill-current" 
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-xl lg:text-2xl font-medium leading-relaxed text-center text-foreground mb-8 max-w-4xl mx-auto">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Author info */}
                <div className="flex items-center justify-center space-x-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={currentTestimonial.avatar}
                        alt={`${currentTestimonial.author} portrait`}
                        className="w-16 h-16 rounded-full object-cover shadow-medium ring-4 ring-white/50"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    </div>
                    
                    <div className="text-left">
                      <div className="font-semibold text-lg text-foreground">
                        {currentTestimonial.author}
                      </div>
                      <div className="text-muted-foreground">
                        {currentTestimonial.role}
                      </div>
                      <div className="text-sm font-medium text-primary">
                        {currentTestimonial.business}
                      </div>
                    </div>
                  </div>

                  {/* Stat highlight */}
                  {currentTestimonial.stat && (
                    <div className="hidden sm:block">
                      <div className="bg-primary/10 rounded-2xl px-6 py-4 border border-primary/20">
                        <div className="text-sm font-medium text-primary mb-1">
                          Key Result
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
              aria-label="Previous testimonial"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-110 hover:bg-white focus-ring"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>

            <div className="flex space-x-3" role="tablist" aria-label="Testimonials">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to testimonial from ${testimonial.author}`}
                  onClick={() => setCurrentIndex(index)}
                  className="group focus-ring p-2 transition-all duration-300"
                >
                  <div className="relative">
                    <img 
                      src={testimonial.avatar}
                      alt={`${testimonial.author} portrait`}
                      className={cn(
                        "w-12 h-12 rounded-full object-cover transition-all duration-300 ring-4",
                        index === currentIndex 
                          ? "ring-primary scale-110 shadow-medium" 
                          : "ring-border/40 grayscale hover:grayscale-0 hover:scale-105"
                      )}
                    />
                    {index === currentIndex && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={goToNext}
              aria-label="Next testimonial"
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