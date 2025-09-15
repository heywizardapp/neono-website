import { Calendar, CreditCard, Mail, Globe, BarChart3, Smartphone } from 'lucide-react';
import { StaggeredReveal } from '@/components/animations/ScrollReveal';

const features = [
  {
    icon: Calendar,
    title: 'Bookings & Calendar',
    description: 'Smart schedules for busy teams—walk-ins, rebook, chair/room views.',
    color: 'text-primary'
  },
  {
    icon: CreditCard,
    title: 'POS & Payments',
    description: 'Tap, split tips, instant payouts. No tip commission.',
    color: 'text-accent'
  },
  {
    icon: Mail,
    title: 'Marketing & Reviews',
    description: 'SMS and email campaigns that fill your calendar.',
    color: 'text-mint'
  },
  {
    icon: Globe,
    title: 'Website & Link-in-Bio',
    description: 'Launch a clean site and link-in-bio—free.',
    color: 'text-lavender'
  },
  {
    icon: BarChart3,
    title: 'Analytics & AI',
    description: 'Role-based insights and automations for owners and teams.',
    color: 'text-primary'
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Full-featured mobile apps for staff and customers.',
    color: 'text-accent'
  },
];

export function FeatureGrid() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need to run your business
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From appointments to analytics, all the tools you need in one integrated platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <StaggeredReveal
            baseDelay={200}
            staggerDelay={150}
            animation="fade-up"
          >
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="feature-card group hover-lift gpu-accelerated"
              >
                <div className="mb-6">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-card ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </StaggeredReveal>
        </div>
      </div>
    </section>
  );
}