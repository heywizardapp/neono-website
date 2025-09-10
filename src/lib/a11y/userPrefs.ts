/**
 * User accessibility preferences management
 */

export interface A11yPrefs {
  contrastHigh: boolean;
  fontScale: number;
  lineHeight: number;
  reduceMotion: boolean;
  tapTargetSize: number;
}

const STORAGE_KEY = 'neono:a11y:prefs';

const DEFAULT_PREFS: A11yPrefs = {
  contrastHigh: false,
  fontScale: 1,
  lineHeight: 1.6,
  reduceMotion: false,
  tapTargetSize: 1
};

/**
 * Get user accessibility preferences from localStorage
 */
export function getA11yPrefs(): A11yPrefs {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...DEFAULT_PREFS, ...parsed };
    }
  } catch (error) {
    console.warn('Failed to load accessibility preferences:', error);
  }
  
  return { ...DEFAULT_PREFS };
}

/**
 * Save user accessibility preferences to localStorage and apply to DOM
 */
export function setA11yPrefs(prefs: A11yPrefs): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    applyPrefsToDOM(prefs);
  } catch (error) {
    console.warn('Failed to save accessibility preferences:', error);
    // Still apply to DOM even if storage fails
    applyPrefsToDOM(prefs);
  }
}

/**
 * Apply accessibility preferences to the DOM
 */
function applyPrefsToDOM(prefs: A11yPrefs): void {
  const html = document.documentElement;
  
  // High contrast mode
  if (prefs.contrastHigh) {
    html.setAttribute('data-contrast', 'high');
  } else {
    html.removeAttribute('data-contrast');
  }
  
  // Font scale
  html.style.setProperty('--font-scale', prefs.fontScale.toString());
  
  // Line height
  html.style.setProperty('--line-height', prefs.lineHeight.toString());
  
  // Reduce motion
  if (prefs.reduceMotion) {
    html.setAttribute('data-reduce-motion', 'true');
  } else {
    html.removeAttribute('data-reduce-motion');
  }
  
  // Tap target size
  html.style.setProperty('--tap-target-scale', prefs.tapTargetSize.toString());
}

/**
 * Initialize accessibility preferences on page load
 */
export function initA11yPrefs(): void {
  const prefs = getA11yPrefs();
  
  // Also check for system preferences
  const systemPrefs = getSystemPrefs();
  const mergedPrefs = { ...prefs, ...systemPrefs };
  
  applyPrefsToDOM(mergedPrefs);
}

/**
 * Get system accessibility preferences
 */
function getSystemPrefs(): Partial<A11yPrefs> {
  const systemPrefs: Partial<A11yPrefs> = {};
  
  // Check for prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    systemPrefs.reduceMotion = true;
  }
  
  // Check for prefers-contrast
  if (window.matchMedia('(prefers-contrast: high)').matches) {
    systemPrefs.contrastHigh = true;
  }
  
  return systemPrefs;
}

/**
 * Reset preferences to defaults
 */
export function resetA11yPrefs(): void {
  setA11yPrefs({ ...DEFAULT_PREFS });
}

/**
 * Listen for system preference changes
 */
export function watchSystemPrefs(callback: (prefs: Partial<A11yPrefs>) => void): () => void {
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const contrastQuery = window.matchMedia('(prefers-contrast: high)');
  
  const handleChange = () => {
    const systemPrefs = getSystemPrefs();
    callback(systemPrefs);
  };
  
  reducedMotionQuery.addEventListener('change', handleChange);
  contrastQuery.addEventListener('change', handleChange);
  
  return () => {
    reducedMotionQuery.removeEventListener('change', handleChange);
    contrastQuery.removeEventListener('change', handleChange);
  };
}