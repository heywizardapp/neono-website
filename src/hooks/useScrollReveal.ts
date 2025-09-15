import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  delay?: number;
  stagger?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    delay = 0,
    stagger = 0,
    rootMargin = '0px 0px -10% 0px',
    triggerOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay + stagger);
          
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, delay, stagger, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

export function useStaggeredReveal(count: number, baseDelay = 0, staggerDelay = 100) {
  const items = Array.from({ length: count }, (_, index) => {
    const { ref, isVisible } = useScrollReveal({
      delay: baseDelay + (index * staggerDelay),
      stagger: 0
    });
    return { ref, isVisible, index };
  });

  return items;
}