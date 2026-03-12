import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, CreditCard, Bluetooth, Smartphone, Zap, Shield, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';
import { FaqAccordion } from '@/components/FaqAccordion';
import { HARDWARE } from '@/config/pricing';

const features = [
  {
    icon: Smartphone,
    title: 'Works with Your Phone',
    description: 'Connects to your iOS or Android device via Bluetooth. No dedicated terminal needed.',
  },
  {
    icon: CreditCard,
    title: 'Tap-to-Pay',
    description: 'Accept contactless payments including Apple Pay, Google Pay, and tap credit/debit cards.',
  },
  {
    icon: Zap,
    title: 'Ultra Compact',
    description: 'Pocket-sized and lightweight. Take it anywhere without the bulk of a full terminal.',
  },
  {
    icon: Bluetooth,
    title: 'Wireless Connection',
    description: 'Reliable Bluetooth connectivity with your phone or tablet. No cables required.',
  },
  {
    icon: DollarSign,
    title: 'Budget Friendly',
    description: 'Professional payment acceptance at a fraction of the cost of full terminals.',
  },
  {
    icon: Shield,
    title: 'Secure & Compliant',
    description: 'PCI-DSS compliant with end-to-end encryption. Same security as full terminals.',
  },
];

const specs = [
  { label: 'Connectivity', value: 'Bluetooth' },
  { label: 'Display', value: 'Uses phone/tablet screen' },
  { label: 'Payments', value: 'Tap-to-pay only (NFC)' },
  { label: 'Dimensions', value: '2.5" × 1.5" × 0.4"' },
  { label: 'Weight', value: '1.2 oz' },
  { label: 'Power', value: 'No charging required' },
  { label: 'Compatible', value: 'iOS 13+ / Android 8+' },
  { label: 'Certifications', value: 'PCI PTS 5.x' },
];

const whatsIncluded = [
  'Contactless Card Reader device',
  'Quick start guide',
  '1-year warranty',
  'Free NeonO app',
  'Free software updates',
];

const faqs = [
  {
    q: 'Can I accept chip and swipe cards?',
    a: 'No, this reader is designed for tap-to-pay (contactless) payments only. For chip and swipe, we recommend the S700 or WisePOS E terminals.',
  },
  {
    q: 'What devices does it work with?',
    a: 'The reader works with iPhone (iOS 13+), iPad, and Android devices (Android 8+). Just download the NeonO app and connect via Bluetooth.',
  },
  {
    q: 'Does it need to be charged?',
    a: 'No! The contactless reader doesn\'t require charging. It draws minimal power from your phone or tablet via Bluetooth.',
  },
  {
    q: 'Can I print receipts?',
    a: 'The reader doesn\'t have a built-in printer. Receipts are sent digitally via email or SMS. You can also connect an external Bluetooth receipt printer if needed.',
  },
  {
    q: 'What are the processing fees?',
    a: 'Processing is 2.6% + $0.10 per transaction for card payments. No monthly fees, no setup fees, no hidden charges.',
  },
  {
    q: 'Is it good for high-volume businesses?',
    a: 'The contactless reader is perfect for booth renters, mobile stylists, or light-volume checkouts. For high-volume front desk use, we recommend the S700 terminal.',
  },
];

export default function ContactlessReader() {
  return (
    <>
      <SEOHead
        title="Contactless Card Reader — Mobile Tap-to-Pay Terminal"
        description="Affordable mobile payment reader for tap-to-pay. Accept Apple Pay, Google Pay, and contactless cards with your phone or tablet."
        path="/products/pos/hardware/contactless-reader"
        keywords="contactless card reader, tap to pay, mobile payment reader, NFC reader, Bluetooth card reader"
        structuredData={[
          {
            type: 'breadcrumb',
            data: generateStructuredData('breadcrumb', {
              crumbs: [
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: 'Point of Sale', href: '/products/pos' },
                { label: 'Hardware', href: '/products/pos/hardware' },
                { label: 'Contactless Reader', href: '/products/pos/hardware/contactless-reader' },
              ],
            }),
          },
          {
            type: 'product',
            data: generateStructuredData('product', {
              name: 'Contactless Card Reader',
              description: 'Mobile tap-to-pay payment reader for phones and tablets',
              price: 59,
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
                  <DollarSign className="h-3 w-3 mr-1" />
                  Budget Friendly
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Contactless Card Reader
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  The most affordable way to accept contactless payments. Turn your phone or tablet 
                  into a payment terminal with this compact tap-to-pay reader.
                </p>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-5xl font-bold text-primary">{HARDWARE.stripeReaderM2.priceDisplay}</span>
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
                <div className="aspect-square bg-gradient-to-br from-mint/20 to-lavender/20 rounded-3xl flex items-center justify-center p-12">
                  <CreditCard className="h-full w-full text-muted-foreground/20" />
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
                Simple, affordable tap-to-pay
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to accept contactless payments
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

        {/* Use Cases */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Who it's perfect for
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Booth Renters</CardTitle>
                  <CardDescription>
                    Start accepting card payments without the investment of a full terminal. Perfect for independent stylists.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Mobile Stylists</CardTitle>
                  <CardDescription>
                    Carry it in your pocket. Accept payments at client homes, events, or anywhere you work.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Side Hustlers</CardTitle>
                  <CardDescription>
                    Low upfront cost makes it easy to start your beauty business without breaking the bank.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Why choose the Contactless Reader?
                </h2>
                <p className="text-muted-foreground">
                  Compare it to our other terminals
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="font-semibold text-lg">Contactless Reader</div>
                  <div className="text-3xl font-bold text-primary">{HARDWARE.stripeReaderM2.priceDisplay}</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Tap-to-pay only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Uses your phone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>No charging needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Digital receipts</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 opacity-60">
                  <div className="font-semibold text-lg">WisePOS E</div>
                  <div className="text-3xl font-bold">{HARDWARE.wisePosE.priceDisplay}</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>All payment methods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Standalone device</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>All-day battery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Built-in printer</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 opacity-60">
                  <div className="font-semibold text-lg">S700</div>
                  <div className="text-3xl font-bold">{HARDWARE.stripeTerminalS700.priceDisplay}</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>All payment methods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Countertop terminal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Touchscreen display</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Built-in printer</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Integration */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Works seamlessly with NeonO
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Download the NeonO app, pair the reader via Bluetooth, and you're ready to accept payments. 
                  Setup takes less than 5 minutes.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <div className="font-semibold">5-Minute Setup</div>
                      <div className="text-muted-foreground">Download app, pair reader, done</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <div className="font-semibold">Real-time Sync</div>
                      <div className="text-muted-foreground">Transactions sync instantly to your account</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <div className="font-semibold">Same-day Payouts</div>
                      <div className="text-muted-foreground">Get your money the same business day</div>
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
                        <span className="text-muted-foreground">Hardware cost</span>
                        <span className="font-semibold">{HARDWARE.stripeReaderM2.priceDisplay} one-time</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Monthly fees</span>
                        <span className="font-semibold">$0</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Setup fees</span>
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
              Start accepting card payments today
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get the most affordable contactless reader for just {HARDWARE.stripeReaderM2.priceDisplay}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">Order Now — {HARDWARE.stripeReaderM2.priceDisplay}</Link>
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
