/**
 * React hook for accessibility preferences
 */

import * as React from 'react';
import { getA11yPrefs, setA11yPrefs, initA11yPrefs, watchSystemPrefs, type A11yPrefs } from '@/lib/a11y/userPrefs';

export function useA11y() {
  const [prefs, setPrefsState] = React.useState<A11yPrefs>(getA11yPrefs);

  // Initialize on mount
  React.useEffect(() => {
    initA11yPrefs();
    setPrefsState(getA11yPrefs());
  }, []);

  // Watch for system preference changes
  React.useEffect(() => {
    return watchSystemPrefs((systemPrefs) => {
      const currentPrefs = getA11yPrefs();
      const mergedPrefs = { ...currentPrefs, ...systemPrefs };
      setPrefsState(mergedPrefs);
      setA11yPrefs(mergedPrefs);
    });
  }, []);

  const updatePrefs = React.useCallback((newPrefs: Partial<A11yPrefs>) => {
    const updatedPrefs = { ...prefs, ...newPrefs };
    setPrefsState(updatedPrefs);
    setA11yPrefs(updatedPrefs);
  }, [prefs]);

  return {
    prefs,
    updatePrefs,
    resetPrefs: () => {
      const defaultPrefs = getA11yPrefs();
      setPrefsState(defaultPrefs);
      setA11yPrefs(defaultPrefs);
    }
  };
}