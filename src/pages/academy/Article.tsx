import * as React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { 
  ChevronRight, 
  Clock, 
  Eye, 
  ThumbsUp, 
  ThumbsDown,
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
  MessageSquare,
  Lightbulb,
  AlertCircle,
  Info,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

// ============================================
// Image Placeholder Component
// ============================================
function ImagePlaceholder({ alt }: { alt?: string }) {
  return (
    <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border border-gray-300 flex items-center justify-center my-6">
      <div className="text-center">
        <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-2" strokeWidth={1.5} />
        <p className="text-sm text-gray-500">{alt || 'Screenshot placeholder'}</p>
      </div>
    </div>
  );
}

// ============================================
// Table of Contents Component
// ============================================
function TableOfContents({ content }: { content: string }) {
  const headings = content.match(/^## .+$/gm);
  
  if (!headings || headings.length < 3) return null;
  
  return (
    <nav className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold mb-3 text-[hsl(215,85%,8%)]">In this article</h3>
      <ul className="space-y-2">
        {headings.map((heading, i) => {
          const text = heading.replace('## ', '');
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return (
            <li key={i}>
              <a 
                href={`#${id}`} 
                className="text-[hsl(240,89%,73%)] hover:text-[hsl(240,89%,63%)] hover:underline transition-colors"
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ============================================
// Callout/Tip Box Component
// ============================================
function CalloutBox({ type, children }: { type: 'tip' | 'note' | 'warning'; children: React.ReactNode }) {
  const styles = {
    tip: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      icon: <Lightbulb className="w-5 h-5 text-blue-500" />,
      textColor: 'text-blue-800'
    },
    note: {
      bg: 'bg-gray-50',
      border: 'border-gray-400',
      icon: <Info className="w-5 h-5 text-gray-500" />,
      textColor: 'text-gray-700'
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-500',
      icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
      textColor: 'text-amber-800'
    }
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} border-l-4 ${style.border} p-4 my-6 rounded-r-lg`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {style.icon}
        </div>
        <div className={`${style.textColor} text-sm leading-relaxed`}>
          {children}
        </div>
      </div>
    </div>
  );
}

interface Category {
  id: string;
  slug: string;
  title: string;
}

interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  views: number;
  helpful_count: number;
  not_helpful_count: number;
  updated_at: string;
  created_at: string;
  is_featured: boolean;
  category_id: string;
  category?: Category;
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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

function estimateReadTime(content?: string): number {
  if (!content) return 3;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function Article() {
  const { categorySlug, articleSlug } = useParams<{ categorySlug: string; articleSlug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [article, setArticle] = React.useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = React.useState<Article[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = React.useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState('');
  const [submittingFeedback, setSubmittingFeedback] = React.useState(false);

  React.useEffect(() => {
    if (articleSlug) {
      fetchArticle();
    }
  }, [articleSlug]);

  async function fetchArticle() {
    setIsLoading(true);
    setError(null);
    setFeedbackSubmitted(false);

    try {
      // Fetch article with category
      const { data: articleData, error: articleError } = await supabase
        .from('academy_articles')
        .select(`
          *,
          category:academy_categories(id, slug, title)
        `)
        .eq('slug', articleSlug)
        .single();

      if (articleError || !articleData) {
        setError('Article not found');
        setIsLoading(false);
        return;
      }

      setArticle(articleData);

      // Increment view count (fire and forget)
      supabase.rpc('increment_article_views', { article_id: articleData.id });

      // Fetch related articles in same category
      const { data: relatedData } = await supabase
        .from('academy_articles')
        .select('id, slug, title, description')
        .eq('category_id', articleData.category_id)
        .neq('id', articleData.id)
        .order('order_index')
        .limit(4);

      setRelatedArticles(relatedData || []);
    } catch (err) {
      setError('Failed to load article');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFeedback(helpful: boolean) {
    if (!article || feedbackSubmitted) return;
    
    setSubmittingFeedback(true);

    try {
      // Submit feedback
      await supabase
        .from('academy_article_feedback')
        .insert({
          article_id: article.id,
          session_id: getSessionId(),
          helpful: helpful,
          feedback_text: feedbackText || null
        });

      // Update local state
      setArticle(prev => prev ? {
        ...prev,
        helpful_count: helpful ? prev.helpful_count + 1 : prev.helpful_count,
        not_helpful_count: !helpful ? prev.not_helpful_count + 1 : prev.not_helpful_count
      } : null);

      setFeedbackSubmitted(true);
      setShowFeedbackForm(false);
      
      toast({
        title: "Thanks for your feedback!",
        description: helpful 
          ? "We're glad this article was helpful." 
          : "We'll work on improving this article.",
      });
    } catch (err) {
      toast({
        title: "Couldn't submit feedback",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setSubmittingFeedback(false);
    }
  }

  async function handleShare() {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          text: article?.description,
          url: url
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Article link has been copied to clipboard.",
      });
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4 font-display">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been moved.
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
        <title>{article?.title || 'Article'} - NeonO Academy</title>
        <meta 
          name="description" 
          content={article?.description || 'Help article'} 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm flex-wrap">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <Link to="/academy" className="text-muted-foreground hover:text-foreground transition-colors">
                Academy
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              {isLoading ? (
                <Skeleton className="h-4 w-24" />
              ) : (
                <Link 
                  to={`/academy/${article?.category?.slug}`} 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {article?.category?.title}
                </Link>
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-foreground font-medium truncate max-w-[200px]">
                {isLoading ? <Skeleton className="h-4 w-32 inline-block" /> : article?.title}
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
            onClick={() => navigate(`/academy/${categorySlug}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {article?.category?.title || 'Category'}
          </Button>

          {/* Article Header */}
          {isLoading ? (
            <div className="mb-10">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          ) : article && (
            <header className="mb-10">
              {article.is_featured && (
                <Badge variant="secondary" className="mb-4">
                  Featured Article
                </Badge>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-[hsl(215,85%,8%)] mb-4 font-display">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>Updated {formatDate(article.updated_at)}</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {estimateReadTime(article.content)} min read
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {article.views} views
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-auto"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </header>
          )}

          {/* Article Content */}
          {isLoading ? (
            <div className="space-y-4 mb-12">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          ) : article?.content && (
            <>
              {/* Table of Contents */}
              <TableOfContents content={article.content} />
              
              {/* Article Body with Enhanced Prose Styling */}
              <article className="academy-article-prose mb-12">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSanitize]}
                  components={{
                    // Enhanced heading rendering with IDs for TOC links
                    h2: ({ children }) => {
                      const text = children?.toString() || '';
                      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      return (
                        <h2 
                          id={id} 
                          className="text-2xl font-semibold mt-10 mb-4 text-[hsl(215,85%,8%)] border-b border-gray-200 pb-3 scroll-mt-24 font-display"
                        >
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold mt-8 mb-3 text-[hsl(215,85%,8%)]">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-lg font-semibold mt-6 mb-2 text-[hsl(215,85%,8%)]">
                        {children}
                      </h4>
                    ),
                    // Enhanced paragraph styling
                    p: ({ children }) => {
                      const text = children?.toString() || '';
                      
                      // Detect Pro Tip callouts
                      if (text.startsWith('**Pro Tip:**') || text.includes('Pro Tip:')) {
                        return (
                          <CalloutBox type="tip">
                            {children}
                          </CalloutBox>
                        );
                      }
                      
                      // Detect Note callouts
                      if (text.startsWith('**Note:**') || text.startsWith('Note:')) {
                        return (
                          <CalloutBox type="note">
                            {children}
                          </CalloutBox>
                        );
                      }
                      
                      // Detect Warning callouts
                      if (text.startsWith('**Warning:**') || text.startsWith('Warning:')) {
                        return (
                          <CalloutBox type="warning">
                            {children}
                          </CalloutBox>
                        );
                      }
                      
                      return (
                        <p className="leading-7 mb-5 text-gray-600">
                          {children}
                        </p>
                      );
                    },
                    // Enhanced strong/bold text
                    strong: ({ children }) => (
                      <strong className="font-semibold text-[hsl(215,85%,8%)]">
                        {children}
                      </strong>
                    ),
                    // Enhanced unordered lists
                    ul: ({ children }) => (
                      <ul className="my-5 ml-6 space-y-2 list-disc marker:text-[hsl(240,89%,73%)]">
                        {children}
                      </ul>
                    ),
                    // Enhanced ordered lists with numbered circles
                    ol: ({ children }) => (
                      <ol className="my-6 space-y-4 list-none pl-0 counter-reset-[step]">
                        {children}
                      </ol>
                    ),
                    // Enhanced list items
                    li: ({ children, ordered, index }) => {
                      // Check if parent is ordered list by looking at element structure
                      const isOrdered = typeof index === 'number';
                      
                      if (isOrdered) {
                        return (
                          <li className="relative pl-12 leading-7 text-gray-600">
                            <span className="absolute left-0 top-0 w-8 h-8 bg-[hsl(240,89%,73%)] text-white rounded-full flex items-center justify-center font-semibold text-sm">
                              {(index || 0) + 1}
                            </span>
                            {children}
                          </li>
                        );
                      }
                      
                      return (
                        <li className="leading-7 text-gray-600">
                          {children}
                        </li>
                      );
                    },
                    // Image placeholder for missing images
                    img: ({ alt }) => <ImagePlaceholder alt={alt} />,
                    // Enhanced blockquotes
                    blockquote: ({ children }) => (
                      <blockquote className="bg-gray-50 border-l-4 border-[hsl(240,89%,73%)] py-4 px-6 my-6 rounded-r-lg font-display">
                        <div className="text-gray-700">
                          {children}
                        </div>
                      </blockquote>
                    ),
                    // Enhanced inline code
                    code: ({ node, className, children, ...props }) => {
                      const isInline = !className;
                      if (isInline) {
                        return (
                          <code className="bg-gray-100 text-[hsl(215,85%,8%)] px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    // Enhanced code blocks
                    pre: ({ children }) => (
                      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 my-6 overflow-x-auto text-sm">
                        {children}
                      </pre>
                    ),
                    // Enhanced links
                    a: ({ href, children }) => {
                      const isInternal = href?.startsWith('#') || href?.startsWith('/');
                      return (
                        <a 
                          href={href}
                          target={isInternal ? undefined : "_blank"}
                          rel={isInternal ? undefined : "noopener noreferrer"}
                          className="text-[hsl(240,89%,73%)] hover:text-[hsl(240,89%,63%)] underline underline-offset-2 transition-colors"
                        >
                          {children}
                        </a>
                      );
                    },
                    // Enhanced horizontal rules
                    hr: () => (
                      <hr className="my-8 border-gray-200" />
                    ),
                    // Enhanced tables
                    table: ({ children }) => (
                      <div className="my-6 overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-gray-50">
                        {children}
                      </thead>
                    ),
                    th: ({ children }) => (
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[hsl(215,85%,8%)] border-b">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-3 text-sm text-gray-600 border-b border-gray-100">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </article>
            </>
          )}

          {/* Feedback Section */}
          {!isLoading && article && (
            <div className="border-t border-b py-8 mb-10">
              <h3 className="text-lg font-semibold mb-4">
                Was this article helpful?
              </h3>
              
              {feedbackSubmitted ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-5 w-5" />
                  <span>Thanks for your feedback!</span>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => handleFeedback(true)}
                      disabled={submittingFeedback}
                      className="gap-2"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Yes ({article.helpful_count})
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setShowFeedbackForm(true);
                      }}
                      disabled={submittingFeedback}
                      className="gap-2"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      No ({article.not_helpful_count})
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFeedbackForm(!showFeedbackForm)}
                      className="gap-2 text-muted-foreground"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Leave feedback
                    </Button>
                  </div>
                  
                  {showFeedbackForm && (
                    <div className="space-y-3 max-w-lg">
                      <Textarea
                        placeholder="How can we improve this article? (optional)"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => handleFeedback(false)}
                          disabled={submittingFeedback}
                        >
                          Submit Feedback
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setShowFeedbackForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Related Articles */}
          {!isLoading && relatedArticles.length > 0 && (
            <section className="mb-10">
              <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
              <div className="grid gap-3">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/academy/${categorySlug}/${related.slug}`}
                    className="group flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 hover:border-primary/30 transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {related.title}
                      </span>
                      {related.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                          {related.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Navigation / Help CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-6 bg-muted/50 rounded-lg">
            <div>
              <h4 className="font-semibold mb-1">Need more help?</h4>
              <p className="text-sm text-muted-foreground">
                Our support team is available 24/7
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link to="/help">Help Center</Link>
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
