import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, CreditCard, Wifi, Monitor, Printer, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';
import { FaqAccordion } from '@/components/FaqAccordion';
import { HARDWARE } from '@/config/pricing';

const features = [
  {
    icon: Monitor,
    title: '5.5" Touchscreen Display',
    description: 'Vibrant, responsive touchscreen for easy navigation and professional customer interactions.',
  },
  {
    icon: CreditCard,
    title: 'All Payment Methods',
    description: 'Accept tap-to-pay, chip cards, magnetic stripe, Apple Pay, and Google Pay.',
  },
  {
    icon: Printer,
    title: 'Built-in Receipt Printer',
    description: 'Fast thermal printer built right in. Print receipts instantly without external hardware.',
  },
  {
    icon: Wifi,
    title: 'Dual Connectivity',
    description: 'Connect via Wi-Fi or Ethernet for maximum reliability. Automatic failover keeps you running.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'PCI-DSS compliant with end-to-end encryption. Bank-level security for every transaction.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process payments in under 2 seconds. No more awkward waiting at checkout.',
  },
];

const specs = [
  { label: 'Display', value: '5.5" color touchscreen' },
  { label: 'Connectivity', value: 'Wi-Fi (2.4/5GHz), Ethernet' },
  { label: 'Printer', value: 'Built-in thermal, 58mm' },
  { label: 'Payments', value: 'NFC, EMV chip, magnetic stripe' },
  { label: 'Dimensions', value: '7.6" × 3.1" × 2.4"' },
  { label: 'Weight', value: '1.1 lbs' },
  { label: 'Power', value: 'USB-C, AC adapter included' },
  { label: 'Certifications', value: 'PCI PTS 5.x, EMV L1/L2' },
];

const whatsIncluded = [
  'Stripe Terminal S700 device',
  'Power adapter and USB-C cable',
  'Ethernet cable',
  'Quick start guide',
  '1-year warranty',
  'Free software updates',
];

const faqs = [
  {
    q: 'Is the S700 compatible with NeonO?',
    a: 'Yes! The S700 is pre-configured to work seamlessly with NeonO POS software. Just connect it to your account and start accepting payments.',
  },
  {
    q: 'What are the processing fees?',
    a: 'Processing is handled by Stripe at 2.6% + $0.10 per transaction for card payments. No monthly fees, setup fees, or hidden charges. You only pay when you process a transaction.',
  },
  {
    q: 'Does it work offline?',
    a: 'The S700 requires an internet connection to process payments. It supports both Wi-Fi and Ethernet, with automatic failover to keep you connected.',
  },
  {
    q: 'Can I use my own receipt paper?',
    a: 'Yes! The S700 uses standard 58mm thermal receipt paper, available from any office supply store or online retailer.',
  },
  {
    q: 'What if something breaks?',
    a: 'All S700 terminals come with a 1-year warranty. If you have any issues, our support team will help troubleshoot or arrange a replacement.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Orders typically ship within 1-2 business days and arrive in 3-5 business days via standard shipping. Express shipping is available at checkout.',
  },
];

export default function S700() {
  return (
    <>
      <SEOHead
        title="Stripe Terminal S700 — Premium Countertop Payment Terminal"
        description="Professional countertop payment terminal with touchscreen display and built-in printer. Accept all payment types with the Stripe Terminal S700."
        path="/products/pos/hardware/s700"
        keywords="Stripe Terminal S700, payment terminal, countertop card reader, POS hardware, touchscreen terminal, receipt printer"
        structuredData={[
          {
            type: 'breadcrumb',
            data: generateStructuredData('breadcrumb', {
              crumbs: [
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: 'Point of Sale', href: '/products/pos' },
                { label: 'Hardware', href: '/products/pos/hardware' },
                { label: 'S700', href: '/products/pos/hardware/s700' },
              ],
            }),
          },
          {
            type: 'product',
            data: generateStructuredData('product', {
              name: 'Stripe Terminal S700',
              description: 'Professional countertop payment terminal with touchscreen display and built-in printer',
              price: 349,
              currency: 'USD',
              availability: 'in_stock',
            }),
          },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">
                  <CreditCard className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Stripe Terminal S700
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  The premium countertop payment terminal with touchscreen display and built-in receipt printer. 
                  Professional checkout for modern salons, spas, and barbershops.
                </p>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-5xl font-bold text-primary">{HARDWARE.stripeTerminalS700.priceDisplay}</span>
                  <span className="text-muted-foreground">USD one-time</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="gap-2">
                    <Link to="/contact">
                      Order Now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/demo">Schedule a Demo</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center p-12">
                  <Monitor className="h-full w-full text-muted-foreground/20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything you need for professional checkout
              </h2>
              <p className="text-lg text-muted-foreground">
                Built for high-volume businesses that demand reliability
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specs */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Technical Specifications
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Hardware Specs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {specs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b last:border-0">
                      <span className="font-medium">{spec.label}</span>
                      <span className="text-muted-foreground text-right">{spec.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {whatsIncluded.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Seamlessly integrated with NeonO
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  The S700 is pre-configured to work with NeonO POS software. Connect it to your account 
                  and you're ready to start accepting payments in minutes.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <div className="font-semibold">Automatic Setup</div>
                      <div className="text-muted-foreground">No complicated configuration required</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <div className="font-semibold">Real-time Sync</div>
                      <div className="text-muted-foreground">Transactions sync instantly to your dashboard</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <div className="font-semibold">Same-day Payouts</div>
                      <div className="text-muted-foreground">Get your money deposited the same business day</div>
                    </div>
                  </li>
                </ul>
              </div>

              <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Processing Rate</div>
                    <div className="text-3xl font-bold">2.6% + $0.10</div>
                    <div className="text-sm text-muted-foreground">per card transaction</div>
                  </div>
                  <div className="border-t pt-6">
                    <ul className="space-y-3 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Monthly fees</span>
                        <span className="font-semibold">$0</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Setup fees</span>
                        <span className="font-semibold">$0</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Hidden charges</span>
                        <span className="font-semibold">$0</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Payout speed</span>
                        <span className="font-semibold">Same day</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to upgrade your checkout?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Order the S700 today and start accepting payments like a pro
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">Order Now — {HARDWARE.stripeTerminalS700.priceDisplay}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/products/pos/hardware">View All Terminals</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
