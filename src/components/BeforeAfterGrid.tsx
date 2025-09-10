import { X, Check } from 'lucide-react';

interface BeforeAfterItem {
  before: string;
  after: string;
}

interface BeforeAfterGridProps {
  title?: string;
  items: BeforeAfterItem[];
}

export function BeforeAfterGrid({ 
  title = "Before & After NeonO",
  items 
}: BeforeAfterGridProps) {
  return (
    <section className="py-20 lg:py-32 bg-accent/5">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how NeonO transforms everyday business operations
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border/40 shadow-sm overflow-hidden hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Before */}
              <div className="p-6 border-b border-border/40">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                    <X className="h-4 w-4 text-destructive" />
                  </div>
                  <span className="font-medium text-muted-foreground">Before</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.before}
                </p>
              </div>

              {/* After */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-mint/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-mint" />
                  </div>
                  <span className="font-medium">With NeonO</span>
                </div>
                <p className="text-sm leading-relaxed">
                  {item.after}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}