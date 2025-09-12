import BusinessTemplate from '@/templates/BusinessTemplate';
import aestheticsConfig from '@/config/solutions/aesthetics';
import { SEOHead } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';

export default function AestheticsPage() {
  return (
    <>
      <SEOHead
        title="Medical Aesthetics Software | NeonO"
        description="All-in-one aesthetics software with deposits, series, POS, marketing, and a free booking site. Grow bookings while staying efficient."
        path="/solutions/aesthetics"
        structuredData={[
          {
            type: 'breadcrumb',
            data: generateStructuredData('breadcrumb', {
              crumbs: [
                { label: 'Home', href: '/' },
                { label: 'Solutions', href: '/solutions' },
                { label: 'Aesthetics', href: '/solutions/aesthetics' },
              ],
            }),
          },
        ]}
      />
      <BusinessTemplate {...aestheticsConfig} />
    </>
  );
}
