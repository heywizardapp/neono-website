import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, Users, Clock } from 'lucide-react';

const detailedTestimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Owner',
    business: 'Luxe Hair Studio',
    location: 'Toronto, ON',
    industry: 'Hair Salon',
    avatar: '/api/placeholder/60/60',
    rating: 5,
    quote: "NeonO transformed our business completely. The automated SMS reminders alone reduced no-shows by 40%, and the integrated POS system eliminated double-entry work. Our team loves how intuitive everything is.",
    metrics: [
      { icon: TrendingUp, label: '40% fewer no-shows', value: '40%' },
      { icon: Users, label: '25% more repeat clients', value: '+25%' },
      { icon: Clock, label: 'Saved 10 hours/week', value: '10hrs' }
    ],
    beforeAfter: {
      before: 'Manual appointment book, separate POS, constant no-shows',
      after: 'Automated scheduling, integrated payments, predictable revenue'
    },
    timeframe: '6 months',
    businessType: 'Hair Salon - 8 stylists',
    featured: true
  },
  {
    id: 2,
    name: 'Marcus Rivera',
    title: 'Co-Owner',
    business: 'Precision Barbershop',
    location: 'Austin, TX',
    industry: 'Barbershop',
    avatar: '/api/placeholder/60/60',
    rating: 5,
    quote: "The tip splitting feature was a game-changer for our team morale. Instead of cash confusion, everything is transparent and instant. Our barbers are happier and our books balance perfectly.",
    metrics: [
      { icon: TrendingUp, label: '30% revenue increase', value: '+30%' },
      { icon: Users, label: '50% faster checkout', value: '2x' },
      { icon: Clock, label: 'Zero tip disputes', value: '0' }
    ],
    beforeAfter: {
      before: 'Cash tips, manual splitting, team conflicts',
      after: 'Digital tips, automatic splitting, happy team'
    },
    timeframe: '4 months',
    businessType: 'Barbershop - 6 barbers'
  },
  {
    id: 3,
    name: 'Dr. Jennifer Walsh',
    title: 'Medical Director',
    business: 'Radiant MedSpa',
    location: 'Miami, FL',
    industry: 'Medical Spa',
    avatar: '/api/placeholder/60/60',
    rating: 5,
    quote: "HIPAA compliance was crucial for our medical spa. NeonO handles all the security requirements while giving us powerful analytics. We've increased treatment packages sales by 60% using their marketing automation.",
    metrics: [
      { icon: TrendingUp, label: '60% package sales boost', value: '+60%' },
      { icon: Users, label: '200% email engagement', value: '3x' },
      { icon: Clock, label: 'HIPAA compliant', value: '✓' }
    ],
    beforeAfter: {
      before: 'Separate systems, compliance headaches, poor follow-up',
      after: 'Integrated platform, automatic compliance, smart marketing'
    },
    timeframe: '8 months',
    businessType: 'Medical Spa - 12 providers'
  }
];

export function EnhancedTestimonials() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Success Stories</Badge>
          <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
            Real results from real businesses
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how beauty and wellness businesses like yours are growing revenue, 
            saving time, and delighting customers with NeonO.
          </p>
        </div>

        <div className="grid gap-8 lg:gap-12">
          {detailedTestimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className={`hover-lift ${testimonial.featured ? 'ring-2 ring-primary/20 shadow-glow' : ''}`}
            >
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Avatar & Info */}
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-hero flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{testimonial.name}</div>
                      <div className="text-muted-foreground">{testimonial.title}</div>
                      <div className="text-sm text-primary font-medium">{testimonial.business}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>

                  {/* Business Type & Timeframe */}
                  <div className="lg:ml-auto text-right space-y-1">
                    <Badge variant="outline">{testimonial.industry}</Badge>
                    <div className="text-sm text-muted-foreground">{testimonial.businessType}</div>
                    <div className="text-xs text-muted-foreground">Results in {testimonial.timeframe}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">5.0/5</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Quote */}
                <blockquote className="text-lg leading-relaxed font-medium">
                  "{testimonial.quote}"
                </blockquote>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-subtle rounded-lg">
                  {testimonial.metrics.map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <div key={idx} className="text-center">
                        <Icon className="h-5 w-5 text-primary mx-auto mb-2" />
                        <div className="text-lg font-bold text-primary">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Before/After */}
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                    <div className="font-medium text-destructive mb-1">Before NeonO</div>
                    <div className="text-muted-foreground">{testimonial.beforeAfter.before}</div>
                  </div>
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="font-medium text-primary mb-1">After NeonO</div>
                    <div className="text-muted-foreground">{testimonial.beforeAfter.after}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Ready to see similar results in your business?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#demo" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get Your Free Demo
            </a>
            <a 
              href="/case-studies" 
              className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-accent/5 transition-colors"
            >
              View More Case Studies
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}