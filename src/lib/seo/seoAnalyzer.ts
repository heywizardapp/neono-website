import { DraftPost } from '@/lib/blog/storage';
import { calculateReadability, ReadabilityResult } from './readability';

export interface SEOAnalysis {
  score: number; // 0-100
  title: {
    length: number;
    score: number;
    hasKeyword: boolean;
    status: 'good' | 'warning' | 'error';
    suggestion?: string;
  };
  description: {
    length: number;
    score: number;
    status: 'good' | 'warning' | 'error';
    suggestion?: string;
  };
  content: {
    wordCount: number;
    score: number;
    status: 'good' | 'warning' | 'error';
    suggestion?: string;
  };
  headings: {
    h1Count: number;
    h2Count: number;
    h3Count: number;
    isValid: boolean;
    score: number;
    status: 'good' | 'warning' | 'error';
    suggestion?: string;
  };
  keyword: {
    density: number;
    inTitle: boolean;
    inFirstParagraph: boolean;
    inHeadings: boolean;
    count: number;
    score: number;
    status: 'good' | 'warning' | 'error';
    suggestion?: string;
  };
  links: {
    internal: number;
    external: number;
    total: number;
    score: number;
    status: 'good' | 'warning' | 'error';
    suggestion?: string;
  };
  images: {
    total: number;
    withAlt: number;
    coverage: number;
    score: number;
    status: 'good' | 'warning' | 'error';
    suggestion?: string;
  };
  readability: ReadabilityResult & {
    score: number;
    status: 'good' | 'warning' | 'error';
    suggestion?: string;
  };
}

/**
 * Analyze SEO quality of a blog post
 */
