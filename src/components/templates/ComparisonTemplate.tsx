import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, X, ArrowRight } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface Feature {
  name: string;
  neono: boolean | string;
  competitor: boolean | string;
  highlight?: boolean;
}

interface ComparisonProps {
  competitor: {
    name: string;
    tagline: string;
    logo?: string;
  };
  seo: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    painPoints: string[];
  };
  pricing: {
    neono: string;
    competitor: string;
    savingsAnnual?: string;
  };
  features: Feature[];
  testimonial?: {
    quote: string;
    author: string;
    business: string;
    switchedFrom: string;
  };
  uniqueDifferentiators: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export default function ComparisonTemplate({ 
  competitor, 
  seo, 
  hero, 
  pricing, 
  features, 
  testimonial,
  uniqueDifferentiators 
}: ComparisonProps) {
  const { t } = useI18n();
  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": `NeonO vs ${competitor.name}`,
            "description": `Compare NeonO and ${competitor.name} salon management software features and pricing`,
            "brand": {
              "@type": "Brand",
              "name": "NeonO"
            },
            "offers": {
              "@type": "Offer",
              "price": pricing.neono.replace(/[^0-9.]/g, ''),
              "priceCurrency": "CAD",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(240,89%,73%)] to-[hsl(165,82%,49%)] text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-medium mb-4 opacity-90 uppercase tracking-wide">
              NeonO vs {competitor.name}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              {hero.headline}
            </h1>
            <p className="text-xl opacity-90 mb-8 font-display">
              {hero.subheadline}
            </p>
            
            {/* Pain Points */}
            <div className="space-y-3">
              {hero.painPoints.map((point, idx) => (
                <div key={idx} className="flex items-start">
                  <X className="w-5 h-5 mr-2 mt-1 flex-shrink-0 opacity-75" />
                  <span className="opacity-90">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="/signup"
                className="inline-flex items-center px-8 py-4 bg-white text-[hsl(240,89%,73%)] rounded-lg font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                {t('compareTemplate.switchToNeono')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[hsl(215,85%,8%)] font-display">
            {t('compareTemplate.pricingTitle')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* NeonO Pricing */}
            <div className="border-2 border-[hsl(240,89%,73%)] rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[hsl(165,82%,49%)] text-white px-4 py-1 rounded-full text-sm font-semibold">
                {t('compareTemplate.recommended')}
              </div>
              <h3 className="text-2xl font-bold mb-2">NeonO</h3>
              <div className="text-4xl font-bold text-[hsl(240,89%,73%)] mb-4">
                {pricing.neono}
              </div>
              <p className="text-gray-600 mb-6">
                {t('compareTemplate.neonoDesc')}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm">
                  <Check className="w-5 h-5 text-[hsl(165,82%,49%)] mr-2 flex-shrink-0" />
                  <span>{t('compareTemplate.allFeaturesIncluded')}</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-5 h-5 text-[hsl(165,82%,49%)] mr-2 flex-shrink-0" />
                  <span>{t('compareTemplate.unlimitedChairs')}</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-5 h-5 text-[hsl(165,82%,49%)] mr-2 flex-shrink-0" />
                  <span>{t('compareTemplate.supportIncluded')}</span>
                </li>
              </ul>
              <a
                href="/signup"
                className="block w-full text-center bg-[hsl(240,89%,73%)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                {t('compareTemplate.startFreeTrial')}
              </a>
            </div>

            {/* Competitor Pricing */}
            <div className="border-2 border-gray-200 rounded-2xl p-8 relative opacity-75">
              <h3 className="text-2xl font-bold mb-2">{competitor.name}</h3>
              <div className="text-4xl font-bold text-gray-700 mb-4">
                {pricing.competitor}
              </div>
              <p className="text-gray-600 mb-6">
                {t('compareTemplate.competitorDesc')}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm">
                  <X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                  <span>{t('compareTemplate.paidAddons')}</span>
                </li>
                <li className="flex items-start text-sm">
                  <X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                  <span>{t('compareTemplate.expensivePricing')}</span>
                </li>
                <li className="flex items-start text-sm">
                  <X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                  <span>{t('compareTemplate.supportExtra')}</span>
                </li>
              </ul>
              {pricing.savingsAnnual && (
                <div className="bg-[hsl(165,82%,49%)]/10 border border-[hsl(165,82%,49%)]/30 rounded-lg p-4 text-center">
                  <p className="text-sm font-semibold text-[hsl(215,85%,8%)]">
                    {t('compareTemplate.saveWithNeono').replace('{{amount}}', pricing.savingsAnnual || '')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[hsl(215,85%,8%)] font-display">
            {t('compareTemplate.featureComparison')}
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-4 font-semibold">{t('compareTemplate.feature')}</th>
                  <th className="text-center p-4 font-semibold text-[hsl(240,89%,73%)]">NeonO</th>
                  <th className="text-center p-4 font-semibold">{competitor.name}</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-t ${feature.highlight ? 'bg-[hsl(240,89%,73%)]/5' : ''}`}
                  >
                    <td className="p-4 font-medium">{feature.name}</td>
                    <td className="p-4 text-center">
                      {typeof feature.neono === 'boolean' ? (
                        feature.neono ? (
                          <Check className="w-6 h-6 text-[hsl(165,82%,49%)] mx-auto" />
                        ) : (
                          <X className="w-6 h-6 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-gray-700">{feature.neono}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof feature.competitor === 'boolean' ? (
                        feature.competitor ? (
                          <Check className="w-6 h-6 text-gray-400 mx-auto" />
                        ) : (
                          <X className="w-6 h-6 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-gray-600">{feature.competitor}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Unique Differentiators */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[hsl(215,85%,8%)] font-display">
            {t('compareTemplate.whySalonsChoose').replace('{{competitor}}', competitor.name)}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {uniqueDifferentiators.map((diff, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-[hsl(240,89%,73%)]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">{diff.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{diff.title}</h3>
                <p className="text-gray-600">{diff.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial (if provided) */}
      {testimonial && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
              <p className="text-lg md:text-xl text-gray-700 mb-6 font-display">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[hsl(240,89%,73%)] to-[hsl(165,82%,49%)] rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.business}</p>
                  <p className="text-xs text-gray-500">{t('compareTemplate.switchedFrom').replace('{{provider}}', testimonial.switchedFrom)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[hsl(240,89%,73%)] to-[hsl(165,82%,49%)] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
            {t('compareTemplate.readyToSwitch')}
          </h2>
          <p className="text-xl opacity-90 mb-8 font-display">
            {t('compareTemplate.joinThousands').replace('{{competitor}}', competitor.name)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[hsl(240,89%,73%)] rounded-lg font-semibold hover:shadow-2xl transition-all"
            >
              {t('compareTemplate.startFreeTrial')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[hsl(240,89%,73%)] transition-all"
            >
              {t('compareTemplate.bookDemo')}
            </a>
          </div>
          <p className="text-sm opacity-75 mt-6">
            {t('compareTemplate.trialInfo')}
          </p>
        </div>
      </section>
    </>
  );
}
