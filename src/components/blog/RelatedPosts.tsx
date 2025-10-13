import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  slug: string;
  readTime: string;
  featuredImage?: string;
}

interface RelatedPostsProps {
  currentPostId: string;
  currentCategory: string;
  currentTags: string[];
  allPosts: BlogPost[];
  maxPosts?: number;
}

export function RelatedPosts({ 
  currentPostId, 
  currentCategory, 
  currentTags, 
  allPosts,
  maxPosts = 3 
}: RelatedPostsProps) {
  // Calculate relevance score for each post
  const scoredPosts = allPosts
    .filter(post => post.id !== currentPostId)
    .map(post => {
      let score = 0;
      
      // Same category = +10 points
      if (post.category === currentCategory) {
        score += 10;
      }
      
      // Shared tags = +5 points per tag
      const sharedTags = post.tags.filter(tag => currentTags.includes(tag));
      score += sharedTags.length * 5;
      
      return { post, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxPosts);

  if (scoredPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t pt-12">
      <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scoredPosts.map(({ post }) => (
          <Link key={post.id} to={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              {post.featuredImage && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
