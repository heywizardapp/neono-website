import { analytics } from './core';

class ScrollTracker {
  private scrollDepthMarkers = [25, 50, 75, 100];
  private triggeredDepths = new Set<number>();
  private sectionObserver: IntersectionObserver | null = null;
  private sectionTimers = new Map<string, number>();
  private enabled = false;
  private reducedData = false;

  constructor() {
    this.reducedData = this.checkReducedData();
    
    if (!this.reducedData) {
      this.setupScrollTracking();
      this.setupSectionTracking();
      
      // Enable when analytics consent given
      window.addEventListener('analytics:enabled', () => {
        this.enabled = true;
      });

      // Check initial consent
      this.checkInitialConsent();
    }
  }

  private checkReducedData(): boolean {
    return typeof window !== 'undefined' && 
           window.matchMedia && 
           window.matchMedia('(prefers-reduced-data: reduce)').matches;
  }

  private checkInitialConsent() {
    try {
      const consent = localStorage.getItem('neono-consent');
      if (consent) {
        const parsed = JSON.parse(consent);
        this.enabled = parsed.analytics === true;
      }
    } catch {
      // Ignore
    }
  }

  private setupScrollTracking() {
    if (typeof window === 'undefined') return;

    let ticking = false;
    
    const handleScroll = () => {
      if (!this.enabled || ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        this.checkScrollDepth();
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  private checkScrollDepth() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    const scrollPercent = Math.round(((scrollTop + windowHeight) / documentHeight) * 100);

    for (const marker of this.scrollDepthMarkers) {
      if (scrollPercent >= marker && !this.triggeredDepths.has(marker)) {
        this.triggeredDepths.add(marker);
        
        analytics.track('scroll_depth', {
          depth: marker,
          page_height: documentHeight,
          viewport_height: windowHeight,
        });
      }
    }
  }

  private setupSectionTracking() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        if (!this.enabled) return;
        
        entries.forEach((entry) => {
          const sectionId = entry.target.id || entry.target.className;
          
          if (entry.isIntersecting) {
            // Section entered view
            this.sectionTimers.set(sectionId, Date.now());
          } else {
            // Section left view
            const startTime = this.sectionTimers.get(sectionId);
            if (startTime) {
              const dwellTime = Date.now() - startTime;
              
              // Only track if user spent >1.5 seconds in section
              if (dwellTime > 1500) {
                analytics.track('section_dwell', {
                  section_id: sectionId,
                  dwell_time: dwellTime,
                  intersection_ratio: entry.intersectionRatio,
                });
              }
              
              this.sectionTimers.delete(sectionId);
            }
          }
        });
      },
      {
        threshold: [0.1, 0.25, 0.5, 0.75],
        rootMargin: '-50px 0px',
      }
    );

    // Observe major sections automatically
    setTimeout(() => this.observeSections(), 1000);
  }

  private observeSections() {
    if (!this.sectionObserver) return;

    // Look for major sections to track
    const selectors = [
      '[data-hero]',
      '#overview',
      '#features',
      '#pricing',
      '#testimonials',
      '#faq',
      'section',
      '.hero',
      '.value-snapshot',
      '.media-row',
      '.pricing-ribbon',
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el.id || el.className) {
          this.sectionObserver!.observe(el);
        }
      });
    });
  }

  // Reset tracking for new page
  reset() {
    this.triggeredDepths.clear();
    this.sectionTimers.clear();
  }

  // Manual section tracking for dynamic content
  observeElement(element: Element) {
    if (this.sectionObserver) {
      this.sectionObserver.observe(element);
    }
  }

  destroy() {
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
      this.sectionObserver = null;
    }
    this.sectionTimers.clear();
  }
}

// Global scroll tracker
export const scrollTracker = new ScrollTracker();

// Reset on navigation
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => scrollTracker.reset());
}