/**
 * Focus management utilities for accessibility
 */

const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(',');

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll(FOCUSABLE_ELEMENTS))
    .filter(el => {
      const element = el as HTMLElement;
      return element.offsetWidth > 0 && element.offsetHeight > 0;
    }) as HTMLElement[];
}

/**
 * Trap focus within a container (for modals, dialogs)
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);
  
  // Focus first element
  firstElement?.focus();

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Store and restore focus for dialogs
 */
class FocusManager {
  private static previouslyFocused: HTMLElement | null = null;

  static store() {
    this.previouslyFocused = document.activeElement as HTMLElement;
  }

  static restore() {
    if (this.previouslyFocused && typeof this.previouslyFocused.focus === 'function') {
      this.previouslyFocused.focus();
      this.previouslyFocused = null;
    }
  }
}

export { FocusManager };

/**
 * Implement roving tabindex for arrow key navigation
 */
export function rovingTabindex(container: HTMLElement, selector = '[role="menuitem"]'): () => void {
  const items = Array.from(container.querySelectorAll(selector)) as HTMLElement[];
  let currentIndex = 0;

  // Set initial tabindex
  items.forEach((item, index) => {
    item.tabIndex = index === 0 ? 0 : -1;
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;

    e.preventDefault();
    
    // Remove current tabindex
    items[currentIndex].tabIndex = -1;

    switch (e.key) {
      case 'ArrowDown':
        currentIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowUp':
        currentIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        currentIndex = 0;
        break;
      case 'End':
        currentIndex = items.length - 1;
        break;
    }

    // Set new tabindex and focus
    items[currentIndex].tabIndex = 0;
    items[currentIndex].focus();
  };

  container.addEventListener('keydown', handleKeyDown);

  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Announce content changes to screen readers
 */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  
  document.body.appendChild(announcer);
  
  // Small delay to ensure screen reader picks it up
  setTimeout(() => {
    announcer.textContent = message;
  }, 100);

  // Clean up after announcement
  setTimeout(() => {
    document.body.removeChild(announcer);
  }, 1000);
}