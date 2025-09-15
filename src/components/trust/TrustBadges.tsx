import { Shield, Lock, Award, CheckCircle } from 'lucide-react';

const trustBadges = [
  {
    icon: Shield,
    label: 'SOC 2 Type II Certified',
    description: 'Enterprise-grade security standards'
  },
  {
    icon: Lock,
    label: 'HIPAA Compliant',
    description: 'Healthcare data protection'
  },
  {
    icon: Award,
    label: 'PCI DSS Certified',
    description: 'Secure payment processing'
  },
  {
    icon: CheckCircle,
    label: '99.9% Uptime SLA',
    description: 'Reliable service guarantee'
  }
];

export function TrustBadges() {
  return (
    <section className="py-12 border-t border-border/40 bg-gradient-subtle">
      <div className="container">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            Trusted & Secure
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade security and compliance to protect your business and customer data
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div 
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {badge.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {badge.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}