import { ArrowRight, Play, Users, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { IntersectionAnimation } from '@/components/advanced/IntersectionAnimations';
import { EnhancedButton, InteractiveCard } from '@/components/advanced/EnhancedInteractiveElements';
import { AnimatedCounter, Magnetic } from '@/components/advanced/AdvancedScrollAnimations';

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
  primaryCta = { text: "Get Started Now", href: "/signup" },
  secondaryCta = { text: "Watch Demo", href: "/demo" },
  showStats = true
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-slate-50/50 to-background">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>
      
      <div className="container relative py-12 lg:py-16">
        {/* Trust indicator */}
        <IntersectionAnimation animation="fade-in" className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
            Trusted by salon professionals coast to coast
          </Badge>
        </IntersectionAnimation>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left content - Simplified and focused */}
          <div className="text-center lg:text-left">
            <IntersectionAnimation animation="fade-up" delay={200}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                {title}
              </h1>
            </IntersectionAnimation>
            
            <IntersectionAnimation animation="fade-up" delay={400}>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                {subtitle}
              </p>
            </IntersectionAnimation>

            {/* Prominent Social Proof Numbers - Like Fresha */}
            {showStats && (
              <IntersectionAnimation animation="fade-up" delay={600}>
                <div className="grid grid-cols-3 gap-8 mb-8 py-6">
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                      <AnimatedCounter end={50} suffix="K+" />
                    </div>
                    <div className="text-sm text-muted-foreground">Businesses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                      <AnimatedCounter end={1} suffix="B+" />
                    </div>
                    <div className="text-sm text-muted-foreground">Appointments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                      <AnimatedCounter end={4.8} suffix="" />
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                      Rating
                    </div>
                  </div>
                </div>
              </IntersectionAnimation>
            )}

            {/* Enhanced CTAs */}
            <IntersectionAnimation animation="fade-up" delay={800}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Magnetic intensity={0.2}>
                  <EnhancedButton
                    variant="primary"
                    size="lg"
                    magnetic={true}
                    glow={true}
                    onClick={() => {
                      window.location.href = primaryCta.href;
                    }}
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </EnhancedButton>
                </Magnetic>
                
                <Magnetic intensity={0.15}>
                  <EnhancedButton
                    variant="secondary"
                    size="lg"
                    onClick={() => {
                      window.location.href = secondaryCta.href;
                    }}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Book a Demo
                  </EnhancedButton>
                </Magnetic>
              </div>
            </IntersectionAnimation>

            {/* Trust signals */}
            <IntersectionAnimation animation="fade-up" delay={1000}>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground justify-center lg:justify-start">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Free 14-day trial
                </div>
                <div className="hidden sm:block">•</div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  No setup fees
                </div>
                <div className="hidden sm:block">•</div>
                <div>Cancel anytime</div>
              </div>
            </IntersectionAnimation>
          </div>

          {/* Right side - Real product screenshot */}
          <IntersectionAnimation animation="fade-up" delay={400} className="relative">
            <div className="relative mx-auto max-w-2xl">
              {/* Main product screenshot container */}
              <div className="relative rounded-2xl bg-white shadow-2xl border border-border/20 overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-border/20">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-xs text-muted-foreground bg-white rounded px-3 py-1 inline-block">
                      salon.neono.app
                    </div>
                  </div>
                </div>

                {/* Realistic NeonO Dashboard */}
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-white p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center text-sm font-bold">
                        N
                      </div>
                      <div>
                        <div className="font-semibold text-sm">NeonO Dashboard</div>
                        <div className="text-xs text-muted-foreground">Studio Luxe</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">Live</Badge>
                  </div>

                  {/* Today's stats cards */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-border/10">
                      <div className="text-lg font-bold text-primary">$2,847</div>
                      <div className="text-xs text-muted-foreground">Today's Revenue</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-border/10">
                      <div className="text-lg font-bold text-accent">23</div>
                      <div className="text-xs text-muted-foreground">Appointments</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-border/10">
                      <div className="text-lg font-bold text-mint">98%</div>
                      <div className="text-xs text-muted-foreground">Capacity</div>
                    </div>
                  </div>

                  {/* Calendar preview */}
                  <div className="bg-white rounded-lg border border-border/10 p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-sm font-medium">Today's Schedule</div>
                      <div className="text-xs text-muted-foreground">Dec 15, 2024</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2 bg-primary/10 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">SM</div>
                        <div className="flex-1">
                          <div className="text-xs font-medium">Sarah Martinez</div>
                          <div className="text-xs text-muted-foreground">Cut & Color • 9:00 AM</div>
                        </div>
                        <div className="text-xs font-medium text-primary">$185</div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-2 bg-accent/10 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs">MJ</div>
                        <div className="flex-1">
                          <div className="text-xs font-medium">Mike Johnson</div>
                          <div className="text-xs text-muted-foreground">Beard Trim • 10:30 AM</div>
                        </div>
                        <div className="text-xs font-medium text-accent">$45</div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-2 bg-mint/10 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-mint/20 flex items-center justify-center text-xs">EC</div>
                        <div className="flex-1">
                          <div className="text-xs font-medium">Emma Chen</div>
                          <div className="text-xs text-muted-foreground">Deep Cleansing • 2:00 PM</div>
                        </div>
                        <div className="text-xs font-medium text-mint">$120</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-accent/10 rounded-full blur-xl"></div>
            </div>
          </IntersectionAnimation>
        </div>
      </div>
    </section>
  );
}