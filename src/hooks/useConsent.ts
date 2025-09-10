import * as React from 'react';

export type ConsentCategories = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const DEFAULT_CONSENT: ConsentCategories = {
  necessary: true, // Always true
  analytics: false,
  marketing: false,
};

const STORAGE_KEY = 'neono-consent';

export function useConsent() {
  const [consent, setConsent] = React.useState<ConsentCategories | null>(null);
  const [hasShown, setHasShown] = React.useState(false);

  React.useEffect(() => {
    // Load consent from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setConsent({ ...DEFAULT_CONSENT, ...parsed });
        setHasShown(true);
      }
    } catch (err) {
      console.warn('Failed to load consent preferences:', err);
    }
  }, []);

  const updateConsent = React.useCallback((newConsent: Partial<ConsentCategories>) => {
    const updated = { ...DEFAULT_CONSENT, ...consent, ...newConsent };
    setConsent(updated);
    setHasShown(true);
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to save consent preferences:', err);
    }

    // Fire analytics enabled event
    if (updated.analytics) {
      window.dispatchEvent(new CustomEvent('analytics:enabled'));
    }
  }, [consent]);

  const acceptAll = React.useCallback(() => {
    updateConsent({ analytics: true, marketing: true });
  }, [updateConsent]);

  const rejectAll = React.useCallback(() => {
    updateConsent({ analytics: false, marketing: false });
  }, [updateConsent]);

  return {
    consent,
    hasShown,
    updateConsent,
    acceptAll,
    rejectAll,
    hasConsent: consent !== null,
    canUseAnalytics: consent?.analytics ?? false,
    canUseMarketing: consent?.marketing ?? false,
  };
}