import { SearchDoc } from '@/types/roi';

export const searchIndex: SearchDoc[] = [
  // Pages
  { id: 'home', title: 'Home', path: '/', group: 'Pages', tags: ['salon', 'barbershop', 'business', 'software'], boost: 2 },
  { id: 'pricing', title: 'Pricing', path: '/pricing', group: 'Pages', tags: ['cost', 'plans', 'independent', 'salon', 'pricing'], boost: 1.5 },
  { id: 'roi', title: 'ROI Calculator', path: '/roi', group: 'Pages', tags: ['savings', 'calculator', 'compare', 'cost'], boost: 1.5 },
  { id: 'signup', title: 'Sign Up', path: '/signup', group: 'Pages', tags: ['register', 'trial', 'start'] },
  { id: 'login', title: 'Sign In', path: '/login', group: 'Pages', tags: ['login', 'access'] },
  { id: 'demo', title: 'Book a Demo', path: '/demo', group: 'Pages', tags: ['demo', 'presentation', 'tour'] },

  // Products
  { id: 'products', title: 'Products Overview', path: '/products', group: 'Products', tags: ['features', 'tools', 'platform'] },
  { id: 'appointments', title: 'Appointment Scheduling', path: '/products/appointments', group: 'Products', tags: ['booking', 'calendar', 'schedule', 'appointments'] },
  { id: 'pos', title: 'Point of Sale', path: '/products/pos', group: 'Products', tags: ['payments', 'checkout', 'pos', 'terminal'] },

  // Solutions
  { id: 'salons', title: 'Hair Salon Software', path: '/solutions/salons', group: 'Solutions', tags: ['hair', 'salon', 'stylist', 'beauty'] },

  // Resources (placeholder for future content)
  { id: 'blog', title: 'Blog', path: '/blog', group: 'Resources', tags: ['articles', 'tips', 'guides'] },
  { id: 'help', title: 'Help Center', path: '/help', group: 'Resources', tags: ['support', 'faq', 'documentation'] },
  { id: 'customers', title: 'Customer Stories', path: '/customers', group: 'Resources', tags: ['testimonials', 'case studies', 'success'] },
];

export function searchDocs(query: string, currentPath?: string): SearchDoc[] {
  if (!query.trim()) {
    return searchIndex.slice(0, 8);
  }

  const normalizedQuery = query.toLowerCase().trim();
  const words = normalizedQuery.split(/\s+/);
  
  const scoredResults = searchIndex.map(doc => {
    let score = 0;
    const titleLower = doc.title.toLowerCase();
    const tagsLower = (doc.tags || []).join(' ').toLowerCase();
    
    // Exact title match gets highest score
    if (titleLower.includes(normalizedQuery)) {
      score += 10;
    }
    
    // Prefix matches get high score
    if (titleLower.startsWith(normalizedQuery)) {
      score += 8;
    }
    
    // Word matches in title
    words.forEach(word => {
      if (titleLower.includes(word)) {
        score += 3;
      }
      if (tagsLower.includes(word)) {
        score += 2;
      }
    });
    
    // Boost current section
    if (currentPath && currentPath.startsWith('/' + doc.group.toLowerCase())) {
      score += 1;
    }
    
    // Apply document boost
    score *= (doc.boost || 1);
    
    return { ...doc, score };
  })
  .filter(doc => doc.score > 0)
  .sort((a, b) => b.score - a.score);
  
  return scoredResults.slice(0, 12);
}