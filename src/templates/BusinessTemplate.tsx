import * as React from "react";
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
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { RelatedSolutions } from '@/components/navigation/RelatedSolutions';
import { StickyCompare } from '@/components/compare/StickyCompare';
import { BusinessTemplateConfig } from './types';

interface BusinessTemplateProps {
  config?: BusinessTemplateConfig;
  industry?: string;
  hero?: any;
  snapshot?: any;
  sections?: any;
  beforeAfter?: any;
  testimonials?: any;
  integrations?: any;
  pricing?: any;
  faqs?: any;
}

export default function BusinessTemplate(props: BusinessTemplateConfig | BusinessTemplateProps) {
  // Handle both config object and spread props
  const config = 'config' in props ? props.config! : props as BusinessTemplateConfig;
  
  React.useEffect(() => {
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

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Solutions', href: '/solutions' },
    { label: config.industry, href: `/solutions/${config.industry.toLowerCase()}` }
  ];

  return (
    <div className="min-h-screen">
      <Breadcrumbs customCrumbs={breadcrumbs} />
      
      <div data-hero>
        <IndustryHero 
          titleKey={config.hero.titleKey}
          subtitleKey={config.hero.subtitleKey}
          primaryCtaKey={config.hero.primaryCtaKey}
          secondaryCtaKey={config.hero.secondaryCtaKey}
          primaryHref={config.hero.primaryHref}
          secondaryHref={config.hero.secondaryHref}
          chipsKeys={config.hero.chipsKeys || []}
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
      
      <RelatedSolutions currentIndustry={config.industry} />
      
      <FinalCta 
        title="Ready to transform your business?"
        subtitle="Join thousands who've streamlined their operations with NeonO."
        primaryCta={{ label: "Start free trial", href: "/signup" }}
        secondaryCta={{ label: "Book a demo", href: "/demo" }}
      />
      
      <StickyCompare />
    </div>
  );
}