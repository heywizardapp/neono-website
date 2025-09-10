import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface StickySubnavProps {
  sections: { id: string; label: string }[];
}

export function StickySubnav({ sections }: StickySubnavProps) {
  const [activeSection, setActiveSection] = useState('');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('[data-hero]');
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        setIsSticky(heroBottom <= 80);
      }

      // Find active section
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      const scrollPosition = window.scrollY + 120;
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

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
        isSticky ? "fixed top-0 left-0 right-0 shadow-sm" : "relative"
      )}
    >
      <div className="container">
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center space-x-1 md:space-x-2 overflow-x-auto scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  "hover:bg-accent/50 hover:text-accent-foreground",
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground"
                )}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}