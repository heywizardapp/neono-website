import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, CreditCard, Wifi, Battery, Printer, Shield, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';
import { FaqAccordion } from '@/components/FaqAccordion';
import { HARDWARE } from '@/config/pricing';

const features = [
  {
    icon: Smartphone,
    title: 'Portable & Wireless',
    description: 'Take payments anywhere in your salon. No cables, no hassle. Complete mobility for tableside checkout.',
  },
  {
    icon: Battery,
    title: 'All-Day Battery',
    description: 'Process hundreds of transactions on a single charge. Fast USB-C charging gets you back to 80% in 90 minutes.',
  },
  {
    icon: Printer,
    title: 'Built-in Receipt Printer',
    description: 'Print receipts on the go. No need for external printers or bulky accessories.',
  },
  {
    icon: Wifi,
    title: '4G + Wi-Fi Connectivity',
    description: 'Always-on connectivity with 4G cellular and Wi-Fi. Never lose a sale due to network issues.',
  },
  {
    icon: CreditCard,
    title: 'All Payment Methods',
    description: 'Accept tap-to-pay, chip cards, magnetic stripe, Apple Pay, Google Pay, and mobile wallets.',
  },
  {
    icon: Shield,
    title: 'Rugged & Secure',
    description: 'Built to withstand drops and spills. PCI-DSS compliant with end-to-end encryption.',
  },
];

const specs = [
  { label: 'Display', value: '5" color touchscreen' },
  { label: 'Connectivity', value: '4G LTE, Wi-Fi, Bluetooth' },
  { label: 'Printer', value: 'Built-in thermal, 58mm' },
  { label: 'Battery', value: 'All-day, USB-C fast charge' },
  { label: 'Payments', value: 'NFC, EMV chip, magnetic stripe' },
  { label: 'Dimensions', value: '7.3" × 3.2" × 2.5"' },
  { label: 'Weight', value: '1.3 lbs (with battery)' },
  { label: 'Certifications', value: 'PCI PTS 6.x, EMV L1/L2' },
];

const whatsIncluded = [
  'Stripe WisePOS E device',
  'Rechargeable battery (installed)',
  'USB-C charging cable',
  'Power adapter',
  'Quick start guide',
  '1-year warranty',
  'Free software updates',
];

const faqs = [
  {
    q: 'Is the WisePOS E compatible with NeonO?',
    a: 'Absolutely! The WisePOS E is fully integrated with NeonO POS software. Connect it to your account and start taking payments anywhere.',
  },
  {
    q: 'Does it need a cellular plan?',
    a: 'No! The WisePOS E includes built-in 4G connectivity at no additional cost. You can also connect via Wi-Fi for even faster processing.',
  },
  {
    q: 'How long does the battery last?',
    a: 'The battery lasts all day under normal use (200+ transactions). Fast USB-C charging gets you to 80% in just 90 minutes.',
  },
  {
    q: 'Can I use my own receipt paper?',
    a: 'Yes! The WisePOS E uses standard 58mm thermal receipt paper, available from any office supply store or online.',
  },
  {
    q: 'Is it waterproof?',
    a: 'The WisePOS E is splash-resistant and built to handle spills, but it\'s not fully waterproof. It\'s designed to withstand the demands of a busy salon environment.',
  },
  {
    q: 'What if I need a replacement?',
    a: 'All WisePOS E terminals come with a 1-year warranty. If you have any hardware issues, we\'ll troubleshoot or arrange a replacement.',
  },
];

export default function Wisepos() {
  return (
    <>
      <SEOHead
        title="Stripe WisePOS E — Portable All-in-One Payment Terminal"
        description="Wireless portable payment terminal with all-day battery and built-in printer. Accept payments anywhere with the Stripe WisePOS E."
        path="/products/pos/hardware/wisepos"
        keywords="Stripe WisePOS E, portable payment terminal, wireless card reader, mobile POS, battery powered terminal"
        structuredData={[
          {
            type: 'breadcrumb',
            data: generateStructuredData('breadcrumb', {
              crumbs: [
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: 'Point of Sale', href: '/products/pos' },
                { label: 'Hardware', href: '/products/pos/hardware' },
                { label: 'WisePOS E', href: '/products/pos/hardware/wisepos' },
              ],
            }),
          },
          {
            type: 'product',
            data: generateStructuredData('product', {
              name: 'Stripe WisePOS E',
              description: 'Portable all-in-one payment terminal with battery and built-in printer',
              price: 299,
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
                  <Smartphone className="h-3 w-3 mr-1" />
                  Portable & Wireless
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                  Stripe WisePOS E
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  The portable all-in-one payment terminal with all-day battery and built-in printer. 
                  Perfect for mobile stylists, booth renters, and tableside checkout.
                </p>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-5xl font-bold text-primary">{HARDWARE.wisePosE.priceDisplay}</span>
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
                <div className="aspect-square bg-gradient-to-br from-accent/20 to-mint/20 rounded-3xl flex items-center justify-center p-12">
                  <Smartphone className="h-full w-full text-muted-foreground/20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Take payments anywhere
              </h2>
              <p className="text-lg text-muted-foreground font-serif italic">
                Everything you need in one portable device
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
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
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
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
              Perfect for mobile professionals
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Mobile Stylists</CardTitle>
                  <CardDescription>
                    Take payments at client homes or events. No Wi-Fi needed with built-in 4G connectivity.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Booth Renters</CardTitle>
                  <CardDescription>
                    Run your own payments independently. Keep your earnings separate with your own device.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Tableside Checkout</CardTitle>
                  <CardDescription>
                    Process payments at the chair for a seamless client experience. No trip to the front desk.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                        <span className="text-muted-foreground">Cellular data</span>
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

              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                  Seamlessly integrated with NeonO
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  The WisePOS E works perfectly with NeonO POS software. Connect it to your account 
                  and start accepting payments immediately—no technical setup required.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <div className="font-semibold">Instant Activation</div>
                      <div className="text-muted-foreground">Turn it on and connect—that's it</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <div className="font-semibold">Real-time Sync</div>
                      <div className="text-muted-foreground">All transactions sync to your dashboard instantly</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <div className="font-semibold">Same-day Payouts</div>
                      <div className="text-muted-foreground">Money in your account the same business day</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Take your checkout mobile
            </h2>
            <p className="text-xl text-muted-foreground mb-8 font-serif italic">
              Order the WisePOS E and start accepting payments anywhere
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">Order Now — {HARDWARE.wisePosE.priceDisplay}</Link>
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
