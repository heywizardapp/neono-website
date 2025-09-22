import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Command } from 'lucide-react';
import { searchDocs } from '@/config/search/searchIndex';
import { SearchDoc } from '@/types/roi';

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchDoc[]>([]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Search on query change
  React.useEffect(() => {
    const searchResults = searchDocs(query.trim(), location.pathname);
    setResults(searchResults);
    setActiveIndex(0);
  }, [query, location.pathname]);

  // Focus input when opened
  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[activeIndex]) {
          handleNavigate(results[activeIndex].path);
        }
        break;
      case 'Escape':
        onOpenChange(false);
        break;
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onOpenChange(false);
    setQuery('');
    
    // Analytics tracking moved to production service
  };

  const groupedResults = React.useMemo(() => {
    const groups: Record<string, SearchDoc[]> = {};
    results.forEach(doc => {
      if (!groups[doc.group]) groups[doc.group] = [];
      groups[doc.group].push(doc);
    });
    return groups;
  }, [results]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl p-0 overflow-hidden"
        aria-label="Search dialog"
        role="dialog"
      >
        <div className="flex items-center border-b px-4">
          <Search className="h-4 w-4 text-muted-foreground mr-3" />
          <Input
            ref={inputRef}
            placeholder="Search pages, products, solutions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 focus-visible:ring-0 h-12"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-activedescendant={results[activeIndex] ? `search-item-${activeIndex}` : undefined}
          />
          <div className="text-xs text-muted-foreground ml-3 hidden sm:block">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
              <span className="text-xs">ESC</span>
            </kbd>
          </div>
        </div>

        <div 
          id="search-results"
          className="max-h-96 overflow-y-auto"
          role="listbox"
        >
          {query.trim() === '' ? (
            <div className="p-6 text-center text-muted-foreground">
              <div className="mb-3">
                <Command className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Search across all pages and features</p>
              </div>
              <div className="text-xs">
                Try: "appointments", "pricing", "salon software", "ROI"
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-muted-foreground mb-4">No results found for "{query}"</p>
              <div className="space-y-2">
                <p className="text-sm font-medium">Try these popular pages:</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleNavigate('/pricing')}
                    className="touch-44"
                  >
                    Pricing
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleNavigate('/roi')}
                    className="touch-44"
                  >
                    ROI Calculator
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleNavigate('/solutions/salons')}
                    className="touch-44"
                  >
                    Solutions
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(groupedResults).map(([group, docs]) => (
                <div key={group} className="mb-4 last:mb-0">
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {group}
                  </div>
                  {docs.map((doc, index) => {
                    const globalIndex = results.indexOf(doc);
                    const isActive = globalIndex === activeIndex;
                    
                    return (
                      <button
                        key={doc.id}
                        id={`search-item-${globalIndex}`}
                        onClick={() => handleNavigate(doc.path)}
                        className={`w-full px-4 py-3 text-left hover:bg-muted/50 focus:bg-muted/50 focus:outline-none ${
                          isActive ? 'bg-muted/50' : ''
                        }`}
                        role="option"
                        aria-selected={isActive}
                      >
                        <div className="font-medium text-sm">{doc.title}</div>
                        {doc.tags && doc.tags.length > 0 && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {doc.tags.slice(0, 3).join(', ')}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t px-4 py-3 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Navigate with ↑↓, select with ↵</span>
            <div className="hidden sm:flex items-center gap-4">
              <span>Powered by NeonO search</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface SearchTriggerProps {
  onClick: () => void;
  variant?: 'header' | 'mobile';
}

export function SearchTrigger({ onClick, variant = 'header' }: SearchTriggerProps) {
  // Keyboard shortcut listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClick();
        
        // Analytics tracking moved to production service
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClick]);

  if (variant === 'mobile') {
    return (
      <button
        onClick={() => {
          onClick();
          // Analytics tracking moved to production service
        }}
        className="flex items-center gap-2 w-full px-4 py-3 text-left hover:bg-muted/50 rounded-lg touch-44"
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        onClick();
        // Analytics tracking moved to production service
      }}
      className="flex items-center gap-2 px-3 py-2 text-sm bg-muted/50 hover:bg-muted rounded-lg transition-colors touch-44 focus-ring"
      aria-label="Search (⌘K)"
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline">Search...</span>
      <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium ml-2">
        <span className="text-xs">⌘K</span>
      </kbd>
    </button>
  );
}