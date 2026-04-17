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
import { ColourBowlDemo } from '@/components/demos/ColourBowlDemo';
import { BusinessTemplateConfig } from './types';
import { useI18n } from '@/hooks/useI18n';
import { Scale, Smartphone, DollarSign, Zap, Check, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
  const { t } = useI18n();
  // Handle both config object and spread props
  const config = 'config' in props ? props.config! : props as BusinessTemplateConfig;

  React.useEffect(() => {
    document.title = `${config.industry} Software | NeonO`;
  }, [config.industry]);

  const hasColourSection = config.sections.some(s => s.id === 'colour');

  const sections = [
    { id: 'overview', label: t('solutions.template.nav.overview') },
    { id: 'appointments', label: t('solutions.template.nav.appointments') },
    { id: 'pos', label: t('solutions.template.nav.pos') },
    ...(hasColourSection ? [{ id: 'colour', label: t('solutions.template.nav.colour') }] : []),
    { id: 'marketing', label: t('solutions.template.nav.marketing') },
    { id: 'booking', label: t('solutions.template.nav.booking') },
    { id: 'team', label: t('solutions.template.nav.team') },
    { id: 'reports', label: t('solutions.template.nav.reports') },
    { id: 'pricing', label: t('solutions.template.nav.pricing') },
    { id: 'faq', label: t('solutions.template.nav.faq') },
  ];

  const breadcrumbs = [
    { label: t('solutions.template.breadcrumb.home'), href: '/' },
    { label: t('solutions.template.breadcrumb.solutions'), href: '/solutions' },
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

      {config.sections.map((section, index) => {
        // Colour Studio gets a special dark-background treatment with interactive demo
        if (section.id === 'colour') {
          return (
            <section key="colour" id="colour" className="py-20 lg:py-32 bg-ink text-white relative overflow-hidden">
              {/* Subtle gradient accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lavender via-mint to-lavender" />
              <div className="absolute inset-0 bg-gradient-to-br from-lavender/5 via-transparent to-mint/5" />

              <div className="container relative">
                {/* Eyebrow + Title */}
                <div className="text-center mb-16">
                  <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20">
                    🎨 {section.eyebrow}
                  </Badge>
                  <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4 text-white">
                    {section.title}
                  </h2>
                  <p className="font-serif italic text-lg text-white/60 max-w-2xl mx-auto">
                    {t('solutions.salons.colour.qualifier')}
                  </p>
                </div>

                {/* Two-column: Bullets + Interactive Demo */}
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start mb-16">
                  {/* Left: Outcome-led bullets */}
                  <div className="space-y-6">
                    <ul className="space-y-5">
                      {section.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-mint mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Competitive callout card */}
                    <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                      <h3 className="font-semibold text-lg text-white mb-2">
                        {t('solutions.salons.colour.competitiveCallout.title')}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {t('solutions.salons.colour.competitiveCallout.body')}
                      </p>
                    </div>

                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
                      <Link to="/signup">
                        {t('common.startFreeTrial')} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  {/* Right: Interactive Colour Bowl Demo */}
                  <div>
                    <ColourBowlDemo />
                  </div>
                </div>
              </div>

              {/* Objection strip — dark-mode styled */}
              <div className="border-t border-white/10">
                <div className="container py-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { icon: <Scale className="w-5 h-5" />, title: t('solutions.salons.colour.objections.scale.title'), desc: t('solutions.salons.colour.objections.scale.desc') },
                      { icon: <Smartphone className="w-5 h-5" />, title: t('solutions.salons.colour.objections.device.title'), desc: t('solutions.salons.colour.objections.device.desc') },
                      { icon: <DollarSign className="w-5 h-5" />, title: t('solutions.salons.colour.objections.included.title'), desc: t('solutions.salons.colour.objections.included.desc') },
                      { icon: <Zap className="w-5 h-5" />, title: t('solutions.salons.colour.objections.setup.title'), desc: t('solutions.salons.colour.objections.setup.desc') },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-4">
                        <div className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-lg bg-white/10">
                          <span className="text-mint">{item.icon}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-white leading-tight">{item.title}</p>
                          <p className="text-xs text-white/50 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        }

        return (
          <MediaRow
            key={section.id}
            id={section.id}
            title={section.title}
            eyebrow={section.eyebrow}
            bullets={section.bullets}
            media={section.media}
            reverse={section.reversed || index % 2 === 1}
          />
        );
      })}

      <BeforeAfterGrid items={config.beforeAfter} />

      <TestimonialsCarousel testimonials={config.testimonials} />

      <IntegrationsStrip integrations={config.integrations} />

      <PricingRibbon config={config.pricing} />

      <FaqAccordion faqs={config.faqs} />

      <RelatedSolutions currentIndustry={config.industry} />

      <FinalCta
        title={t('solutions.template.finalCta.title')}
        subtitle={t('solutions.template.finalCta.subtitle')}
        primaryCta={{ label: t('solutions.template.finalCta.primaryLabel'), href: "/signup" }}
        secondaryCta={{ label: t('solutions.template.finalCta.secondaryLabel'), href: "/demo" }}
      />

      <StickyCompare />
    </div>
  );
}
