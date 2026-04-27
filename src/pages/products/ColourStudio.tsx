import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, X, Scale, Smartphone, DollarSign, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEO/SEOHead';
import { ColourBowlDemo } from '@/components/demos/ColourBowlDemo';
import { getColourMockup } from '@/components/demos/ColourStudioMockups';
import { FaqAccordion } from '@/components/FaqAccordion';
import { useI18n } from '@/hooks/useI18n';

export default function ColourStudio() {
  const { t } = useI18n();

  const steps = [
    { num: 1, key: 'weigh', mockup: 'weigh' },
    { num: 2, key: 'track', mockup: 'track' },
    { num: 3, key: 'bill', mockup: 'bill' },
    { num: 4, key: 'save', mockup: 'save' },
  ];

  const faqs = [
    ...Array.from({ length: 8 }, (_, i) => ({
      q: t(`colourStudio.faq.q${i + 1}.q`),
      a: t(`colourStudio.faq.q${i + 1}.a`),
    })),
    {
      q: t('colourStudio.ai.title'),
      a: t('colourStudio.ai.body'),
    },
  ];

  return (
    <>
      <SEOHead
        title="Colour Studio — Track Every Gram, Price Every Bowl | NeonO"
        description="Real-time colour tracking, multi-bowl formulas, automatic client billing, and waste reporting. Built into NeonO at no extra cost."
        path="/products/colour-studio"
        keywords="colour tracking software, salon colour management, hair colour cost, colour waste tracking, SalonScale alternative, Vish alternative"
      />

      {/* ================================================================ */}
      {/* HERO — Problem statement + ColourBowlDemo                       */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-ink text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lavender via-mint to-lavender" />
        <div className="absolute inset-0 bg-gradient-to-br from-lavender/5 via-transparent to-mint/5" />

        <div className="container relative">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* Left — copy (3 cols) */}
            <div className="lg:col-span-3">
              <Badge className="mb-6 bg-white/10 text-white border-white/20">
                🎨 {t('colourStudio.hero.badge')}
              </Badge>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6 text-white leading-tight">
                {t('colourStudio.hero.title')}
              </h1>
              <p className="text-base lg:text-lg text-white/70 mb-8 leading-relaxed max-w-xl">
                {t('colourStudio.hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button size="lg" asChild>
                  <Link to="/signup">
                    {t('colourStudio.hero.cta.primary')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
                  <a href="#steps">{t('colourStudio.hero.cta.secondary')}</a>
                </Button>
              </div>

              {/* $0 extra callout */}
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-mint/10 border border-mint/20">
                <span className="text-xl font-bold text-mint">$0 extra</span>
                <span className="text-sm text-white/60 leading-snug">
                  {t('colourStudio.hero.priceCallout')}
                </span>
              </div>
            </div>

            {/* Right — demo (2 cols) */}
            <div className="lg:col-span-2">
              <ColourBowlDemo />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* BEFORE / AFTER — Side-by-side dollar scenario                   */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-4xl">
          <h2 className="font-display text-3xl font-bold sm:text-4xl text-center mb-12">
            {t('colourStudio.beforeAfter.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* WITHOUT */}
            <div className="rounded-2xl border-2 border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 p-6 lg:p-8">
              <h3 className="font-display text-lg font-bold mb-5 text-red-600 dark:text-red-400">
                {t('colourStudio.beforeAfter.without.title')}
              </h3>
              <ul className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{t(`colourStudio.beforeAfter.without.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WITH */}
            <div className="rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 p-6 lg:p-8">
              <h3 className="font-display text-lg font-bold mb-5 text-emerald-600 dark:text-emerald-400">
                {t('colourStudio.beforeAfter.with.title')}
              </h3>
              <ul className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm font-medium">{t(`colourStudio.beforeAfter.with.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5 STEPS — Visual walkthrough with custom mockups                */}
      {/* ================================================================ */}
      <section id="steps" className="py-16 lg:py-24 bg-gradient-subtle">
        <div className="container max-w-6xl">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">How it works</Badge>
            <h2 className="font-display text-3xl font-bold sm:text-4xl mb-3">
              {t('colourStudio.steps.title')}
            </h2>
            <p className="font-display text-lg text-muted-foreground">
              {t('colourStudio.steps.subtitle')}
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, idx) => {
              const reversed = idx % 2 !== 0;
              return (
                <div
                  key={step.key}
                  className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center"
                >
                  {/* Text side */}
                  <div className={reversed ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white text-lg font-bold">
                        {step.num}
                      </span>
                      <h3 className="font-display text-2xl font-bold">
                        {t(`colourStudio.steps.${step.key}.title`)}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed ml-[52px]">
                      {t(`colourStudio.steps.${step.key}.desc`)}
                    </p>
                  </div>

                  {/* Mockup side */}
                  <div className={reversed ? 'lg:order-1' : ''}>
                    {getColourMockup(step.mockup)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* COMPARISON TABLE — NeonO vs SalonScale vs Vish (dark)           */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-ink text-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold sm:text-4xl mb-4 text-white">
              {t('colourStudio.compare.title')}
            </h2>
            <p className="font-display text-lg text-white/60">
              {t('colourStudio.compare.subtitle')}
            </p>
          </div>

          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-4 px-3 text-white/50 font-medium">{t('colourStudio.compare.dimension')}</th>
                  <th className="py-4 px-3 text-mint font-bold">NeonO</th>
                  <th className="py-4 px-3 text-white/70 font-medium">SalonScale</th>
                  <th className="py-4 px-3 text-white/70 font-medium">Vish</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { dim: 'price7', neono: 'price7.neono', ss: 'price7.salonscale', vish: 'price7.vish' },
                  { dim: 'requires', neono: 'requires.neono', ss: 'requires.salonscale', vish: 'requires.vish' },
                  { dim: 'pos', neono: 'pos.neono', ss: 'pos.salonscale', vish: 'pos.vish' },
                  { dim: 'multibowl', neono: 'unlimited', ss: 'limited', vish: 'limited' },
                  { dim: 'kiosk', neono: 'yes', ss: 'no', vish: 'no' },
                  { dim: 'photos', neono: 'yes', ss: 'no', vish: 'no' },
                  { dim: 'barcode', neono: 'yes', ss: 'no', vish: 'no' },
                  { dim: 'allergen', neono: 'yes', ss: 'no', vish: 'no' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/10">
                    <td className="py-3.5 px-3 text-white/70">{t(`colourStudio.compare.${row.dim}`)}</td>
                    <td className="py-3.5 px-3 text-mint font-medium">{t(`colourStudio.compare.${row.neono}`)}</td>
                    <td className="py-3.5 px-3 text-white/40">{t(`colourStudio.compare.${row.ss}`)}</td>
                    <td className="py-3.5 px-3 text-white/40">{t(`colourStudio.compare.${row.vish}`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* OBJECTION STRIP                                                 */}
      {/* ================================================================ */}
      <section className="py-10 bg-accent/5">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Scale className="w-5 h-5" />, key: 'scale' },
              { icon: <Smartphone className="w-5 h-5" />, key: 'device' },
              { icon: <DollarSign className="w-5 h-5" />, key: 'included' },
              { icon: <Zap className="w-5 h-5" />, key: 'setup' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight">{t(`solutions.salons.colour.objections.${item.key}.title`)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t(`solutions.salons.colour.objections.${item.key}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FAQ                                                             */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold sm:text-4xl mb-4">
              {t('colourStudio.faq.title')}
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              {t('colourStudio.qualifier.body')}
            </p>
          </div>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* ================================================================ */}
      {/* FINAL CTA                                                       */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-ink text-white">
        <div className="container text-center max-w-3xl">
          <Badge className="mb-6 bg-mint/10 text-mint border-mint/20">
            Founding Partner
          </Badge>

          <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl mb-6 text-white">
            {t('colourStudio.cta.title')}
          </h2>
          <p className="text-lg text-white/70 mb-4">
            {t('colourStudio.cta.subtitle')}
          </p>
          <p className="text-sm text-white/40 mb-10 max-w-lg mx-auto">
            {t('colourStudio.founding')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/signup">
                {t('colourStudio.cta.primary')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
              <Link to="/demo">{t('colourStudio.cta.secondary')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
