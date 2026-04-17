import * as React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEO/SEOHead';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSolutionsConfig } from '@/config/solutions';
import { generateStructuredData } from '@/lib/seo/meta';
import { useI18n } from '@/hooks/useI18n';

export default function SolutionsIndex() {
  const { t } = useI18n();
  const config = getSolutionsConfig(t);
  const items = Object.values(config);

  return (
    <>
      <SEOHead
        title="Industry Solutions for Salons, Barbers, Spas | NeonO"
        description="Explore NeonO solutions tailored for salons, barbershops, spas, and medical aesthetics. Appointments, POS, marketing, website, and more."
        path="/solutions"
        structuredData={[
          { type: 'breadcrumb', data: generateStructuredData('breadcrumb', { crumbs: [ { label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' } ] }) },
        ]}
      />

      <header className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">{t('solutions.index.heading')}</h1>
          <p className="mt-3 font-serif italic text-muted-foreground max-w-2xl">{t('solutions.index.subheading')}</p>
        </div>
      </header>

      <main>
        <section aria-labelledby="solutions-list" className="pb-16">
          <div className="mx-auto max-w-6xl px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s) => (
              <Card key={s.id} className="group">
                <CardHeader>
                  <CardTitle className="text-xl">{s.title}</CardTitle>
                  <CardDescription>{s.industry}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{t('solutions.index.specializedFor').replace('{industry}', s.industry.toLowerCase())}</p>
                  <Button asChild>
                    <Link to={s.path} aria-label={`${t('solutions.index.explore')} ${s.title}`}>{t('solutions.index.explore')}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
