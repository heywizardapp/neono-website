import * as React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { localeConfigs, getCurrentLocale } from '@/i18n';
import { getLocalizedPath, storeLocale } from '@/lib/i18n/detect';
import type { Locale } from '@/lib/i18n/types';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'button' | 'select';
}

export default function LanguageSwitcher({ 
  className,
  variant = 'button'
}: LanguageSwitcherProps) {
  const currentLocale = getCurrentLocale();
  const currentConfig = localeConfigs[currentLocale];

  const handleLocaleChange = (locale: Locale) => {
    if (locale === currentLocale) return;

    // Store preference
    storeLocale(locale);

    // Navigate to localized URL
    const currentPath = window.location.pathname;
    const newPath = getLocalizedPath(currentPath, locale);
    window.location.href = newPath;
  };

  if (variant === 'select') {
    return (
      <div className={cn("relative", className)}>
        <label htmlFor="language-select" className="sr-only">
          Choose language
        </label>
        <select
          id="language-select"
          value={currentLocale}
          onChange={(e) => handleLocaleChange(e.target.value as Locale)}
          className={cn(
            "pl-8 pr-3 py-2 border border-border rounded-md",
            "bg-background text-foreground text-sm",
            "focus:outline-none focus:ring-2 focus:ring-primary",
            "appearance-none cursor-pointer"
          )}
        >
          {Object.values(localeConfigs).map((config) => (
            <option key={config.code} value={config.code}>
              {config.nativeName}
            </option>
          ))}
        </select>
        <Globe className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn("flex items-center space-x-2", className)}
          aria-label={`Current language: ${currentConfig.nativeName}. Click to change language.`}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-block">
            {currentConfig.nativeName}
          </span>
          <span className="sm:hidden">
            {currentLocale.split('-')[0].toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="min-w-[200px]">
        {Object.values(localeConfigs).map((config) => (
          <DropdownMenuItem
            key={config.code}
            onClick={() => handleLocaleChange(config.code)}
            className={cn(
              "flex items-center justify-between cursor-pointer",
              config.code === currentLocale && "bg-accent"
            )}
          >
            <span>{config.nativeName}</span>
            {config.code === currentLocale && (
              <span className="text-xs text-muted-foreground">Current</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}