import { ArrowRight, CheckCircle, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ConversionOptimizedCTAProps {
  title?: string;
  subtitle?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  variant?: 'hero' | 'section' | 'pricing';
  urgency?: boolean;
}

export function ConversionOptimizedCTA({ 
  title = "Ready to grow your business?",
  subtitle = "Join thousands of beauty professionals who've transformed their operations with NeonO",
  primaryCta = { label: "Start Free Trial", href: "/signup" },
  secondaryCta = { label: "Watch Demo", href: "/demo" },
  variant = 'section',
  urgency = false
}: ConversionOptimizedCTAProps) {
  const benefits = [
    { icon: CheckCircle, text: "Free 14-day trial" },
    { icon: CreditCard, text: "No credit card required" },
    { icon: Clock, text: "Setup in under 10 minutes" }
  ];

  const variantStyles = {
    hero: "py-20 lg:py-32 bg-gradient-hero text-white",
    section: "py-20 lg:py-32",
    pricing: "py-16 bg-gradient-subtle"
  };

  return (
    <section className={variantStyles[variant]}>
      <div className="container">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {urgency && (
            <Badge variant="secondary" className="mb-4">
              🔥 Limited Time: First 100 signups get priority onboarding
            </Badge>
          )}
          
          <div className="space-y-6">
            <h2 className={`font-display font-bold tracking-tight ${
              variant === 'hero' ? 'text-4xl lg:text-6xl text-white' :
              'text-3xl sm:text-4xl lg:text-5xl'
            }`}>
              {title}
            </h2>
            <p className={`text-xl leading-relaxed max-w-3xl mx-auto ${
              variant === 'hero' ? 'text-white/90' : 'text-muted-foreground'
            }`}>
              {subtitle}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className={`group ${variant === 'hero' ? 'btn-hero-secondary' : 'btn-hero-primary'} text-lg px-8 py-4`}
              asChild
            >
              <a href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className={`text-lg px-8 py-4 ${
                variant === 'hero' ? 'border-white/20 text-white hover:bg-white/10' : ''
              }`}
              asChild
            >
              <a href={secondaryCta.href}>
                {secondaryCta.label}
              </a>
            </Button>
          </div>

          {/* Trust signals */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${
                    variant === 'hero' ? 'text-white/80' : 'text-primary'
                  }`} />
                  <span className={variant === 'hero' ? 'text-white/80' : 'text-muted-foreground'}>
                    {benefit.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Social proof */}
          <div className={`text-sm ${
            variant === 'hero' ? 'text-white/70' : 'text-muted-foreground'
          }`}>
            Trusted by 50,000+ salons, spas & barbershops worldwide
          </div>

          {urgency && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-lg mx-auto">
              <p className="text-sm text-yellow-800 font-medium">
                ⏰ <strong>87 spots remaining</strong> for priority onboarding this month
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}