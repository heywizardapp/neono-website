import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { InteractiveButton, FloatingElement } from '@/components/interactions/MicroInteractions';
import { ParallaxContainer, ParallaxLayer } from '@/components/advanced/ParallaxSystem';
import { TextReveal, Typewriter, CountUp } from '@/components/advanced/DynamicTypography';

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  showStats?: boolean;
}

export function Hero({ 
  title, 
  subtitle, 
  primaryCta = { text: "Start Free Trial", href: "/signup" },
  secondaryCta = { text: "See Pricing", href: "/pricing" },
  showStats = true
}: HeroProps) {
  return (
    <ParallaxContainer className="relative overflow-hidden bg-gradient-subtle min-h-[80vh]">
      {/* Background layers with parallax */}
      <ParallaxLayer speed={0.2} depth={-100} opacity={0.3} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      </ParallaxLayer>
      
      <ParallaxLayer speed={0.1} depth={-50} className="absolute inset-0">
        <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-gradient-hero opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-mint opacity-15 blur-3xl" />
      </ParallaxLayer>
      
      <div className="container relative z-10 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left content */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-6">
              <TextReveal 
                animation="slide-up" 
                stagger={100} 
                className="text-4xl font-display font-bold tracking-tight sm:text-5xl lg:text-6xl"
              >
                {title}
              </TextReveal>
              
              <div className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                <Typewriter 
                  text={subtitle}
                  speed={30}
                  delay={1000}
                />
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-hero-primary group" asChild>
                <Link to={primaryCta.href}>
                  {primaryCta.text}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-hero-secondary group" asChild>
                <Link to={secondaryCta.href}>
                  <Play className="mr-2 h-4 w-4" />
                  {secondaryCta.text}
                </Link>
              </Button>
            </div>

            {/* Enhanced Stats with CountUp */}
            {showStats && (
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/40">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">
                    <CountUp end={50} suffix="K+" duration={2000} delay={1500} />
                  </div>
                  <div className="text-sm text-muted-foreground">Active Businesses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">
                    <CountUp end={98} suffix="%" duration={2000} delay={1700} />
                  </div>
                  <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">
                    <CountUp end={2} prefix="$" suffix="M+" duration={2000} delay={1900} />
                  </div>
                  <div className="text-sm text-muted-foreground">Daily Processing</div>
                </div>
              </div>
            )}
          </div>

          {/* Right visual with enhanced parallax */}
          <ParallaxLayer speed={0.8} className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-card border border-border/40 shadow-large p-8">
              {/* Placeholder for device mockup */}
              <div className="h-full w-full rounded-xl bg-gradient-hero/10 border border-border/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-hero mx-auto flex items-center justify-center">
                    <span className="text-white font-bold text-xl">N</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded w-32 mx-auto" />
                    <div className="h-3 bg-slate-200 rounded w-24 mx-auto" />
                    <div className="h-3 bg-slate-200 rounded w-28 mx-auto" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-6">
                    <div className="h-8 bg-primary/20 rounded" />
                    <div className="h-8 bg-accent/20 rounded" />
                    <div className="h-8 bg-mint/20 rounded" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced floating elements with parallax */}
            <ParallaxLayer speed={1.2} className="absolute inset-0">
              <FloatingElement direction="up" distance={8} duration={4000} className="absolute -top-4 -right-4">
                <div className="h-16 w-16 rounded-full bg-gradient-hero shadow-glow opacity-60" />
              </FloatingElement>
              <FloatingElement direction="down" distance={6} duration={3000} className="absolute -bottom-6 -left-6">
                <div className="h-12 w-12 rounded-full bg-accent shadow-glow opacity-60" />
              </FloatingElement>
              <FloatingElement direction="right" distance={4} duration={5000} className="absolute top-1/2 -right-8">
                <div className="h-8 w-8 rounded-full bg-mint shadow-glow opacity-40" />
              </FloatingElement>
            </ParallaxLayer>
          </ParallaxLayer>
        </div>
      </div>
    </ParallaxContainer>
  );
}