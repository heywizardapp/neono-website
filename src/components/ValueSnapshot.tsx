import { LucideIcon } from 'lucide-react';

interface ValueSnapshotItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
}

interface ValueSnapshotProps {
  items: ValueSnapshotItem[];
}

export function ValueSnapshot({ items }: ValueSnapshotProps) {
  return (
    <section className="py-16 bg-accent/5">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="text-center space-y-4 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/40 hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-card mx-auto ${item.color || 'text-primary'}`}>
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}