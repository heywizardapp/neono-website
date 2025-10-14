import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { ShareBar } from '@/components/share/ShareBar';
import { StickyCompare } from '@/components/compare/StickyCompare';
import { ResourceTabs, ResourceType } from '@/components/resources/ResourceTabs';
import { getAllPosts } from '@/lib/blog/storage';
import { SEOHead } from '@/components/SEO/SEOHead';

// Extended resource interface with content types
interface Resource {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  contentType: 'blog' | 'guide' | 'education' | 'video' | 'case-study';
  tags: string[];
  slug: string;
  publishedAt: string;
  readTime: string;
  author: string;
  featured?: boolean;
  featuredImage?: string;
}

// Map blog posts to resources - only from localStorage
const getResources = (): Resource[] => {
  const blogPosts = getAllPosts().filter(post => post.status === 'published');
  return blogPosts.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    slug: post.slug,
    publishedAt: post.publishedAt,
    readTime: post.readTime,
    author: post.author,
    featured: post.featured,
    featuredImage: post.featuredImage,
    contentType: (post as any).contentType || 'blog' as const
  }));
};

export default function ResourcesHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ResourceType>('all');
  const resources = getResources();

  // Filter resources based on type and search
  const filteredResources = useMemo(() => {
    let filtered = resources;

    // Filter by content type
    if (selectedType !== 'all') {
      filtered = filtered.filter(resource => resource.contentType === selectedType);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(query) ||
        resource.excerpt.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedType, searchQuery]);

  // Get content type badge variant
  const getContentTypeBadge = (type: string) => {
    switch (type) {
      case 'blog': return 'default';
      case 'guide': return 'secondary';
      case 'video': return 'destructive';
      case 'case-study': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Resources & Insights | NeonO"
        description="Explore industry insights, business tips, guides, and success stories for beauty and wellness businesses."
        path="/resources"
      />

      {/* Vagaro-style Hero Section */}
      <div className="bg-gradient-to-b from-muted/30 to-background py-16 border-b">
        <div className="container max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-4">Resources</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Explore all the industry insights & business tips for amplified success, 
            all right here! It's your go-to hub for staying in the know & ahead in your field.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <ResourceTabs selectedType={selectedType} onTypeChange={setSelectedType} />

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
              aria-label="Search resources"
            />
          </div>
        </div>

        {/* PRO BLOG Branding */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <Badge variant="destructive" className="text-sm px-4 py-1.5 mb-3 font-semibold">
              PRO BLOG
            </Badge>
          </div>
          <h2 className="text-3xl font-bold">The Latest Articles</h2>
        </div>

        {/* Resource Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {filteredResources.map((resource) => (
            <a 
              key={resource.id} 
              href={`/blog/${resource.slug}`}
              className="group"
            >
              <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300">
                {/* Larger Image with Overlay Badge */}
                <div className="relative h-56 overflow-hidden bg-muted">
                  {resource.featuredImage ? (
                    <img 
                      src={resource.featuredImage}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-4xl font-bold text-muted-foreground/20">
                        {resource.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Content Type Badge Overlay */}
                  <Badge 
                    variant={getContentTypeBadge(resource.contentType)}
                    className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm capitalize"
                  >
                    {resource.contentType.replace('-', ' ')}
                  </Badge>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {resource.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{resource.readTime}</span>
                    <span>{new Date(resource.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <Card className="p-12 text-center">
            <h3 className="text-xl font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or selecting a different category.
            </p>
          </Card>
        )}

        {/* Newsletter & Share */}
        <div className="grid gap-6 md:grid-cols-2 items-start mt-16">
          <NewsletterForm variant="inline" />
          <ShareBar />
        </div>
      </div>

      <StickyCompare />
    </div>
  );
}
