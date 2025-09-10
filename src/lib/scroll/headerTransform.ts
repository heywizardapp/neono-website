/**
 * Header transform utility for scroll-based header animations
 * Adds/removes scroll classes and manages header state changes
 */

type HeaderTransformOptions = {
  threshold?: number;
  className?: string;
  headerSelector?: string;
  bodyClassName?: string;
};

class HeaderTransform {
  private isScrolled = false;
  private ticking = false;
  private threshold: number;
  private className: string;
  private headerSelector: string;
  private bodyClassName: string;
  private headerElement: HTMLElement | null = null;
  private bodyElement: HTMLElement | null = null;

  constructor(options: HeaderTransformOptions = {}) {
    this.threshold = options.threshold ?? 50;
    this.className = options.className ?? 'scrolled';
    this.headerSelector = options.headerSelector ?? 'header';
    this.bodyClassName = options.bodyClassName ?? 'header-scrolled';

    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    this.headerElement = document.querySelector(this.headerSelector);
    this.bodyElement = document.body;

    if (!this.headerElement) {
      console.warn(`Header element not found: ${this.headerSelector}`);
      return;
    }

    this.bindEvents();
    this.checkScroll(); // Initial check
  }

  private bindEvents() {
    if (typeof window === 'undefined') return;

    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleResize, { passive: true });
  }

  private handleScroll = () => {
    if (!this.ticking) {
      requestAnimationFrame(this.updateHeader);
      this.ticking = true;
    }
  };

  private handleResize = () => {
    this.checkScroll();
  };

  private updateHeader = () => {
    this.checkScroll();
    this.ticking = false;
  };

  private checkScroll() {
    if (typeof window === 'undefined') return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const shouldBeScrolled = scrollTop > this.threshold;

    if (shouldBeScrolled !== this.isScrolled) {
      this.isScrolled = shouldBeScrolled;
      this.updateClasses();
    }
  }

  private updateClasses() {
    if (!this.headerElement) return;

    if (this.isScrolled) {
      this.headerElement.classList.add(this.className);
      this.bodyElement?.classList.add(this.bodyClassName);
      this.headerElement.setAttribute('data-scrolled', 'true');
    } else {
      this.headerElement.classList.remove(this.className);
      this.bodyElement?.classList.remove(this.bodyClassName);
      this.headerElement.setAttribute('data-scrolled', 'false');
    }
  }

  /**
   * Update the scroll threshold
   */
  public setThreshold(newThreshold: number) {
    this.threshold = newThreshold;
    this.checkScroll();
  }

  /**
   * Get current scroll state
   */
  public getScrollState() {
    return {
      isScrolled: this.isScrolled,
      threshold: this.threshold,
      scrollTop: typeof window !== 'undefined' ? window.pageYOffset : 0
    };
  }

  /**
   * Manually trigger scroll check
   */
  public refresh() {
    this.checkScroll();
  }

  /**
   * Destroy the header transform instance
   */
  public destroy() {
    if (typeof window === 'undefined') return;

    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);

    // Clean up classes
    if (this.headerElement) {
      this.headerElement.classList.remove(this.className);
      this.headerElement.removeAttribute('data-scrolled');
    }
    
    if (this.bodyElement) {
      this.bodyElement.classList.remove(this.bodyClassName);
    }
  }
}

// Global instance
let globalHeaderTransform: HeaderTransform | null = null;

/**
 * Initialize global header transform
 */
export function initHeaderTransform(options?: HeaderTransformOptions): HeaderTransform {
  if (globalHeaderTransform) {
    globalHeaderTransform.destroy();
  }
  
  globalHeaderTransform = new HeaderTransform(options);
  return globalHeaderTransform;
}

/**
 * Get the global header transform instance
 */
export function getHeaderTransform(): HeaderTransform | null {
  return globalHeaderTransform;
}

/**
 * Cleanup global header transform
 */
export function destroyHeaderTransform() {
  if (globalHeaderTransform) {
    globalHeaderTransform.destroy();
    globalHeaderTransform = null;
  }
}

// Auto-cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', destroyHeaderTransform);
}

// CSS for header scroll effects (to be added to your CSS)
export const headerScrollCSS = `
/* Header scroll transform styles */
header {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

header.scrolled {
  backdrop-filter: blur(12px);
  background-color: hsl(var(--background) / 0.95);
  border-bottom: 1px solid hsl(var(--border) / 0.1);
  box-shadow: 0 4px 6px -1px hsl(var(--foreground) / 0.1);
}

/* Adjust header height when scrolled */
header.scrolled {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

/* Logo/brand adjustments when scrolled */
header.scrolled .brand {
  transform: scale(0.9);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  header {
    transition: none;
  }
  
  header.scrolled .brand {
    transform: none;
  }
}
`;