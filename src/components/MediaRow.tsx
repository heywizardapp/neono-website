import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductMockup } from '@/components/mockups/ProductMockups';

interface MediaRowProps {
  id: string;
  title: string;
  eyebrow?: string;
  bullets: string[];
  media: {
    src: string;
    alt: string;
    variant?: 'image' | 'video';
  };
  reverse?: boolean;
}

export function MediaRow({ 
  id, 
  title, 
  eyebrow,
  bullets, 
  media, 
  reverse = false
}: MediaRowProps) {
  return (
    <section id={id} className="py-20 lg:py-32">
      <div className="container">
        <div className={`grid gap-12 lg:grid-cols-2 lg:gap-16 items-center ${reverse ? 'lg:grid-flow-col-dense' : ''}`}>
          <div className={`space-y-8 ${reverse ? 'lg:col-start-2' : ''}`}>
            <div className="space-y-4">
              {eyebrow && (
                <div className="text-sm font-medium text-primary uppercase tracking-wide">
                  {eyebrow}
                </div>
              )}
              <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl">
                {title}
              </h2>
            </div>
            
            <ul className="space-y-4">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-mint mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>

          </div>

          <div className={`relative ${reverse ? 'lg:col-start-1' : ''}`}>
            <ProductMockup variant={id} className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}