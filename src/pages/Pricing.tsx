import { useState } from 'react';
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

const independentFeatures = [
  'Online booking & scheduling',
  'Point of sale & payments',
  'Client management & history',
  'SMS & email notifications',
  'Free booking website',
  'Marketing tools & campaigns',
  'Reports & analytics',
  'Mobile app access',
  'Email support',
];

const salonFeatures = [
  'Multi-chair scheduling',
  'Staff management & permissions',
  'Commission & payroll tracking',
  'Online booking & scheduling',
  'Point of sale & payments',
  'Client management & history',
  'SMS & email marketing',
  'Free booking website',
  'Advanced reports & analytics',
  'Mobile app access',
  'Priority support',
];

const faqs = [
  {
    question: 'What\'s included in both plans?',
    answer: 'Both Independent and Salon plans include online booking, POS, client management, SMS/email marketing, a free booking website, reports, and mobile app access. Salon plans add multi-chair scheduling, staff management, and commission tracking.'
  },
  {
    question: 'How does the per-chair pricing work?',
    answer: 'Salon plans start at 2 chairs for $33.98/month. Each chair costs $16.99/month for the first 7 chairs. After that, chairs 8 and beyond are completely FREE—no additional cost as you grow. The maximum you\'ll ever pay is $118.93/month, regardless of team size.'
  },
  {
    question: 'Do I really get unlimited chairs after 7?',
    answer: 'Yes! Once you have 7 chairs, every additional chair is completely free. Whether you have 8 chairs or 50 chairs, you pay the same price: $118.93/month. This makes NeonO incredibly cost-effective for growing salons and multi-location businesses.'
  },
  {
    question: 'Can I switch between Independent and Salon plans?',
    answer: 'Yes! You can upgrade from Independent to Salon or downgrade anytime. Changes take effect immediately and we\'ll prorate your billing accordingly.'
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No setup fees, ever. We also include free data migration from your existing system and personalized onboarding.'
  },
  {
    question: 'Do you take a commission on tips?',
    answer: 'Never. Unlike other platforms, we don\'t take any percentage of tips. Your staff keeps 100% of what they earn.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We process all major credit cards, debit cards, mobile wallets (Apple Pay, Google Pay), and ACH transfers. Processing fees are industry-standard with no markup.'
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No contracts required. You can cancel anytime with 30 days notice. We believe in earning your business every month.'
  }
];

export default function Pricing() {
  const { t } = useI18n();
  const [chairCount, setChairCount] = useState(2);

  const independentPrice = 19.99;
  const pricePerChair = 16.99;
  
  // Calculate salon price with free chairs after 7
  const calculateSalonPrice = (chairs: number) => {
    const billableChairs = Math.min(chairs, 7);
    return billableChairs * pricePerChair;
  };
  
  const salonTotal = calculateSalonPrice(chairCount);
  const freeChairs = Math.max(0, chairCount - 7);
  const savings = freeChairs * pricePerChair;

  const decrementChairs = () => {
    if (chairCount > 2) setChairCount(chairCount - 1);
  };

  const incrementChairs = () => {
    if (chairCount < 50) setChairCount(chairCount + 1);
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
                { label: "Home", href: "/" },
                { label: "Pricing", href: "/pricing" }
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
                      Solo Practitioner
                    </Badge>
                    <CardTitle className="text-3xl mb-2">Independent</CardTitle>
                    <CardDescription className="text-lg">
                      Everything you need to run your independent business
                    </CardDescription>
                    
                    <div className="pt-8">
                      <div className="text-5xl font-bold">
                        ${independentPrice}
                        <span className="text-xl font-normal text-muted-foreground">/month</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        All features included • No hidden fees
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-8 flex-1 flex flex-col">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                        Everything included:
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
                        Start Free Trial
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

              {/* Salon Plan */}
              <Card className="hover-lift border-2 h-full flex flex-col">
                  <CardHeader className="text-center pb-8">
                    <Badge variant="default" className="mx-auto mb-4 w-fit">
                      Most Popular
                    </Badge>
                    <CardTitle className="text-3xl mb-2">Salon</CardTitle>
                    <CardDescription className="text-lg">
                      Perfect for teams of 2+ • Chairs 8+ are FREE
                    </CardDescription>
                    
                    <div className="pt-8 space-y-6">
                      {/* Chair Calculator */}
                      <div className="bg-gradient-card rounded-xl p-6 border border-border/40">
                        <label className="text-sm font-medium text-muted-foreground mb-4 block">
                          Number of chairs
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
                            <span>${pricePerChair} per chair/month</span>
                          ) : (
                            <div className="space-y-1">
                              <div className="font-medium text-primary">
                                First 7 chairs: ${pricePerChair}/chair
                              </div>
                              <div className="text-green-600 dark:text-green-400 font-semibold">
                                Chairs 8-{chairCount}: FREE
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Total Price */}
                      <div className="text-5xl font-bold">
                        ${salonTotal.toFixed(2)}
                        <span className="text-xl font-normal text-muted-foreground">/month</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {chairCount <= 7 
                          ? "All features included • No hidden fees"
                          : `First 7 chairs billed • ${freeChairs} additional chair${freeChairs > 1 ? 's' : ''} FREE`
                        }
                      </div>
                      
                      {chairCount > 7 && (
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                          <p className="text-xs text-green-700 dark:text-green-300 font-medium text-center">
                            🎉 You're saving ${savings.toFixed(2)}/month with free chairs!
                          </p>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-8 flex-1 flex flex-col">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                        Everything included:
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
                        Start Free Trial
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
            </div>

            {/* Trial Info */}
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                14-day free trial • No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 lg:py-32 bg-gradient-subtle">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
                Everything you need, included
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Unlike other platforms, all essential features are built-in at no extra cost.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">No Commission on Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Your team keeps 100% of their tips. Other platforms take up to 30%.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Free Booking Website</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Professional booking site included. Others charge $30-50/month extra.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SMS & Email Marketing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Automated campaigns and reminders built-in. No add-on fees.
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
              <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
                Frequently asked questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about pricing and plans.
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
                Still have questions?
              </p>
              <Button variant="outline" asChild>
                <Link to="/contact">
                  Contact Sales
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
              <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
                See your real savings
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Calculate your true monthly cost including all the essentials that competitors charge extra for.
              </p>
            </div>
            
            <div className="max-w-lg mx-auto">
              <RoiMini 
                title="Calculate your savings with NeonO"
                description="Quick estimate based on your business size and usage"
              />
            </div>
          </div>
        </section>
        
        <StickyCompare />
      </div>
    </>
  );
}
