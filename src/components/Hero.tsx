import { ArrowRight, Play, Users, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { IntersectionAnimation } from '@/components/advanced/IntersectionAnimations';
import { EnhancedButton, InteractiveCard } from '@/components/advanced/EnhancedInteractiveElements';
import { AnimatedCounter, Magnetic } from '@/components/advanced/AdvancedScrollAnimations';
import { useI18n } from '@/hooks/useI18n';
import { PhoneShowcase } from '@/components/hero';

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
  primaryCta = { text: "Get Started Now", href: "/signup" },
  secondaryCta = { text: "Watch Demo", href: "/demo" },
  showStats = true
}: HeroProps) {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-slate-50/50 to-background">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative py-12 lg:py-16">
        {/* Trust indicator */}
        <IntersectionAnimation animation="fade-in" className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
            {t('hero.trustBadge')}
          </Badge>
        </IntersectionAnimation>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left content - Simplified and focused */}
          <div className="text-center lg:text-left">
            <IntersectionAnimation animation="fade-up" delay={200}>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                {title}
              </h1>
            </IntersectionAnimation>

            <IntersectionAnimation animation="fade-up" delay={400}>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                {subtitle}
              </p>
            </IntersectionAnimation>

            {/* Prominent Social Proof Numbers - Like Fresha */}
            {showStats && (
              <IntersectionAnimation animation="fade-up" delay={600}>
                <div className="grid grid-cols-3 gap-8 mb-8 py-6">
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                      <AnimatedCounter end={50} suffix="K+" />
                    </div>
                    <div className="text-sm text-muted-foreground">{t('hero.stats.businesses')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                      <AnimatedCounter end={1} suffix="B+" />
                    </div>
                    <div className="text-sm text-muted-foreground">{t('hero.stats.appointments')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                      <AnimatedCounter end={4.8} suffix="" />
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                      {t('hero.stats.rating')}
                    </div>
                  </div>
                </div>
              </IntersectionAnimation>
            )}

            {/* Enhanced CTAs */}
            <IntersectionAnimation animation="fade-up" delay={800}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Magnetic intensity={0.2}>
                  <EnhancedButton
                    variant="primary"
                    size="lg"
                    magnetic={true}
                    glow={true}
                    onClick={() => {
                      window.location.href = primaryCta.href;
                    }}
                  >
                    {t('hero.cta.trial')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </EnhancedButton>
                </Magnetic>

                <Magnetic intensity={0.15}>
                  <EnhancedButton
                    variant="secondary"
                    size="lg"
                    onClick={() => {
                      window.location.href = secondaryCta.href;
                    }}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    {t('hero.cta.demo')}
                  </EnhancedButton>
                </Magnetic>
              </div>
            </IntersectionAnimation>

            {/* Trust signals */}
            <IntersectionAnimation animation="fade-up" delay={1000}>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground justify-center lg:justify-start">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {t('hero.trust.freeTrial')}
                </div>
                <div className="hidden sm:block">•</div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {t('hero.trust.noSetupFees')}
                </div>
                <div className="hidden sm:block">•</div>
                <div>{t('hero.trust.cancelAnytime')}</div>
              </div>
            </IntersectionAnimation>
          </div>

          {/* Right side - Interactive phone showcase */}
          <IntersectionAnimation animation="fade-up" delay={400} className="relative">
            <PhoneShowcase />
          </IntersectionAnimation>
        </div>
      </div>
    </section>
  );
}
