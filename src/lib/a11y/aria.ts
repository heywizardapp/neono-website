/**
 * ARIA utilities for enhanced accessibility
 */

/**
 * Generate unique IDs for ARIA relationships
 */
let idCounter = 0;
export function generateId(prefix = 'a11y'): string {
  return `${prefix}-${++idCounter}`;
}

/**
 * ARIA attributes for common patterns
 */
export const ariaPatterns = {
  /**
   * Dialog/Modal attributes
   */
  dialog: (labelledBy?: string, describedBy?: string) => ({
    role: 'dialog',
    'aria-modal': 'true',
    ...(labelledBy && { 'aria-labelledby': labelledBy }),
    ...(describedBy && { 'aria-describedby': describedBy })
  }),

  /**
   * Tab panel attributes
   */
  tablist: () => ({
    role: 'tablist'
  }),

  tab: (controls: string, selected = false) => ({
    role: 'tab',
    'aria-controls': controls,
    'aria-selected': selected,
    tabIndex: selected ? 0 : -1
  }),

  tabpanel: (labelledBy: string) => ({
    role: 'tabpanel',
    'aria-labelledby': labelledBy,
    tabIndex: 0
  }),

  /**
   * Carousel attributes
   */
  carousel: (label: string) => ({
    'aria-roledescription': 'carousel',
    'aria-label': label
  }),

  carouselSlide: (setSize: number, posInSet: number, label?: string) => ({
    role: 'group',
    'aria-roledescription': 'slide',
    'aria-setsize': setSize,
    'aria-posinset': posInSet,
    ...(label && { 'aria-label': label })
  }),

  /**
   * Menu attributes
   */
  menu: (label?: string) => ({
    role: 'menu',
    ...(label && { 'aria-label': label })
  }),

  menuitem: (hasPopup = false) => ({
    role: 'menuitem',
    ...(hasPopup && { 'aria-haspopup': 'true' })
  }),

  /**
   * Disclosure/Accordion attributes
   */
  disclosure: (expanded: boolean, controls?: string) => ({
    'aria-expanded': expanded,
    ...(controls && { 'aria-controls': controls })
  }),

  /**
   * Form field attributes
   */
  field: (describedBy?: string, invalid = false, required = false) => ({
    ...(describedBy && { 'aria-describedby': describedBy }),
    ...(invalid && { 'aria-invalid': 'true' }),
    ...(required && { 'aria-required': 'true' })
  }),

  /**
   * Live region attributes
   */
  liveRegion: (politeness: 'polite' | 'assertive' = 'polite', atomic = true) => ({
    'aria-live': politeness,
    'aria-atomic': atomic
  }),

  /**
   * Status attributes
   */
  status: () => ({
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true'
  }),

  alert: () => ({
    role: 'alert',
    'aria-live': 'assertive',
    'aria-atomic': 'true'
  })
};

/**
 * Enhanced button with better accessibility
 */
export function enhanceButton(
  element: HTMLButtonElement,
  options: {
    describedBy?: string;
    expanded?: boolean;
    controls?: string;
    pressed?: boolean;
  } = {}
) {
  const { describedBy, expanded, controls, pressed } = options;

  if (describedBy) element.setAttribute('aria-describedby', describedBy);
  if (typeof expanded === 'boolean') element.setAttribute('aria-expanded', String(expanded));
  if (controls) element.setAttribute('aria-controls', controls);
  if (typeof pressed === 'boolean') element.setAttribute('aria-pressed', String(pressed));
}

/**
 * Screen reader only text utility
 */
export function createSRText(text: string): HTMLSpanElement {
  const span = document.createElement('span');
  span.className = 'sr-only';
  span.textContent = text;
  return span;
}

/**
 * Manage expanded state for disclosure widgets
 */
export class DisclosureManager {
  private trigger: HTMLElement;
  private target: HTMLElement;
  private expanded: boolean;

  constructor(trigger: HTMLElement, target: HTMLElement, initiallyExpanded = false) {
    this.trigger = trigger;
    this.target = target;
    this.expanded = initiallyExpanded;

    this.setupAttributes();
    this.bindEvents();
  }

  private setupAttributes() {
    const targetId = this.target.id || generateId('disclosure');
    this.target.id = targetId;
    
    this.trigger.setAttribute('aria-expanded', String(this.expanded));
    this.trigger.setAttribute('aria-controls', targetId);
    
    this.updateVisibility();
  }

  private bindEvents() {
    this.trigger.addEventListener('click', () => this.toggle());
    this.trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  toggle() {
    this.expanded = !this.expanded;
    this.trigger.setAttribute('aria-expanded', String(this.expanded));
    this.updateVisibility();
  }

  private updateVisibility() {
    if (this.expanded) {
      this.target.removeAttribute('hidden');
    } else {
      this.target.setAttribute('hidden', '');
    }
  }
}