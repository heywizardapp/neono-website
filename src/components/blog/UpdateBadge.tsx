import { Badge } from '@/components/ui/badge';
import { isRecentlyUpdated, getUpdateBadgeVariant, formatUpdateDate } from '@/lib/blog/updateTracking';
import { CalendarClock } from 'lucide-react';

interface UpdateBadgeProps {
  updatedAt: string;
  publishedAt: string;
  lastReviewed?: string;
  className?: string;
}

export function UpdateBadge({ updatedAt, publishedAt, lastReviewed, className }: UpdateBadgeProps) {
  // Only show if content was actually updated after publication
  const wasUpdated = new Date(updatedAt) > new Date(publishedAt);
  if (!wasUpdated && !lastReviewed) return null;

  const displayDate = lastReviewed || updatedAt;
  const isRecent = isRecentlyUpdated(displayDate, 30);
  const variant = getUpdateBadgeVariant(displayDate);
  
  return (
    <Badge variant={variant} className={className}>
      <CalendarClock className="h-3 w-3 mr-1" />
      {isRecent ? 'Recently Updated' : `Updated ${formatUpdateDate(displayDate)}`}
    </Badge>
  );
}
