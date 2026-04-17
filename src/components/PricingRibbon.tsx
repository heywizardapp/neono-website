import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useI18n } from '@/hooks/useI18n';

import { PricingRibbonConfig } from '@/templates/types';

interface PricingRibbonProps {
  config: PricingRibbonConfig;
}

export function PricingRibbon({ config }: PricingRibbonProps) {
  const { t } = useI18n();
  return (
    <section id="pricing" className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl mb-8">
            {t('pricing.ribbon.title')}
          </h2>
          
          <div className="bg-gradient-card rounded-2xl border border-border/40 p-8 lg:p-12 space-y-6">
            <div className="text-2xl lg:text-3xl font-semibold">
              {config.blurb}
            </div>
            
            {config.sub && (
              <div className="text-lg text-muted-foreground">
                {config.sub}
              </div>
            )}
            
            {config.cta && (
              <div className="pt-4">
                <Button size="lg" className="group" asChild>
                  <Link to={config.cta.href}>
                    {config.cta.label}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}