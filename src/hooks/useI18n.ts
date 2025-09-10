/**
 * React hook for internationalization
 */

import * as React from 'react';
import { t, getCurrentLocale, createTranslationContext } from '@/i18n';
import { detectLocale } from '@/lib/i18n/detect';
import type { Locale, TranslationContext } from '@/lib/i18n/types';

export function useI18n() {
  const [locale, setLocaleState] = React.useState<Locale>(getCurrentLocale);
  const [context, setContext] = React.useState<TranslationContext>(() => 
    createTranslationContext(locale)
  );

  // Update context when locale changes
  React.useEffect(() => {
    const newContext = createTranslationContext(locale);
    setContext(newContext);
  }, [locale]);

  // Listen for locale changes (e.g., from browser back/forward)
  React.useEffect(() => {
    const handleLocationChange = () => {
      const newLocale = detectLocale();
      if (newLocale !== locale) {
        setLocaleState(newLocale);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [locale]);

  const translate = React.useCallback((key: string) => {
    return t(key, locale);
  }, [locale]);

  return {
    locale,
    t: translate,
    formatters: context.formatters,
    isRTL: false, // Future RTL support - none of our current locales are RTL
  };
}