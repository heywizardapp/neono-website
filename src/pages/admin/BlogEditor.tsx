import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { blogStorage, DraftPost } from '@/lib/blog/storage';
import { categories } from '@/pages/blog/blogData';
import { useToast } from '@/hooks/use-toast';
import { ImageUploader } from '@/components/blog/ImageUploader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = !!id;

  const [post, setPost] = useState<DraftPost>({
    title: '',
    excerpt: '',
    category: 'Business',
    tags: [],
    slug: '',
    readTime: '5 min read',
    author: 'NeonO Team',
    status: 'draft',
    content: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featured: false
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (!blogStorage.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }

    if (isEdit && id) {
      const existingPost = blogStorage.getPost(id);
      if (existingPost) {
        setPost(existingPost);
      } else {
        toast({
          variant: 'destructive',
          title: 'Post Not Found',
          description: 'The requested post could not be found.'
        });
        navigate('/admin/blog');
      }
    }
  }, [id, isEdit, navigate, toast]);

  const handleSave = (status: 'draft' | 'published') => {
    if (!post.title || !post.excerpt || !post.slug || !post.content) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please fill in all required fields.'
      });
      return;
    }

    const savedPost = blogStorage.savePost({
      ...post,
      status,
      publishedAt: status === 'published' ? new Date().toISOString() : post.publishedAt
    });

    toast({
      title: status === 'published' ? 'Post Published' : 'Draft Saved',
      description: `Your blog post has been ${status === 'published' ? 'published' : 'saved as draft'} successfully.`
    });

    navigate('/admin/blog');
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setPost(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
  };

  const addTag = () => {
    if (tagInput && !post.tags.includes(tagInput)) {
      setPost(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleImageUpload = (imageUrl: string) => {
    // Insert image markdown at cursor position
    const imageMarkdown = `\n![Image description](${imageUrl})\n`;
    setPost(prev => ({
      ...prev,
      content: prev.content + imageMarkdown
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <h1 className="text-xl font-bold">
              {isEdit ? 'Edit Post' : 'New Post'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => handleSave('draft')}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={() => handleSave('published')}>
              <Eye className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={post.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter post title..."
                    className="text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={post.excerpt}
                    onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                    placeholder="Brief description of the post..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Content * (Markdown)</Label>
                  <div data-color-mode="light">
                    <MDEditor
                      value={post.content}
                      onChange={(val) => setPost({ ...post, content: val || '' })}
                      height={400}
                      preview="edit"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUploader onImageUploaded={handleImageUpload} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={post.slug}
                    onChange={(e) => setPost({ ...post, slug: e.target.value })}
                    placeholder="post-url-slug"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={post.category}
                    onValueChange={(value) => setPost({ ...post, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c !== 'All').map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={post.author}
                    onChange={(e) => setPost({ ...post, author: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    value={post.readTime}
                    onChange={(e) => setPost({ ...post, readTime: e.target.value })}
                    placeholder="5 min read"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured Post</Label>
                  <Switch
                    id="featured"
                    checked={post.featured}
                    onCheckedChange={(checked) => setPost({ ...post, featured: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add tag..."
                  />
                  <Button type="button" onClick={addTag}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
