/**
 * Internationalization system
 */

import type { Locale, Messages, LocaleConfig, TranslationContext } from '@/lib/i18n/types';
import { detectLocale } from '@/lib/i18n/detect';

// Import message catalogs
import enCA from './locales/en-CA.json';
import enUS from './locales/en-US.json';
import frCA from './locales/fr-CA.json';

// Message catalogs
const catalogs: Record<Locale, Messages> = {
  'en-CA': enCA,
  'en-US': enUS,
  'fr-CA': frCA
};

// Locale configurations
export const localeConfigs: Record<Locale, LocaleConfig> = {
  'en-CA': {
    code: 'en-CA',
    name: 'English (Canada)',
    nativeName: 'English (Canada)',
    direction: 'ltr',
    dateFormat: 'MM/dd/yyyy',
    currencyCode: 'CAD',
    currencySymbol: 'CAD$'
  },
  'en-US': {
    code: 'en-US',
    name: 'English (United States)',
    nativeName: 'English (United States)',
    direction: 'ltr',
    dateFormat: 'MM/dd/yyyy',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  'fr-CA': {
    code: 'fr-CA',
    name: 'French (Canada)',
    nativeName: 'Français (Canada)',
    direction: 'ltr',
    dateFormat: 'dd/MM/yyyy',
    currencyCode: 'CAD',
    currencySymbol: 'CAD$'
  }
};

/**
 * Translate a key for a given locale
 */
export function t(key: string, locale: Locale): string {
  const messages = catalogs[locale] || catalogs['en-CA'];
  return messages[key] || catalogs['en-CA'][key] || key;
}

/**
 * Create formatters for a locale
 */
function createFormatters(locale: Locale) {
  const config = localeConfigs[locale];
  
  return {
    currency: (value: number) => {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: config.currencyCode
      }).format(value);
    },
    
    date: (date: Date) => {
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    },
    
    number: (value: number) => {
      return new Intl.NumberFormat(locale).format(value);
    }
  };
}

/**
 * Create translation context for a locale
 */
export function createTranslationContext(locale: Locale): TranslationContext {
  return {
    locale,
    messages: catalogs[locale] || catalogs['en-CA'],
    formatters: createFormatters(locale)
  };
}

/**
 * Get current locale
 */
export function getCurrentLocale(): Locale {
  return detectLocale();
}

/**
 * Get all supported locales
 */
export function getSupportedLocales(): Locale[] {
  return Object.keys(localeConfigs) as Locale[];
}

/**
 * Check if a locale is supported
 */
export function isLocaleSupported(locale: string): locale is Locale {
  return Object.keys(localeConfigs).includes(locale);
}