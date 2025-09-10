type Locale = "en-CA" | "en-US" | "fr-CA";

interface HreflangLink {
  href: string;
  hreflang: string;
}

// Configuration for supported locales
const LOCALES: Locale[] = ["en-CA"]; // Start with en-CA, extensible to en-US, fr-CA later
const DEFAULT_LOCALE: Locale = "en-CA";
const SITE_HOST = "https://www.neono.com";

/**
 * Builds hreflang links for a given path
 * @param path - The current path (e.g., "/", "/pricing")
 * @param locales - Array of locales to generate links for
 * @returns Array of hreflang link objects
 */
export function buildHreflang(
  path: string, 
  locales: Locale[] = LOCALES
): HreflangLink[] {
  const links: HreflangLink[] = [];
  
  // Generate links for each locale
  for (const locale of locales) {
    const localePath = buildLocalePath(path, locale);
    links.push({
      href: `${SITE_HOST}${localePath}`,
      hreflang: locale
    });
  }
  
  // Add x-default (points to default locale)
  const defaultPath = buildLocalePath(path, DEFAULT_LOCALE);
  links.push({
    href: `${SITE_HOST}${defaultPath}`,
    hreflang: "x-default"
  });
  
  return links;
}

/**
 * Builds the canonical URL for a path
 * @param path - The current path
 * @param locale - The locale (defaults to en-CA)
 * @returns Canonical URL string
 */
export function canonical(path: string, locale: Locale = DEFAULT_LOCALE): string {
  const localePath = buildLocalePath(path, locale);
  return `${SITE_HOST}${localePath}`;
}

/**
 * Builds a localized path
 * @param path - Base path
 * @param locale - Target locale
 * @returns Localized path string
 */
function buildLocalePath(path: string, locale: Locale): string {
  // For default locale (en-CA), no prefix
  if (locale === DEFAULT_LOCALE) {
    return path === "/" ? "" : path;
  }
  
  // For other locales, add language prefix
  const prefix = getLocalePrefix(locale);
  const basePath = path === "/" ? "" : path;
  return `/${prefix}${basePath}`;
}

/**
 * Gets the URL prefix for a locale
 * @param locale - The locale
 * @returns URL prefix string
 */
function getLocalePrefix(locale: Locale): string {
  switch (locale) {
    case "en-CA":
      return ""; // Default, no prefix
    case "en-US":
      return "us";
    case "fr-CA":
      return "fr";
    default:
      return "";
  }
}

/**
 * Extracts locale from a path
 * @param path - The full path including locale prefix
 * @returns Object with locale and cleaned path
 */
export function extractLocaleFromPath(path: string): {
  locale: Locale;
  cleanPath: string;
} {
  // Check for locale prefixes
  if (path.startsWith('/us/') || path === '/us') {
    return {
      locale: "en-US",
      cleanPath: path.replace(/^\/us/, '') || '/'
    };
  }
  
  if (path.startsWith('/fr/') || path === '/fr') {
    return {
      locale: "fr-CA",
      cleanPath: path.replace(/^\/fr/, '') || '/'
    };
  }
  
  // Default locale
  return {
    locale: DEFAULT_LOCALE,
    cleanPath: path
  };
}

/**
 * Generates alternate URLs for all supported locales
 * @param basePath - The base path without locale prefix
 * @returns Array of alternate URLs
 */
export function generateAlternates(basePath: string): Array<{
  locale: Locale;
  url: string;
}> {
  return LOCALES.map(locale => ({
    locale,
    url: canonical(basePath, locale)
  }));
}

/**
 * Validates if a locale is supported
 * @param locale - Locale to validate
 * @returns Boolean indicating if locale is supported
 */
export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

/**
 * Gets the display name for a locale
 * @param locale - The locale
 * @returns Human-readable locale name
 */
export function getLocaleDisplayName(locale: Locale): string {
  const names: Record<Locale, string> = {
    "en-CA": "English (Canada)",
    "en-US": "English (United States)",
    "fr-CA": "Français (Canada)"
  };
  return names[locale] || locale;
}

/**
 * Gets the language code from a locale
 * @param locale - The locale
 * @returns Two-letter language code
 */
export function getLanguageCode(locale: Locale): string {
  return locale.split('-')[0];
}