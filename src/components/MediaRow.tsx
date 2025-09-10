import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MediaRowProps {
  id: string;
  title: string;
  description?: string;
  bullets: string[];
  media?: {
    type: 'image' | 'video';
    src: string;
    alt: string;
  };
  reverse?: boolean;
  cta?: {
    label: string;
    href: string;
  };
}

export function MediaRow({ 
  id, 
  title, 
  description, 
  bullets, 
  media, 
  reverse = false, 
  cta 
}: MediaRowProps) {
  return (
    <section id={id} className="py-20 lg:py-32">
      <div className="container">
        <div className={`grid gap-12 lg:grid-cols-2 lg:gap-16 items-center ${reverse ? 'lg:grid-flow-col-dense' : ''}`}>
          <div className={`space-y-8 ${reverse ? 'lg:col-start-2' : ''}`}>
            <div className="space-y-4">
              <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl">
                {title}
              </h2>
              {description && (
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            
            <ul className="space-y-4">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-mint mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>

            {cta && (
              <Button className="group" asChild>
                <a href={cta.href}>
                  {cta.label}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            )}
          </div>

          <div className={`relative ${reverse ? 'lg:col-start-1' : ''}`}>
            <div className="aspect-[4/3] rounded-2xl bg-gradient-card border border-border/40 shadow-large p-8">
              <div className="h-full w-full rounded-xl bg-gradient-hero/10 border border-border/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="h-16 w-16 rounded-xl bg-gradient-hero mx-auto flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">N</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-40 mx-auto" />
                    <div className="h-4 bg-slate-200 rounded w-32 mx-auto" />
                    <div className="h-4 bg-slate-200 rounded w-36 mx-auto" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-8">
                    <div className="h-12 bg-primary/20 rounded" />
                    <div className="h-12 bg-accent/20 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}