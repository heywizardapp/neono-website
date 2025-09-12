import * as React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEO/SEOHead';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { solutionsConfig } from '@/config/solutions';
import { generateStructuredData } from '@/lib/seo/meta';

export default function SolutionsIndex() {
  const items = Object.values(solutionsConfig);

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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Solutions for every beauty business</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">Choose your industry to see a tailored overview with specific features, workflows, and customer stories.</p>
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
                  <p className="text-sm text-muted-foreground mb-4">{`Specialized features for ${s.industry.toLowerCase()}`}</p>
                  <Button asChild>
                    <Link to={s.path} aria-label={`Explore ${s.title}`}>Explore</Link>
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
