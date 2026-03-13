import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/lib/supabase';
import { 
  Search as SearchIcon, 
  BookOpen, 
  Clock, 
  ChevronRight,
  FolderOpen,
  AlertCircle
} from 'lucide-react';

interface ArticleResult {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  read_time_minutes: number;
  view_count: number;
  is_featured: boolean;
  category: {
    title: string;
    slug: string;
  };
}

// Get or create session ID for analytics
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('academy_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('academy_session_id', sessionId);
  }
  return sessionId;
}

// Highlight search terms in text
function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  
  const words = query.trim().split(/\s+/).filter(w => w.length > 2);
  if (words.length === 0) return text;
  
  // Escape special regex characters to prevent ReDoS
  const escapedWords = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escapedWords.join('|')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, i) => 
    words.some(w => part.toLowerCase() === w.toLowerCase()) ? (
      <mark key={i} className="bg-primary/20 text-primary px-0.5 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

// Search Result Card Component
function SearchResultCard({ 
  article, 
  query,
  onArticleClick 
}: { 
  article: ArticleResult; 
  query: string;
  onArticleClick: () => void;
}) {
  return (
    <Link
      to={`/academy/${article.category.slug}/${article.slug}`}
      onClick={onArticleClick}
      className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-primary/50 hover:shadow-md transition-all duration-200 group"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1">
            {highlightText(article.title, query)}
          </h3>
          
          <p className="text-sm text-primary/80 mb-2 flex items-center gap-1">
            <FolderOpen className="w-3.5 h-3.5" />
            {article.category.title}
          </p>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {highlightText(article.excerpt || '', query)}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.read_time_minutes} min read
            </span>
            {article.is_featured && (
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>
        
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0" />
      </div>
    </Link>
  );
}

// Empty State Component
function EmptySearchState({ query }: { query: string }) {
  const categories = [
    { name: 'Getting Started', slug: 'getting-started' },
    { name: 'Staff Management', slug: 'staff-management' },
    { name: 'Appointments', slug: 'appointments' },
    { name: 'Payments & Billing', slug: 'payments-billing' },
  ];

  return (
    <div className="text-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-8 h-8 text-gray-400" />
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        No results found for "{query}"
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        We couldn't find any articles matching your search. Try adjusting your search terms or browse our categories.
      </p>
      
      <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto mb-8">
        <h3 className="font-medium text-gray-900 mb-3">Search tips:</h3>
        <ul className="text-sm text-gray-600 text-left space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Check your spelling
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Use different or fewer keywords
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Try more general search terms
          </li>
        </ul>
      </div>
      
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Browse popular categories</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/academy/${cat.slug}`}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
      
      <Link
        to="/academy"
        className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        <FolderOpen className="w-4 h-4" />
        Browse All Categories
      </Link>
    </div>
  );
}

// Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/4 mb-3" />
              <div className="h-4 bg-gray-100 rounded w-full mb-1" />
              <div className="h-4 bg-gray-100 rounded w-2/3 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const MAX_QUERY_LENGTH = 200;

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = (searchParams.get('q') || '').slice(0, MAX_QUERY_LENGTH);
  const [results, setResults] = useState<ArticleResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    setSearchInput(query);
    if (query.trim()) {
      performSearch();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  async function performSearch() {
    setLoading(true);

    try {
      // Full-text search on title and content
      const { data, error } = await supabase
        .from('academy_articles')
        .select(`
          id,
          title,
          slug,
          excerpt,
          content,
          read_time_minutes,
          view_count,
          is_featured,
          category:academy_categories(title, slug)
        `)
        .textSearch('title', query, {
          type: 'websearch',
          config: 'english'
        })
        .eq('status', 'published')
        .limit(20);

      if (error) {
        console.error('Search error:', error);
        setResults([]);
      } else {
        setResults(data || []);
      }

      // Track search query for analytics
      await supabase.from('academy_search_queries').insert({
        query: query,
        results_count: data?.length || 0,
        session_id: getSessionId()
      });
    } catch (err) {
      console.error('Search failed:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  async function trackArticleClick(articleId: string) {
    try {
      await supabase
        .from('academy_search_queries')
        .update({ clicked_article_id: articleId })
        .eq('query', query)
        .eq('session_id', getSessionId());
    } catch (err) {
      console.error('Failed to track click:', err);
    }
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchInput.trim() && searchInput.trim() !== query) {
      navigate(`/academy/search?q=${encodeURIComponent(searchInput.trim().slice(0, MAX_QUERY_LENGTH))}`);
    }
  }

  return (
    <>
      <Helmet>
        <title>{query ? `Search: ${query}` : 'Search'} | NeonO Academy</title>
        <meta 
          name="description" 
          content={query ? `Search results for "${query}" in NeonO Academy` : 'Search NeonO Academy for help articles and guides'} 
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/academy" className="hover:text-primary transition-colors">
                Academy
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">Search Results</span>
            </nav>

            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="mb-6">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-white text-sm rounded-md hover:bg-primary/90 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Results Header */}
            {query && (
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Search results for "{query}"
                </h1>
                {!loading && (
                  <p className="text-gray-600">
                    Found {results.length} {results.length === 1 ? 'article' : 'articles'}
                  </p>
                )}
              </div>
            )}

            {!query && (
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Search Academy
                </h1>
                <p className="text-gray-600">
                  Enter a search term to find help articles
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {!query ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-8 h-8 text-primary" />
              </div>
              <p className="text-gray-600 mb-6">
                Type a search term above to find articles
              </p>
              <Link
                to="/academy"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <FolderOpen className="w-4 h-4" />
                Or browse all categories
              </Link>
            </div>
          ) : loading ? (
            <LoadingSkeleton />
          ) : results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={result.id}>
                  <div className="text-xs text-gray-500 mb-1 pl-1">
                    {index + 1}.
                  </div>
                  <SearchResultCard
                    article={result}
                    query={query}
                    onArticleClick={() => trackArticleClick(result.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptySearchState query={query} />
          )}
        </div>
      </div>
    </>
  );
}
