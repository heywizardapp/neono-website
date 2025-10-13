export interface TocHeading {
  level: number;
  text: string;
  id: string;
}

/**
 * Generate a URL-friendly slug from a heading text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .trim();
}

/**
 * Extract headings from markdown content
 * Returns array of heading objects with level, text, and generated ID
 */
export function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const lines = markdown.split('\n');
  
  for (const line of lines) {
    // Match markdown headings (## Heading or ### Heading)
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = generateSlug(text);
      
      headings.push({ level, text, id });
    }
  }
  
  return headings;
}

/**
 * Add anchor IDs to markdown headings
 * Transforms: ## Heading -> <h2 id="heading">Heading</h2>
 */
export function addAnchorIds(markdown: string): string {
  return markdown.replace(/^(#{2,3})\s+(.+)$/gm, (match, hashes, text) => {
    const id = generateSlug(text);
    return `${hashes} <span id="${id}">${text}</span>`;
  });
}

/**
 * Calculate estimated reading time
 */
export function calculateReadingTime(markdown: string): number {
  const wordsPerMinute = 200;
  const wordCount = markdown.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
