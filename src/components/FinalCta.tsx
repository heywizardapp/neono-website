import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FinalCtaProps {
  title: string;
  subtitle?: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}

export function FinalCta({ 
  title, 
  subtitle, 
  primaryCta, 
  secondaryCta 
}: FinalCtaProps) {
  return (
    <section className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-hero-primary group" asChild>
              <Link to={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            {secondaryCta && (
              <Button size="lg" variant="outline" className="btn-hero-secondary" asChild>
                <Link to={secondaryCta.href}>
                  {secondaryCta.label}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}