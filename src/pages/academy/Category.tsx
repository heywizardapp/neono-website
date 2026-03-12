import * as React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  BookOpen, 
  Calendar, 
  CreditCard, 
  Users, 
  UserCog, 
  Megaphone, 
  BarChart3, 
  Puzzle, 
  Wrench, 
  Settings, 
  Rocket,
  ChevronRight,
  Clock,
  Eye,
  ThumbsUp,
  ArrowLeft,
  type LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/lib/supabase';

// Icon mapping for categories
const iconMap: Record<string, LucideIcon> = {
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
}

interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  views: number;
  helpful_count: number;
  order_index: number;
  updated_at: string;
  is_featured: boolean;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

function estimateReadTime(content?: string): string {
  // Estimate based on average reading speed of 200 words per minute
  // Without content, default to 3 min
  if (!content) return '3 min read';
  const words = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = React.useState<Category | null>(null);
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (slug) {
      fetchCategoryAndArticles();
    }
  }, [slug]);

  async function fetchCategoryAndArticles() {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch category by slug
      const { data: catData, error: catError } = await supabase
        .from('academy_categories')
        .select('*')
        .eq('slug', slug)
        .single();

      if (catError || !catData) {
        setError('Category not found');
        setIsLoading(false);
        return;
      }

      setCategory(catData);

      // Fetch articles in this category
      const { data: articlesData } = await supabase
        .from('academy_articles')
        .select('*')
        .eq('category_id', catData.id)
        .order('order_index');

      setArticles(articlesData || []);
    } catch (err) {
      setError('Failed to load category');
    } finally {
      setIsLoading(false);
    }
  }

  const CategoryIcon = category?.icon ? iconMap[category.icon] || BookOpen : BookOpen;

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The category you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/academy">Back to Academy</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{category?.title || 'Category'} - NeonO Academy</title>
        <meta 
          name="description" 
          content={category?.description || 'Help articles and tutorials'} 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link to="/academy" className="text-muted-foreground hover:text-foreground transition-colors">
                Academy
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-medium">
                {isLoading ? <Skeleton className="h-4 w-24 inline-block" /> : category?.title}
              </span>
            </nav>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-6 -ml-2"
            onClick={() => navigate('/academy')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Academy
          </Button>

          {/* Category Header */}
          {isLoading ? (
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-14 w-14 rounded-xl" />
                <Skeleton className="h-10 w-64" />
              </div>
              <Skeleton className="h-6 w-full max-w-lg mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          ) : category && (
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3.5 rounded-xl bg-primary/10 text-primary">
                  <CategoryIcon className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[hsl(215,85%,8%)]">
                  {category.title}
                </h1>
              </div>
              <p className="text-lg text-muted-foreground mb-3">
                {category.description}
              </p>
              <p className="text-sm text-muted-foreground">
                {articles.length} {articles.length === 1 ? 'article' : 'articles'}
              </p>
            </div>
          )}

          {/* Article List */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </Card>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No articles yet</h3>
              <p className="text-muted-foreground">
                We're working on adding content to this category.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((article, index) => (
                <Link
                  key={article.id}
                  to={`/academy/${slug}/${article.slug}`}
                  className="block group"
                >
                  <Card className="p-6 transition-all hover:shadow-md hover:border-primary/30">
                    <div className="flex items-start gap-4">
                      {/* Article Number */}
                      <div className="hidden sm:flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h2 className="text-lg font-semibold group-hover:text-primary transition-colors mb-1">
                              {article.title}
                              {article.is_featured && (
                                <Badge variant="secondary" className="ml-2 text-xs">
                                  Featured
                                </Badge>
                              )}
                            </h2>
                            <p className="text-muted-foreground line-clamp-2 mb-3">
                              {article.description}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all mt-1" />
                        </div>
                        
                        {/* Article Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {estimateReadTime()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {article.views} views
                          </span>
                          {article.helpful_count > 0 && (
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              {article.helpful_count} found helpful
                            </span>
                          )}
                          <span className="hidden sm:inline">
                            Updated {formatDate(article.updated_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Help CTA */}
          <div className="mt-12 text-center bg-muted/50 p-8 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Can't find what you're looking for?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" asChild>
                <Link to="/help">Search Help Center</Link>
              </Button>
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
