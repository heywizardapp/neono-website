import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useI18n } from '@/hooks/useI18n';

interface IndustryHeroProps {
  titleKey: string;
  subtitleKey: string;
  primaryCtaKey: string;
  secondaryCtaKey: string;
  primaryHref: string;
  secondaryHref: string;
  chipsKeys: string[];
  image?: string;
}

export function IndustryHero({ 
  titleKey, 
  subtitleKey, 
  primaryCtaKey,
  secondaryCtaKey,
  primaryHref,
  secondaryHref,
  chipsKeys,
  image 
}: IndustryHeroProps) {
  const { t } = useI18n();
  
  return (
    <section className="relative overflow-hidden bg-gradient-subtle">
      {image && (
        <img
          src={image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className={`absolute inset-0 ${image ? 'bg-background/80 dark:bg-background/85 backdrop-blur-[2px]' : 'bg-gradient-hero opacity-10'}`} />

      <div className="container relative z-10 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {t(titleKey)}
              </h1>
              <p className="font-serif italic text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {t(subtitleKey)}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-hero-primary group" asChild>
                <Link to={primaryHref}>
                  {t(primaryCtaKey)}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-hero-secondary" asChild>
                <Link to={secondaryHref}>
                  {t(secondaryCtaKey)}
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-4">
              {chipsKeys.map((chipKey, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border/40 rounded-full px-4 py-2 text-sm"
                >
                  <Check className="h-4 w-4 text-mint" />
                  <span className="text-muted-foreground">{t(chipKey)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-scale-in">
            {image ? (
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-large">
                <img
                  src={image}
                  alt={t(titleKey)}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/40 to-transparent dark:from-background/60" />
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-2xl bg-gradient-card border border-border/40 shadow-large p-8">
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
            )}

            <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-gradient-hero shadow-glow animate-pulse" />
            <div className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-accent shadow-glow animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
}