import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Meta } from '@/lib/seo/meta.tsx';
import { JsonLd } from '@/lib/seo/jsonld';
import { generatePreloadLinks } from '@/lib/seo/prerender';

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string;
  noindex?: boolean;
  structuredData?: Array<{
    type: 'organization' | 'product' | 'faq' | 'breadcrumb' | 'article';
    data: any;
  }>;
}

export function SEOHead({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  keywords,
  noindex = false,
  structuredData = []
}: SEOHeadProps) {
  const preloadLinks = generatePreloadLinks(path);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <Meta
        title={title}
        description={description}
        path={path}
        image={image}
        type={type}
        publishedTime={publishedTime}
        modifiedTime={modifiedTime}
        author={author}
        keywords={keywords}
        noindex={noindex}
      />

      {/* Preload Critical Resources */}
      {preloadLinks.map((link, index) => (
        <link key={index} {...link} />
      ))}

      {/* Structured Data */}
      {structuredData.map((schema, index) => {
        const jsonLdData = schema.data;
        return jsonLdData ? <JsonLd key={index} data={jsonLdData} /> : null;
      })}

      {/* Favicon and theme */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="theme-color" content="#7C7CF2" />
      <meta name="msapplication-TileColor" content="#7C7CF2" />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      
      {/* Additional Performance Hints */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
    </Helmet>
  );
}

// Preset configurations for common pages
export const SEO_PRESETS = {
  home: {
    title: "NeonO — Run your salon or barbershop on one platform",
    description: "Appointments, POS, marketing, website, and AI—built in. Faster checkouts, fewer no-shows, happier clients.",
    keywords: "salon software, barbershop POS, appointment booking, salon management, beauty software",
    structuredData: [
      {
        type: 'organization' as const,
        data: {
          name: "NeonO",
          url: "https://www.neono.com",
          logo: "https://www.neono.com/logo.png"
        }
      }
    ]
  },

  pricing: {
    title: "Pricing — NeonO",
    description: "Simple, transparent pricing for salon and barbershop software. Start at $29/month with no setup fees or hidden costs.",
    keywords: "salon software pricing, barbershop software cost, POS pricing, appointment booking pricing",
    structuredData: [
      {
        type: 'product' as const,
        data: {
          name: "NeonO Starter",
          description: "Complete salon software for small businesses",
          url: "https://www.neono.com/pricing",
          image: "https://www.neono.com/og/pricing.png",
          price: 29,
          currency: "USD"
        }
      },
      {
        type: 'product' as const,
        data: {
          name: "NeonO Growth",
          description: "Advanced salon software for growing businesses",
          url: "https://www.neono.com/pricing",
          image: "https://www.neono.com/og/pricing.png",
          price: 59,
          currency: "USD"
        }
      }
    ]
  },

  solutions: {
    title: "Solutions — NeonO",
    description: "Complete software solutions for salons, barbershops, and beauty businesses. Streamline operations and grow your business.",
    keywords: "salon solutions, barbershop software, beauty business management, appointment software",
    structuredData: [
      {
        type: 'breadcrumb' as const,
        data: [
          { name: "Home", url: "https://www.neono.com/" },
          { name: "Solutions", url: "https://www.neono.com/solutions" }
        ]
      }
    ]
  },

  salonSolution: {
    title: "Salon Software — NeonO Solutions",
    description: "Complete salon management software with appointments, POS, marketing, and website builder designed for modern salons.",
    keywords: "salon software, salon management system, salon POS, salon booking software",
    structuredData: [
      {
        type: 'breadcrumb' as const,
        data: [
          { name: "Home", url: "https://www.neono.com/" },
          { name: "Solutions", url: "https://www.neono.com/solutions" },
          { name: "Salons", url: "https://www.neono.com/solutions/salons" }
        ]
      }
    ]
  }
};

// Hook for dynamic SEO data
export function useSEO(presetKey?: keyof typeof SEO_PRESETS) {
  const [seoData, setSeoData] = React.useState<Partial<SEOHeadProps> | null>(
    presetKey ? SEO_PRESETS[presetKey] : null
  );

  const updateSEO = React.useCallback((newData: Partial<SEOHeadProps>) => {
    setSeoData(current => current ? { ...current, ...newData } : newData);
  }, []);

  return { seoData, updateSEO };
}