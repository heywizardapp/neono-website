/**
 * Haptic feedback utilities for mobile devices
 * Provides tactile feedback for user interactions
 */

// Check if device supports vibration
const hasVibration = () => {
  return typeof window !== 'undefined' && 'vibrate' in navigator;
};

// Check if user prefers reduced motion (also applies to haptics)
const prefersReducedMotion = () => {
  return typeof window !== 'undefined' && 
         window.matchMedia && 
         window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Light haptic feedback for subtle interactions
 * Used for: hover states, focus changes, small UI updates
 */
export function tick() {
  if (!hasVibration() || prefersReducedMotion()) return;
  
  try {
    navigator.vibrate(8);
  } catch (error) {
    // Silently fail if vibration is not supported
    console.debug('Haptic feedback not available:', error);
  }
}

/**
 * Success haptic feedback for positive actions
 * Used for: form submissions, successful operations, confirmations
 */
export function success() {
  if (!hasVibration() || prefersReducedMotion()) return;
  
  try {
    navigator.vibrate([12, 10, 16]);
  } catch (error) {
    console.debug('Haptic feedback not available:', error);
  }
}

/**
 * Impact haptic feedback for significant interactions
 * Used for: button presses, toggles, important selections
 */
export function impact() {
  if (!hasVibration() || prefersReducedMotion()) return;
  
  try {
    navigator.vibrate(15);
  } catch (error) {
    console.debug('Haptic feedback not available:', error);
  }
}

/**
 * Error haptic feedback for problems or failures
 * Used for: form errors, failed operations, warnings
 */
export function error() {
  if (!hasVibration() || prefersReducedMotion()) return;
  
  try {
    navigator.vibrate([25, 10, 25, 10, 25]);
  } catch (error) {
    console.debug('Haptic feedback not available:', error);
  }
}

/**
 * Selection haptic feedback for item selection
 * Used for: carousel navigation, menu selection, tabs
 */
export function selection() {
  if (!hasVibration() || prefersReducedMotion()) return;
  
  try {
    navigator.vibrate(10);
  } catch (error) {
    console.debug('Haptic feedback not available:', error);
  }
}

/**
 * Warning haptic feedback for caution
 * Used for: destructive actions, confirmations needed
 */
export function warning() {
  if (!hasVibration() || prefersReducedMotion()) return;
  
  try {
    navigator.vibrate([20, 15, 20]);
  } catch (error) {
    console.debug('Haptic feedback not available:', error);
  }
}

/**
 * Get haptic capabilities information
 */
export function getHapticInfo() {
  return {
    hasVibration: hasVibration(),
    prefersReducedMotion: prefersReducedMotion(),
    canUseHaptics: hasVibration() && !prefersReducedMotion()
  };
}