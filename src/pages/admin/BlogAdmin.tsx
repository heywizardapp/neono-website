import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Copy, Star, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { blogStorage, DraftPost } from '@/lib/blog/storage';
import { useToast } from '@/hooks/use-toast';

export default function BlogAdmin() {
  const [posts, setPosts] = useState<DraftPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!blogStorage.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadPosts();
  }, [navigate]);

  const loadPosts = () => {
    setPosts(blogStorage.getAllPosts());
  };

  const handleDelete = (id: string) => {
    blogStorage.deletePost(id);
    loadPosts();
    toast({
      title: 'Post Deleted',
      description: 'The blog post has been deleted successfully.'
    });
  };

  const handleDuplicate = (id: string) => {
    const duplicated = blogStorage.duplicatePost(id);
    if (duplicated) {
      loadPosts();
      toast({
        title: 'Post Duplicated',
        description: 'The blog post has been duplicated successfully.'
      });
    }
  };

  const handleLogout = () => {
    blogStorage.logout();
    navigate('/admin/login');
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold">NeonO</Link>
            <Badge variant="secondary">Admin</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Blog Management</h1>
            <p className="text-muted-foreground">
              Create and manage your blog posts
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/blog/new">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'No posts found matching your search.' : 'No blog posts yet.'}
              </p>
              {!searchQuery && (
                <Button asChild>
                  <Link to="/admin/blog/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Post
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                        <Badge variant="outline">{post.category}</Badge>
                        {post.featured && (
                          <Badge variant="secondary">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="mb-2">{post.title}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>Updated {new Date(post.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDuplicate(post.id!)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                      >
                        <Link to={`/admin/blog/edit/${post.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (window.confirm('Delete this post? This action cannot be undone.')) handleDelete(post.id!);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}
