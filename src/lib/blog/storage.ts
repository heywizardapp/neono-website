import { BlogPost } from '@/pages/blog/blogData';

// In a real implementation, this would use a backend API
// For now, we'll use localStorage to persist blog posts
const STORAGE_KEY = 'neono_blog_posts';
const ADMIN_KEY = 'neono_blog_admin';

export interface ContentUpdate {
  version: number;
  date: string;
  notes: string;
  author?: string;
}

export interface DraftPost extends Omit<BlogPost, 'id' | 'publishedAt'> {
  id?: string;
  publishedAt?: string;
  status: 'draft' | 'published';
  content: string;
  createdAt: string;
  updatedAt: string;
  featuredImage?: string;
  lastReviewed?: string;
  contentHistory?: ContentUpdate[];
  updateNotes?: string;
  version?: number;
}

export const blogStorage = {
  // Get all posts (drafts and published)
  getAllPosts(): DraftPost[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  // Get a single post by ID
  getPost(id: string): DraftPost | null {
    const posts = this.getAllPosts();
    return posts.find(p => p.id === id) || null;
  },

  // Save a post (create or update)
  savePost(post: DraftPost): DraftPost {
    const posts = this.getAllPosts();
    const now = new Date().toISOString();
    
    if (post.id) {
      // Update existing
      const index = posts.findIndex(p => p.id === post.id);
      if (index !== -1) {
        const existingPost = posts[index];
        const isContentUpdate = existingPost.content !== post.content;
        
        // Build content history if this is an update with notes
        let contentHistory = existingPost.contentHistory || [];
        let version = existingPost.version || 1;
        
        if (isContentUpdate && post.updateNotes) {
          version = version + 1;
          contentHistory = [
            {
              version: existingPost.version || 1,
              date: existingPost.updatedAt,
              notes: post.updateNotes,
              author: post.author
            },
            ...contentHistory
          ];
        }
        
        posts[index] = {
          ...post,
          updatedAt: now,
          version,
          contentHistory,
          lastReviewed: post.lastReviewed || (isContentUpdate ? now : existingPost.lastReviewed)
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
        return posts[index];
      }
    }
    
    // Create new
    const newPost: DraftPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
      publishedAt: post.status === 'published' ? now : undefined,
      version: 1,
      contentHistory: []
    };
    
    posts.push(newPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return newPost;
  },

  // Delete a post
  deletePost(id: string): boolean {
    const posts = this.getAllPosts();
    const filtered = posts.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered.length < posts.length;
  },

  // Duplicate a post
  duplicatePost(id: string): DraftPost | null {
    const post = this.getPost(id);
    if (!post) return null;
    
    const duplicate: DraftPost = {
      ...post,
      id: undefined,
      title: `${post.title} (Copy)`,
      slug: `${post.slug}-copy`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return this.savePost(duplicate);
  },

  // Authentication
  isAuthenticated(): boolean {
    return localStorage.getItem(ADMIN_KEY) === 'authenticated';
  },

  authenticate(password: string): boolean {
    // Simple password check (in production, use proper authentication)
    if (password === 'neono2024') {
      localStorage.setItem(ADMIN_KEY, 'authenticated');
      return true;
    }
    return false;
  },

  logout(): void {
    localStorage.removeItem(ADMIN_KEY);
  }
};
