import { Star } from 'lucide-react';
import { HoverCard, PulsingDot } from '@/components/interactions/MicroInteractions';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SmartSkeleton } from '@/components/loading/SmartSkeleton';
import { useState } from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatar?: string;
  isLoading?: boolean;
}

export function EnhancedTestimonial({
  quote,
  author,
  role,
  company,
  rating,
  avatar,
  isLoading = false,
}: TestimonialProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl p-8 shadow-soft">
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <SmartSkeleton key={i} className="h-4 w-4 rounded" />
          ))}
        </div>
        <SmartSkeleton variant="text" lines={3} className="mb-6" />
        <div className="flex items-center gap-3">
          <SmartSkeleton variant="avatar" className="h-12 w-12" />
          <div className="flex-1">
            <SmartSkeleton variant="text" className="mb-1 w-3/5" />
            <SmartSkeleton variant="text" className="w-2/5" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <ScrollReveal animation="scale-in" delay={200}>
      <HoverCard effect="lift" intensity="medium" className="bg-card rounded-2xl p-8 shadow-soft border border-border/50 relative overflow-hidden">
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 transition-all duration-300 delay-${i * 100} ${
                  i < rating
                    ? 'text-yellow-400 fill-yellow-400 group-hover:scale-110'
                    : 'text-muted-foreground/40'
                }`}
              />
            ))}
            <PulsingDot size="sm" color="bg-green-500" className="ml-2" />
          </div>

          {/* Quote */}
          <blockquote className="text-lg text-foreground mb-6 leading-relaxed group-hover:text-primary/90 transition-colors duration-300">
            "{quote}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="relative">
              {avatar ? (
                <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                  {!imageLoaded && (
                    <SmartSkeleton variant="avatar" className="absolute inset-0" />
                  )}
                  <img
                    src={avatar}
                    alt={`${author} avatar`}
                    className={`h-full w-full object-cover transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-full bg-gradient-hero text-white flex items-center justify-center font-semibold group-hover:scale-110 transition-transform duration-300">
                  {author.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {author}
              </div>
              <div className="text-sm text-muted-foreground">
                {role} at {company}
              </div>
            </div>
          </div>
        </div>
      </HoverCard>
    </ScrollReveal>
  );
}