import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Share2, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useConsent } from '@/hooks/useConsent';

interface ShareBarProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function ShareBar({ 
  url = window.location.href,
  title = document.title,
  description = "Streamline your beauty business with NeonO - all-in-one appointments, POS, marketing, and more.",
  className = ""
}: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { canUseAnalytics } = useConsent();

  // Add UTM parameters for tracking
  const shareUrl = new URL(url);
  shareUrl.searchParams.set('utm_source', 'share');
  shareUrl.searchParams.set('utm_medium', 'social');
  const trackingUrl = shareUrl.toString();

  const encodeUrl = (url: string) => encodeURIComponent(url);
  const encodeText = (text: string) => encodeURIComponent(text);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeUrl(trackingUrl)}&text=${encodeText(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeUrl(trackingUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeUrl(trackingUrl)}&title=${encodeText(title)}&summary=${encodeText(description)}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    // Track share event
    if (canUseAnalytics) {
      console.log('Content shared:', { platform, url: trackingUrl });
    }

    // Open share dialog
    const shareUrl = shareLinks[platform];
    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(trackingUrl);
      setCopied(true);
      
      toast({
        title: "Link copied!",
        description: "The page URL has been copied to your clipboard.",
      });

      // Track copy event
      if (canUseAnalytics) {
        console.log('Link copied:', { url: trackingUrl });
      }

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the URL manually from your browser.",
        variant: "destructive"
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: trackingUrl
        });
        
        if (canUseAnalytics) {
          console.log('Native share used:', { url: trackingUrl });
        }
      } catch (err) {
        // User cancelled or error - ignore
      }
    }
  };

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">Share this page</h3>
        {navigator.share && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNativeShare}
            className="h-8 w-8 p-0"
            aria-label="Open native share dialog"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('twitter')}
          className="flex-1 min-w-0"
          aria-label="Share on X (Twitter)"
        >
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('facebook')}
          className="flex-1 min-w-0"
          aria-label="Share on Facebook"
        >
          <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('linkedin')}
          className="flex-1 min-w-0"
          aria-label="Share on LinkedIn"
        >
          <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="min-w-0"
          aria-label="Copy page link"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </Card>
  );
}