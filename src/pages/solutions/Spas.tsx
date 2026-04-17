import BusinessTemplate from '@/templates/BusinessTemplate';
import getSpasConfig from '@/config/solutions/spas';
import { SEOHead } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';
import { useI18n } from '@/hooks/useI18n';

export default function SpasPage() {
  const { t } = useI18n();
  const config = getSpasConfig(t);

  return (
    <>
      <SEOHead
        title="Spa & Wellness Software | NeonO"
        description="All-in-one spa software with room scheduling, memberships, POS, marketing, and a free booking site. Smooth check-ins and delighted clients."
        path="/solutions/spas"
        structuredData={[
          {
            type: 'breadcrumb',
            data: generateStructuredData('breadcrumb', {
              crumbs: [
                { label: 'Home', href: '/' },
                { label: 'Solutions', href: '/solutions' },
                { label: 'Spas', href: '/solutions/spas' },
              ],
            }),
          },
        ]}
      />
      <BusinessTemplate {...config} />
    </>
  );
}
