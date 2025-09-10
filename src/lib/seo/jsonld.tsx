import { generateStructuredData } from './meta';

interface JsonLdProps {
  data: unknown;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} 
    />
  );
}

// Convenience components for common schema types
interface OrganizationJsonLdProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
}

export function OrganizationJsonLd(props: OrganizationJsonLdProps) {
  const data = generateStructuredData('organization', props);
  return data ? <JsonLd data={data} /> : null;
}

interface ProductJsonLdProps {
  name: string;
  description: string;
  price: number;
  currency?: string;
}

export function ProductJsonLd({ currency = 'USD', ...props }: ProductJsonLdProps) {
  const data = generateStructuredData('product', { ...props, currency });
  return data ? <JsonLd data={data} /> : null;
}

interface FaqJsonLdProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FaqJsonLd({ faqs }: FaqJsonLdProps) {
  const data = generateStructuredData('faqPage', { faqs });
  return data ? <JsonLd data={data} /> : null;
}

interface BreadcrumbJsonLdProps {
  crumbs: Array<{ label: string; href: string }>;
}

export function BreadcrumbJsonLd({ crumbs }: BreadcrumbJsonLdProps) {
  const data = generateStructuredData('breadcrumb', { crumbs });
  return data ? <JsonLd data={data} /> : null;
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  author?: string;
  publishedTime: string;
  modifiedTime?: string;
  url: string;
  image?: string;
}

export function ArticleJsonLd(props: ArticleJsonLdProps) {
  const data = generateStructuredData('article', props);
  return data ? <JsonLd data={data} /> : null;
}