// Base content interface shared by all content types
export interface BaseContent {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  slug: string;
  publishedAt: string;
  author: string;
  featuredImage?: string;
  status: 'draft' | 'published';
  contentType: 'blog' | 'guide' | 'education' | 'video' | 'case-study';
  lastUpdated?: string;
}

// Education content - Knowledge base articles (Fresha-style)
export interface EducationContent extends BaseContent {
  contentType: 'education';
  categoryPath: string[]; // e.g., ['Sales', 'Payments']
  description: string; // Meta description
  estimatedReadTime: string; // "5 min read"
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  sections: EducationSection[];
  faqs?: FaqItem[];
  relatedArticles?: string[]; // Article IDs
}

export interface EducationSection {
  id: string;
  title: string;
  content: string; // Markdown
  screenshot?: {
    src: string;
    alt: string;
    caption?: string;
  };
  callouts?: Callout[];
}

export interface Callout {
  type: 'tip' | 'warning' | 'note' | 'important';
  content: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

// Blog content - Standard article format
export interface BlogContent extends BaseContent {
  contentType: 'blog';
  content: string; // Markdown
  readTime: string;
}

// Union type for all content types
export type Content = BlogContent | EducationContent;
