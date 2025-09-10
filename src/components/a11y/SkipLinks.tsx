import * as React from 'react';
import { cn } from '@/lib/utils';

interface SkipLinksProps {
  links?: Array<{
    href: string;
    label: string;
  }>;
  className?: string;
}

const DEFAULT_LINKS = [
  { href: '#main', label: 'Skip to main content' },
  { href: '#navigation', label: 'Skip to navigation' },
  { href: '#footer', label: 'Skip to footer' }
];

export default function SkipLinks({ links = DEFAULT_LINKS, className }: SkipLinksProps) {
  return (
    <div className={cn(
      "sr-only focus-within:not-sr-only",
      "fixed top-0 left-0 z-[9999]",
      "bg-background border border-border shadow-lg rounded-br-lg",
      className
    )}>
      <nav aria-label="Skip links" className="flex flex-col">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className={cn(
              "px-4 py-2 text-sm font-medium",
              "text-foreground hover:bg-accent hover:text-accent-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "transition-colors duration-200"
            )}
            onClick={(e) => {
              // Ensure the target element gets focus after navigation
              const target = document.querySelector(link.href);
              if (target) {
                setTimeout(() => {
                  (target as HTMLElement).focus();
                }, 100);
              }
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}