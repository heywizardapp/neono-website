import * as React from 'react';
import { Hero } from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RoiMini } from '@/components/roi/RoiMini';
import { StickyCompare } from '@/components/compare/StickyCompare';
import { SEOHead, SEO_PRESETS } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';
import { useI18n } from '@/hooks/useI18n';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PRICING, calculateSalonPrice, MAX_SALON_PRICE_DISPLAY, MIN_SALON_PRICE_DISPLAY } from '@/config/pricing';

const independentFeatures = PRICING.independent.features;

const salonFeatures = PRICING.salon.features;

const getFaqs = (t: (key: string) => string) => [
  {
    question: t('pricing.page.faq1q'),
    answer: t('pricing.page.faq1a')
  },
  {
    question: t('pricing.page.faq2q'),
    answer: t('pricing.page.faq2a')
      .replace('{minChairs}', String(PRICING.salon.minChairs))
      .replace('{minPrice}', MIN_SALON_PRICE_DISPLAY)
      .replace('{pricePerChair}', PRICING.salon.pricePerChairDisplay)
      .replace('{maxBillableChairs}', String(PRICING.salon.maxBillableChairs))
      .replace('{maxBillableChairsPlus1}', String(PRICING.salon.maxBillableChairs + 1))
      .replace('{maxPrice}', MAX_SALON_PRICE_DISPLAY)
  },
  {
    question: t('pricing.page.faq3q'),
    answer: t('pricing.page.faq3a')
      .replace('{maxBillableChairs}', String(PRICING.salon.maxBillableChairs))
      .replace('{maxBillableChairsPlus1}', String(PRICING.salon.maxBillableChairs + 1))
      .replace('{maxChairs}', String(PRICING.salon.maxChairs))
      .replace('{maxPrice}', MAX_SALON_PRICE_DISPLAY)
  },
  {
    question: t('pricing.page.faq4q'),
    answer: t('pricing.page.faq4a')
  },
  {
    question: t('pricing.page.faq5q'),
    answer: t('pricing.page.faq5a')
  },
  {
    question: t('pricing.page.faq6q'),
    answer: t('pricing.page.faq6a')
  },
  {
    question: t('pricing.page.faq7q'),
    answer: t('pricing.page.faq7a')
  },
  {
    question: t('pricing.page.faq8q'),
    answer: t('pricing.page.faq8a')
  }
];

