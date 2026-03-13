import { Shield, Lock, Award, CheckCircle } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export function TrustBadges() {
  const { t } = useI18n();

  const trustBadges = [
    {
      icon: Shield,
      label: t('trustBadges.soc2'),
      description: t('trustBadges.soc2Desc')
    },
    {
      icon: Lock,
      label: t('trustBadges.hipaa'),
      description: t('trustBadges.hipaaDesc')
    },
    {
      icon: Award,
      label: t('trustBadges.pci'),
      description: t('trustBadges.pciDesc')
    },
    {
      icon: CheckCircle,
      label: t('trustBadges.uptime'),
      description: t('trustBadges.uptimeDesc')
    }
  ];

  return (
    <section className="py-12 border-t border-border/40 bg-gradient-subtle">
      <div className="container">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            {t('trustBadges.title')}
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            {t('trustBadges.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {badge.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {badge.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
