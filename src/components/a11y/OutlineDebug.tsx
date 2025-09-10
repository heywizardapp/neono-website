import * as React from 'react';

interface OutlineDebugProps {
  enabled?: boolean;
}

/**
 * Development-only component to visualize all focusable elements
 * Helps with debugging keyboard navigation and focus management
 */
export default function OutlineDebug({ enabled = false }: OutlineDebugProps) {
  React.useEffect(() => {
    if (!enabled || process.env.NODE_ENV === 'production') return;

    const style = document.createElement('style');
    style.id = 'outline-debug-styles';
    style.textContent = `
      /* Outline all focusable elements */
      a, button, input, select, textarea, [tabindex]:not([tabindex="-1"]),
      [contenteditable="true"], [role="button"], [role="link"],
      [role="menuitem"], [role="tab"], [role="option"] {
        outline: 2px dashed rgba(255, 0, 0, 0.5) !important;
        outline-offset: 1px !important;
      }
      
      /* Different color for currently focused element */
      a:focus, button:focus, input:focus, select:focus, textarea:focus,
      [tabindex]:not([tabindex="-1"]):focus, [contenteditable="true"]:focus,
      [role="button"]:focus, [role="link"]:focus, [role="menuitem"]:focus,
      [role="tab"]:focus, [role="option"]:focus {
        outline: 3px solid rgba(0, 255, 0, 0.8) !important;
        outline-offset: 2px !important;
      }
      
      /* Show tab index values */
      [tabindex]:not([tabindex="0"]):not([tabindex="-1"])::before {
        content: "tab:" attr(tabindex);
        position: absolute;
        top: -20px;
        left: 0;
        background: rgba(255, 0, 0, 0.8);
        color: white;
        padding: 2px 4px;
        font-size: 10px;
        border-radius: 2px;
        z-index: 9999;
        pointer-events: none;
      }
    `;

    document.head.appendChild(style);

    // Add keyboard shortcut to toggle outline debug
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + Shift + O to toggle outline debug
      if (e.altKey && e.shiftKey && e.key === 'O') {
        e.preventDefault();
        const existingStyle = document.getElementById('outline-debug-styles');
        if (existingStyle) {
          existingStyle.style.display = existingStyle.style.display === 'none' ? 'block' : 'none';
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Log all focusable elements
    const focusableElements = document.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"], [role="button"], [role="link"], [role="menuitem"], [role="tab"], [role="option"]'
    );
    
    console.group('🎯 Focusable Elements Debug');
    console.log(`Found ${focusableElements.length} focusable elements:`);
    focusableElements.forEach((el, index) => {
      const tagName = el.tagName.toLowerCase();
      const id = el.id ? `#${el.id}` : '';
      const className = el.className ? `.${el.className.split(' ').join('.')}` : '';
      const tabIndex = el.getAttribute('tabindex');
      const role = el.getAttribute('role');
      
      const htmlEl = el as HTMLElement;
      console.log(`${index + 1}. ${tagName}${id}${className}`, {
        element: el,
        tabIndex,
        role,
        visible: htmlEl.offsetWidth > 0 && htmlEl.offsetHeight > 0
      });
    });
    console.groupEnd();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      const existingStyle = document.getElementById('outline-debug-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [enabled]);

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return enabled ? (
    <div className="fixed top-4 left-4 z-[9999] bg-red-500 text-white px-2 py-1 text-xs rounded">
      Outline Debug Active (Alt+Shift+O to toggle)
    </div>
  ) : null;
}