import { IntersectionAnimation } from '@/components/advanced/IntersectionAnimations';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Zap, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/hooks/useI18n';

export function ValueProposition() {
  const { t } = useI18n();

  const benefits = [
    {
      icon: Zap,
      title: t('valueProp.benefit1.title'),
      description: t('valueProp.benefit1.desc')
    },
    {
      icon: Clock,
      title: t('valueProp.benefit2.title'),
      description: t('valueProp.benefit2.desc')
    },
    {
      icon: DollarSign,
      title: t('valueProp.benefit3.title'),
      description: t('valueProp.benefit3.desc')
    }
  ];

  const features = [
    t('valueProp.feature1'),
    t('valueProp.feature2'),
    t('valueProp.feature3'),
    t('valueProp.feature4'),
    t('valueProp.feature5'),
    t('valueProp.feature6'),
    t('valueProp.feature7'),
    t('valueProp.feature8'),
  ];

  return (
    <section className="py-12 lg:py-16">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left side - Value props */}
          <div>
            <IntersectionAnimation animation="fade-up">
              <Badge variant="secondary" className="mb-6">
                {t('valueProp.badge')}
              </Badge>

              <h2 className="text-3xl font-bold mb-6 lg:text-4xl">
                {t('valueProp.title')}
              </h2>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {t('valueProp.subtitle')}
              </p>
            </IntersectionAnimation>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <IntersectionAnimation
                    key={index}
                    animation="fade-up"
                    delay={index * 100}
                  >
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </IntersectionAnimation>
                );
              })}
            </div>

            <IntersectionAnimation animation="fade-up" delay={400}>
              <Button size="lg" className="group" asChild>
                <Link to="/signup">
                  {t('valueProp.startFreeTrial')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </IntersectionAnimation>
          </div>

          {/* Right side - Feature checklist */}
          <div>
            <IntersectionAnimation animation="fade-up" delay={200}>
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-xl border border-border/50">
                <h3 className="text-xl font-bold mb-6">{t('valueProp.whatsIncluded')}</h3>

                <div className="grid gap-3">
                  {features.map((feature, index) => (
                    <IntersectionAnimation
                      key={index}
                      animation="fade-up"
                      delay={300 + index * 50}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    </IntersectionAnimation>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{t('valueProp.setupProgress')}</span>
                    <span className="text-sm text-muted-foreground">{t('valueProp.fiveMinutes')}</span>
                  </div>
                  <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000"
                      style={{ width: '75%' }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {t('valueProp.avgTimeToGoLive')}
                  </p>
                </div>
              </div>
            </IntersectionAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
