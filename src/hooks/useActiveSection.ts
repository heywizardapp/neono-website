import { useEffect, useState } from 'react';
import type { TocHeading } from '@/lib/blog/tocGenerator';

/**
 * Track which section is currently active based on scroll position
 * Returns the ID of the active heading
 */
export function useActiveSection(headings: TocHeading[]) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px', // Trigger when section is near top
        threshold: 0.1,
      }
    );

    // Observe all heading elements
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  return activeId;
}
