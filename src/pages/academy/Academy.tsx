import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, BookOpen, Calendar, CreditCard, Users, UserCog, Megaphone, BarChart3, Puzzle, Wrench, Settings, Rocket, ArrowRight, ChevronRight, ThumbsUp, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';

// Icon mapping for categories
const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Calendar,
  CreditCard,
  Users,
  UserCog,
  Megaphone,
  BarChart3,
  Puzzle,
  Wrench,
  Settings,
  BookOpen,
};

interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  article_count: number;
}

interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  category_id: string;
  views: number;
  helpful_count: number;
  is_featured: boolean;
  category?: {
    title: string;
    slug: string;
  };
}

// Generate a session ID for anonymous tracking
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('academy_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('academy_session_id', sessionId);
  }
  return sessionId;
}

export default function Academy() {
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [featuredArticles, setFeaturedArticles] = React.useState<Article[]>([]);
  const [popularArticles, setPopularArticles] = React.useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch data on mount
  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    
    try {
      // Fetch categories
      const { data: categoriesData, error: catError } = await supabase
        .from('academy_categories')
        .select('*')
        .order('order_index');

      console.log('Categories fetched:', categoriesData?.length, catError);

      if (!categoriesData) {
        setCategories([]);
        setIsLoading(false);
        return;
      }

      // Get article counts for each category using exact count
      const categoriesWithCounts = await Promise.all(
        categoriesData.map(async (category) => {
          const { count, error: countError } = await supabase
            .from('academy_articles')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', category.id);
          
          console.log(`Category ${category.slug}: count=${count}, error=`, countError);
          
          return {
            ...category,
            article_count: count || 0
          };
        })
      );

      setCategories(categoriesWithCounts);

      // Fetch featured articles
      const { data: featured } = await supabase
        .from('academy_articles')
        .select(`
          *,
          category:academy_categories(title, slug)
        `)
        .eq('is_featured', true)
        .limit(4);

      setFeaturedArticles(featured || []);

      // Fetch popular articles (by views)
      const { data: popular } = await supabase
        .from('academy_articles')
        .select(`
          *,
          category:academy_categories(title, slug)
        `)
        .order('views', { ascending: false })
        .limit(6);

      setPopularArticles(popular || []);
    } catch (error) {
      console.error('Error fetching academy data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Track search query for analytics
    try {
      await supabase.from('academy_search_queries').insert({
        query: searchQuery,
        session_id: getSessionId(),
        results_count: 0 // Will be updated on search results page
      });
    } catch (error) {
      // Silently fail analytics tracking
    }

    // Navigate to search results
    navigate(`/academy/search?q=${encodeURIComponent(searchQuery)}`);
  }

  const CategoryIcon = ({ iconName }: { iconName: string }) => {
    const Icon = iconMap[iconName] || BookOpen;
    return <Icon className="h-6 w-6" />;
  };

  return (
    <>
      <Helmet>
        <title>NeonO Academy - Help Center & Learning Resources</title>
        <meta 
          name="description" 
          content="Learn everything you need to succeed with NeonO. Tutorials, guides, and best practices for salon and spa management." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[hsl(240,89%,73%)] to-[hsl(165,82%,49%)] text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              Help Center
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
              NeonO Academy
            </h1>
            <p className="text-xl opacity-90 mb-8 font-display">
              Learn everything you need to succeed with NeonO
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles, guides, and tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 h-14 rounded-lg text-gray-900 text-lg bg-white border-0 focus-visible:ring-2 focus-visible:ring-white"
                />
                <Button 
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  size="sm"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              <span className="text-white/70 text-sm">Popular:</span>
              <Link to="/academy/getting-started/quick-start-guide" className="text-sm text-white/90 hover:text-white underline">
                Quick Start Guide
              </Link>
              <Link to="/academy/appointments" className="text-sm text-white/90 hover:text-white underline">
                Booking Setup
              </Link>
              <Link to="/academy/pos-payments" className="text-sm text-white/90 hover:text-white underline">
                Payments
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[hsl(215,85%,8%)] font-display">
                  Featured Articles
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredArticles.map((article) => (
                  <Link 
                    key={article.id} 
                    to={`/academy/${article.category?.slug}/${article.slug}`}
                    className="group"
                  >
                    <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                      <CardHeader>
                        <Badge variant="secondary" className="w-fit mb-2">
                          {article.category?.title}
                        </Badge>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {article.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {article.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {article.helpful_count}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Category Grid */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[hsl(215,85%,8%)] font-display">
              Browse by Category
            </h2>
            
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="h-32 animate-pulse bg-muted" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Link 
                    key={category.id} 
                    to={`/academy/${category.slug}`}
                    className="group"
                  >
                    <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/50">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <CategoryIcon iconName={category.icon} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                              {category.title}
                              <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mb-2">
                              {category.article_count} {category.article_count === 1 ? 'article' : 'articles'}
                            </p>
                            <CardDescription className="line-clamp-2">
                              {category.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Popular Articles */}
          {popularArticles.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-[hsl(215,85%,8%)] font-display">
                Popular Articles
              </h2>
              <div className="bg-card rounded-lg border divide-y">
                {popularArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/academy/${article.category?.slug}/${article.slug}`}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {article.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <Badge variant="outline" className="hidden sm:flex">
                        {article.category?.title}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Video Tutorials Promo */}
          <section className="mb-16">
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">
                      🎥 Video Tutorials Coming Soon
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      We're creating step-by-step video guides to help you master every feature of NeonO.
                      Subscribe to get notified when they launch.
                    </p>
                    <Button variant="outline">
                      Notify Me
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Still Need Help CTA */}
          <section className="text-center bg-muted/50 p-8 md:p-12 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-[hsl(215,85%,8%)]">
              Still need help?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is available 24/7 
              to help you succeed with NeonO.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button size="lg" asChild>
                <Link to="/demo">
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
