interface MetaConfig {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  locale?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

interface GeneratedMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  twitterCard: 'summary' | 'summary_large_image';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  robots: string;
  locale: string;
  alternateLocales?: string[];
}

const DEFAULT_META = {
  title: 'NeonO - All-in-One Business Management Software',
  description: 'Streamline your salon, barbershop, spa, or beauty business with NeonO. Get appointments, POS, marketing, and more in one platform.',
  image: '/og-image.jpg',
  locale: 'en-US',
  domain: typeof window !== 'undefined' ? window.location.origin : 'https://neono.com',
};

const PAGE_SPECIFIC_META: Record<string, Partial<MetaConfig>> = {
  '/': {
    title: 'NeonO - All-in-One Business Management Software for Beauty & Wellness',
    description: 'Transform your salon, barbershop, spa, or beauty business with NeonO. All-in-one platform with appointments, POS, marketing, analytics, and more.',
  },
  '/pricing': {
    title: 'Pricing Plans - NeonO Business Software',
    description: 'Simple, transparent pricing for NeonO business software. No setup fees, no contracts, no commission on tips. Start free and scale as you grow.',
  },
  '/roi': {
    title: 'ROI Calculator - See Your Savings with NeonO',
    description: 'Calculate how much you could save with NeonO vs. competitors. Compare total costs including seats, SMS, website, accounting, and payment processing.',
  },
  '/solutions/salons': {
    title: 'Hair Salon Software - NeonO Management Platform',
    description: 'Complete salon management software for hair stylists. Appointments, POS, client management, marketing tools, and analytics in one platform.',
  },
  '/products': {
    title: 'Products - NeonO Business Management Features',
    description: 'Explore NeonO\'s comprehensive business management features: appointments, POS & payments, marketing automation, analytics, and more.',
  },
};

export function getMeta(config: MetaConfig = {}): GeneratedMeta {
  const path = config.path || '/';
  const pageDefaults = PAGE_SPECIFIC_META[path] || {};
  
  // Merge defaults with page-specific and provided config
  const merged = {
    ...DEFAULT_META,
    ...pageDefaults,
    ...config,
  };

  const title = merged.title!;
  const description = merged.description!;
  const canonical = `${DEFAULT_META.domain}${path}`;
  const ogImage = merged.image?.startsWith('http') 
    ? merged.image 
    : `${DEFAULT_META.domain}${merged.image}`;

  return {
    title,
    description,
    canonical,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogUrl: canonical,
    ogType: merged.type || 'website',
    twitterCard: merged.image ? 'summary_large_image' : 'summary',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    robots: getrobots(path),
    locale: merged.locale!,
  };
}

function getrobots(path: string): string {
  // Allow all by default
  const allowedPaths = [
    '/',
    '/pricing',
    '/roi',
    '/products',
    '/solutions/',
    '/blog/',
    '/guides/',
  ];

  const isAllowed = allowedPaths.some(allowedPath => 
    path === allowedPath || path.startsWith(allowedPath)
  );

  return isAllowed ? 'index, follow' : 'noindex, nofollow';
}

// Utility to set document meta tags (client-side)
export function setDocumentMeta(meta: GeneratedMeta) {
  if (typeof document === 'undefined') return;

  // Title
  document.title = meta.title;

  // Meta tags
  setMetaTag('description', meta.description);
  setMetaTag('robots', meta.robots);
  
  // Open Graph
  setMetaTag('og:title', meta.ogTitle, 'property');
  setMetaTag('og:description', meta.ogDescription, 'property');
  setMetaTag('og:image', meta.ogImage, 'property');
  setMetaTag('og:url', meta.ogUrl, 'property');
  setMetaTag('og:type', meta.ogType, 'property');
  setMetaTag('og:locale', meta.locale, 'property');
  
  // Twitter
  setMetaTag('twitter:card', meta.twitterCard);
  setMetaTag('twitter:title', meta.twitterTitle);
  setMetaTag('twitter:description', meta.twitterDescription);
  setMetaTag('twitter:image', meta.twitterImage);
  
  // Canonical
  setLinkTag('canonical', meta.canonical);
}

function setMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
}

function setLinkTag(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  
  link.setAttribute('href', href);
}

// Generate structured data for different page types
export function generateStructuredData(type: string, data: any) {
  switch (type) {
    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'NeonO',
        url: DEFAULT_META.domain,
        logo: `${DEFAULT_META.domain}/logo.png`,
        description: DEFAULT_META.description,
        foundingDate: '2024',
        sameAs: [
          'https://twitter.com/neono',
          'https://linkedin.com/company/neono',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-800-NEONO',
          contactType: 'customer service',
          availableLanguage: 'English',
        },
      };
      
    case 'product':
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: data.name,
        description: data.description,
        brand: {
          '@type': 'Brand',
          name: 'NeonO',
        },
        offers: {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
      };
      
    case 'faqPage':
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((faq: any) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      };
      
    case 'breadcrumb':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.crumbs.map((crumb: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.label,
          item: `${DEFAULT_META.domain}${crumb.href}`,
        })),
      };
      
    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Person',
          name: data.author || 'NeonO Team',
        },
        publisher: {
          '@type': 'Organization',
          name: 'NeonO',
          logo: {
            '@type': 'ImageObject',
            url: `${DEFAULT_META.domain}/logo.png`,
          },
        },
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        mainEntityOfPage: data.url,
        image: data.image,
      };
      
    default:
      return null;
  }
}