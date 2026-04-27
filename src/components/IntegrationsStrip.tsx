import { IntegrationLogo } from '@/templates/types';
import { useI18n } from '@/hooks/useI18n';

interface IntegrationsStripProps {
  integrations: IntegrationLogo[];
}

export function IntegrationsStrip({ integrations }: IntegrationsStripProps) {
  const { t } = useI18n();

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-10">
          <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl mb-2">
            {t('integrations.title')}
          </h3>
          <p className="font-display text-muted-foreground">
            {t('integrations.subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="px-6 py-3 rounded-xl bg-card/50 border border-border/40 hover-lift flex items-center gap-2"
            >
              <span className="font-semibold text-sm">{integration.label}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {t('integrations.moreAvailable')}
        </p>
      </div>
    </section>
  );
}
