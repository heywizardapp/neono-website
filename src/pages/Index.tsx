import { Hero } from '@/components/Hero';
import { FeatureGrid } from '@/components/FeatureGrid';
import { LogosMarquee } from '@/components/LogosMarquee';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    name: 'Sarah Martinez',
    business: 'Studio Twelve',
    industry: 'Hair Salon',
    rating: 5,
    quote: '+18% repeat bookings in 60 days using SMS automations. The scheduling is so intuitive.',
    avatar: 'SM'
  },
  {
    name: 'Marcus Johnson',
    business: 'Oak & Ash Barbers',
    industry: 'Barbershop',
    rating: 5,
    quote: 'Saved $80/mo by ditching add-ons; faster checkouts. Our customers love the tip splitting.',
    avatar: 'MJ'
  },
  {
    name: 'Emily Chen',
    business: 'Glow Aesthetics',
    industry: 'Med Spa',
    rating: 5,
    quote: 'Filled weekday gaps with website booking & promos. The analytics show exactly what works.',
    avatar: 'EC'
  }
];

const pricingPlans = [
  {
    name: 'Starter',
    price: 29,
    seats: 2,
    description: 'Perfect for small teams getting started',
    features: ['2 seats included', 'Online booking', 'Basic POS', 'SMS & Email', 'Free website']
  },
  {
    name: 'Growth',
    price: 59,
    seats: 5,
    description: 'For growing businesses',
    features: ['5 seats included', 'Advanced analytics', 'Marketing automation', 'AI insights', 'Priority support'],
    popular: true
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero
        title="Run your salon or barbershop on one platform."
        subtitle="Appointments, POS, marketing, website, and AI—built in. Start free, grow fast."
      />

      <LogosMarquee />

      <FeatureGrid />

      {/* Product Highlights */}
      <section className="py-20 lg:py-32 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
              See NeonO in action
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From booking to payment, every step is designed to delight your customers and streamline your operations.
            </p>
          </div>

          <div className="grid gap-16 lg:gap-24">
            {/* Appointments Demo */}
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <Badge variant="secondary" className="w-fit">
                  Smart Scheduling
                </Badge>
                <h3 className="text-2xl font-display font-bold">
                  Appointments that work around your business
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Block booking, walk-in management, staff schedules, and room assignments. 
                  Your calendar adapts to how you actually work.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/products/appointments">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="aspect-[4/3] rounded-2xl bg-gradient-card border border-border/40 shadow-large p-6">
                <div className="h-full w-full rounded-xl bg-gradient-hero/5 border border-border/20 p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Today's Schedule</div>
                      <div className="text-xs text-muted-foreground">3 staff • 12 appointments</div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-8 bg-primary/20 rounded-lg flex items-center px-3 text-xs">9:00 - Sarah • Cut & Color</div>
                      <div className="h-8 bg-accent/20 rounded-lg flex items-center px-3 text-xs">10:30 - Mike • Beard Trim</div>
                      <div className="h-8 bg-mint/20 rounded-lg flex items-center px-3 text-xs">11:00 - Lisa • Facial</div>
                      <div className="h-6 bg-slate-100 rounded-lg" />
                      <div className="h-6 bg-slate-100 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* POS Demo */}
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="lg:order-2 space-y-6">
                <Badge variant="secondary" className="w-fit">
                  Fast Payments
                </Badge>
                <h3 className="text-2xl font-display font-bold">
                  Checkout in seconds, not minutes
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tap to pay, split tips instantly, and get paid the same day. 
                  No hidden fees on tips—what your team earns, they keep.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/products/pos">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="lg:order-1 aspect-[4/3] rounded-2xl bg-gradient-card border border-border/40 shadow-large p-6">
                <div className="h-full w-full rounded-xl bg-gradient-hero/5 border border-border/20 p-4">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">$127.50</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Cut & Style</span>
                        <span>$85.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Deep Conditioning</span>
                        <span>$25.00</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium">
                        <span>Tip (15%)</span>
                        <span>$17.50</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="h-10 bg-primary/20 rounded-lg flex items-center justify-center text-xs">💳 Tap</div>
                      <div className="h-10 bg-accent/20 rounded-lg flex items-center justify-center text-xs">📱 Wallet</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
              <span className="text-sm font-medium ml-2">4.9/5 from 2,847 reviews</span>
            </div>
            <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
              Loved by business owners everywhere
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="hover-lift">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-hero flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-sm">{testimonial.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {testimonial.business} • {testimonial.industry}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 lg:py-32 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No setup fees, no long-term contracts. Start free and scale as you grow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={`hover-lift ${plan.popular ? 'ring-2 ring-primary shadow-glow' : ''}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </div>
                    {plan.popular && (
                      <Badge variant="default">Most Popular</Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">
                      ${plan.price}
                      <span className="text-lg font-normal text-muted-foreground">/mo</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {plan.seats} seats included
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                    <Link to="/signup">Start Free Trial</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Additional seats: $9.99/seat/month
            </p>
            <Button variant="ghost" asChild>
              <Link to="/pricing">
                See full pricing details <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32">
        <div className="container text-center">
          <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
            Ready to grow your business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 50,000+ beauty and wellness businesses already using NeonO to streamline operations and boost revenue.
          </p>
          <Button size="lg" className="btn-hero-primary" asChild>
            <Link to="/signup">
              Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
