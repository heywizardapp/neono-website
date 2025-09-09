import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  showStats?: boolean;
}

export function Hero({ 
  title, 
  subtitle, 
  primaryCta = { text: "Start Free Trial", href: "/signup" },
  secondaryCta = { text: "See Pricing", href: "/pricing" },
  showStats = true
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-subtle">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      <div className="container relative z-10 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left content */}
          <div className="flex flex-col space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl font-display font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-hero-primary group" asChild>
                <Link to={primaryCta.href}>
                  {primaryCta.text}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-hero-secondary group" asChild>
                <Link to={secondaryCta.href}>
                  <Play className="mr-2 h-4 w-4" />
                  {secondaryCta.text}
                </Link>
              </Button>
            </div>

            {/* Stats */}
            {showStats && (
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/40">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Businesses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">98%</div>
                  <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">$2M+</div>
                  <div className="text-sm text-muted-foreground">Daily Processing</div>
                </div>
              </div>
            )}
          </div>

          {/* Right visual */}
          <div className="relative animate-scale-in">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-card border border-border/40 shadow-large p-8">
              {/* Placeholder for device mockup */}
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
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-gradient-hero shadow-glow animate-pulse" />
            <div className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-accent shadow-glow animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
}