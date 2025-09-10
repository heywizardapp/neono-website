import * as React from 'react';
import { canonical, buildHreflang } from './hreflang';

type Locale = "en-CA" | "en-US" | "fr-CA";

interface MetaProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  locale?: Locale;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string;
  noindex?: boolean;
}

export function Meta({ 
  title, 
  description, 
  path, 
  image = "/og/og-default.png", 
  locale = "en-CA",
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  keywords,
  noindex = false
}: MetaProps) {
  const canonicalUrl = canonical(path);
  const fullImageUrl = image.startsWith('http') ? image : `https://www.neono.com${image}`;
  const hreflangLinks = buildHreflang(path);
  
  return (
    <>
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
      <meta property="og:locale" content={locale.replace('-', '_')} />
      
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
      <meta httpEquiv="content-language" content={locale} />
      
      {/* Additional SEO meta */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#7C7CF2" />
    </>
  );
}

// Utility function to generate page-specific titles
export function buildTitle(pageTitle?: string, siteName = "NeonO"): string {
  if (!pageTitle) return `${siteName} — Run your salon or barbershop on one platform`;
  if (pageTitle === siteName) return pageTitle;
  return `${pageTitle} | ${siteName}`;
}

// Utility function to truncate descriptions
export function truncateDescription(description: string, maxLength = 160): string {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3).trim() + '...';
}

// Default meta configurations for common pages
export const defaultMeta = {
  home: {
    title: "NeonO — Run your salon or barbershop on one platform",
    description: "Appointments, POS, marketing, website, and AI—built in. Faster checkouts, fewer no-shows, happier clients.",
    keywords: "salon software, barbershop POS, appointment booking, salon management, beauty software"
  },
  pricing: {
    title: "Pricing — NeonO",
    description: "Simple, transparent pricing for salon and barbershop software. Start at $29/month with no setup fees or hidden costs.",
    keywords: "salon software pricing, barbershop software cost, POS pricing, appointment booking pricing"
  },
  solutions: {
    title: "Solutions — NeonO",
    description: "Complete software solutions for salons, barbershops, and beauty businesses. Streamline operations and grow your business.",
    keywords: "salon solutions, barbershop software, beauty business management, appointment software"
  },
  products: {
    title: "Products — NeonO",
    description: "All-in-one platform with appointments, POS, marketing tools, and website builder designed specifically for beauty businesses.",
    keywords: "salon products, barbershop tools, beauty software features, appointment system"
  },
  blog: {
    title: "Blog — NeonO",
    description: "Tips, guides, and insights for running a successful salon or barbershop business. Industry trends and best practices.",
    keywords: "salon blog, barbershop tips, beauty business advice, salon management guides"
  }
};