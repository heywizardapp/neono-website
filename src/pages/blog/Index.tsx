import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, Clock } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { ShareBar } from '@/components/share/ShareBar';
import { RSSButton } from '@/components/blog/RSSButton';
import { blogPosts, categories, type BlogPost } from './blogData';
import { SEOHead } from '@/components/SEO/SEOHead';
import { generateBlogSchema } from '@/lib/seo/blogSchema';
import { generateStructuredData } from '@/lib/seo/meta';
import { Helmet } from 'react-helmet-async';

export default function BlogIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterPosts(query, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterPosts(searchQuery, category);
  };

  const filterPosts = (query: string, category: string) => {
    let filtered = blogPosts;

    if (category !== 'All') {
      filtered = filtered.filter(post => post.category === category);
    }

    if (query.trim()) {
      const normalizedQuery = query.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
      );
    }

    setFilteredPosts(filtered);
  };

  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' }
  ];

  const blogSchema = generateBlogSchema();

  return (
    <>
      <SEOHead
        title="Blog — NeonO"
        description="Tips, guides, and insights for running a successful salon or barbershop business. Industry trends and best practices."
        path="/blog"
        keywords="salon blog, barbershop tips, beauty business advice, salon management guides"
        structuredData={[
          {
            type: 'breadcrumb',
            data: generateStructuredData('breadcrumb', {
              crumbs: [
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" }
              ]
            })
          }
        ]}
      />
      
      {/* RSS Feed Discovery */}
      <Helmet>
        <link rel="alternate" type="application/rss+xml" title="NeonO Blog RSS Feed" href="/blog/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title="NeonO Blog Atom Feed" href="/blog/feed.xml" />
        <link rel="alternate" type="application/json" title="NeonO Blog JSON Feed" href="/blog/feed.json" />
      </Helmet>
      
      {/* Blog Schema */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema)
        }}
      />
      <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs customCrumbs={breadcrumbs} />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <RSSButton />
          </div>
          <h1 className="text-4xl font-bold mb-4">NeonO Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Industry insights, business tips, and product updates to help your beauty business thrive.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
                aria-label="Search blog posts"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Card className="mb-12 overflow-hidden border-primary/20">
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPost.featuredImage && (
                <div className="relative h-64 md:h-auto">
                  <img 
                    src={featuredPost.featuredImage} 
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              <div className={`p-8 flex flex-col justify-center ${!featuredPost.featuredImage ? 'md:col-span-2' : ''}`}>
                <Badge className="w-fit mb-4">Featured</Badge>
                <h2 className="text-2xl font-bold mb-4">
                  <a 
                    href={`/blog/${featuredPost.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {featuredPost.title}
                  </a>
                </h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(featuredPost.publishedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {featuredPost.readTime}
              </div>
              <span>By {featuredPost.author}</span>
            </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{featuredPost.category}</Badge>
                  {featuredPost.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Regular Posts */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {regularPosts.map(post => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {post.featuredImage && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <Badge variant="outline" className="mb-3">{post.category}</Badge>
                
                <h3 className="font-semibold mb-3 line-clamp-2">
                  <a 
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </a>
                </h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                <span>{post.readTime}</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card className="p-8 text-center">
            <h3 className="font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or selecting a different category.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setFilteredPosts(blogPosts);
            }}>
              Clear filters
            </Button>
          </Card>
        )}

        {/* Newsletter and Share */}
        <div className="grid gap-6 md:grid-cols-2">
          <NewsletterForm variant="inline" />
          <ShareBar />
        </div>
      </div>
    </div>
    </>
  );
}