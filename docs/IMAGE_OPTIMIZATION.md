# Image Optimization Guide

## Overview

This document describes the image optimization process for the Vietnamese Street Food Discovery Platform. All food images must be optimized for web performance while maintaining visual quality.

## Image Requirements

### Minimum Specifications
- **Resolution**: 800×600 pixels minimum
- **Format**: JPEG original with WebP conversion
- **Quality**: High quality, clear subject, good lighting
- **File size**: Target <200 KB per image after optimization

### Image Naming Convention
```
public/images/[slug]/main.jpg           # Primary image
public/images/[slug]/detail-1.jpg       # Additional images
public/images/[slug]/detail-2.jpg
```

## Optimization Process

### Step 1: Image Preparation
1. Source high-quality food photography (800×600 minimum)
2. Ensure proper framing with food as primary subject
3. Good lighting and color saturation for color extraction
4. Save in JPEG format at 90% quality

### Step 2: Automated Optimization (Build-Time)

The build process automatically optimizes images using Sharp:

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import image from '@astrojs/image';

export default defineConfig({
  integrations: [
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
      cacheDir: './.cache/image',
      logLevel: 'info',
    }),
  ],
});
```

### Step 3: WebP Generation

During build, Sharp automatically generates WebP versions:

```javascript
// Automated by Astro Image service
- public/images/banh-mi/main.jpg    → dist/images/banh-mi/main.webp
- public/images/banh-mi/main.jpg    → dist/images/banh-mi/main.jpg (fallback)
```

### Step 4: Responsive Srcset Generation

The ResponsiveImage component generates multiple sizes:

```astro
---
// src/components/ui/ResponsiveImage.astro
import { Image } from 'astro:assets';

const { src, alt, slug } = Astro.props;
---

<picture>
  <source
    srcset={`/images/${slug}/main.webp`}
    type="image/webp"
  />
  <img
    src={`/images/${slug}/main.jpg`}
    alt={alt}
    loading="lazy"
    decoding="async"
    width="800"
    height="600"
  />
</picture>
```

## Color Extraction for Dynamic Theming

### Process
1. Sharp reads the primary image
2. Extracts dominant color using color quantization
3. Validates against WCAG 2.1 AA contrast requirements
4. Auto-adjusts if needed or uses category fallback

```typescript
// src/lib/color-extraction.ts
import sharp from 'sharp';

export async function extractDominantColor(imagePath: string) {
  const image = sharp(imagePath);
  const { dominant } = await image.stats();

  return {
    primary: rgbToHex(dominant.r, dominant.g, dominant.b),
    luminance: calculateLuminance(dominant),
  };
}
```

## Performance Targets

### Per-Image Targets
- **Original JPEG**: <300 KB
- **Optimized JPEG**: <200 KB
- **WebP**: <150 KB
- **Thumbnail (if needed)**: <50 KB

### Build-Time Metrics
- **Total images**: 21 food items × 1 primary image = 21 images minimum
- **Optimization time**: ~1-2 seconds per image
- **Total build time for images**: ~30-60 seconds

## Manual Optimization Tools (Optional)

If manual pre-optimization is needed before adding to repository:

### ImageMagick
```bash
# Resize and optimize
convert input.jpg -resize 800x600 -quality 85 output.jpg

# Batch process
for file in *.jpg; do
  convert "$file" -resize 800x600 -quality 85 "optimized-$file"
done
```

### Sharp CLI
```bash
# Install Sharp CLI
npm install -g sharp-cli

# Optimize single image
sharp -i input.jpg -o output.jpg --resize 800,600 --quality 85

# Batch optimization
sharp -i "*.jpg" -o optimized/ --resize 800,600 --quality 85
```

## Quality Assurance Checklist

Before committing food images, verify:

- [ ] Image resolution is 800×600 pixels or higher
- [ ] File size is under 300 KB (original JPEG)
- [ ] Subject (food) is clearly visible and well-lit
- [ ] Colors are vibrant and suitable for color extraction
- [ ] Image is in JPEG format (WebP generated automatically)
- [ ] Image alt text is descriptive and accessible
- [ ] Image follows naming convention: `public/images/[slug]/main.jpg`

## Lighthouse Performance Impact

### Target Metrics
- **LCP (Largest Contentful Paint)**: Images must not delay LCP
- **CLS (Cumulative Layout Shift)**: Width/height attributes prevent layout shift
- **Image Size Budget**: Total page images <500 KB

### Optimization Strategies
1. **Lazy Loading**: All images use `loading="lazy"` except above-the-fold
2. **Async Decoding**: `decoding="async"` prevents blocking main thread
3. **WebP with JPEG Fallback**: Modern browsers use WebP, legacy use JPEG
4. **Responsive Images**: Serve appropriate size for viewport
5. **CDN (GitHub Pages)**: Static files served with caching headers

## Image Sources

### Recommended Sources for Stock Images
1. **Unsplash** (free, high-quality): https://unsplash.com/s/photos/vietnamese-food
2. **Pexels** (free): https://www.pexels.com/search/vietnamese-food/
3. **Wikimedia Commons** (CC licensed): Search for specific dish names

### Original Photography
- Hire photographer for authentic Vietnamese street food
- Shoot in natural daylight for accurate colors
- Multiple angles: overhead, close-up, context shot
- Ensure Vietnamese cultural authenticity

## Maintenance

### Adding New Food Items
1. Add high-quality JPEG to `public/images/[new-slug]/main.jpg`
2. Update YAML frontmatter with image path
3. Build process automatically optimizes and generates WebP
4. Verify in development: `npm run dev`
5. Check build output: `npm run build`

### Updating Existing Images
1. Replace JPEG in `public/images/[slug]/main.jpg`
2. Clear cache: `rm -rf ./.cache/image`
3. Rebuild: `npm run build`
4. Verify color extraction still works

## Troubleshooting

### Issue: Image Not Displaying
- Check file path in YAML frontmatter matches actual file location
- Verify file extension is lowercase (.jpg not .JPG)
- Check image directory exists: `public/images/[slug]/`

### Issue: Poor Color Extraction
- Ensure image has good color saturation
- Avoid images with white/gray backgrounds
- Use images where food is primary subject (not background)

### Issue: Slow Build Times
- Reduce image file sizes before adding to repository
- Use image caching: `.cache/image/` directory
- Consider reducing number of images per food item

## References

- **Sharp Documentation**: https://sharp.pixelplumbing.com/
- **Astro Image Service**: https://docs.astro.build/en/guides/images/
- **WebP Format**: https://developers.google.com/speed/webp
- **WCAG Contrast Requirements**: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
