# NeonO PWA & Mobile-First Features

This document explains the Progressive Web App (PWA) and mobile-first features implemented in the NeonO website.

## 🚀 PWA Features

### Service Worker & Caching
- **Location**: `src/sw.ts` (compiled to `/public/sw.js`)
- **Strategies**:
  - **Precaching**: Critical assets (/, /pricing, /solutions/*)
  - **Network First**: Navigation requests with 10s timeout
  - **Stale While Revalidate**: Images with 60 item/7 day limit
  - **Cache Fallback**: Offline page when network unavailable

### App Installation
- **Auto-prompt**: Appears after 30 seconds for eligible users
- **Dismissal**: Respects user choice for 7 days
- **Install tracking**: Analytics for install funnel
- **Standalone detection**: Hides prompt when already installed

### Offline Support
- **Offline page**: `/public/offline.html` with navigation links
- **Auto-retry**: Refreshes when connection restored
- **Cache management**: Automatic cleanup of old versions

## 📱 Mobile-First Components

### Bottom Sheet (`src/components/mobile/BottomSheet.tsx`)
```tsx
<BottomSheet 
  open={isOpen} 
  onOpenChange={setIsOpen}
  snapPoints={[0.25, 0.6, 0.95]}
  title="Options"
>
  <YourContent />
</BottomSheet>
```

**Features**:
- 3 configurable snap points
- Drag gestures with resistance
- Keyboard navigation (Esc, Alt+Arrow)
- Focus management and trapping
- Haptic feedback on snap

### Floating Action Button (`src/components/mobile/FAB.tsx`)
```tsx
<FAB 
  icon={<Plus />}
  position="bottom-right"
  hideOnScroll
  onClick={handleAction}
/>

<ExtendedFAB 
  icon={<Share />}
  label="Share"
/>

<SpeedDialFAB 
  icon={<Menu />}
  actions={[
    { icon: <Edit />, label: "Edit", onClick: editAction },
    { icon: <Delete />, label: "Delete", onClick: deleteAction }
  ]}
/>
```

**Features**:
- Multiple sizes and positions
- Hide on scroll behavior
- Extended FAB with text
- Speed dial for multiple actions
- Haptic feedback on press

### Swipe Carousel (`src/components/mobile/SwipeCarousel.tsx`)
```tsx
<SwipeCarousel
  showNavigation
  showIndicators
  loop
  onSlideChange={handleSlideChange}
>
  {slides.map((slide, index) => (
    <div key={index}>{slide}</div>
  ))}
</SwipeCarousel>
```

**Features**:
- Touch and mouse drag support
- Momentum scrolling with snap
- Keyboard navigation
- Screen reader announcements
- Haptic feedback on slide change

### Pull to Refresh (`src/components/mobile/PullToRefresh.tsx`)
```tsx
<PullToRefresh onRefresh={handleRefresh} threshold={80}>
  <div>Your scrollable content</div>
</PullToRefresh>
```

**Features**:
- Configurable threshold and resistance
- Visual feedback with progress
- Haptic feedback on trigger
- Debounced refresh calls

## 🎨 Progressive Loading

### Progressive Images (`src/components/loaders/ProgressiveImage.tsx`)
```tsx
<ProgressiveImage
  src="/images/hero.jpg"
  placeholderSrc="/images/hero-blur.jpg"
  alt="Hero image"
  aspectRatio="16/9"
  objectFit="cover"
/>
```

**Features**:
- Blur-up loading effect
- Lazy loading with intersection observer
- Fallback image support
- No layout shift (CLS protection)

### Enhanced Skeletons
- Match final content layout
- Shimmer effect (respects reduced motion)
- Multiple variants: card, avatar, text, metrics

## 🎭 Scroll Animations

### Reveal Animations (`src/components/scroll/Reveal.tsx`)
```tsx
<Reveal animation="slide-up" delay={200}>
  <h1>This will slide up when visible</h1>
</Reveal>

<StaggeredReveal staggerDelay={100}>
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</StaggeredReveal>

<TextReveal text="Word by word animation" />

<CounterReveal from={0} to={1000} suffix="+ customers" />
```

### Parallax Effects (`src/components/scroll/Parallax.tsx`)
```tsx
<Parallax speed={0.5} direction="up">
  <img src="/background.jpg" alt="Background" />
</Parallax>

<ParallaxBackground src="/hero-bg.jpg" speed={0.3}>
  <div>Foreground content</div>
</ParallaxBackground>
```

### Header Transform
- Automatic shrinking on scroll
- Backdrop blur effect
- Configurable threshold (default: 50px)

## 🔄 Optimistic UI

### useOptimistic Hook (`src/lib/optimistic/useOptimistic.ts`)
```tsx
const [state, actions] = useOptimistic(initialData);

// Newsletter signup with optimistic update
await actions.execute(
  () => subscribeToNewsletter(email),
  (current) => ({ ...current, subscribed: true }),
  {
    successMessage: "Subscribed successfully!",
    errorMessage: "Failed to subscribe. Please try again."
  }
);
```

### useOptimisticList Hook
```tsx
const { items, addItem, removeItem, updateItem } = useOptimisticList(initialItems);

// Add item optimistically
await addItem(
  { name: "New Item" },
  createItemAPI,
  { successMessage: "Item added!" }
);
```

## 🎯 Touch Optimizations

### Haptic Feedback (`src/lib/haptics/taptic.ts`)
```tsx
import { tick, impact, success, error, warning } from '@/lib/haptics/taptic';

// Light feedback for subtle interactions
tick();

// Impact for button presses
impact();

// Success feedback for completed actions
success();

// Error feedback for failures
error();

// Warning for destructive actions
warning();
```

### Mobile CSS (`src/styles/mobile.css`)
- **Touch targets**: Minimum 44×44px enforcement
- **Safe areas**: iOS notch/home indicator support
- **Scroll snap**: Smooth carousel behavior
- **Overscroll**: Pull-to-refresh enablement
- **Momentum**: Native smooth scrolling

## 🔧 Development Setup

### Service Worker Development
1. **Build process**: `src/sw.ts` → `public/sw.js` (add to build)
2. **Registration**: Auto-registers on idle after page load
3. **Updates**: Shows prompt when new version detected
4. **Debugging**: Use Chrome DevTools Application tab

### PWA Testing
1. **Lighthouse**: Run PWA audit for installability
2. **Device testing**: Test install prompt on mobile
3. **Offline**: Disable network in DevTools
4. **Storage**: Check cache contents in Application tab

### Mobile Testing
1. **Responsive**: Test all breakpoints
2. **Touch**: Test gestures on touch devices
3. **Performance**: Monitor frame rates during animations
4. **Accessibility**: Test with screen readers

## 📊 Performance Considerations

### Bundle Size Impact
- **PWA features**: ~8KB gzipped
- **Mobile components**: Code-split by default
- **Animations**: Lazy loaded on first interaction
- **Haptics**: Minimal overhead (~1KB)

### Optimization Strategies
- **IntersectionObserver**: Single global instance
- **RequestAnimationFrame**: Throttled scroll handlers
- **Memory cleanup**: Automatic observer disconnection
- **Reduced motion**: Respects user preferences

## 🎛️ Configuration

### PWA Settings (`public/manifest.webmanifest`)
```json
{
  "theme_color": "#0B1220",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/"
}
```

### Component Defaults
- **BottomSheet**: 25%, 60%, 95% snap points
- **FAB**: Bottom-right position, 56×56px size
- **Carousel**: Loop enabled, navigation visible
- **Reveal**: 0.1 threshold, fade animation

## 🐛 Troubleshooting

### PWA Issues
- **Not installable**: Check manifest validity and HTTPS
- **Service worker**: Clear cache and reload
- **Install prompt**: Check localStorage dismissal

### Mobile Issues
- **Touch not working**: Verify touch-action CSS
- **Animations janky**: Check for layout thrashing
- **Haptics not working**: Verify device support

### Performance Issues
- **Memory leaks**: Check observer cleanup
- **Janky scrolling**: Reduce animation complexity
- **Large bundles**: Enable code splitting

## 🔄 Updates & Maintenance

### Service Worker Updates
1. Update `CACHE_NAME` in `src/sw.ts`
2. Add new routes to `PRECACHE_ASSETS`
3. Test offline functionality

### Component Updates
1. Test on multiple devices and browsers
2. Verify accessibility with screen readers
3. Check performance impact with Lighthouse

### Dependencies
- Keep animation libraries lightweight
- Monitor bundle size impact
- Update PWA manifest as needed

## 📱 Best Practices

### Mobile Performance
- Use `will-change` sparingly
- Prefer `transform` over `top/left`
- Debounce scroll handlers
- Clean up event listeners

### Accessibility
- Maintain focus management
- Provide keyboard alternatives
- Test with reduced motion
- Use semantic HTML

### PWA Compliance
- Serve over HTTPS
- Provide offline fallbacks
- Include manifest icons
- Test installation flow

---

For more details on specific implementations, check the individual component files and their extensive documentation.