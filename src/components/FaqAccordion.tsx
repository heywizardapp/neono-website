import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from '@/hooks/useI18n';

import { FaqItem } from '@/templates/types';

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const { t } = useI18n();
  return (
    <section id="faq" className="py-20 lg:py-32 bg-accent/5">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
            {t('faq.title')}
          </h2>
          <p className="font-display text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border/40 px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold">{faq.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}