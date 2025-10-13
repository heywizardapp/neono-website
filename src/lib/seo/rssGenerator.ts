import { Feed } from 'feed';
import { getAllPosts } from '@/lib/blog/storage';

export interface RSSOptions {
  category?: string;
  tag?: string;
  limit?: number;
}

export const generateRSSFeed = (options: RSSOptions = {}) => {
  const siteUrl = 'https://neono.io';
  const blogUrl = `${siteUrl}/blog`;

  const feed = new Feed({
    title: 'NeonO Blog - Beauty & Wellness Business Insights',
    description: 'Expert insights on salon management, spa operations, barbershop growth, and beauty industry trends. Powered by NeonO.',
    id: blogUrl,
    link: blogUrl,
    language: 'en',
    image: `${siteUrl}/og-image.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, NeonO`,
    updated: new Date(),
    feedLinks: {
      rss2: `${blogUrl}/rss.xml`,
      atom: `${blogUrl}/feed.xml`,
      json: `${blogUrl}/feed.json`,
    },
    author: {
      name: 'NeonO Team',
      email: 'hello@neono.io',
      link: siteUrl,
    },
  });

  // Filter posts based on options
  let posts = getAllPosts()
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  if (options.category) {
    posts = posts.filter(post => post.category === options.category);
  }

  if (options.tag) {
    posts = posts.filter(post => post.tags.includes(options.tag));
  }

  if (options.limit) {
    posts = posts.slice(0, options.limit);
  }

  // Add posts to feed
  posts.forEach(post => {
    const postUrl = `${blogUrl}/${post.slug}`;
    
    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.excerpt,
      content: post.excerpt, // In a real implementation, you'd include full content
      author: [
        {
          name: post.author,
          link: siteUrl,
        },
      ],
      date: new Date(post.publishedAt),
      category: [{ name: post.category }],
      image: post.featuredImage ? `${siteUrl}${post.featuredImage}` : undefined,
    });
  });

  return feed;
};

export const getRSSFeed = (options: RSSOptions = {}) => {
  const feed = generateRSSFeed(options);
  return feed.rss2();
};

export const getAtomFeed = (options: RSSOptions = {}) => {
  const feed = generateRSSFeed(options);
  return feed.atom1();
};

export const getJSONFeed = (options: RSSOptions = {}) => {
  const feed = generateRSSFeed(options);
  return feed.json1();
};

// Generate category-specific feeds
export const getCategoryFeeds = () => {
  const categories = ['Salon', 'Spa', 'Barbershop', 'Aesthetics', 'Marketing', 'Technology'];
  
  return categories.map(category => ({
    category,
    rss: getRSSFeed({ category }),
    atom: getAtomFeed({ category }),
  }));
};