export function analyzeSEO(post: DraftPost, focusKeyword?: string): SEOAnalysis {
  const { title, excerpt, content } = post;
  
  // Word count
  const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
  
  // Title analysis
  const titleLength = title.length;
  const titleScore = titleLength >= 50 && titleLength <= 60 ? 100 : 
                     titleLength >= 40 && titleLength <= 70 ? 70 : 40;
  const titleStatus: 'good' | 'warning' | 'error' = titleLength >= 50 && titleLength <= 60 ? 'good' :
                                                     titleLength >= 40 && titleLength <= 70 ? 'warning' : 'error';
  const titleHasKeyword = focusKeyword ? title.toLowerCase().includes(focusKeyword.toLowerCase()) : false;
  
  // Description analysis
  const descLength = excerpt.length;
  const descScore = descLength >= 150 && descLength <= 160 ? 100 :
                    descLength >= 120 && descLength <= 180 ? 70 : 40;
  const descStatus: 'good' | 'warning' | 'error' = descLength >= 150 && descLength <= 160 ? 'good' :
                                                    descLength >= 120 && descLength <= 180 ? 'warning' : 'error';
  
  // Content length analysis
  const contentScore = wordCount >= 1000 ? 100 :
                       wordCount >= 600 ? 80 :
                       wordCount >= 300 ? 60 : 30;
  const contentStatus: 'good' | 'warning' | 'error' = wordCount >= 800 ? 'good' :
                                                       wordCount >= 300 ? 'warning' : 'error';
  
  // Heading structure analysis
  const h1Matches = content.match(/^#\s/gm) || [];
  const h2Matches = content.match(/^##\s/gm) || [];
  const h3Matches = content.match(/^###\s/gm) || [];
  const headingsValid = h1Matches.length === 0; // Title is H1, content shouldn't have H1
  const headingScore = headingsValid && h2Matches.length >= 2 ? 100 :
                       headingsValid ? 70 : 40;
  const headingStatus: 'good' | 'warning' | 'error' = headingsValid && h2Matches.length >= 2 ? 'good' :
                                                       headingsValid ? 'warning' : 'error';
  
  // Keyword analysis
  let keywordDensity = 0;
  let keywordCount = 0;
  let keywordInFirstParagraph = false;
  let keywordInHeadings = false;
  
  if (focusKeyword) {
    const lowerContent = content.toLowerCase();
    const lowerKeyword = focusKeyword.toLowerCase();
    const matches = lowerContent.match(new RegExp(lowerKeyword, 'gi')) || [];
    keywordCount = matches.length;
    keywordDensity = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;
    
    // Check first paragraph (first 100 words)
    const firstParagraph = content.split(/\n\n/)[0] || '';
    keywordInFirstParagraph = firstParagraph.toLowerCase().includes(lowerKeyword);
    
    // Check headings
    const allHeadings = content.match(/^#{1,6}\s.+$/gm) || [];
    keywordInHeadings = allHeadings.some(h => h.toLowerCase().includes(lowerKeyword));
  }
  
  const keywordScore = !focusKeyword ? 50 : // No keyword set
                       keywordDensity >= 1 && keywordDensity <= 3 && keywordInFirstParagraph ? 100 :
                       keywordDensity >= 0.5 && keywordDensity <= 4 ? 70 : 40;
  const keywordStatus: 'good' | 'warning' | 'error' = !focusKeyword ? 'warning' :
                                                       keywordDensity >= 1 && keywordDensity <= 3 && keywordInFirstParagraph ? 'good' :
                                                       keywordDensity >= 0.5 && keywordDensity <= 4 ? 'warning' : 'error';
  
  // Links analysis
  const linkMatches = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];
  const links = linkMatches.map(link => {
    const urlMatch = link.match(/\(([^)]+)\)/);
    return urlMatch ? urlMatch[1] : '';
  });
  
  const internalLinks = links.filter(url => 
    url.startsWith('/') || 
    url.includes('neono.com') || 
    url.startsWith('#')
  ).length;
  
  const externalLinks = links.filter(url => 
    url.startsWith('http') && 
    !url.includes('neono.com')
  ).length;
  
  const totalLinks = internalLinks + externalLinks;
  const linkScore = internalLinks >= 2 && externalLinks >= 1 ? 100 :
                    totalLinks >= 2 ? 70 : 40;
  const linkStatus: 'good' | 'warning' | 'error' = internalLinks >= 2 && externalLinks >= 1 ? 'good' :
                                                    totalLinks >= 2 ? 'warning' : 'error';
  
  // Images analysis
  const imageMatches = content.match(/!\[([^\]]*)\]\(([^)]+)\)/g) || [];
  const totalImages = imageMatches.length;
  const imagesWithAlt = imageMatches.filter(img => {
    const altMatch = img.match(/!\[([^\]]*)\]/);
    return altMatch && altMatch[1] && altMatch[1].trim().length > 0;
  }).length;
  
  const imageCoverage = totalImages > 0 ? (imagesWithAlt / totalImages) * 100 : 100;
  const imageScore = imageCoverage === 100 ? 100 :
                     imageCoverage >= 80 ? 70 : 40;
  const imageStatus: 'good' | 'warning' | 'error' = imageCoverage === 100 ? 'good' :
                                                     imageCoverage >= 80 ? 'warning' : 'error';
  
  // Readability analysis
  const readabilityResult = calculateReadability(content);
  const readabilityScore = readabilityResult.score >= 60 ? 100 :
                           readabilityResult.score >= 50 ? 70 : 50;
  const readabilityStatus: 'good' | 'warning' | 'error' = readabilityResult.score >= 60 ? 'good' :
                                                           readabilityResult.score >= 50 ? 'warning' : 'error';
  
  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    titleScore * 0.15 +
    descScore * 0.15 +
    contentScore * 0.10 +
    headingScore * 0.10 +
    keywordScore * 0.20 +
    linkScore * 0.10 +
    imageScore * 0.10 +
    readabilityScore * 0.10
  );
  
  return {
    score: overallScore,
    title: {
      length: titleLength,
      score: titleScore,
      hasKeyword: titleHasKeyword,
      status: titleStatus,
      suggestion: titleLength < 40 ? 'Title is too short. Aim for 50-60 characters.' :
                  titleLength > 70 ? 'Title is too long. Google may truncate it. Aim for 50-60 characters.' :
                  titleLength >= 50 && titleLength <= 60 ? 'Perfect title length!' :
                  'Good title length. Aim for 50-60 for optimal results.'
    },
    description: {
      length: descLength,
      score: descScore,
      status: descStatus,
      suggestion: descLength < 120 ? 'Excerpt is too short. Aim for 150-160 characters.' :
                  descLength > 180 ? 'Excerpt is too long. Google may truncate it. Aim for 150-160 characters.' :
                  descLength >= 150 && descLength <= 160 ? 'Perfect excerpt length!' :
                  'Good excerpt length. Aim for 150-160 for optimal results.'
    },
    content: {
      wordCount,
      score: contentScore,
      status: contentStatus,
      suggestion: wordCount < 300 ? 'Content is too short. Aim for at least 800 words for better SEO.' :
                  wordCount < 800 ? 'Add more content. Articles with 800+ words tend to rank better.' :
                  wordCount >= 1000 ? 'Excellent content length!' :
                  'Good content length!'
    },
    headings: {
      h1Count: h1Matches.length,
      h2Count: h2Matches.length,
      h3Count: h3Matches.length,
      isValid: headingsValid,
      score: headingScore,
      status: headingStatus,
      suggestion: !headingsValid ? 'Remove H1 headers from content. The post title is already H1.' :
                  h2Matches.length < 2 ? 'Add more H2 headings to structure your content better.' :
                  'Great heading structure!'
    },
    keyword: {
      density: Math.round(keywordDensity * 100) / 100,
      inTitle: titleHasKeyword,
      inFirstParagraph: keywordInFirstParagraph,
      inHeadings: keywordInHeadings,
      count: keywordCount,
      score: keywordScore,
      status: keywordStatus,
      suggestion: !focusKeyword ? 'Set a focus keyword to improve SEO targeting.' :
                  keywordDensity < 0.5 ? `Use "${focusKeyword}" more naturally in your content.` :
                  keywordDensity > 4 ? `Reduce keyword usage to avoid keyword stuffing. Current density: ${keywordDensity.toFixed(2)}%` :
                  !keywordInFirstParagraph ? `Include "${focusKeyword}" in the first paragraph.` :
                  !titleHasKeyword ? `Include "${focusKeyword}" in your title.` :
                  'Excellent keyword optimization!'
    },
    links: {
      internal: internalLinks,
      external: externalLinks,
      total: totalLinks,
      score: linkScore,
      status: linkStatus,
      suggestion: internalLinks < 2 ? 'Add 2-3 internal links to related content.' :
                  externalLinks < 1 ? 'Add 1-2 external links to authoritative sources.' :
                  'Great link structure!'
    },
    images: {
      total: totalImages,
      withAlt: imagesWithAlt,
      coverage: Math.round(imageCoverage),
      score: imageScore,
      status: imageStatus,
      suggestion: imageCoverage < 100 ? `${totalImages - imagesWithAlt} image(s) missing alt text. Add descriptive alt text for better SEO.` :
                  totalImages === 0 ? 'Consider adding relevant images to enhance your content.' :
                  'All images have alt text!'
    },
    readability: {
      ...readabilityResult,
      score: readabilityScore,
      status: readabilityStatus,
      suggestion: readabilityResult.score < 50 ? 'Content is too complex. Use shorter sentences and simpler words.' :
                  readabilityResult.score < 60 ? 'Consider simplifying some sentences for better readability.' :
                  'Good readability level!'
    }
  };
}
