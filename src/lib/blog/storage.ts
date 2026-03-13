import { BlogPost } from '@/pages/blog/blogData';
import type { Content, EducationContent } from '@/types/content';

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

export interface DraftPost {
  id?: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  slug: string;
  publishedAt?: string;
  readTime?: string;
  author: string;
  status: 'draft' | 'published';
  content?: string; // Markdown content for blog posts
  contentType?: 'blog' | 'guide' | 'education' | 'video' | 'case-study';
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  featuredImage?: string;
  lastReviewed?: string;
  contentHistory?: ContentUpdate[];
  updateNotes?: string;
  version?: number;
  lastUpdated?: string;
  
  // Education-specific fields
  categoryPath?: string[];
  description?: string;
  estimatedReadTime?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  sections?: any[];
  faqs?: any[];
  relatedArticles?: string[];
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
    // Password sourced from environment variable — never hardcode secrets
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (!adminPassword) {
      console.error('VITE_ADMIN_PASSWORD environment variable is not set');
      return false;
    }
    if (password === adminPassword) {
      localStorage.setItem(ADMIN_KEY, 'authenticated');
      return true;
    }
    return false;
  },

  logout(): void {
    localStorage.removeItem(ADMIN_KEY);
  }
};

// Export convenient standalone functions
export const getAllPosts = (): BlogPost[] => {
  const posts = blogStorage.getAllPosts();
  // Filter for posts that have required fields and cast to BlogPost
  return posts
    .filter(p => p.id && p.publishedAt)
    .map(p => ({
      ...p,
      id: p.id!,
      publishedAt: p.publishedAt!,
      status: p.status || 'draft'
    } as BlogPost));
};

export const getPost = (slug: string): BlogPost | null => {
  const posts = blogStorage.getAllPosts();
  const post = posts.find(p => p.slug === slug);
  if (!post || !post.id || !post.publishedAt) return null;
  return {
    ...post,
    id: post.id,
    publishedAt: post.publishedAt,
    status: post.status || 'draft'
  } as BlogPost;
};
export const savePost = (post: DraftPost) => blogStorage.savePost(post);
export const deletePost = (id: string) => blogStorage.deletePost(id);
export const duplicatePost = (id: string) => blogStorage.duplicatePost(id);
export const isAuthenticated = () => blogStorage.isAuthenticated();
export const authenticate = (password: string) => blogStorage.authenticate(password);
export const logout = () => blogStorage.logout();
