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

export interface BusinessTemplateConfig {
  industry: string;
  hero: {
    title: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    chips: string[];
    image?: string;
  };
  valueSnapshot: Array<{
    icon: any;
    title: string;
    description: string;
    color?: string;
  }>;
  sections: Array<{
    id: string;
    title: string;
    description?: string;
    bullets: string[];
    reverse?: boolean;
    cta?: { label: string; href: string };
  }>;
  beforeAfter: {
    title?: string;
    items: Array<{
      before: string;
      after: string;
    }>;
  };
  testimonials: {
    title?: string;
    items: Array<{
      quote: string;
      author: string;
      business: string;
      rating: number;
    }>;
  };
  integrations: {
    title?: string;
    subtitle?: string;
    items: Array<{ name: string; logo?: string }>;
  };
  pricing: {
    title?: string;
    plans: string;
    features: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
  faq: {
    title?: string;
    subtitle?: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  finalCta: {
    title: string;
    subtitle?: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
  };
}

interface BusinessTemplateProps {
  config: BusinessTemplateConfig;
}

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

export default function BusinessTemplate({ config }: BusinessTemplateProps) {
  useEffect(() => {
    document.title = `${config.industry} Software | NeonO`;
  }, [config.industry]);

  return (
    <div className="min-h-screen">
      <div data-hero>
        <IndustryHero {...config.hero} />
      </div>
      
      <StickySubnav sections={sections} />
      
      <div id="overview">
        <ValueSnapshot items={config.valueSnapshot} />
      </div>

      {config.sections.map((section, index) => (
        <MediaRow
          key={section.id}
          id={section.id}
          title={section.title}
          description={section.description}
          bullets={section.bullets}
          reverse={index % 2 === 1}
          cta={section.cta}
        />
      ))}

      <BeforeAfterGrid {...config.beforeAfter} />
      
      <TestimonialsCarousel 
        title={config.testimonials.title}
        testimonials={config.testimonials.items} 
      />
      
      <IntegrationsStrip 
        title={config.integrations.title}
        subtitle={config.integrations.subtitle}
        integrations={config.integrations.items}
      />
      
      <PricingRibbon {...config.pricing} />
      
      <FaqAccordion 
        title={config.faq.title}
        subtitle={config.faq.subtitle}
        faqs={config.faq.items}
      />
      
      <FinalCta {...config.finalCta} />
    </div>
  );
}