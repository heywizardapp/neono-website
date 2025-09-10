import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface IndustryHeroProps {
  title: string;
  subtitle: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  chips: string[];
  image?: string;
}

export function IndustryHero({ 
  title, 
  subtitle, 
  primaryCta, 
  secondaryCta, 
  chips,
  image 
}: IndustryHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-subtle">
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      <div className="container relative z-10 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl font-display font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-hero-primary group" asChild>
                <Link to={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-hero-secondary" asChild>
                <Link to={secondaryCta.href}>
                  {secondaryCta.label}
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-4">
              {chips.map((chip, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border/40 rounded-full px-4 py-2 text-sm"
                >
                  <Check className="h-4 w-4 text-mint" />
                  <span className="text-muted-foreground">{chip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-card border border-border/40 shadow-large p-8">
              <div className="h-full w-full rounded-xl bg-gradient-hero/10 border border-border/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-hero mx-auto flex items-center justify-center">
                    <span className="text-white font-bold text-xl">N</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded w-32 mx-auto" />
                    <div className="h-3 bg-slate-200 rounded w-24 mx-auto" />
                    <div className="h-3 bg-slate-200 rounded w-28 mx-auto" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-6">
                    <div className="h-8 bg-primary/20 rounded" />
                    <div className="h-8 bg-accent/20 rounded" />
                    <div className="h-8 bg-mint/20 rounded" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-gradient-hero shadow-glow animate-pulse" />
            <div className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-accent shadow-glow animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
}