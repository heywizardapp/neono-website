import { useEffect } from 'react';
import { IndustryHero } from '@/components/IndustryHero';
import { StickySubnav } from '@/components/StickySubnav';
import { ValueSnapshot } from '@/components/ValueSnapshot';
import { MediaRow } from '@/components/MediaRow';
import { BeforeAfterGrid } from '@/components/BeforeAfterGrid';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { IntegrationsStrip } from '@/components/IntegrationsStrip';
import { PricingRibbon } from '@/components/PricingRibbon';
import { FaqAccordion } from '@/components/FaqAccordion';
import { FinalCta } from '@/components/FinalCta';
import { BusinessTemplateConfig } from './types';

export default function BusinessTemplate(config: BusinessTemplateConfig) {
  useEffect(() => {
    document.title = `${config.industry} Software | NeonO`;
  }, [config.industry]);

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'pos', label: 'POS/Payments' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'booking', label: 'Online Booking' },
    { id: 'team', label: 'Team & Payroll' },
    { id: 'reports', label: 'Reports & AI' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <div className="min-h-screen">
      <div data-hero>
        <IndustryHero 
          title={config.hero.title}
          subtitle={config.hero.subtitle}
          primaryCta={config.hero.primary}
          secondaryCta={config.hero.secondary}
          chips={config.hero.chips || []}
          image={config.hero.image}
        />
      </div>
      
      <StickySubnav sections={sections} />
      
      <div id="overview">
        <ValueSnapshot items={config.snapshot} />
      </div>

      {config.sections.map((section, index) => (
        <MediaRow
          key={section.id}
          id={section.id}
          title={section.title}
          eyebrow={section.eyebrow}
          bullets={section.bullets}
          media={section.media}
          reverse={section.reversed || index % 2 === 1}
        />
      ))}

      <BeforeAfterGrid items={config.beforeAfter} />
      
      <TestimonialsCarousel testimonials={config.testimonials} />
      
      <IntegrationsStrip integrations={config.integrations} />
      
      <PricingRibbon config={config.pricing} />
      
      <FaqAccordion faqs={config.faqs} />
      
      <FinalCta 
        title="Ready to transform your business?"
        subtitle="Join thousands who've streamlined their operations with NeonO."
        primaryCta={{ label: "Start free trial", href: "/signup" }}
        secondaryCta={{ label: "Book a demo", href: "/demo" }}
      />
    </div>
  );
}