import { IntersectionAnimation } from '@/components/advanced/IntersectionAnimations';
import { Badge } from '@/components/ui/badge';
import { Star, Shield, Award, Users } from 'lucide-react';

export function TrustSignals() {
  const trustBadges = [
    {
      icon: Star,
      title: "4.8/5 Rating",
      subtitle: "10,000+ reviews",
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      subtitle: "PCI DSS Compliant",
      color: "text-green-500"
    },
    {
      icon: Award,
      title: "Industry Leader",
      subtitle: "Best Beauty Software 2024",
      color: "text-blue-500"
    },
    {
      icon: Users,
      title: "50K+ Businesses",
      subtitle: "Trust NeonO worldwide",
      color: "text-purple-500"
    }
  ];

  return (
    <section className="py-8 bg-slate-50/50">
      <div className="container">
        <IntersectionAnimation animation="fade-up">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Trusted Worldwide
            </Badge>
            <h2 className="text-2xl font-bold mb-4">
              Join thousands of successful businesses
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From independent stylists to multi-location chains, beauty professionals worldwide trust NeonO to power their business.
            </p>
          </div>
        </IntersectionAnimation>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <IntersectionAnimation 
                key={badge.title}
                animation="fade-up" 
                delay={index * 100}
              >
                <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                  <div className="mb-4">
                    <Icon className={`w-8 h-8 mx-auto ${badge.color}`} />
                  </div>
                  <div className="font-semibold text-sm mb-1">{badge.title}</div>
                  <div className="text-xs text-muted-foreground">{badge.subtitle}</div>
                </div>
              </IntersectionAnimation>
            );
          })}
        </div>

        {/* Customer logos */}
        <IntersectionAnimation animation="fade-up" delay={400}>
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-8">
              Trusted by leading beauty brands and independent professionals
            </p>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-50">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-12 bg-slate-200 rounded-lg flex items-center justify-center">
                  <div className="text-xs text-slate-400 font-medium">LOGO {i}</div>
                </div>
              ))}
            </div>
          </div>
        </IntersectionAnimation>
      </div>
    </section>
  );
}