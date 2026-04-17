import BusinessTemplate from '@/templates/BusinessTemplate';
import getBarbershopsConfig from '@/config/solutions/barbershops';
import { SEOHead } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';
import { useI18n } from '@/hooks/useI18n';

export default function BarbershopsPage() {
  const { t } = useI18n();
  const config = getBarbershopsConfig(t);

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
      <BusinessTemplate {...config} />
    </>
  );
}
