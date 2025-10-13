import { Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const RSSButton = () => {
  const handleSubscribe = (feedType: 'rss' | 'atom' | 'json') => {
    const feedUrls = {
      rss: '/blog/rss.xml',
      atom: '/blog/feed.xml',
      json: '/blog/feed.json',
    };
    
    window.open(feedUrls[feedType], '_blank');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Rss className="h-4 w-4" />
          Subscribe
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Subscribe via Feed</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleSubscribe('rss')}>
          <Rss className="h-4 w-4 mr-2" />
          RSS Feed
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSubscribe('atom')}>
          <Rss className="h-4 w-4 mr-2" />
          Atom Feed
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSubscribe('json')}>
          <Rss className="h-4 w-4 mr-2" />
          JSON Feed
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
