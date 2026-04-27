import { IntersectionAnimation } from '@/components/advanced/IntersectionAnimations';
import { Badge } from '@/components/ui/badge';
import { Star, Shield, Award, Users } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export function TrustSignals() {
  const { t } = useI18n();

  const trustBadges = [
    {
      icon: Star,
      title: t('trustSignals.rating'),
      subtitle: t('trustSignals.reviews'),
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      title: t('trustSignals.security'),
      subtitle: t('trustSignals.pciCompliant'),
      color: "text-green-500"
    },
    {
      icon: Award,
      title: t('trustSignals.leader'),
      subtitle: t('trustSignals.bestSoftware'),
      color: "text-blue-500"
    },
    {
      icon: Users,
      title: t('trustSignals.businesses'),
      subtitle: t('trustSignals.trustWorldwide'),
      color: "text-purple-500"
    }
  ];

  return (
    <section className="py-8 bg-slate-50/50">
      <div className="container">
        <IntersectionAnimation animation="fade-up">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              {t('trustSignals.badge')}
            </Badge>
            <h2 className="text-2xl font-bold mb-4 font-display">
              {t('trustSignals.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-display">
              {t('trustSignals.subtitle')}
            </p>
          </div>
        </IntersectionAnimation>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <IntersectionAnimation
                key={index}
                animation="fade-up"
                delay={index * 100}
              >
                <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                  <div className="mb-4">
                    <Icon className={`w-8 h-8 mx-auto ${badge.color}`} />
                  </div>
                  <div className="font-semibold text-sm mb-1">{badge.title}</div>
                  <div className="text-xs text-muted-foreground">{badge.subtitle}</div>
                </div>
              </IntersectionAnimation>
            );
          })}
        </div>

        {/* Partnership */}
        <IntersectionAnimation animation="fade-up" delay={400}>
          <div className="mt-12">
            <p className="text-sm text-muted-foreground text-center">
              Built in partnership with Metro Beauty Supply — Canada's leading professional beauty distributor
            </p>
          </div>
        </IntersectionAnimation>
      </div>
    </section>
  );
}
