import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, X, ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RoiMini } from '@/components/roi/RoiMini';
import { StickyCompare } from '@/components/compare/StickyCompare';
import { SEOHead, SEO_PRESETS } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const pricingPlans = [
  {
    name: 'Starter',
    monthlyPrice: 29,
    annualPrice: 25,
    seats: 2,
    description: 'Perfect for small teams getting started',
    features: [
      { name: '2 seats included', included: true },
      { name: 'Online booking widget', included: true },
      { name: 'Basic POS & payments', included: true },
      { name: 'SMS notifications', included: true },
      { name: 'Free website & link-in-bio', included: true },
      { name: 'Email support', included: true },
      { name: 'Advanced analytics', included: false },
      { name: 'Marketing automation', included: false },
      { name: 'AI insights', included: false },
      { name: 'Priority support', included: false },
    ]
  },
  {
    name: 'Growth',
    monthlyPrice: 59,
    annualPrice: 50,
    seats: 5,
    description: 'For growing businesses that want to thrive',
    popular: true,
    features: [
      { name: '5 seats included', included: true },
      { name: 'Online booking widget', included: true },
      { name: 'Advanced POS & payments', included: true },
      { name: 'SMS & email campaigns', included: true },
      { name: 'Professional website & link-in-bio', included: true },
      { name: 'Advanced analytics & reports', included: true },
      { name: 'Marketing automation', included: true },
      { name: 'AI insights & recommendations', included: true },
      { name: 'Priority support', included: true },
      { name: 'Custom integrations (API)', included: true },
    ]
  }
];

const faqs = [
  {
    question: 'What counts as a "seat"?',
    answer: 'A seat is any staff member who needs to access the system - stylists, barbers, front desk, managers, etc. Each person who books appointments or processes payments needs their own seat.'
  },
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we\'ll prorate your billing accordingly.'
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No setup fees, ever. We also include free data migration from your existing system and white-glove onboarding for Growth plans.'
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
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <>
      <SEOHead
        {...SEO_PRESETS.pricing}
        path="/pricing"
        structuredData={[
          {
            type: 'faq',
            data: generateStructuredData('faqPage', { faqs })
          }
        ]}
      />
      <div className="min-h-screen">
      <Hero
        title="Simple, transparent pricing"
        subtitle="No setup fees, no contracts, no commission on tips. Start free and scale as you grow."
        primaryCta={{ text: "Start Free Trial", href: "/signup" }}
        secondaryCta={{ text: "Talk to Sales", href: "/contact" }}
        showStats={false}
      />

      {/* Pricing Plans */}
      <section className="py-20 lg:py-32">
        <div className="container">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            <Badge variant="secondary" className="ml-2">
              Save 15%
            </Badge>
          </div>

          {/* Plans */}
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={`hover-lift ${plan.popular ? 'ring-2 ring-primary shadow-glow relative' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="default" className="px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  
                  <div className="space-y-2 pt-4">
                    <div className="text-4xl font-bold">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      <span className="text-lg font-normal text-muted-foreground">/mo</span>
                    </div>
                    {isAnnual && (
                      <div className="text-sm text-muted-foreground">
                        <span className="line-through">${plan.monthlyPrice}/mo</span> • Billed annually
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground">
                      {plan.seats} seats included
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <Link to="/signup">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                      What's included:
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature.name} className="flex items-center space-x-2 text-sm">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className={feature.included ? '' : 'text-muted-foreground'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12 space-y-4">
            <div className="bg-gradient-card border border-border/40 rounded-2xl p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold mb-2">Additional seats: $9.99/seat/month</h3>
              <p className="text-sm text-muted-foreground">
                SMS, online cart, website & link-in-bio, QuickBooks sync, and AI are included in all plans.
              </p>
            </div>
            
            <p className="text-sm text-muted-foreground">
              All plans include a 14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 lg:py-32 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
              Compare all features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See exactly what's included in each plan to make the right choice for your business.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-3 gap-4 p-4 bg-card rounded-2xl border border-border/40 shadow-soft">
                {/* Header */}
                <div className="font-semibold">Features</div>
                <div className="text-center font-semibold">Starter</div>
                <div className="text-center font-semibold">Growth</div>

                {/* Features */}
                {[
                  { name: 'Staff seats', starter: '2 included', growth: '5 included' },
                  { name: 'Online booking', starter: true, growth: true },
                  { name: 'POS & payments', starter: 'Basic', growth: 'Advanced' },
                  { name: 'SMS notifications', starter: true, growth: true },
                  { name: 'Email campaigns', starter: false, growth: true },
                  { name: 'Website & link-in-bio', starter: 'Free', growth: 'Professional' },
                  { name: 'Analytics', starter: 'Basic', growth: 'Advanced' },
                  { name: 'Marketing automation', starter: false, growth: true },
                  { name: 'AI insights', starter: false, growth: true },
                  { name: 'Priority support', starter: false, growth: true },
                  { name: 'API access', starter: false, growth: true },
                ].map((feature, index) => (
                  <div key={feature.name} className={`grid grid-cols-3 col-span-3 gap-4 py-3 ${index > 0 ? 'border-t border-border/20' : ''}`}>
                    <div className="font-medium">{feature.name}</div>
                    <div className="text-center">
                      {typeof feature.starter === 'boolean' ? (
                        feature.starter ? (
                          <Check className="h-4 w-4 text-primary mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        feature.starter
                      )}
                    </div>
                    <div className="text-center">
                      {typeof feature.growth === 'boolean' ? (
                        feature.growth ? (
                          <Check className="h-4 w-4 text-primary mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        feature.growth
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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