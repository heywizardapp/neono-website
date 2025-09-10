# Placeholder Assets

This directory contains placeholder images and graphics for the NeonO website. All images are optimized for web performance with proper dimensions to prevent layout shift.

## Image Dimensions

- **Hero images**: 1440x900 (16:10 aspect ratio)
- **Feature cards**: 1200x800 (3:2 aspect ratio)  
- **Product screenshots**: 1200x800 (3:2 aspect ratio)
- **Team photos**: 400x400 (1:1 aspect ratio)
- **Integration logos**: 200x200 (1:1 aspect ratio)

## File Formats

- **AVIF**: Primary format for modern browsers
- **WebP**: Fallback for older browsers
- **PNG**: Final fallback for compatibility
- **SVG**: For logos and icons

## Usage

Import images as ES6 modules:

```tsx
import heroImage from '@/assets/placeholders/hero-salon.webp'

<OptimizedImage
  src={heroImage}
  alt="Modern salon interior"
  width={1440}
  height={900}
  priority
  className="rounded-2xl"
/>
```

## Performance Guidelines

- Use `priority={true}` for above-the-fold images
- Always specify width and height to prevent CLS
- Use lazy loading for below-the-fold images
- Provide descriptive alt text for accessibility