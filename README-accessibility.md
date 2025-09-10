# NeonO Accessibility & Internationalization Guide

This document outlines the accessibility and internationalization features implemented in the NeonO marketing website.

## Accessibility Features (WCAG 2.1 AA)

### 🎯 Key Features

- **High Contrast Mode**: Toggle for improved visibility
- **Font Scaling**: 100%, 112.5%, 125%, 150% text size options
- **Reduced Motion**: Respects user preference and manual toggle
- **Touch Target Sizing**: Adjustable touch targets (44px+ minimum)
- **Keyboard Navigation**: Full keyboard accessibility with focus management
- **Screen Reader Support**: Proper ARIA labels, live regions, and semantic HTML

### 🛠️ Components

#### AccessibilityToolbar
Floating accessibility controls accessible via keyboard and mouse.

```tsx
import AccessibilityToolbar from '@/components/a11y/AccessibilityToolbar';

// Add to your layout
<AccessibilityToolbar />
```

#### SkipLinks
Keyboard-accessible skip navigation links.

```tsx
import SkipLinks from '@/components/a11y/SkipLinks';

// Add to top of layout
<SkipLinks />
```

### 🎮 Keyboard Shortcuts

- **Tab / Shift+Tab**: Navigate between interactive elements
- **Enter / Space**: Activate buttons and links
- **Escape**: Close modals, dropdowns, and dialogs
- **Arrow Keys**: Navigate within menus and carousels (where implemented)
- **Alt+Shift+O**: Toggle outline debug (development only)

### 🔧 Utilities

#### Focus Management
```tsx
import { trapFocus, FocusManager } from '@/lib/a11y/focus';

// Store focus before opening modal
FocusManager.store();

// Trap focus within modal
const cleanup = trapFocus(modalElement);

// Restore focus when closing
cleanup();
FocusManager.restore();
```

#### ARIA Patterns
```tsx
import { ariaPatterns } from '@/lib/a11y/aria';

// Dialog attributes
<div {...ariaPatterns.dialog('dialog-title', 'dialog-desc')}>
  <h2 id="dialog-title">Dialog Title</h2>
  <p id="dialog-desc">Dialog description</p>
</div>

// Tab list
<div {...ariaPatterns.tablist()}>
  <button {...ariaPatterns.tab('panel-1', true)}>Tab 1</button>
  <button {...ariaPatterns.tab('panel-2', false)}>Tab 2</button>
</div>
```

### 🎨 CSS Classes

Custom accessibility-focused CSS classes are available:

```css
/* Screen reader only */
.sr-only

/* Focus rings */
.focus-ring

/* Touch targets */
.touch-44

/* High contrast mode styles */
:root[data-contrast="high"] { }
```

## Internationalization (i18n)

### 🌍 Supported Locales

- **en-CA**: English (Canada) - Default
- **en-US**: English (United States)
- **fr-CA**: French (Canada)

### 🔄 URL Structure

- `en-CA` (default): `/` → `/pricing` → `/solutions/salons`
- `en-US`: `/us/` → `/us/pricing` → `/us/solutions/salons`
- `fr-CA`: `/fr/` → `/fr/pricing` → `/fr/solutions/salons`

### 📝 Translation Usage

#### Hook-based
```tsx
import { useI18n } from '@/hooks/useI18n';

function MyComponent() {
  const { t, locale, formatters } = useI18n();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{formatters.currency(29.99)}</p>
      <time>{formatters.date(new Date())}</time>
    </div>
  );
}
```

#### Direct Translation
```tsx
import { t, getCurrentLocale } from '@/i18n';

const locale = getCurrentLocale();
const title = t('hero.title', locale);
```

### 🔧 Language Switcher

```tsx
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';

// Dropdown version
<LanguageSwitcher variant="button" />

// Select version
<LanguageSwitcher variant="select" />
```

### 📁 Adding New Translations

1. Add key to all locale files:
   ```json
   // src/i18n/locales/en-CA.json
   {
     "new.key": "English text"
   }
   
   // src/i18n/locales/fr-CA.json
   {
     "new.key": "Texte français"
   }
   ```

2. Use in components:
   ```tsx
   const text = t('new.key', locale);
   ```

### 🗺️ Adding New Locales

1. Create locale file: `src/i18n/locales/[locale].json`
2. Add to locale configs in `src/i18n/index.ts`
3. Update URL detection in `src/lib/i18n/detect.ts`
4. Add hreflang support in SEO utilities

## Testing

### Accessibility Testing

1. **Keyboard Navigation**: Tab through entire page
2. **Screen Reader**: Test with NVDA/JAWS/VoiceOver
3. **High Contrast**: Enable high contrast mode
4. **Color Contrast**: Use browser dev tools to check ratios
5. **Focus Management**: Ensure focus is trapped in modals
6. **Reduced Motion**: Test with system preference enabled

### Lighthouse Audits

Run Lighthouse accessibility audits to ensure WCAG compliance:

```bash
# Install lighthouse CLI
npm install -g lighthouse

# Run accessibility audit
lighthouse https://your-site.com --only-categories=accessibility
```

### Axe Testing

Use the axe-core library for automated accessibility testing:

```bash
# Install axe CLI
npm install -g @axe-core/cli

# Run axe scan
axe https://your-site.com
```

## Browser Support

### Accessibility Features
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

### Internationalization
- All modern browsers with Intl support
- Graceful fallback for older browsers

## Performance Impact

- **Accessibility Toolbar**: ~3KB gzipped
- **i18n System**: ~5KB gzipped
- **Total Bundle Impact**: <8KB additional

All features are code-split and loaded on demand where possible.

## Development

### Debug Mode

Enable outline debug in development:

```tsx
import OutlineDebug from '@/components/a11y/OutlineDebug';

// In your app
<OutlineDebug enabled={process.env.NODE_ENV === 'development'} />
```

### Console Logging

Accessibility utilities log helpful information in development mode:
- Focusable elements count
- Tab order issues
- ARIA relationship problems

### Visual Debugging

Use the keyboard shortcut `Alt+Shift+O` to toggle visual focus indicators for all interactive elements.

## Contributing

When adding new components:

1. ✅ Ensure keyboard accessibility
2. ✅ Add proper ARIA labels
3. ✅ Test with screen readers
4. ✅ Support high contrast mode
5. ✅ Add i18n keys for user-facing text
6. ✅ Test with reduced motion enabled

For questions or issues, consult the WCAG 2.1 AA guidelines and test with real assistive technologies.