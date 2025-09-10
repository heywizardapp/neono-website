/**
 * Accessibility Provider
 * Initializes accessibility preferences and provides context
 */

import * as React from 'react';
import { initA11yPrefs } from '@/lib/a11y/userPrefs';

interface A11yProviderProps {
  children: React.ReactNode;
}

export default function A11yProvider({ children }: A11yProviderProps) {
  React.useEffect(() => {
    // Initialize accessibility preferences on mount
    initA11yPrefs();

    // Set up route change announcements
    const announceRouteChange = () => {
      // Get page title for announcement
      const title = document.title;
      const announcement = `Navigated to ${title}`;
      
      // Create or update live region for route announcements
      let liveRegion = document.getElementById('route-announcer');
      if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'route-announcer';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
      }
      
      // Clear and announce after a brief delay
      liveRegion.textContent = '';
      setTimeout(() => {
        liveRegion!.textContent = announcement;
      }, 100);
    };

    // Listen for route changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.target === document.head) {
          // Title changed, likely a route change
          const titleElement = document.querySelector('title');
          if (titleElement && mutation.addedNodes.length > 0) {
            announceRouteChange();
          }
        }
      });
    });

    observer.observe(document.head, {
      childList: true,
      subtree: true
    });

    // Also listen for manual title changes
    let previousTitle = document.title;
    const titleObserver = new MutationObserver(() => {
      if (document.title !== previousTitle) {
        previousTitle = document.title;
        announceRouteChange();
      }
    });

    titleObserver.observe(document.querySelector('title') || document.head, {
      childList: true,
      characterData: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      titleObserver.disconnect();
    };
  }, []);

  return <>{children}</>;
}