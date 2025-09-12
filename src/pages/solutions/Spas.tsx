import BusinessTemplate from '@/templates/BusinessTemplate';
import spasConfig from '@/config/solutions/spas';
import { SEOHead } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';

export default function SpasPage() {
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
      <BusinessTemplate {...spasConfig} />
    </>
  );
}