export default function Pricing() {
  const { t } = useI18n();
  const faqs = getFaqs(t);
  const [chairCount, setChairCount] = React.useState(PRICING.salon.minChairs);

  const independentPrice = PRICING.independent.price;
  const pricePerChair = PRICING.salon.pricePerChair;
  
  // Calculate salon price with free chairs after 7
  const { total: salonTotal, freeChairs, savings } = calculateSalonPrice(chairCount);

  const decrementChairs = () => {
    if (chairCount > PRICING.salon.minChairs) setChairCount(chairCount - 1);
  };

  const incrementChairs = () => {
    if (chairCount < PRICING.salon.maxChairs) setChairCount(chairCount + 1);
  };

  return (
    <>
      <SEOHead
        {...SEO_PRESETS.pricing}
        path="/pricing"
        structuredData={[
          {
            type: 'faq',
            data: generateStructuredData('faqPage', { faqs })
          },
          {
            type: 'breadcrumb',
            data: generateStructuredData('breadcrumb', {
              crumbs: [
                { label: t('common.home'), href: "/" },
                { label: t('common.pricing'), href: "/pricing" }
              ]
            })
          }
        ]}
      />
      <div className="min-h-screen">
        <Hero
          title={t('pricing.hero.title')}
          subtitle={t('pricing.hero.subtitle')}
          primaryCta={{ text: t('pricing.cta.trial'), href: "/signup" }}
          secondaryCta={{ text: t('pricing.cta.sales'), href: "/contact" }}
          showStats={false}
        />

        {/* Business Type Selection & Pricing */}
        <section className="py-20 lg:py-32">
          <div className="container">
            {/* Pricing Display */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
              {/* Independent Plan */}
              <Card className="hover-lift border-2 h-full flex flex-col">
                  <CardHeader className="text-center pb-8">
                    <Badge variant="secondary" className="mx-auto mb-4 w-fit">
                      {t('pricing.page.soloPractitioner')}
                    </Badge>
                    <CardTitle className="text-3xl mb-2">{t('pricing.page.independent')}</CardTitle>
                    <CardDescription className="text-lg">
                      {t('pricing.page.independentDesc')}
                    </CardDescription>
                    
                    <div className="pt-8">
                      <div className="text-5xl font-bold">
                        ${independentPrice}
                        <span className="text-xl font-normal text-muted-foreground">{t('pricing.page.month')}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        {t('pricing.page.allFeaturesNoFees')}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-8 flex-1 flex flex-col">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm tracking-wide text-muted-foreground">
                        {t('pricing.page.everythingIncluded')}
                      </h4>
                      <ul className="space-y-3">
                        {independentFeatures.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-sm">
                            <Check className="h-5 w-5 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      className="w-full mt-auto" 
                      size="lg"
                      asChild
                    >
                      <Link to="/signup">
                        {t('pricing.page.startFreeTrial')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

              {/* Salon Plan */}
              <Card className="hover-lift border-2 h-full flex flex-col">
                  <CardHeader className="text-center pb-8">
                    <Badge variant="default" className="mx-auto mb-4 w-fit">
                      {t('pricing.page.mostPopular')}
                    </Badge>
                    <CardTitle className="text-3xl mb-2">{t('pricing.page.salon')}</CardTitle>
                    <CardDescription className="text-lg">
                      {t('pricing.page.salonDesc')}
                    </CardDescription>
                    
                    <div className="pt-8 space-y-6">
                      {/* Chair Calculator */}
                      <div className="bg-gradient-card rounded-xl p-6 border border-border/40">
                        <label className="text-sm font-medium text-muted-foreground mb-4 block">
                          {t('pricing.page.numberOfChairs')}
                        </label>
                        <div className="flex items-center justify-center gap-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={decrementChairs}
                            disabled={chairCount <= 2}
                            className="h-12 w-12"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <div className="text-4xl font-bold min-w-[80px] text-center">
                            {chairCount}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={incrementChairs}
                            disabled={chairCount >= 50}
                            className="h-12 w-12"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground text-center mt-4">
                          {chairCount <= 7 ? (
                            <span>${pricePerChair} {t('pricing.page.perChairMonth')}</span>
                          ) : (
                            <div className="space-y-1">
                              <div className="font-medium text-primary">
                                {t('pricing.page.firstChairs')}: ${pricePerChair}/chair
                              </div>
                              <div className="text-green-600 dark:text-green-400 font-semibold">
                                {t('pricing.page.numberOfChairs')} 8-{chairCount}: {t('pricing.page.chairsFree')}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Total Price */}
                      <div className="text-5xl font-bold">
                        ${salonTotal.toFixed(2)}
                        <span className="text-xl font-normal text-muted-foreground">{t('pricing.page.month')}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {chairCount <= 7
                          ? t('pricing.page.allFeaturesNoFees')
                          : `${t('pricing.page.firstChairsBilled')} • ${freeChairs} ${freeChairs > 1 ? t('pricing.page.additionalChairs') : t('pricing.page.additionalChair')} ${t('pricing.page.chairsFree')}`
                        }
                      </div>
                      
                      {chairCount > 7 && (
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                          <p className="text-xs text-green-700 dark:text-green-300 font-medium text-center">
                            {t('pricing.page.savingPrefix')}${savings.toFixed(2)}{t('pricing.page.savingSuffix')}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-8 flex-1 flex flex-col">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm tracking-wide text-muted-foreground">
                        {t('pricing.page.everythingIncluded')}
                      </h4>
                      <ul className="space-y-3">
                        {salonFeatures.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-sm">
                            <Check className="h-5 w-5 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      className="w-full mt-auto" 
                      size="lg"
                      asChild
                    >
                      <Link to="/signup">
                        {t('pricing.page.startFreeTrial')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
            </div>

            {/* Trial Info */}
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                {t('pricing.page.trialInfo')}
              </p>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 lg:py-32 bg-gradient-subtle">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl mb-4">
                {t('pricing.page.whatsIncludedTitle')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-serif italic">
                {t('pricing.page.whatsIncludedSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('pricing.page.noCommission')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t('pricing.page.noCommissionDesc')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('pricing.page.freeBooking')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t('pricing.page.freeBookingDesc')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('pricing.page.smsMarketing')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t('pricing.page.smsMarketingDesc')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-32">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl mb-4">
                {t('pricing.page.faqTitle')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-serif italic">
                {t('pricing.page.faqSubtitle')}
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                {t('pricing.page.stillHaveQuestions')}
              </p>
              <Button variant="outline" asChild>
                <Link to="/contact">
                  {t('pricing.page.contactSales')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="py-20 lg:py-32 bg-gradient-subtle">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl mb-4">
                {t('pricing.page.roiTitle')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-serif italic">
                {t('pricing.page.roiSubtitle')}
              </p>
            </div>
            
            <div className="max-w-lg mx-auto">
              <RoiMini
                title={t('pricing.page.roiCalcTitle')}
                description={t('pricing.page.roiCalcDesc')}
              />
            </div>
          </div>
        </section>
        
        <StickyCompare />
      </div>
    </>
  );
}
