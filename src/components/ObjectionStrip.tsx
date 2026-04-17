import * as React from "react";

interface ObjectionItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface ObjectionStripProps {
  items: ObjectionItem[];
}

export function ObjectionStrip({ items }: ObjectionStripProps) {
  return (
    <section className="py-8 bg-accent/5">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/40 hover-lift lg:border-r lg:last:border-r-0 lg:rounded-none lg:border-l-0 lg:border-t-0 lg:border-b-0 lg:bg-transparent lg:first:pl-0"
            >
              <div className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <span className="text-primary [&>svg]:w-6 [&>svg]:h-6">
                  {item.icon}
                </span>
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
