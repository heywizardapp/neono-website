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
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Hidden Costs of Salon Software: What They Don\'t Tell You',
    excerpt: 'Most salon software looks affordable until you add essential features. Learn what to watch for and how to calculate true total cost.',
    category: 'Business',
    tags: ['costs', 'software', 'roi'],
    slug: 'hidden-costs-salon-software',
    publishedAt: '2024-01-15',
    readTime: '7 min read',
    author: 'NeonO Team',
    featured: true
  },
  {
    id: '2',
    title: '5 SMS Marketing Campaigns That Actually Work for Salons',
    excerpt: 'Effective SMS campaigns that drive bookings without annoying clients. Includes templates and timing strategies.',
    category: 'Marketing',
    tags: ['sms', 'marketing', 'campaigns'],
    slug: 'sms-marketing-campaigns-salons',
    publishedAt: '2024-01-12',
    readTime: '5 min read',
    author: 'Marketing Team'
  },
  {
    id: '3',
    title: 'Client Retention Strategies That Increased Revenue by 40%',
    excerpt: 'Real case studies from successful salons using data-driven retention strategies to boost lifetime value.',
    category: 'Growth',
    tags: ['retention', 'revenue', 'clients'],
    slug: 'client-retention-strategies',
    publishedAt: '2024-01-10',
    readTime: '8 min read',
    author: 'Business Team'
  },
  {
    id: '4',
    title: 'Why Commission-Free Payments Matter (And Save You Money)',
    excerpt: 'Breaking down the math: how commission-free tip processing can save thousands annually vs. traditional processors.',
    category: 'Payments',
    tags: ['payments', 'tips', 'savings'],
    slug: 'commission-free-payments',
    publishedAt: '2024-01-08',
    readTime: '4 min read',
    author: 'Product Team'
  },
  {
    id: '5',
    title: 'Ultimate Guide to Salon Management Software',
    excerpt: 'Everything you need to know to choose the right salon software: features, pricing, implementation, and ROI calculations.',
    category: 'Technology',
    tags: ['software', 'guide', 'features'],
    slug: 'ultimate-salon-management-software-guide',
    publishedAt: '2024-01-20',
    readTime: '15 min read',
    author: 'NeonO Team',
    featured: true
  },
  {
    id: '6',
    title: 'Staff Scheduling Best Practices for Salons',
    excerpt: 'Maximize profitability and staff satisfaction with strategic scheduling. Includes templates and optimization strategies.',
    category: 'Business',
    tags: ['scheduling', 'staff', 'operations'],
    slug: 'staff-scheduling-best-practices-salons',
    publishedAt: '2024-01-18',
    readTime: '12 min read',
    author: 'Operations Team'
  },
  {
    id: '7',
    title: 'Local SEO for Barbershops: Complete Guide',
    excerpt: 'Dominate local search results and attract more walk-ins with proven SEO strategies for barbershops.',
    category: 'Marketing',
    tags: ['seo', 'local', 'barbershops'],
    slug: 'local-seo-barbershops-guide',
    publishedAt: '2024-01-16',
    readTime: '10 min read',
    author: 'Marketing Team'
  },
  {
    id: '8',
    title: 'How to Calculate ROI on Salon Software (With Real Examples)',
    excerpt: 'Step-by-step guide to calculating true ROI on salon software investments, including real salon case studies.',
    category: 'Business',
    tags: ['roi', 'analytics', 'finance'],
    slug: 'calculate-salon-roi-guide',
    publishedAt: '2024-01-22',
    readTime: '11 min read',
    author: 'Business Team'
  },
  {
    id: '9',
    title: 'Case Study: How Metro Salon Doubled Online Bookings in 90 Days',
    excerpt: 'Real strategies and results from a salon that transformed their booking process and revenue.',
    category: 'Success Stories',
    tags: ['case-study', 'bookings', 'growth'],
    slug: 'metro-salon-doubled-bookings-case-study',
    publishedAt: '2024-01-25',
    readTime: '9 min read',
    author: 'Success Team',
    featured: true
  },
  {
    id: '10',
    title: 'How to Set Up Your First SMS Campaign (Step-by-Step Video Tutorial)',
    excerpt: 'Complete walkthrough to launch your first SMS campaign in under an hour. Includes templates and best practices.',
    category: 'Marketing',
    tags: ['sms', 'tutorial', 'video'],
    slug: 'sms-campaign-setup-video-tutorial',
    publishedAt: '2024-01-28',
    readTime: '10 min read',
    author: 'Marketing Team',
    featured: true
  }
];

export const categories = ['All', 'Business', 'Marketing', 'Growth', 'Payments', 'Technology', 'Success Stories'];

// Helper function to add new blog posts
export const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
  const newPost: BlogPost = {
    ...post,
    id: (blogPosts.length + 1).toString()
  };
  blogPosts.push(newPost);
  return newPost;
};