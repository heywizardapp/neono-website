import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, Clock } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { ShareBar } from '@/components/share/ShareBar';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  slug: string;
  publishedAt: string;
  readTime: string;
  author: string;
  featured?: boolean;
}

// Mock blog data
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Hidden Costs of Salon Software: What They Don\'t Tell You',
    excerpt: 'Most salon software looks affordable until you add essential features. Learn what to watch for and how to calculate true total cost.',
    category: 'Business',
    tags: ['costs', 'software', 'roi'],
    slug: 'hidden-costs-salon-software',
    publishedAt: '2024-01-15',
    readTime: '7 min read',
    author: 'NeonO Team',
    featured: true
  },
  {
    id: '2',
    title: '5 SMS Marketing Campaigns That Actually Work for Salons',
    excerpt: 'Effective SMS campaigns that drive bookings without annoying clients. Includes templates and timing strategies.',
    category: 'Marketing',
    tags: ['sms', 'marketing', 'campaigns'],
    slug: 'sms-marketing-campaigns-salons',
    publishedAt: '2024-01-12',
    readTime: '5 min read',
    author: 'Marketing Team'
  },
  {
    id: '3',
    title: 'Client Retention Strategies That Increased Revenue by 40%',
    excerpt: 'Real case studies from successful salons using data-driven retention strategies to boost lifetime value.',
    category: 'Growth',
    tags: ['retention', 'revenue', 'clients'],
    slug: 'client-retention-strategies',
    publishedAt: '2024-01-10',
    readTime: '8 min read',
    author: 'Business Team'
  },
  {
    id: '4',
    title: 'Why Commission-Free Payments Matter (And Save You Money)',
    excerpt: 'Breaking down the math: how commission-free tip processing can save thousands annually vs. traditional processors.',
    category: 'Payments',
    tags: ['payments', 'tips', 'savings'],
    slug: 'commission-free-payments',
    publishedAt: '2024-01-08',
    readTime: '4 min read',
    author: 'Product Team'
  }
];

const categories = ['All', 'Business', 'Marketing', 'Growth', 'Payments', 'Technology'];

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs customCrumbs={breadcrumbs} />
        
        {/* Header */}
        <div className="text-center mb-12">
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
          <Card className="p-8 mb-12 bg-gradient-to-r from-primary/5 to-primary/10">
            <Badge className="mb-4">Featured</Badge>
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
          </Card>
        )}

        {/* Regular Posts */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {regularPosts.map(post => (
            <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
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
  );
}