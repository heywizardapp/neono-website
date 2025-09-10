import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Video, FileText } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { ShareBar } from '@/components/share/ShareBar';
import { StickyCompare } from '@/components/compare/StickyCompare';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'blog' | 'guide' | 'video';
  tags: string[];
  slug: string;
  publishedAt: string;
  readTime?: string;
}

// Mock data - in a real app this would come from a CMS or API
const resources: Resource[] = [
  {
    id: '1',
    title: 'Complete Guide to Salon Client Retention',
    description: 'Learn proven strategies to keep clients coming back and increase lifetime value.',
    category: 'Salons',
    type: 'guide',
    tags: ['retention', 'clients', 'marketing'],
    slug: 'salon-client-retention-guide',
    publishedAt: '2024-01-15',
    readTime: '8 min read'
  },
  {
    id: '2',
    title: 'ROI Calculator: Why Most Salons Overpay for Software',
    description: 'Break down the hidden costs in salon software and calculate your true ROI.',
    category: 'Pricing',
    type: 'blog',
    tags: ['roi', 'costs', 'software'],
    slug: 'salon-software-roi-calculator',
    publishedAt: '2024-01-10',
    readTime: '5 min read'
  },
  {
    id: '3',
    title: 'Barbershop Marketing on a Budget',
    description: 'Effective marketing strategies that won\'t break the bank for small barbershops.',
    category: 'Barbershops',
    type: 'guide',
    tags: ['marketing', 'budget', 'small business'],
    slug: 'barbershop-marketing-budget',
    publishedAt: '2024-01-08',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'Setting Up Your Spa for Success',
    description: 'Essential systems and processes every spa needs to thrive.',
    category: 'Spas',
    type: 'video',
    tags: ['setup', 'systems', 'success'],
    slug: 'spa-setup-success',
    publishedAt: '2024-01-05',
    readTime: '12 min watch'
  }
];

const categories = ['All', 'Salons', 'Barbershops', 'Spas', 'Nails', 'Aesthetics', 'Pricing', 'Product'];

export default function ResourcesIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredResources, setFilteredResources] = useState(resources);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterResources(query, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterResources(searchQuery, category);
  };

  const filterResources = (query: string, category: string) => {
    let filtered = resources;

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(resource => resource.category === category);
    }

    // Filter by search query
    if (query.trim()) {
      const normalizedQuery = query.toLowerCase();
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(normalizedQuery) ||
        resource.description.toLowerCase().includes(normalizedQuery) ||
        resource.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
      );
    }

    setFilteredResources(filtered);
  };

  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'blog': return <FileText className="h-4 w-4" />;
      case 'guide': return <BookOpen className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
    }
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs customCrumbs={breadcrumbs} />
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Resources & Insights</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Guides, tips, and industry insights to help grow your beauty and wellness business.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
                aria-label="Search resources"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange(category)}
                  className="min-w-0"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {filteredResources.map(resource => (
            <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary" className="flex items-center gap-1">
                  {getTypeIcon(resource.type)}
                  {resource.type}
                </Badge>
                <Badge variant="outline">{resource.category}</Badge>
              </div>
              
              <h3 className="font-semibold mb-2 line-clamp-2">
                <a 
                  href={`/${resource.type}/${resource.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {resource.title}
                </a>
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {resource.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{new Date(resource.publishedAt).toLocaleDateString()}</span>
                {resource.readTime && <span>{resource.readTime}</span>}
              </div>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {resource.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <Card className="p-8 text-center">
            <h3 className="font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or selecting a different category.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setFilteredResources(resources);
            }}>
              Clear filters
            </Button>
          </Card>
        )}

        {/* Newsletter CTA */}
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <NewsletterForm variant="inline" />
          <ShareBar />
        </div>
      </div>
      
      <StickyCompare />
    </div>
  );
}