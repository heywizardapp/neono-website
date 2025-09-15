import { useEffect, useState } from 'react';

interface ScrollHeaderState {
  isScrolled: boolean;
  scrollY: number;
  scrollDirection: 'up' | 'down';
  isVisible: boolean;
}

export function useScrollHeader(threshold = 50, hideThreshold = 100) {
  const [state, setState] = useState<ScrollHeaderState>({
    isScrolled: false,
    scrollY: 0,
    scrollDirection: 'up',
    isVisible: true,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
      
      setState({
        isScrolled: scrollY > threshold,
        scrollY,
        scrollDirection,
        isVisible: scrollY < hideThreshold || scrollDirection === 'up',
      });

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollState(); // Set initial state

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold, hideThreshold]);

  return state;
}