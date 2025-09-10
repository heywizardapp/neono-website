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
 * Scan for blog posts (in a real implementation, this would read from filesystem or CMS)
 */
function scanBlogPosts(): SitemapUrl[] {
  // This is a placeholder - in a real implementation, you would:
  // 1. Scan src/content/blog/*.md files
  // 2. Extract frontmatter for dates and metadata
  // 3. Generate URLs based on file structure
  
  const blogPosts: SitemapUrl[] = [];
  
  // Example blog posts
  const samplePosts = [
    'salon-management-tips',
    'barbershop-marketing-strategies',
    'appointment-booking-best-practices'
  ];
  
  for (const slug of samplePosts) {
    blogPosts.push({
      loc: `/blog/${slug}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        .toISOString().split('T')[0]
    });
  }
  
  return blogPosts;
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
  
  // Generate sitemap index
  const sitemapFiles = [
    'sitemap-pages.xml',
    'sitemap-solutions.xml', 
    'sitemap-blog.xml'
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