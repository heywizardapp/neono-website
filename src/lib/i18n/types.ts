/**
 * Internationalization type definitions
 */

export type Locale = 'en-CA' | 'en-US' | 'fr-CA';

export interface Messages {
  [key: string]: string;
}

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  dateFormat: string;
  currencyCode: string;
  currencySymbol: string;
}

export interface TranslationContext {
  locale: Locale;
  messages: Messages;
  formatters: {
    currency: (value: number) => string;
    date: (date: Date) => string;
    number: (value: number) => string;
  };
}

export interface RouteTranslation {
  [locale: string]: string;
}