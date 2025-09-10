import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useScrollSpy } from '@/lib/useInView';

interface StickySubnavProps {
  sections: { id: string; label: string }[];
}

export function StickySubnav({ sections }: StickySubnavProps) {
  const [isSticky, setIsSticky] = useState(false);
  const sectionIds = sections.map(s => s.id);
  const activeSection = useScrollSpy(sectionIds, 100);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('[data-hero]');
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        setIsSticky(heroBottom <= 80);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      className={cn(
        "transition-all duration-300 bg-background/95 backdrop-blur-sm border-b border-border/40 z-40",
        isSticky ? "fixed top-14 left-0 right-0 shadow-sm" : "relative"
      )}
    >
      <div className="container">
        <div className="py-2">
          <ul className="flex gap-2 overflow-x-auto scrollbar-hide px-4 snap-x">
            {sections.map((section) => (
              <li key={section.id} className="snap-center">
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "whitespace-nowrap min-h-[44px] min-w-[44px] px-4 py-3 rounded-full text-sm font-medium transition-all duration-200",
                    "hover:bg-accent/50 hover:text-accent-foreground",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground shadow-sm font-bold underline"
                      : "text-muted-foreground"
                  )}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}