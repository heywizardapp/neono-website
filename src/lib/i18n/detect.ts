/**
 * Locale detection utilities
 */

import type { Locale } from './types';

const SUPPORTED_LOCALES: Locale[] = ['en-CA', 'en-US', 'fr-CA'];
const DEFAULT_LOCALE: Locale = 'en-CA';
const STORAGE_KEY = 'neono:locale';

/**
 * Detect user's preferred locale
 */
export function detectLocale(): Locale {
  // 1. Check URL path prefix
  const pathLocale = getLocaleFromPath();
  if (pathLocale && SUPPORTED_LOCALES.includes(pathLocale)) {
    return pathLocale;
  }

  // 2. Check stored preference
  const storedLocale = getStoredLocale();
  if (storedLocale && SUPPORTED_LOCALES.includes(storedLocale)) {
    return storedLocale;
  }

  // 3. Check browser language
  const browserLocale = getBrowserLocale();
  if (browserLocale && SUPPORTED_LOCALES.includes(browserLocale)) {
    return browserLocale;
  }

  // 4. Fall back to default
  return DEFAULT_LOCALE;
}

/**
 * Extract locale from URL path
 */
function getLocaleFromPath(): Locale | null {
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];

  if (firstSegment === 'fr') return 'fr-CA';
  if (firstSegment === 'us') return 'en-US';
  
  return null; // Default locale (en-CA) has no prefix
}

/**
 * Get stored locale preference
 */
function getStoredLocale(): Locale | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored as Locale;
  } catch {
    return null;
  }
}

/**
 * Get browser's preferred locale
 */
function getBrowserLocale(): Locale | null {
  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  // Exact match
  if (SUPPORTED_LOCALES.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }
  
  // Language match (e.g., 'fr' -> 'fr-CA')
  const langCode = browserLang.split('-')[0];
  switch (langCode) {
    case 'fr':
      return 'fr-CA';
    case 'en':
      // Check if it's US English specifically
      if (browserLang.includes('US')) return 'en-US';
      return 'en-CA';
    default:
      return null;
  }
}

/**
 * Store locale preference
 */
export function storeLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch (error) {
    console.warn('Failed to store locale preference:', error);
  }
}

/**
 * Generate localized URL for a path
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove any existing locale prefix
  const cleanPath = path.replace(/^\/(fr|us)/, '');
  
  switch (locale) {
    case 'fr-CA':
      return `/fr${cleanPath === '/' ? '' : cleanPath}`;
    case 'en-US':
      return `/us${cleanPath === '/' ? '' : cleanPath}`;
    case 'en-CA':
    default:
      return cleanPath || '/';
  }
}

/**
 * Get clean path without locale prefix
 */
export function getCleanPath(path: string = window.location.pathname): string {
  return path.replace(/^\/(fr|us)/, '') || '/';
}

/**
 * Check if current path has locale prefix
 */
export function hasLocalePrefix(path: string = window.location.pathname): boolean {
  return /^\/(fr|us)/.test(path);
}