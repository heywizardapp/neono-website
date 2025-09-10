import { IntegrationLogo } from '@/templates/types';

interface Integration {
  label: string;
  src?: string;
}

interface IntegrationsStripProps {
  integrations: IntegrationLogo[];
}

export function IntegrationsStrip({ integrations }: IntegrationsStripProps) {
  return (
    <section className="py-20 lg:py-32 bg-accent/5">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
            Integrates with your favorite tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect NeonO with the tools you already use
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-card rounded-xl border border-border/40 hover-lift"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-hero/10 rounded-lg flex items-center justify-center">
                <span className="text-sm font-semibold text-muted-foreground">
                  {integration.label.substring(0, 2).toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            And 50+ more integrations available
          </p>
        </div>
      </div>
    </section>
  );
}