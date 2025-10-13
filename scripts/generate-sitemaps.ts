import fs from 'fs';
import path from 'path';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

interface SitemapConfig {
  baseUrl: string;
  outputDir: string;
}

const config: SitemapConfig = {
  baseUrl: 'https://www.neono.com',
  outputDir: 'dist'
};

// Static pages configuration
const staticPages: SitemapUrl[] = [
  {
    loc: '/',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/pricing',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/products',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/roi',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Solutions pages
const solutionPages: SitemapUrl[] = [
  {
    loc: '/solutions/salons',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Blog/Resources pages (would be dynamic in real implementation)
const blogPages: SitemapUrl[] = [
  {
    loc: '/blog',
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/resources',
    changefreq: 'weekly',
    priority: 0.6,
    lastmod: new Date().toISOString().split('T')[0]
  }
];

/**
 * Generate XML sitemap content
 */
function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlElements = urls.map(url => {
    let urlXml = `  <url>\n    <loc>${config.baseUrl}${url.loc}</loc>\n`;
    
    if (url.lastmod) {
      urlXml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    }
    
    if (url.changefreq) {
      urlXml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    }
    
    if (url.priority !== undefined) {
      urlXml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
    }
    
    urlXml += '  </url>';
    return urlXml;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

/**
 * Generate sitemap index XML
 */
function generateSitemapIndex(sitemaps: string[]): string {
  const lastmod = new Date().toISOString().split('T')[0];
  
  const sitemapElements = sitemaps.map(sitemap => `  <sitemap>
    <loc>${config.baseUrl}/${sitemap}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`;
}

/**
 * Write sitemap file
 */
function writeSitemap(filename: string, content: string): void {
  const outputPath = path.join(config.outputDir, filename);
  
  // Ensure output directory exists
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`Generated: ${filename}`);
}

/**
 * Validate URLs (check for duplicates, proper format)
 */
function validateUrls(urls: SitemapUrl[]): SitemapUrl[] {
  const seen = new Set<string>();
  const valid: SitemapUrl[] = [];
  
  for (const url of urls) {
    // Normalize URL
    let loc = url.loc;
    if (!loc.startsWith('/')) {
      loc = '/' + loc;
    }
    
    // Remove duplicate slashes
    loc = loc.replace(/\/+/g, '/');
    
    // Remove trailing slash (except for root)
    if (loc !== '/' && loc.endsWith('/')) {
      loc = loc.slice(0, -1);
    }
    
    // Check for duplicates
    if (seen.has(loc)) {
      console.warn(`Duplicate URL found: ${loc}`);
      continue;
    }
    
    seen.add(loc);
    valid.push({ ...url, loc });
  }
  
  return valid;
}

/**
 * Scan for blog posts from localStorage and static blog data
 */
function scanBlogPosts(): SitemapUrl[] {
  const blogPosts: SitemapUrl[] = [];
  
  // Try to read from localStorage (published posts from blog admin)
  try {
    if (typeof window !== 'undefined') {
      const storedPosts = localStorage.getItem('blog_posts');
      if (storedPosts) {
        const posts = JSON.parse(storedPosts);
        const publishedPosts = posts.filter((post: any) => post.status === 'published');
        
        for (const post of publishedPosts) {
          blogPosts.push({
            loc: `/blog/${post.slug || post.id}`,
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: post.updatedAt ? new Date(post.updatedAt).toISOString().split('T')[0] : 
                     new Date(post.createdAt).toISOString().split('T')[0]
          });
        }
      }
    }
  } catch (error) {
    console.warn('Could not read blog posts from localStorage:', error);
  }
  
  // Fallback: Static blog posts from blogData.ts
  const staticPosts = [
    { slug: 'salon-management-tips', date: '2024-01-15' },
    { slug: 'barbershop-marketing-strategies', date: '2024-01-20' },
    { slug: 'appointment-booking-best-practices', date: '2024-01-25' },
    { slug: 'beauty-salon-success', date: '2024-02-01' },
    { slug: 'spa-client-retention', date: '2024-02-05' }
  ];
  
  for (const post of staticPosts) {
    // Only add if not already added from localStorage
    if (!blogPosts.find(p => p.loc === `/blog/${post.slug}`)) {
      blogPosts.push({
        loc: `/blog/${post.slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: post.date
      });
    }
  }
  
  return blogPosts;
}

/**
 * Generate image sitemap for blog featured images
 */
function generateImageSitemap(blogPosts: SitemapUrl[]): string {
  const imageEntries = blogPosts
    .map(post => {
      // In a real implementation, you'd fetch the actual featured image
      const slug = post.loc.split('/').pop();
      return `  <url>
    <loc>${config.baseUrl}${post.loc}</loc>
    <image:image>
      <image:loc>${config.baseUrl}/blog-images/${slug}-featured.jpg</image:loc>
      <image:title>${slug?.replace(/-/g, ' ')}</image:title>
    </image:image>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries}
</urlset>`;
}

/**
 * Main sitemap generation function
 */
export function generateSitemaps(): void {
  console.log('Generating sitemaps...');
  
  // Validate and generate individual sitemaps
  const validStaticPages = validateUrls(staticPages);
  const validSolutionPages = validateUrls(solutionPages);
  const validBlogPages = validateUrls([...blogPages, ...scanBlogPosts()]);
  
  // Generate individual sitemaps
  writeSitemap('sitemap-pages.xml', generateSitemapXml(validStaticPages));
  writeSitemap('sitemap-solutions.xml', generateSitemapXml(validSolutionPages));
  writeSitemap('sitemap-blog.xml', generateSitemapXml(validBlogPages));
  writeSitemap('sitemap-images.xml', generateImageSitemap(validBlogPages));
  
  // Generate sitemap index
  const sitemapFiles = [
    'sitemap-pages.xml',
    'sitemap-solutions.xml', 
    'sitemap-blog.xml',
    'sitemap-images.xml'
  ];
  
  writeSitemap('sitemap.xml', generateSitemapIndex(sitemapFiles));
  
  console.log('Sitemaps generated successfully!');
  console.log(`Total URLs: ${validStaticPages.length + validSolutionPages.length + validBlogPages.length}`);
}

/**
 * Add new URL to sitemap (for dynamic content)
 */
export function addUrlToSitemap(
  url: string, 
  options: {
    type?: 'pages' | 'solutions' | 'blog';
    changefreq?: SitemapUrl['changefreq'];
    priority?: number;
  } = {}
): void {
  const { type = 'pages', changefreq = 'monthly', priority = 0.5 } = options;
  
  const newUrl: SitemapUrl = {
    loc: url,
    changefreq,
    priority,
    lastmod: new Date().toISOString().split('T')[0]
  };
  
  // In a real implementation, you'd read the existing sitemap,
  // add the new URL, and regenerate
  console.log(`Would add ${url} to sitemap-${type}.xml`);
}

// CLI execution
if (require.main === module) {
  generateSitemaps();
}