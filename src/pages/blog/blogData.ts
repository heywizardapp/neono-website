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
  }
];

export const categories = ['All', 'Business', 'Marketing', 'Growth', 'Payments', 'Technology'];

// Helper function to add new blog posts
export const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
  const newPost: BlogPost = {
    ...post,
    id: (blogPosts.length + 1).toString()
  };
  blogPosts.push(newPost);
  return newPost;
};