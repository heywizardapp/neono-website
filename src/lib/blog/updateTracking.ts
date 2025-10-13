export interface ContentUpdate {
  version: number;
  date: string;
  notes: string;
  author?: string;
}

export function isRecentlyUpdated(updatedAt: string, daysThreshold: number = 30): boolean {
  const updateDate = new Date(updatedAt);
  const now = new Date();
  const daysSinceUpdate = Math.floor((now.getTime() - updateDate.getTime()) / (1000 * 60 * 60 * 24));
  return daysSinceUpdate <= daysThreshold;
}

export function needsReview(lastReviewed: string | undefined, monthsThreshold: number = 6): boolean {
  if (!lastReviewed) return true;
  
  const reviewDate = new Date(lastReviewed);
  const now = new Date();
  const monthsSinceReview = (now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
  return monthsSinceReview >= monthsThreshold;
}

export function getUpdateBadgeVariant(updatedAt: string): 'default' | 'secondary' | 'outline' {
  if (isRecentlyUpdated(updatedAt, 30)) return 'default';
  if (isRecentlyUpdated(updatedAt, 90)) return 'secondary';
  return 'outline';
}

export function formatUpdateDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
