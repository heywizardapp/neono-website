import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useActiveSection } from '@/hooks/useActiveSection';
import type { TocHeading } from '@/lib/blog/tocGenerator';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  headings: TocHeading[];
  className?: string;
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeId = useActiveSection(headings);

  if (headings.length === 0) return null;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Close mobile TOC after click
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      }
    }
  };

  const TocContent = () => (
    <nav aria-label="Table of contents">
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              heading.level === 3 && 'ml-4',
              'transition-all duration-200'
            )}
          >
            <button
              onClick={() => scrollToSection(heading.id)}
              className={cn(
                'text-left w-full text-sm transition-colors duration-200 hover:text-primary',
                activeId === heading.id
                  ? 'text-primary font-medium border-l-2 border-primary pl-3 -ml-3'
                  : 'text-muted-foreground border-l-2 border-transparent pl-3 -ml-3'
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Mobile: Collapsible TOC */}
      <div className={cn('lg:hidden mb-8', className)}>
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Table of Contents
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
        
        {isOpen && (
          <div className="mt-4 p-4 border rounded-lg bg-card animate-accordion-down">
            <TocContent />
          </div>
        )}
      </div>

      {/* Desktop: Sticky sidebar TOC */}
      <aside
        className={cn(
          'hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto',
          className
        )}
      >
        <div className="p-4 border rounded-lg bg-card">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Table of Contents
          </h2>
          <TocContent />
        </div>
      </aside>
    </>
  );
}
