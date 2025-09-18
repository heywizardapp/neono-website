import { Hero } from '@/components/Hero';
import { FeatureGrid } from '@/components/FeatureGrid';
import { RealCustomerLogos } from '@/components/logos/RealCustomerLogos';
import { AdvancedShowcase } from '@/components/advanced/AdvancedShowcase';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { EnhancedTestimonials } from '@/components/enhanced/EnhancedTestimonials';
import { TrustBadges } from '@/components/trust/TrustBadges';
import { TrustSignals } from '@/components/enhanced/TrustSignals';
import { ValueProposition } from '@/components/enhanced/ValueProposition';
import { ConversionOptimizedCTA } from '@/components/cta/ConversionOptimizedCTA';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight, Check, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead, SEO_PRESETS } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';
import { IntersectionAnimation } from '@/components/advanced/IntersectionAnimations';
import { ScrollProgress } from '@/components/advanced/ScrollProgressIndicator';
import { InteractiveCard, FloatingButton } from '@/components/advanced/EnhancedInteractiveElements';
import { OptimizedInView } from '@/components/advanced/PerformanceOptimizedAnimations';
import { StickyCompare } from '@/components/compare/StickyCompare';
import { RoiMini } from '@/components/roi/RoiMini';

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
    <>
      <SEOHead
        {...SEO_PRESETS.home}
        path="/"
        structuredData={[
          {
            type: 'organization',
            data: generateStructuredData('organization', {})
          }
        ]}
      />
      <ScrollProgress />
      <FloatingButton 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="transition-all duration-300"
      >
        <ArrowRight className="w-5 h-5 rotate-[-90deg]" />
      </FloatingButton>
      <div className="min-h-screen">
      <Hero
        title="The #1 software for Salons and Spas"
        subtitle="Simple, flexible and powerful booking software for your business. Everything you need to grow and thrive."
        primaryCta={{ text: "Get Started Now", href: "/signup" }}
        secondaryCta={{ text: "Watch Demo", href: "/demo" }}
      />

      <TrustSignals />

      <ValueProposition />

      <FeatureGrid />

      {/* Enhanced Product Demo Section */}
      <section className="py-12 lg:py-16 bg-gradient-subtle">
        <div className="container">
          <IntersectionAnimation animation="fade-up">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <PlayCircle className="w-4 h-4 mr-2" />
                See it in action
              </Badge>
              <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
                From booking to payment in seconds
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Watch how NeonO transforms every step of your customer journey—from online booking 
                to checkout—into a seamless, delightful experience.
              </p>
            </div>
          </IntersectionAnimation>

          <div className="grid gap-12 lg:gap-16">
            {/* Appointments Demo - Enhanced */}
            <IntersectionAnimation animation="fade-up" delay={200}>
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-6">
                  <Badge variant="secondary" className="w-fit">
                    🗓️ Smart Scheduling
                  </Badge>
                  <h3 className="text-2xl font-display font-bold">
                    Appointments that work around your business
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Block booking, walk-in management, staff schedules, and room assignments. 
                    Your calendar adapts to how you actually work, not the other way around.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Automated waitlist & cancellation handling</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Smart buffer times between appointments</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Multi-location scheduling sync</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/products/appointments">
                      Explore Scheduling <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl bg-white border border-border/40 shadow-2xl p-6 overflow-hidden">
                    <div className="h-full w-full rounded-xl bg-gradient-to-br from-slate-50 to-white border border-border/20 p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium">Today's Schedule</div>
                          <div className="text-xs text-muted-foreground bg-green-50 text-green-700 px-2 py-1 rounded">
                            98% booked
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-12 bg-gradient-to-r from-primary/10 to-primary/20 rounded-lg flex items-center px-4 border border-primary/20">
                            <div className="w-8 h-8 rounded-full bg-primary/30 mr-3"></div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">Sarah Martinez</div>
                              <div className="text-xs text-muted-foreground">Cut & Color • 9:00 AM - 11:00 AM</div>
                            </div>
                            <div className="text-primary font-bold">$185</div>
                          </div>
                          
                          <div className="h-12 bg-gradient-to-r from-accent/10 to-accent/20 rounded-lg flex items-center px-4 border border-accent/20">
                            <div className="w-8 h-8 rounded-full bg-accent/30 mr-3"></div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">Mike Johnson</div>
                              <div className="text-xs text-muted-foreground">Beard Trim • 11:30 AM</div>
                            </div>
                            <div className="text-accent font-bold">$45</div>
                          </div>
                          
                          <div className="h-8 bg-slate-100 rounded-lg opacity-50"></div>
                          <div className="h-8 bg-slate-100 rounded-lg opacity-30"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating notification */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg border border-border/20 p-3 max-w-48">
                    <div className="text-xs font-medium text-green-700 mb-1">New booking!</div>
                    <div className="text-xs text-muted-foreground">Emma Chen just booked a facial for 2PM</div>
                  </div>
                </div>
              </div>
            </IntersectionAnimation>

            {/* POS Demo - Enhanced */}
            <IntersectionAnimation animation="fade-up" delay={400}>
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="lg:order-2 space-y-6">
                  <Badge variant="secondary" className="w-fit">
                    💳 Lightning Payments
                  </Badge>
                  <h3 className="text-2xl font-display font-bold">
                    Checkout in seconds, not minutes
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Tap to pay, split tips instantly, and get paid the same day. 
                    No hidden fees on tips—what your team earns, they keep.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Instant tip splitting across team members</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Same-day payouts with no fees</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Accept cards, cash, and digital wallets</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/products/pos">
                      Explore Payments <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="lg:order-1 relative">
                  <div className="aspect-[4/3] rounded-2xl bg-white border border-border/40 shadow-2xl p-6">
                    <div className="h-full w-full rounded-xl bg-gradient-to-br from-slate-50 to-white border border-border/20 p-6">
                      <div className="space-y-6 text-center">
                        <div>
                          <div className="text-3xl font-bold text-primary mb-1">$127.50</div>
                          <div className="text-sm text-muted-foreground">Total Amount</div>
                        </div>
                        
                        <div className="space-y-3 text-left">
                          <div className="flex justify-between text-sm border-b pb-2">
                            <span>Cut & Style</span>
                            <span>$85.00</span>
                          </div>
                          <div className="flex justify-between text-sm border-b pb-2">
                            <span>Deep Conditioning</span>
                            <span>$25.00</span>
                          </div>
                          <div className="flex justify-between text-sm font-medium text-primary">
                            <span>Tip (15%)</span>
                            <span>$17.50</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="h-12 bg-gradient-to-r from-primary/20 to-primary/30 rounded-xl flex items-center justify-center border border-primary/30">
                            <span className="text-sm font-medium">💳 Tap to Pay</span>
                          </div>
                          <div className="h-12 bg-gradient-to-r from-accent/20 to-accent/30 rounded-xl flex items-center justify-center border border-accent/30">
                            <span className="text-sm font-medium">📱 Digital Wallet</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Success notification */}
                  <div className="absolute -bottom-4 -left-4 bg-green-50 border border-green-200 rounded-lg shadow-lg p-3">
                    <div className="text-xs font-medium text-green-700 mb-1">Payment successful!</div>
                    <div className="text-xs text-green-600">Tips split automatically</div>
                  </div>
                </div>
              </div>
            </IntersectionAnimation>
          </div>
        </div>
      </section>

      <EnhancedTestimonials />
      
      <TrustBadges />

      {/* Success Stories Section */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <IntersectionAnimation animation="fade-up">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Star className="w-4 h-4 mr-2" />
                Success Stories
              </Badge>
              <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
                Real results from real businesses
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how salon and spa owners like you transformed their operations with NeonO
              </p>
            </div>
          </IntersectionAnimation>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <OptimizedInView
                key={testimonial.name}
                animation="slide"
                threshold={0.2}
              >
                <InteractiveCard className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-hero text-white font-bold flex items-center justify-center">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.business} • {testimonial.industry}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-lg italic">"{testimonial.quote}"</blockquote>
                  </CardContent>
                </InteractiveCard>
              </OptimizedInView>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/case-studies">
                Read More Success Stories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-12 lg:py-16 bg-gradient-subtle">
        <div className="container">
          <IntersectionAnimation animation="fade-up">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                💰 ROI Calculator
              </Badge>
              <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
                Calculate your potential savings
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See exactly how much you could save by switching to NeonO's all-in-one platform
              </p>
            </div>
          </IntersectionAnimation>

          <div className="max-w-md mx-auto">
            <OptimizedInView animation="fade" threshold={0.2}>
              <RoiMini 
                title="Quick ROI Estimate"
                description="Enter your business details for instant savings calculation"
              />
            </OptimizedInView>
          </div>
        </div>
      </section>

      {/* Compare Section */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <IntersectionAnimation animation="fade-up">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                📊 Feature Comparison
              </Badge>
              <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
                Everything included vs. expensive add-ons
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Compare NeonO's all-inclusive platform with typical salon software stacks
              </p>
            </div>
          </IntersectionAnimation>

          <OptimizedInView animation="fade" threshold={0.2}>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-card border-primary/20">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to see the full comparison?</h3>
                  <p className="text-muted-foreground mb-6 text-lg">
                    Compare features, pricing, and see exactly what's included with NeonO vs. competitors
                  </p>
                  <Button size="lg" asChild>
                    <Link to="/compare">
                      View Full Comparison <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </OptimizedInView>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-12 lg:py-16 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No setup fees, no long-term contracts. Start free and scale as you grow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <OptimizedInView
                key={plan.name}
                animation="slide"
                threshold={0.2}
              >
                <InteractiveCard 
                  tilt={plan.popular}
                  glow={plan.popular}
                  className={`h-full ${plan.popular ? 'ring-2 ring-primary shadow-glow' : ''}`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                      </div>
                      {plan.popular && (
                        <Badge variant="default" className="shimmer-effect">Most Popular</Badge>
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
                        <li key={feature} className="flex items-center space-x-2 text-sm hover-scale gpu-accelerated">
                          <Check className="h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full glow-hover" 
                      variant={plan.popular ? "default" : "outline"} 
                      asChild
                    >
                      <Link to="/signup">Start Free Trial</Link>
                    </Button>
                  </CardContent>
                </InteractiveCard>
              </OptimizedInView>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Additional seats: $9.99/seat/month • No commission on tips
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="ghost" asChild>
                <Link to="/pricing">
                  See full pricing details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/roi">
                  Calculate your savings <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ConversionOptimizedCTA 
        title="Ready to transform your business?"
        subtitle="Join 50,000+ beauty professionals who've streamlined operations, increased revenue, and delighted customers with NeonO."
        urgency={true}
      />
      </div>
    </>
  );
};

export default Index;
