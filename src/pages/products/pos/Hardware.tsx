import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CreditCard, Smartphone, Monitor, Check, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';
import { HARDWARE } from '@/config/pricing';

const terminals = [
  {
    id: 's700',
    name: HARDWARE.stripeTerminalS700.name,
    slug: 's700',
    description: 'Premium countertop terminal with touchscreen display',
    price: HARDWARE.stripeTerminalS700.priceDisplay + ' USD',
    image: '/src/assets/placeholders/s700.webp',
    badge: 'Most Popular',
    features: [
      'Built-in touchscreen display',
      'Tap, chip, and swipe payments',
      'Wi-Fi and Ethernet connectivity',
      'Receipt printer included',
      'Premium build quality',
      'Compact countertop design',
    ],
    specs: {
      connectivity: 'Wi-Fi, Ethernet',
      display: '5.5" touchscreen',
      printer: 'Built-in thermal',
      payments: 'Tap, chip, swipe',
    },
  },
  {
    id: 'wisepos',
    name: HARDWARE.wisePosE.name,
    slug: 'wisepos',
    description: 'Portable all-in-one payment terminal',
    price: HARDWARE.wisePosE.priceDisplay + ' USD',
    image: '/src/assets/placeholders/wisepos.webp',
    badge: 'Portable',
    features: [
      'Wireless & portable',
      'All-day battery life',
      'Built-in receipt printer',
      'Tap, chip, and swipe',
      '4G & Wi-Fi connectivity',
      'Rugged & durable',
    ],
    specs: {
      connectivity: '4G, Wi-Fi, Bluetooth',
      display: '5" touchscreen',
      printer: 'Built-in thermal',
      battery: 'All-day battery',
    },
  },
  {
    id: 'contactless',
    name: 'Stripe Reader M2',
    slug: 'contactless-reader',
    description: 'Mobile tap-to-pay for on-the-go checkout',
    price: HARDWARE.stripeReaderM2.priceDisplay + ' USD',
    image: '/src/assets/placeholders/contactless.webp',
    badge: 'Budget Friendly',
    features: [
      'Connects to phone or tablet',
      'Tap-to-pay only',
      'Compact & lightweight',
      'Bluetooth connectivity',
      'Works with iOS & Android',
      'No charging required',
    ],
    specs: {
      connectivity: 'Bluetooth',
      display: 'Uses phone screen',
      printer: 'Digital receipts',
      payments: 'Tap-to-pay only',
    },
  },
];

export default function PosHardware() {
  return (
    <>
      <SEOHead
        title="POS Hardware & Payment Terminals — NeonO"
        description="Professional payment terminals for salons, spas, and barbershops. Stripe Terminal S700, WisePOS E, and contactless card readers."
        path="/products/pos/hardware"
        keywords="POS hardware, payment terminal, Stripe Terminal, S700, WisePOS, contactless reader, salon payment processing"
        structuredData={[
          {
            type: 'breadcrumb',
            data: generateStructuredData('breadcrumb', {
              crumbs: [
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: 'Point of Sale', href: '/products/pos' },
                { label: 'Hardware', href: '/products/pos/hardware' },
              ],
            }),
          },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <CreditCard className="h-3 w-3 mr-1" />
              POS Hardware
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Professional Payment Terminals
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 font-serif italic">
              Accept payments anywhere with industry-leading hardware from Stripe Terminal. Choose the right terminal for your business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/demo">
                  Schedule a Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/products/pos">View POS Software</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Terminals Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {terminals.map((terminal) => (
                <Card key={terminal.id} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                  {terminal.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge variant="default" className="bg-primary">
                        {terminal.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      <Monitor className="h-20 w-20 text-muted-foreground/20" />
                    </div>
                    <CardTitle className="text-2xl">{terminal.name}</CardTitle>
                    <CardDescription className="text-base">
                      {terminal.description}
                    </CardDescription>
                    <div className="text-3xl font-bold text-primary mt-2">
                      {terminal.price}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {terminal.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t space-y-2">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                        Specifications
                      </div>
                      {Object.entries(terminal.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground capitalize">{key}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>

                    <Button asChild className="w-full" size="lg">
                      <Link to={`/products/pos/hardware/${terminal.slug}`}>
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Compare Terminals</h2>
              <p className="text-lg text-muted-foreground font-serif italic">
                Find the perfect payment solution for your business
              </p>
            </div>

            <div className="bg-background rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">S700</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">WisePOS E</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Reader M2</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium">Price</td>
                      <td className="px-6 py-4 text-sm text-center">{HARDWARE.stripeTerminalS700.priceDisplay}</td>
                      <td className="px-6 py-4 text-sm text-center">{HARDWARE.wisePosE.priceDisplay}</td>
                      <td className="px-6 py-4 text-sm text-center">{HARDWARE.stripeReaderM2.priceDisplay}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium">Portability</td>
                      <td className="px-6 py-4 text-sm text-center">Countertop</td>
                      <td className="px-6 py-4 text-sm text-center">✅ Portable</td>
                      <td className="px-6 py-4 text-sm text-center">✅ Mobile</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium">Built-in Printer</td>
                      <td className="px-6 py-4 text-sm text-center">✅</td>
                      <td className="px-6 py-4 text-sm text-center">✅</td>
                      <td className="px-6 py-4 text-sm text-center">❌</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium">Payment Methods</td>
                      <td className="px-6 py-4 text-sm text-center">Tap, Chip, Swipe</td>
                      <td className="px-6 py-4 text-sm text-center">Tap, Chip, Swipe</td>
                      <td className="px-6 py-4 text-sm text-center">Tap Only</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium">Battery</td>
                      <td className="px-6 py-4 text-sm text-center">Wired</td>
                      <td className="px-6 py-4 text-sm text-center">✅ All-day</td>
                      <td className="px-6 py-4 text-sm text-center">No charging</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium">Best For</td>
                      <td className="px-6 py-4 text-sm text-center">Front desk</td>
                      <td className="px-6 py-4 text-sm text-center">Mobile stylists</td>
                      <td className="px-6 py-4 text-sm text-center">Basic checkout</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Why Choose NeonO Hardware</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Zap className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Seamless Integration</CardTitle>
                  <CardDescription>
                    Pre-configured to work with NeonO POS software. Plug in and start accepting payments in minutes.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Secure Payments</CardTitle>
                  <CardDescription>
                    Industry-leading security with PCI compliance, encrypted transactions, and fraud prevention built-in.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CreditCard className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Transparent Pricing</CardTitle>
                  <CardDescription>
                    One-time hardware cost, no hidden fees. Processing at 2.6% + $0.10 per transaction with same-day payouts.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to upgrade your checkout?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 font-serif italic">
              Talk to our team to find the right terminal for your business
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/demo">Schedule a Demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
