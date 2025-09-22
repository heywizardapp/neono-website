import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X, Smartphone } from 'lucide-react';
import { analytics } from '@/lib/analytics/core';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [isInstalled, setIsInstalled] = React.useState(false);

  React.useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as any).standalone ||
          document.referrer.includes('android-app://')) {
        setIsInstalled(true);
      }
    };

    checkInstalled();

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      
      // Show our custom install prompt after a delay
      setTimeout(() => {
        if (!isInstalled) {
          setShowPrompt(true);
        }
      }, 30000); // Show after 30 seconds
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      
      analytics.track('install_prompt', {
        action: 'installed',
        source: 'pwa',
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    analytics.track('install_prompt', {
      action: 'clicked',
      source: 'banner',
    });

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      analytics.track('install_prompt', {
        action: choiceResult.outcome,
        source: 'banner',
      });

      if (choiceResult.outcome === 'accepted') {
        setShowPrompt(false);
      }
    } catch (error) {
      console.warn('Install prompt failed:', error);
    } finally {
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    
    analytics.track('install_prompt', {
      action: 'dismissed',
      source: 'banner',
    });

    // Don't show again for a while
    localStorage.setItem('install-prompt-dismissed', Date.now().toString());
  };

  // Don't show if recently dismissed
  React.useEffect(() => {
    const dismissed = localStorage.getItem('install-prompt-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) { // Don't show for 7 days
        setShowPrompt(false);
      }
    }
  }, []);

  if (!showPrompt || !deferredPrompt || isInstalled) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-20 left-4 right-4 z-40 sm:left-auto sm:right-4 sm:max-w-sm"
      role="dialog"
      aria-labelledby="install-prompt-title"
      aria-describedby="install-prompt-description"
    >
      <Card className="shadow-lg border-primary/20 bg-gradient-card">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 id="install-prompt-title" className="font-semibold text-sm mb-1">
                Add NeonO to Home Screen
              </h3>
              <p id="install-prompt-description" className="text-xs text-muted-foreground mb-3">
                Get quick access and enjoy a native app experience
              </p>
              
              <div className="flex gap-2">
                <Button 
                  size="sm"
                  onClick={handleInstall}
                  className="min-h-[32px] text-xs flex-1"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Install
                </Button>
                <Button 
                  size="sm"
                  variant="ghost"
                  onClick={handleDismiss}
                  className="min-h-[32px] min-w-[32px] p-1"
                  aria-label="Dismiss install prompt"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Service Worker registration with install prompt
export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  // Register after page load and consent
  const register = () => {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none'
    })
    .then((registration) => {
      // Service worker registration successful
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              if (confirm('A new version is available. Refresh to update?')) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
              }
            }
          });
        }
      });
    })
    .catch((error) => {
      console.warn('SW registration failed:', error);
    });
  };

  // Register on load or idle
  if (document.readyState === 'complete') {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(register);
    } else {
      setTimeout(register, 1000);
    }
  } else {
    window.addEventListener('load', () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(register);
      } else {
        setTimeout(register, 1000);
      }
    });
  }
}