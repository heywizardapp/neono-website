import { useEffect, useState } from 'react';

/**
 * Track reading progress as user scrolls through content
 * Returns percentage (0-100) of content read
 */
export function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Get the article content element
      const article = document.querySelector('article') || document.querySelector('main');
      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // Calculate how far into the article we've scrolled
      const scrollDistance = scrollTop + windowHeight - articleTop;
      const totalScrollableHeight = articleHeight;

      // Calculate percentage (0-100)
      const percentage = Math.min(
        100,
        Math.max(0, (scrollDistance / totalScrollableHeight) * 100)
      );

      setProgress(percentage);
    };

    // Update on scroll with throttling via requestAnimationFrame
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    updateProgress();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return progress;
}
