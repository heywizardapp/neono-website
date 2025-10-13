import { useParams, Navigate, Link } from 'react-router-dom';
import { loadBlogContent } from '@/lib/blog/loader';
import { useMemo, useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ShareBar } from '@/components/share/ShareBar';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { SEOHead } from '@/components/SEO/SEOHead';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { UpdateBadge } from '@/components/blog/UpdateBadge';
import { UpdateNotes } from '@/components/blog/UpdateNotes';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ReadingProgressBar } from '@/components/blog/ReadingProgressBar';
import { generateEnhancedArticleSchema, generateBlogBreadcrumbSchema } from '@/lib/seo/blogSchema';
import { extractHeadings, calculateReadingTime } from '@/lib/blog/tocGenerator';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';

// Import blog posts data
import { blogPosts } from './blogData';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title, href: `/blog/${post.slug}` }
  ];

  // Get the full blog content from markdown files
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load content synchronously from the loader
    try {
      const markdownContent = loadBlogContent(slug || '');
      setContent(markdownContent);
    } catch (error) {
      console.error(`Failed to load blog post: ${slug}`, error);
      setContent('# Content Unavailable\n\nWe\'re having trouble loading this blog post. Please try refreshing the page or [contact us](/contact) if the issue persists.');
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  // Extract headings for table of contents
  const headings = useMemo(() => extractHeadings(content), [content]);
  const readingTime = useMemo(() => calculateReadingTime(content), [content]);

  return (
    <>
      <ReadingProgressBar />
      
      <SEOHead
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        keywords={post.tags.join(', ')}
        type="article"
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
        author={post.author}
        image={post.featuredImage}
      />
      
      {/* Enhanced Article Schema */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateEnhancedArticleSchema({
            title: post.title,
            description: post.excerpt,
            content: content,
            author: post.author,
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            url: `https://www.neono.com/blog/${post.slug}`,
            featuredImage: post.featuredImage,
            category: post.category,
            tags: post.tags
          }))
        }}
      />
      
      {/* Breadcrumb Schema */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogBreadcrumbSchema(breadcrumbs))
        }}
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Breadcrumbs customCrumbs={breadcrumbs} />
          
          {/* Back to Blog */}
          <Button variant="ghost" asChild className="mb-6">
            <a href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </a>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8">
            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              <header className="mb-8 pb-8 border-b">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{post.category}</Badge>
                {post.featured && <Badge>Featured</Badge>}
                <UpdateBadge 
                  updatedAt={post.updatedAt || post.publishedAt}
                  publishedAt={post.publishedAt}
                  lastReviewed={post.lastReviewed}
                />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {readingTime} min read
                </div>
                <span>By {post.author}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            {/* Mobile Table of Contents */}
            <TableOfContents headings={headings} className="lg:hidden" />

            {/* Update Notes */}
            {(post.contentHistory || post.updateNotes) && (
              <UpdateNotes 
                contentHistory={post.contentHistory}
                updateNotes={post.updateNotes}
                version={post.version}
              />
            )}

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="my-8 -mx-4 md:mx-0">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  className="w-full rounded-lg shadow-xl"
                />
              </div>
            )}

            {/* Article Content */}
            <ReactMarkdown
              className="prose prose-lg max-w-none prose-headings:scroll-mt-24
                prose-headings:font-bold prose-headings:text-foreground
                prose-h1:text-4xl prose-h1:mb-4
                prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-muted-foreground prose-li:mb-2
                prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:rounded
                prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h2: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                  return <h2 id={id} {...props}>{children}</h2>;
                },
                h3: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                  return <h3 id={id} {...props}>{children}</h3>;
                },
              }}
            >
              {isLoading ? 'Loading...' : content}
            </ReactMarkdown>
            </article>

            {/* Desktop Table of Contents - Sticky Sidebar */}
            <TableOfContents headings={headings} />
          </div>

          {/* Related Posts */}
          <RelatedPosts 
            currentPostId={post.id}
            currentCategory={post.category}
            currentTags={post.tags}
            allPosts={blogPosts}
            maxPosts={3}
          />

          {/* Share and Newsletter */}
          <div className="grid gap-6 md:grid-cols-2 mt-12 pt-8 border-t">
            <ShareBar />
            <NewsletterForm variant="inline" />
          </div>
        </div>
      </div>
    </>
  );
}