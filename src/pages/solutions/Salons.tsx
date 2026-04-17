import BusinessTemplate from '@/templates/BusinessTemplate';
import getSalonsConfig from '@/config/solutions/salons';
import { SEOHead, SEO_PRESETS } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';
import { useI18n } from '@/hooks/useI18n';

export default function SalonsPage() {
  const { t } = useI18n();
  const config = getSalonsConfig(t);

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
      <BusinessTemplate {...config} />
    </>
  );
}
