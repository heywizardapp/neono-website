import BusinessTemplate from '@/templates/BusinessTemplate';
import barbersConfig from '@/config/solutions/barbershops';
import { SEOHead } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';

export default function BarbershopsPage() {
  return (
    <>
      <SEOHead
        title="Barbershop Software | NeonO"
        description="All-in-one barbershop software with appointments, walk-ins, POS, marketing, and a free booking site. Faster checkout, fewer no-shows."
        path="/solutions/barbershops"
        structuredData={[
          {
            type: 'breadcrumb',
            data: generateStructuredData('breadcrumb', {
              crumbs: [
                { label: 'Home', href: '/' },
                { label: 'Solutions', href: '/solutions' },
                { label: 'Barbershops', href: '/solutions/barbershops' },
              ],
            }),
          },
        ]}
      />
      <BusinessTemplate {...barbersConfig} />
    </>
  );
}
