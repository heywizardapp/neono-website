import { Hero } from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, CreditCard, Mail, Globe, BarChart3, Smartphone, ArrowRight, Users, Zap, Shield, Sparkles, Gift, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';

const products = [
  {
    icon: Palette,
    name: 'Colour Studio',
    description: 'Track colour costs, manage formulas, and eliminate product waste.',
    href: '/products/colour-studio',
    color: 'text-mint',
    badge: 'Flagship',
    features: ['Formula management', 'Cost tracking per service', 'Waste reduction', 'Kiosk self-checkout']
  },
  {
    icon: Users,
    name: 'Staff Management',
    description: 'Manage schedules, permissions, commissions, and team performance.',
    href: '/products/staff-management',
    color: 'text-primary',
    features: ['Role-based access', 'Commission tracking', 'Schedule management', 'Performance metrics']
  },
  {
    icon: Calendar,
    name: 'Appointments',
    description: 'Smart scheduling with real-time availability and automated reminders.',
    href: '/products/appointments',
    color: 'text-accent',
    features: ['Real-time availability', 'Automated reminders', 'Multi-location support', 'Recurring appointments']
  },
  {
    icon: Globe,
    name: 'Online Booking',
    description: '24/7 online booking with marketplace exposure.',
    href: '/products/online-booking',
    color: 'text-mint',
    features: ['Marketplace listing', 'Real-time booking', 'Service packages', 'Gift cards']
  },
  {
    icon: Mail,
    name: 'Marketing Suite',
    description: 'Email, SMS, social media, Google Business—all in one platform.',
    href: '/products/marketing',
    color: 'text-lavender',
    features: ['Email & SMS campaigns', 'Social scheduling', 'Google Business', 'AI content generation']
  },
  {
    icon: Gift,
    name: 'Loyalty & Gift Cards',
    description: 'Reward programs and digital gift cards—included free.',
    href: '/products/loyalty',
    color: 'text-primary',
    features: ['Points per dollar', 'Reward tiers', 'Digital gift cards', 'Achievement badges']
  },
  {
    icon: Sparkles,
    name: 'AI',
    description: 'AI-powered automations and intelligent business insights.',
    href: '/products/ai',
    color: 'text-primary',
    features: ['Smart scheduling', 'Predictive analytics', 'Automated responses', 'Revenue forecasting']
  },
  {
    icon: Smartphone,
    name: 'Landing Page Builder',
    description: 'Build beautiful websites and link-in-bio pages in minutes.',
    href: '/products/landing-page-builder',
    color: 'text-accent',
    features: ['Drag & drop builder', 'Mobile optimized', 'SEO ready', 'Social integration']
  },
  {
    icon: BarChart3,
    name: 'Analytics',
    description: 'Role-based dashboards with real-time business insights.',
    href: '/products/analytics',
    color: 'text-mint',
    features: ['Revenue analytics', 'Staff performance', 'Custom reports', 'Export capabilities']
  },
  {
    icon: CreditCard,
    name: 'PoS',
    description: 'Fast payments, tip splitting, and instant payouts.',
    href: '/products/pos',
    color: 'text-lavender',
    features: ['Contactless payments', 'Tip splitting', 'Same-day payouts', 'Inventory tracking']
  },
];

const integrations = [
  { name: 'QuickBooks', logo: 'QB' },
  { name: 'Stripe', logo: 'ST' },
  { name: 'Square', logo: 'SQ' },
  { name: 'Google', logo: 'GO' },
  { name: 'Facebook', logo: 'FB' },
  { name: 'Instagram', logo: 'IG' },
  { name: 'Mailchimp', logo: 'MC' },
  { name: 'Klaviyo', logo: 'KL' },
];

const benefits = [
  {
    icon: Users,
    title: 'Built for Teams',
    description: 'Role-based permissions, staff scheduling, and team performance tracking.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Cloud-native infrastructure ensures your business never slows down.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption, PCI compliance, and regular security audits.'
  },
];

export default function ProductsIndex() {
  return (
    <>
      <SEOHead
        title="Products — NeonO Business Management Features"
        description="Explore NeonO's comprehensive business management features: appointments, POS & payments, marketing automation, analytics, and more."
        path="/products"
        keywords="salon products, barbershop tools, beauty software features, appointment system"
        structuredData={[
          {
            type: 'breadcrumb',
            data: generateStructuredData('breadcrumb', {
              crumbs: [
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" }
              ]
            })
          }
        ]}
      />
      <div className="min-h-screen">
      <Hero
        title="One platform. Endless possibilities."
        subtitle="Everything you need to run a modern beauty and wellness business. From booking to analytics, all integrated seamlessly."
        primaryCta={{ text: "Start Free Trial", href: "/signup" }}
        secondaryCta={{ text: "Watch Demo", href: "/demo" }}
        showStats={false}
      />

      {/* Products Grid */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
              Powerful tools, beautiful design
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Each product is thoughtfully designed to work together, giving you a complete business management solution.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Card key={product.name} className={`feature-card group ${('badge' in product) ? 'ring-2 ring-primary/20' : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-card ${product.color}`}>
                      <product.icon className="h-6 w-6" />
                    </div>
                    {('badge' in product) && (
                      <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
                        {(product as any).badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="ghost" className="w-full group/btn" asChild>
                    <Link to={product.href}>
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 lg:py-32 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
              How it works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get up and running in minutes with our simple 3-step process.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-hero text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold">Set up your business</h3>
              <p className="text-muted-foreground">
                Add your services, staff, and availability. Our setup wizard guides you through everything in under 10 minutes.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-hero text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold">Connect your tools</h3>
              <p className="text-muted-foreground">
                Sync with your existing payment processor, accounting software, and marketing tools. Everything works together.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-hero text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold">Start taking bookings</h3>
              <p className="text-muted-foreground">
                Share your booking link, launch your website, and watch your business grow with automated marketing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
              Integrates with your favorite tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect NeonO with the apps you already use to create a seamless workflow.
            </p>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
            {integrations.map((integration) => (
              <div key={integration.name} className="flex flex-col items-center space-y-2">
                <div className="h-16 w-16 rounded-xl bg-gradient-card border border-border/40 flex items-center justify-center font-bold text-primary">
                  {integration.logo}
                </div>
                <span className="text-xs text-muted-foreground text-center">{integration.name}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link to="/integrations">
                View all integrations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-32 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
              Why businesses choose NeonO
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={benefit.title} className="text-center space-y-4" style={{ animationDelay: `${index * 200}ms` }}>
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${index === 0 ? 'text-primary' : index === 1 ? 'text-accent' : 'text-mint'} bg-gradient-card`}>
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32">
        <div className="container text-center">
          <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
            Ready to transform your business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of beauty and wellness businesses already using NeonO to grow faster and work smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-hero-primary" asChild>
              <Link to="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/demo">
                Watch Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}