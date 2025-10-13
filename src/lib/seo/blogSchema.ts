import readingTime from 'reading-time';

interface EnhancedArticleSchemaProps {
  title: string;
  description: string;
  content: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  url: string;
  featuredImage?: string;
  imageWidth?: number;
  imageHeight?: number;
  category?: string;
  tags?: string[];
}

export function generateEnhancedArticleSchema(props: EnhancedArticleSchemaProps) {
  const {
    title,
    description,
    content,
    author,
    publishedTime,
    modifiedTime,
    url,
    featuredImage,
    imageWidth = 1200,
    imageHeight = 630,
    category,
    tags = []
  } = props;

  const stats = readingTime(content);
  const wordCount = content.split(/\s+/).length;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: featuredImage ? {
      '@type': 'ImageObject',
      url: featuredImage,
      width: imageWidth,
      height: imageHeight
    } : undefined,
    author: {
      '@type': 'Person',
      name: author,
      url: `https://www.neono.com/author/${author.toLowerCase().replace(/\s+/g, '-')}`
    },
    publisher: {
      '@type': 'Organization',
      name: 'NeonO',
      url: 'https://www.neono.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.neono.com/logo.png',
        width: 600,
        height: 60
      }
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    articleBody: content.substring(0, 500), // First 500 chars for preview
    wordCount: wordCount,
    timeRequired: `PT${Math.ceil(stats.minutes)}M`,
    articleSection: category,
    keywords: tags.join(', '),
    inLanguage: 'en-US',
    isAccessibleForFree: true
  };
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function generateBlogBreadcrumbSchema(crumbs: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: `https://www.neono.com${crumb.href}`
    }))
  };
}

export function generateBlogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'NeonO Blog',
    description: 'Tips, guides, and insights for salon and spa management',
    url: 'https://www.neono.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'NeonO',
      url: 'https://www.neono.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.neono.com/logo.png'
      }
    },
    inLanguage: 'en-US'
  };
}
