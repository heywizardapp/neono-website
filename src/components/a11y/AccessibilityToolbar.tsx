import * as React from 'react';
import { Settings, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getA11yPrefs, setA11yPrefs, resetA11yPrefs, type A11yPrefs } from '@/lib/a11y/userPrefs';
import { FocusManager, trapFocus } from '@/lib/a11y/focus';

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [prefs, setPrefsState] = React.useState<A11yPrefs>(getA11yPrefs);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const cleanupRef = React.useRef<(() => void) | null>(null);

  // Update preferences and apply to DOM
  const updatePrefs = React.useCallback((newPrefs: A11yPrefs) => {
    setPrefsState(newPrefs);
    setA11yPrefs(newPrefs);
  }, []);

  // Handle dialog open/close
  const openDialog = React.useCallback(() => {
    FocusManager.store();
    setIsOpen(true);
  }, []);

  const closeDialog = React.useCallback(() => {
    setIsOpen(false);
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    FocusManager.restore();
  }, []);

  // Set up focus trap when dialog opens
  React.useEffect(() => {
    if (isOpen && dialogRef.current) {
      cleanupRef.current = trapFocus(dialogRef.current);
    }
    
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [isOpen]);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeDialog();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeDialog]);

  const handleReset = () => {
    resetA11yPrefs();
    setPrefsState(getA11yPrefs());
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <Button
        onClick={openDialog}
        size="lg"
        className={cn(
          "fixed bottom-4 right-4 z-40",
          "min-w-[48px] min-h-[48px] rounded-full shadow-lg",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        )}
        aria-label="Open accessibility options"
      >
        <Settings className="h-5 w-5" />
        <span className="sr-only">Accessibility Options</span>
      </Button>

      {/* Dialog Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50"
          onClick={closeDialog}
          aria-hidden="true"
        />
      )}

      {/* Dialog */}
      {isOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-dialog-title"
          className={cn(
            "fixed bottom-4 right-4 z-50",
            "w-80 max-w-[calc(100vw-2rem)]",
            "bg-background border border-border rounded-lg shadow-xl",
            "p-6 space-y-4"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 id="a11y-dialog-title" className="text-lg font-semibold">
              Accessibility Options
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeDialog}
              className="h-8 w-8 p-0"
              aria-label="Close accessibility options"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* High Contrast Toggle */}
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.contrastHigh}
                onChange={(e) => updatePrefs({ ...prefs, contrastHigh: e.target.checked })}
                className="rounded border-border focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm font-medium">High contrast mode</span>
            </label>
            <p className="text-xs text-muted-foreground ml-6">
              Increases color contrast for better visibility
            </p>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Font size
            </label>
            <select
              value={prefs.fontScale}
              onChange={(e) => updatePrefs({ ...prefs, fontScale: Number(e.target.value) })}
              className={cn(
                "w-full px-3 py-2 border border-border rounded-md",
                "bg-background text-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary"
              )}
            >
              <option value={1}>100% (Default)</option>
              <option value={1.125}>112.5% (Large)</option>
              <option value={1.25}>125% (Larger)</option>
              <option value={1.5}>150% (Largest)</option>
            </select>
          </div>

          {/* Line Height */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Line spacing
            </label>
            <select
              value={prefs.lineHeight}
              onChange={(e) => updatePrefs({ ...prefs, lineHeight: Number(e.target.value) })}
              className={cn(
                "w-full px-3 py-2 border border-border rounded-md",
                "bg-background text-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary"
              )}
            >
              <option value={1.5}>1.5 (Comfortable)</option>
              <option value={1.6}>1.6 (Default)</option>
              <option value={1.75}>1.75 (Loose)</option>
            </select>
          </div>

          {/* Reduce Motion Toggle */}
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.reduceMotion}
                onChange={(e) => updatePrefs({ ...prefs, reduceMotion: e.target.checked })}
                className="rounded border-border focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm font-medium">Reduce motion</span>
            </label>
            <p className="text-xs text-muted-foreground ml-6">
              Minimizes animations and transitions
            </p>
          </div>

          {/* Tap Target Size */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Touch target size
            </label>
            <select
              value={prefs.tapTargetSize}
              onChange={(e) => updatePrefs({ ...prefs, tapTargetSize: Number(e.target.value) })}
              className={cn(
                "w-full px-3 py-2 border border-border rounded-md",
                "bg-background text-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary"
              )}
            >
              <option value={1}>Default</option>
              <option value={1.2}>20% larger</option>
              <option value={1.4}>40% larger</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </Button>
            <Button onClick={closeDialog}>
              Done
            </Button>
          </div>
        </div>
      )}
    </>
  );
}