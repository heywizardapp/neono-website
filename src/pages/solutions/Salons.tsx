import BusinessTemplate from '@/templates/BusinessTemplate';
import salonsConfig from '@/config/solutions/salons';

export default function SalonsPage() {
  return <BusinessTemplate {...salonsConfig} />;
}