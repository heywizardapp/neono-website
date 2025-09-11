import BusinessTemplate from '@/templates/BusinessTemplate';
import salonsConfig from '@/config/solutions/salons';
import { SEOHead, SEO_PRESETS } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';

export default function SalonsPage() {
  return (
    <>
      <SEOHead
        {...SEO_PRESETS.salonSolution}
        path="/solutions/salons"
        structuredData={[
          {
            type: 'breadcrumb',
            data: generateStructuredData('breadcrumb', {
              crumbs: [
                { label: "Home", href: "/" },
                { label: "Solutions", href: "/solutions" },
                { label: "Salons", href: "/solutions/salons" }
              ]
            })
          }
        ]}
      />
      <BusinessTemplate {...salonsConfig} />
    </>
  );
}