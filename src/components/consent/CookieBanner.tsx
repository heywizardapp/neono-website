import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useConsent } from '@/hooks/useConsent';
import { X, Settings, Cookie } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function CookieBanner() {
  const { consent, hasShown, hasConsent, updateConsent, acceptAll, rejectAll } = useConsent();
  const [showDetails, setShowDetails] = React.useState(false);

  // Don't render if user has already made a choice
  if (hasConsent) {
    return null;
  }

  return (
    <>
      <div 
        className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:max-w-md"
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
      >
        <Card className="shadow-lg border-border/50 bg-background/95 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Cookie className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 id="cookie-banner-title" className="font-semibold text-sm mb-2">
                  We use cookies
                </h3>
                <p id="cookie-banner-description" className="text-xs text-muted-foreground mb-3">
                  We use cookies to improve your experience, analyze usage, and personalize content. 
                  You can manage your preferences at any time.
                </p>
                
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button 
                    size="sm" 
                    onClick={acceptAll}
                    className="min-h-[36px] text-xs"
                  >
                    Accept All
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={rejectAll}
                    className="min-h-[36px] text-xs"
                  >
                    Reject All
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setShowDetails(true)}
                    className="min-h-[36px] text-xs"
                    aria-label="Customize cookie preferences"
                  >
                    <Settings className="h-3 w-3 mr-1" />
                    Customize
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <CookieDetailsDialog 
        open={showDetails} 
        onOpenChange={setShowDetails}
        consent={consent}
        updateConsent={updateConsent}
      />
    </>
  );
}

interface CookieDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consent: any;
  updateConsent: (consent: any) => void;
}

function CookieDetailsDialog({ open, onOpenChange, consent, updateConsent }: CookieDetailsDialogProps) {
  const [localConsent, setLocalConsent] = React.useState(consent || {
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const handleSave = () => {
    updateConsent(localConsent);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
          <DialogDescription>
            Choose which cookies you'd like to accept. Necessary cookies are always enabled.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Necessary Cookies</Label>
                <p className="text-xs text-muted-foreground">
                  Required for the website to function properly
                </p>
              </div>
              <Switch checked={true} disabled />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="analytics-cookies" className="text-sm font-medium">
                  Analytics Cookies
                </Label>
                <p className="text-xs text-muted-foreground">
                  Help us understand how you use our website
                </p>
              </div>
              <Switch 
                id="analytics-cookies"
                checked={localConsent.analytics}
                onCheckedChange={(checked) => 
                  setLocalConsent(prev => ({ ...prev, analytics: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-cookies" className="text-sm font-medium">
                  Marketing Cookies
                </Label>
                <p className="text-xs text-muted-foreground">
                  Used to deliver personalized advertisements
                </p>
              </div>
              <Switch 
                id="marketing-cookies"
                checked={localConsent.marketing}
                onCheckedChange={(checked) => 
                  setLocalConsent(prev => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Preferences
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}