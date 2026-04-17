import * as React from 'react';
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
import { Star, ArrowRight, Check, PlayCircle, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead, SEO_PRESETS } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';
import { IntersectionAnimation } from '@/components/advanced/IntersectionAnimations';
import { ScrollProgress } from '@/components/advanced/ScrollProgressIndicator';
import { InteractiveCard, FloatingButton } from '@/components/advanced/EnhancedInteractiveElements';
import { OptimizedInView } from '@/components/advanced/PerformanceOptimizedAnimations';
import { StickyCompare } from '@/components/compare/StickyCompare';
import { RoiMini } from '@/components/roi/RoiMini';
import { useI18n } from '@/hooks/useI18n';
import { PRICING } from '@/config/pricing';

const Index = () => {
  const { t } = useI18n();
  const [chairCount, setChairCount] = React.useState(2);

  const pricePerChair = 24.99;
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

  const testimonials = [
    {
      name: t('testimonials.sarah.name'),
      business: t('testimonials.sarah.business'),
      industry: t('testimonials.sarah.industry'),
      rating: 0,
      quote: t('testimonials.sarah.quote'),
      avatar: 'IB'
    },
    {
      name: t('testimonials.marcus.name'),
      business: t('testimonials.marcus.business'),
      industry: t('testimonials.marcus.industry'),
      rating: 0,
      quote: t('testimonials.marcus.quote'),
      avatar: 'IB'
    },
    {
      name: t('testimonials.emily.name'),
      business: t('testimonials.emily.business'),
      industry: t('testimonials.emily.industry'),
      rating: 0,
      quote: t('testimonials.emily.quote'),
      avatar: 'IB'
    }
  ];

  // Pricing plans now use the unified $24.99/seat model — see PRICING config

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
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        primaryCta={{ text: t('hero.cta.primary'), href: "/signup" }}
        secondaryCta={{ text: t('hero.cta.secondary'), href: "/demo" }}
      />

      <TrustSignals />

      <ValueProposition />

      <FeatureGrid />

      {/* Built for Canada */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              🇨🇦 {t('home.canada.badge')}
            </Badge>
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {t('home.canada.title')}
            </h2>
            <p className="font-serif italic text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('home.canada.subtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              { title: t('home.canada.casl.title'), desc: t('home.canada.casl.desc') },
              { title: t('home.canada.tax.title'), desc: t('home.canada.tax.desc') },
              { title: t('home.canada.privacy.title'), desc: t('home.canada.privacy.desc') },
              { title: t('home.canada.pricing.title'), desc: t('home.canada.pricing.desc') },
              { title: t('home.canada.distributor.title'), desc: t('home.canada.distributor.desc') },
              { title: t('home.canada.data.title'), desc: t('home.canada.data.desc') },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-card/50 border border-border/40 hover-lift">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Image Break — cinematic salon moment */}
      <section className="relative h-[350px] lg:h-[450px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3993133/pexels-photo-3993133.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
          alt="Modern salon interior with stylists at work"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute bottom-12 left-0 right-0 text-center px-6">
          <p className="font-serif italic text-2xl lg:text-3xl text-white drop-shadow-lg max-w-2xl mx-auto">
            "{t('home.lifestyleQuote')}"
          </p>
        </div>
      </section>

      {/* Enhanced Product Demo Section */}
      <section className="py-12 lg:py-16 bg-gradient-subtle">
        <div className="container">
          <IntersectionAnimation animation="fade-up">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <PlayCircle className="w-4 h-4 mr-2" />
                {t('demo.badge')}
              </Badge>
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {t('demo.title')}
              </h2>
              <p className="font-serif italic text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('demo.subtitle')}
              </p>
            </div>
          </IntersectionAnimation>

          <div className="grid gap-12 lg:gap-16">
            {/* Appointments Demo - Enhanced */}
            <IntersectionAnimation animation="fade-up" delay={200}>
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-6">
                  <Badge variant="secondary" className="w-fit">
                    {t('demo.appointments.badge')}
                  </Badge>
                  <h3 className="text-2xl font-display font-bold">
                    {t('demo.appointments.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {t('demo.appointments.description')}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{t('demo.appointments.feature1')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{t('demo.appointments.feature2')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{t('demo.appointments.feature3')}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/products/appointments">
                      {t('demo.appointments.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl bg-white border border-border/40 shadow-2xl p-6 overflow-hidden">
                    <div className="h-full w-full rounded-xl bg-gradient-to-br from-slate-50 to-white border border-border/20 p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium">{t('demo.todaysSchedule')}</div>
                          <div className="text-xs text-muted-foreground bg-green-50 text-green-700 px-2 py-1 rounded">
                            {t('demo.booked')}
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
                    <div className="text-xs font-medium text-green-700 mb-1">{t('demo.newBooking')}</div>
                    <div className="text-xs text-muted-foreground">{t('demo.newBookingDesc')}</div>
                  </div>
                </div>
              </div>
            </IntersectionAnimation>

            {/* POS Demo - Enhanced */}
            <IntersectionAnimation animation="fade-up" delay={400}>
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="lg:order-2 space-y-6">
                  <Badge variant="secondary" className="w-fit">
                    {t('demo.pos.badge')}
                  </Badge>
                  <h3 className="text-2xl font-display font-bold">
                    {t('demo.pos.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {t('demo.pos.description')}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{t('demo.pos.feature1')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{t('demo.pos.feature2')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{t('demo.pos.feature3')}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/products/pos">
                      {t('demo.pos.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="lg:order-1 relative">
                  <div className="aspect-[4/3] rounded-2xl bg-white border border-border/40 shadow-2xl p-6">
                    <div className="h-full w-full rounded-xl bg-gradient-to-br from-slate-50 to-white border border-border/20 p-6">
                      <div className="space-y-6 text-center">
                        <div>
                          <div className="text-3xl font-bold text-primary mb-1">$127.50</div>
                          <div className="text-sm text-muted-foreground">{t('demo.totalAmount')}</div>
                        </div>
                        
                        <div className="space-y-3 text-left">
                          <div className="flex justify-between text-sm border-b pb-2">
                            <span>{t('demo.cutAndStyle')}</span>
                            <span>$85.00</span>
                          </div>
                          <div className="flex justify-between text-sm border-b pb-2">
                            <span>{t('demo.deepConditioning')}</span>
                            <span>$25.00</span>
                          </div>
                          <div className="flex justify-between text-sm font-medium text-primary">
                            <span>{t('demo.tip')}</span>
                            <span>$17.50</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="h-12 bg-gradient-to-r from-primary/20 to-primary/30 rounded-xl flex items-center justify-center border border-primary/30">
                            <span className="text-sm font-medium">💳 {t('demo.tapToPay')}</span>
                          </div>
                          <div className="h-12 bg-gradient-to-r from-accent/20 to-accent/30 rounded-xl flex items-center justify-center border border-accent/30">
                            <span className="text-sm font-medium">📱 {t('demo.digitalWallet')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Success notification */}
                  <div className="absolute -bottom-4 -left-4 bg-green-50 border border-green-200 rounded-lg shadow-lg p-3">
                    <div className="text-xs font-medium text-green-700 mb-1">{t('demo.paymentSuccess')}</div>
                    <div className="text-xs text-green-600">{t('demo.tipsSplit')}</div>
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
                {t('success.badge')}
              </Badge>
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {t('success.title')}
              </h2>
              <p className="font-serif italic text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('success.subtitle')}
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
                    <blockquote className="font-serif text-lg italic leading-relaxed">"{testimonial.quote}"</blockquote>
                  </CardContent>
                </InteractiveCard>
              </OptimizedInView>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/case-studies">
                {t('success.cta')} <ArrowRight className="ml-2 h-4 w-4" />
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
                {t('roi.badge')}
              </Badge>
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {t('roi.title')}
              </h2>
              <p className="font-serif italic text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('roi.subtitle')}
              </p>
            </div>
          </IntersectionAnimation>

          <div className="max-w-md mx-auto">
            <OptimizedInView animation="fade" threshold={0.2}>
              <RoiMini 
                title={t('roi.quickTitle')}
                description={t('roi.description')}
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
                📊 {t('home.compare.badge')}
              </Badge>
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {t('home.compare.title')}
              </h2>
              <p className="font-serif italic text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('home.compare.subtitle')}
              </p>
            </div>
          </IntersectionAnimation>

          <OptimizedInView animation="fade" threshold={0.2}>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-card border-primary/20">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">{t('home.compare.cta.title')}</h3>
                  <p className="text-muted-foreground mb-6 text-lg">
                    {t('home.compare.cta.desc')}
                  </p>
                  <Button size="lg" asChild>
                    <Link to="/compare">
                      {t('home.compare.cta.button')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </OptimizedInView>
        </div>
      </section>

      {/* No Marketplace Fee */}
      <section className="py-16 lg:py-20 bg-ink text-white">
        <div className="container text-center max-w-3xl">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white">
            {t('home.noMarketplace.title')}
          </h2>
          <p className="text-lg text-white/70 mb-8 leading-relaxed">
            {t('home.noMarketplace.body')}
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm">
            {t('home.noMarketplace.stat')}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-12 lg:py-16 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {t('home.pricing.title')}
            </h2>
            <p className="font-serif italic text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.pricing.subtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Independent Plan */}
            <OptimizedInView
              animation="slide"
              threshold={0.2}
            >
              <InteractiveCard className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{t('home.pricing.independent')}</CardTitle>
                      <CardDescription>{t('home.pricing.soloPractitioner')}</CardDescription>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">
                      {PRICING.independent.priceDisplay}
                      <span className="text-lg font-normal text-muted-foreground">{t('home.pricing.month')}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t('home.pricing.allFeaturesIncluded')}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2 text-sm hover-scale gpu-accelerated">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{t('home.pricing.onlineBooking')}</span>
                    </li>
                    <li className="flex items-center space-x-2 text-sm hover-scale gpu-accelerated">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{t('home.pricing.pos')}</span>
                    </li>
                    <li className="flex items-center space-x-2 text-sm hover-scale gpu-accelerated">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{t('home.pricing.smsMarketing')}</span>
                    </li>
                    <li className="flex items-center space-x-2 text-sm hover-scale gpu-accelerated">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{t('home.pricing.freeWebsite')}</span>
                    </li>
                    <li className="flex items-center space-x-2 text-sm hover-scale gpu-accelerated">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{t('home.pricing.analyticsReports')}</span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full glow-hover" 
                    variant="outline" 
                    asChild
                  >
                    <Link to="/signup">{t('home.pricing.startFreeTrial')}</Link>
                  </Button>
                </CardContent>
              </InteractiveCard>
            </OptimizedInView>

            {/* Salon Plan with Chair Calculator */}
            <OptimizedInView
              animation="slide"
              threshold={0.2}
            >
              <InteractiveCard 
                tilt={true}
                glow={true}
                className="h-full ring-2 ring-primary shadow-glow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{t('home.pricing.salon')}</CardTitle>
                      <CardDescription>{t('home.pricing.forTeams')}</CardDescription>
                    </div>
                    <Badge variant="default" className="shimmer-effect">{t('home.pricing.mostPopular')}</Badge>
                  </div>
                  
                  <div className="pt-8 space-y-6">
                    {/* Chair Calculator */}
                    <div className="bg-gradient-card rounded-xl p-6 border border-border/40">
                      <label className="text-sm font-medium text-muted-foreground mb-4 block">
                        {t('home.pricing.numberOfChairs')}
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
                          <span>${pricePerChair} {t('home.pricing.perChairMonth')}</span>
                        ) : (
                          <div className="space-y-1">
                            <div className="font-medium text-primary">
                              {t('home.pricing.firstChairs')}: ${pricePerChair}/{t('home.pricing.perChairMonth').split('/')[0]}
                            </div>
                            <div className="text-green-600 dark:text-green-400 font-semibold">
                              {t('home.pricing.numberOfChairs')} 8-{chairCount}: {t('home.pricing.chairsFree')}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="text-5xl font-bold">
                      ${salonTotal.toFixed(2)}
                      <span className="text-xl font-normal text-muted-foreground">{t('home.pricing.month')}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {chairCount <= 7
                        ? t('home.pricing.noHiddenFees')
                        : `${t('home.pricing.firstChairsBilled')} • ${freeChairs} ${freeChairs > 1 ? t('home.pricing.additionalChairs') : t('home.pricing.additionalChair')} ${t('home.pricing.chairsFree')}`
                      }
                    </div>
                    
                    {chairCount > 7 && (
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="font-serif italic text-sm text-green-700 dark:text-green-300 font-medium text-center">
                          🎉 {t('home.pricing.savingPrefix')} ${savings.toFixed(2)}{t('home.pricing.savingSuffix')}
                        </p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2 text-sm hover-scale gpu-accelerated">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{t('home.pricing.multiChair')}</span>
                    </li>
                    <li className="flex items-center space-x-2 text-sm hover-scale gpu-accelerated">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{t('home.pricing.staffManagement')}</span>
                    </li>
                    <li className="flex items-center space-x-2 text-sm hover-scale gpu-accelerated">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{t('home.pricing.commission')}</span>
                    </li>
                    <li className="flex items-center space-x-2 text-sm hover-scale gpu-accelerated">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{t('home.pricing.advancedAnalytics')}</span>
                    </li>
                    <li className="flex items-center space-x-2 text-sm hover-scale gpu-accelerated">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{t('home.pricing.prioritySupport')}</span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full glow-hover" 
                    variant="default" 
                    asChild
                  >
                    <Link to="/signup">{t('home.pricing.startFreeTrial')}</Link>
                  </Button>
                </CardContent>
              </InteractiveCard>
            </OptimizedInView>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              {t('home.pricing.trialInfo')}
            </p>
            <Button variant="ghost" asChild>
              <Link to="/pricing">{t('home.pricing.seeFullPricing')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <ConversionOptimizedCTA
        title={t('home.cta.title')}
        subtitle={t('home.cta.subtitle')}
        urgency={true}
      />
      </div>
    </>
  );
};

export default Index;
