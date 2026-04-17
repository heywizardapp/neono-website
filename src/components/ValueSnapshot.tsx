import { CheckCircle, Clock, CreditCard, Globe, Palette } from 'lucide-react';
import { SnapshotCard } from '@/templates/types';

interface ValueSnapshotProps {
  items: SnapshotCard[];
}

const getIcon = (title: string) => {
  if (title.toLowerCase().includes('no-show') || title.toLowerCase().includes('absence')) return CheckCircle;
  if (title.toLowerCase().includes('slow') || title.toLowerCase().includes('hour') || title.toLowerCase().includes('heure')) return Clock;
  if (title.toLowerCase().includes('checkout') || title.toLowerCase().includes('payment') || title.toLowerCase().includes('paiement')) return CreditCard;
  if (title.toLowerCase().includes('website') || title.toLowerCase().includes('site')) return Globe;
  if (title.toLowerCase().includes('colour') || title.toLowerCase().includes('color') || title.toLowerCase().includes('couleur')) return Palette;
  return CheckCircle;
};

export function ValueSnapshot({ items }: ValueSnapshotProps) {
  const gridCols = items.length >= 5 ? 'md:grid-cols-2 lg:grid-cols-5' : 'md:grid-cols-2 lg:grid-cols-4';
  return (
    <section className="py-16 bg-accent/5">
      <div className="container">
        <div className={`grid gap-6 ${gridCols}`}>
          {items.map((item, index) => (
            <div
              key={index}
              className="text-center space-y-4 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/40 hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-card mx-auto ${item.color || 'text-primary'}`}>
                {(() => {
                  const Icon = getIcon(item.title);
                  return <Icon className="h-6 w-6" />;
                })()}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}