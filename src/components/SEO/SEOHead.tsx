import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { JsonLd } from '@/lib/seo/jsonld';
import { generatePreloadLinks } from '@/lib/seo/prerender';
import { canonical, buildHreflang } from '@/lib/seo/hreflang';
import { PRICING } from '@/config/pricing';

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
  image = "/og/og-default.png",
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  keywords,
  noindex = false,
  structuredData = []
}: SEOHeadProps) {
  const preloadLinks = generatePreloadLinks(path);
  const canonicalUrl = canonical(path);
  const fullImageUrl = image.startsWith('http') ? image : `https://www.neono.com${image}`;
  const hreflangLinks = buildHreflang(path);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical and hreflang */}
      <link rel="canonical" href={canonicalUrl} />
      {hreflangLinks.map(link => (
        <link 
          key={link.hreflang}
          rel="alternate" 
          hrefLang={link.hreflang} 
          href={link.href} 
        />
      ))}
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="NeonO" />
      <meta property="og:locale" content="en_CA" />
      
      {/* Article specific */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@neono" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Language and locale */}
      <meta httpEquiv="content-language" content="en-CA" />
      
      {/* Additional SEO meta */}
      <meta name="format-detection" content="telephone=no" />

      {/* Preload Critical Resources */}
      {preloadLinks.map((link, index) => (
        <link key={index} {...link} />
      ))}

      {/* Structured Data */}
      {structuredData.map((schema, index) => {
        const jsonLdData = schema.data;
        return jsonLdData ? (
          <script 
            key={index}
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} 
          />
        ) : null;
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
    description: `Simple, transparent pricing for salon and barbershop software. Start at ${PRICING.starter.priceDisplay}/month with no setup fees or hidden costs.`,
    keywords: "salon software pricing, barbershop software cost, POS pricing, appointment booking pricing",
    structuredData: [
      {
        type: 'product' as const,
        data: {
          name: "NeonO Starter",
          description: "Complete salon software for small businesses",
          url: "https://www.neono.com/pricing",
          image: "https://www.neono.com/og/pricing.png",
          price: PRICING.starter.price,
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
          price: PRICING.growth.price,
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
  },

  products: {
    title: "Products — All Features Included | NeonO",
    description: "Discover all the powerful features included in NeonO: appointments, POS, marketing, analytics, and more. No hidden fees, everything you need.",
    keywords: "salon features, beauty software features, POS system, appointment booking, marketing automation",
  },

  staffManagement: {
    title: "Staff Management Software | NeonO",
    description: "Empower your team with smart scheduling, performance tracking, commission management, and role-based access. Reduce admin time by 70%.",
    keywords: "staff management, team scheduling, commission tracking, employee performance, salon staff software",
  },

  appointments: {
    title: "Appointment Scheduling Software | NeonO",
    description: "Smart appointment scheduling with automated reminders, real-time availability, and 80% reduction in no-shows. Try it free for 14 days.",
    keywords: "appointment scheduling, beauty booking software, automated reminders, salon calendar, online booking",
  },

  onlineBooking: {
    title: "Online Booking System | NeonO",
    description: "24/7 online booking that fills your calendar automatically. Reduce phone calls and increase bookings by 40%.",
    keywords: "online booking, 24/7 reservations, automatic booking, salon online scheduling",
  },

  marketing: {
    title: "Marketing Automation | NeonO",
    description: "Automated SMS and email campaigns that bring clients back. Increase repeat bookings by 35% with smart marketing tools.",
    keywords: "salon marketing, email automation, SMS campaigns, client retention, marketing software",
  },

  ai: {
    title: "AI-Powered Insights | NeonO",
    description: "Get intelligent recommendations to optimize pricing, staffing, and marketing. AI that helps you make better business decisions.",
    keywords: "AI salon software, business intelligence, predictive analytics, smart recommendations",
  },

  analytics: {
    title: "Analytics & Reports | NeonO",
    description: "Real-time business insights with customizable reports. Track revenue, staff performance, and customer trends in one dashboard.",
    keywords: "salon analytics, business reports, revenue tracking, performance metrics, dashboard",
  },

  pos: {
    title: "Point of Sale System | NeonO",
    description: "Lightning-fast POS with tap-to-pay, tip splitting, and same-day payouts. Accept all payment types with no hidden fees.",
    keywords: "salon POS, point of sale, payment processing, tip management, checkout system",
  },

  landingPageBuilder: {
    title: "Landing Page Builder | NeonO",
    description: "Create beautiful booking pages and websites in minutes. Mobile-optimized, SEO-friendly, and includes free hosting.",
    keywords: "website builder, landing page, salon website, booking page, online presence",
  },

  contact: {
    title: "Contact Us | NeonO",
    description: "Get in touch with our sales team to learn how NeonO can transform your salon or spa. Book a free demo or chat with our support team.",
    keywords: "contact salon software, demo request, customer support, sales inquiry",
  },

  demo: {
    title: "Book a Demo | NeonO",
    description: "See NeonO in action with a personalized demo. Learn how our all-in-one platform can save you time and increase revenue.",
    keywords: "software demo, product demo, salon software demo, personalized walkthrough",
  },

  resources: {
    title: "Resources & Guides | NeonO",
    description: "Expert advice, guides, and resources for salon and spa owners. Learn best practices, industry trends, and growth strategies.",
    keywords: "salon tips, spa business advice, beauty industry trends, business growth guides",
  },

  blog: {
    title: "Blog & Insights | NeonO",
    description: "Stay up-to-date with the latest trends, tips, and strategies for running a successful beauty business.",
    keywords: "salon blog, beauty business tips, industry insights, business strategies",
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