import { ContentUpdate } from '@/lib/blog/storage';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  slug: string;
  publishedAt: string;
  readTime: string;
  author: string;
  featured?: boolean;
  featuredImage?: string;
  updatedAt?: string;
  lastReviewed?: string;
  contentHistory?: ContentUpdate[];
  updateNotes?: string;
  version?: number;
  content?: string;
  status?: 'draft' | 'published';
  createdAt?: string;
}

export const categories = ['All', 'Business', 'Marketing', 'Growth', 'Payments', 'Technology', 'Success Stories'];
