import { Calendar, CreditCard, Mail, Globe, BarChart3, Smartphone, Sparkles, Zap } from 'lucide-react';
import { StaggeredReveal } from '@/components/animations/ScrollReveal';
import { HoverCard } from '@/components/interactions/MicroInteractions';
import { SmartSkeleton } from '@/components/loading/SmartSkeleton';
import * as React from "react";
import { useI18n } from '@/hooks/useI18n';

const getFeatures = (t: (key: string) => string) => [
  {
    icon: Calendar,
    titleKey: 'features.grid.appointments.title',
    descriptionKey: 'features.grid.appointments.description',
    color: 'text-primary',
    gradient: 'from-primary/20 to-primary/5',
    statKey: 'features.grid.appointments.stat'
  },
  {
    icon: CreditCard,
    titleKey: 'features.grid.pos.title',
    descriptionKey: 'features.grid.pos.description',
    color: 'text-accent',
    gradient: 'from-accent/20 to-accent/5',
    statKey: 'features.grid.pos.stat'
  },
  {
    icon: Mail,
    titleKey: 'features.grid.marketing.title',
    descriptionKey: 'features.grid.marketing.description',
    color: 'text-mint',
    gradient: 'from-mint/20 to-mint/5',
    statKey: 'features.grid.marketing.stat'
  },
  {
    icon: Globe,
    titleKey: 'features.grid.website.title',
    descriptionKey: 'features.grid.website.description',
    color: 'text-lavender',
    gradient: 'from-lavender/20 to-lavender/5',
    statKey: 'features.grid.website.stat'
  },
  {
    icon: BarChart3,
    titleKey: 'features.grid.analytics.title',
    descriptionKey: 'features.grid.analytics.description',
    color: 'text-primary',
    gradient: 'from-primary/20 to-primary/5',
    statKey: 'features.grid.analytics.stat'
  },
  {
    icon: Smartphone,
    titleKey: 'features.grid.ai.title',
    descriptionKey: 'features.grid.ai.description',
    color: 'text-accent',
    gradient: 'from-accent/20 to-accent/5',
    statKey: 'features.grid.ai.stat'
  },
];

export function FeatureGrid() {
  const { t } = useI18n();
  const [isLoading, setIsLoading] = React.useState(true);
  const features = getFeatures(t);

  React.useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <SmartSkeleton className="h-10 w-96 mx-auto mb-4" />
            <SmartSkeleton className="h-6 w-2/3 mx-auto" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SmartSkeleton key={i} variant="card" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t('features.grid.badge')}</span>
          </div>

          <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl mb-4">
            {t('features.grid.title.before')} <span className="text-gradient">{t('features.grid.title.highlight')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-serif italic">
            {t('features.grid.subtitle')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <StaggeredReveal
            baseDelay={200}
            staggerDelay={150}
            animation="fade-up"
          >
            {features.map((feature, index) => (
              <HoverCard
                key={feature.titleKey}
                effect="lift"
                intensity="medium"
                className="group gpu-accelerated rounded-2xl overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative feature-card p-8 border border-border/40 bg-gradient-card hover:border-border/60 transition-all duration-300">
                  {/* Floating icon with enhanced animation */}
                  <div className="mb-6 relative">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} ${feature.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-soft group-hover:shadow-medium`}>
                      <feature.icon className="h-7 w-7" />
                    </div>
                    
                    {/* Floating sparkle effect */}
                    <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Zap className="w-4 h-4 text-primary animate-pulse" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {t(feature.titleKey)}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t(feature.descriptionKey)}
                  </p>

                  {/* Enhanced stat badge */}
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${feature.gradient} border border-current/20`}>
                      <div className={`w-2 h-2 rounded-full ${feature.color} animate-pulse`} />
                      <span className={`text-xs font-medium ${feature.color}`}>
                        {t(feature.statKey)}
                      </span>
                    </div>

                    {/* Hover arrow */}
                    <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <div className={`w-6 h-6 rounded-full ${feature.color} flex items-center justify-center`}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </HoverCard>
            ))}
          </StaggeredReveal>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            {t('features.grid.cta.text')}
          </p>
          <HoverCard effect="lift" intensity="medium">
            <button className="inline-flex items-center gap-2 bg-gradient-hero text-white font-semibold px-8 py-4 rounded-2xl shadow-glow hover:shadow-large transition-all duration-300 hover:-translate-y-1">
              <span>{t('features.grid.cta.button')}</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </HoverCard>
        </div>
      </div>
    </section>
  );
}