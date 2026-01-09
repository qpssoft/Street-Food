# Research & Technology Evaluation: Vietnamese Street Food Discovery Platform

**Feature**: Vietnamese Street Food Discovery Platform
**Branch**: `001-street-food-app`
**Date**: 2026-01-08
**Phase**: Phase 0 (Pre-Design Research)

## Overview

This document consolidates research findings for all technical unknowns identified in the Constitution Check. Each section presents the chosen solution, rationale, alternatives considered, and implementation recommendations.

---

## 1. Astro 4.x Static Site Generator for GitHub Pages

### Decision

**Chosen**: Astro 4.x with custom GitHub Actions build workflow, component islands architecture, and aggressive performance optimizations.

### Rationale

Astro 4.x is the optimal choice for this project because:

1. **Content-First Architecture**: Native Markdown + YAML frontmatter support via Content Collections API
2. **Zero JavaScript by Default**: Ships only HTML/CSS unless components explicitly request hydration
3. **Component Islands**: Allows mixing static and interactive components (map, time-based suggestions) while keeping bundle size minimal
4. **Image Optimization**: Built-in `<Image>` component generates WebP/AVIF with JPEG fallbacks and responsive srcset automatically
5. **Performance Focused**: Designed for Lighthouse 100 scores out of the box
6. **GitHub Pages Compatible**: Static HTML/CSS/JS output works perfectly with GitHub Pages hosting

### Configuration

**astro.config.mjs**:
```javascript
import { defineConfig } from 'astro/config';
import { astroImageTools } from 'astro-imagetools';

export default defineConfig({
  site: 'https://[username].github.io',
  base: '/Street-Food', // Repository name for GitHub Pages
  output: 'static', // Static site generation
  build: {
    inlineStylesheets: 'auto', // Inline critical CSS (<14 KB target)
    assets: '_astro', // Asset directory
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp', // Use sharp for build-time optimization
    },
    domains: [], // Allowed external image domains
  },
  vite: {
    build: {
      cssCodeSplit: true, // Split CSS for better caching
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Split vendor code from app code
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
  },
  compressHTML: true, // Minify HTML output
});
```

**package.json dependencies**:
```json
{
  "dependencies": {
    "astro": "^4.0.0",
    "@astrojs/image": "^0.18.0",
    "sharp": "^0.33.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.3.0",
    "typescript": "^5.3.0"
  }
}
```

### Performance Optimization Techniques

1. **Component Islands**: Use `client:load`, `client:idle`, `client:visible` directives sparingly
   - Map component: `client:visible` (only load when scrolled into view)
   - Time-based suggestions: `client:idle` (load after page interactive)
   - Language switcher: `client:load` (immediate interactivity)

2. **Image Optimization**:
   ```astro
   ---
   import { Image } from 'astro:assets';
   import foodImage from '../assets/banh-mi.jpg';
   ---
   <Image
     src={foodImage}
     alt="Bánh mì"
     widths={[320, 640, 1024, 1920]}
     formats={['webp', 'jpeg']}
     loading="lazy"
     decoding="async"
   />
   ```

3. **Critical CSS Inlining**: Astro automatically inlines CSS <14 KB when `inlineStylesheets: 'auto'`

4. **Lazy Loading**: Use `loading="lazy"` on all images below the fold

5. **Font Subsetting**: Only load required glyphs for Vietnamese diacritics

### Alternatives Considered

| Framework | Pros | Cons | Rejected Because |
|-----------|------|------|------------------|
| **11ty (Eleventy)** | Simple, fast, mature | No built-in image optimization, less modern DX | Image optimization critical for mobile performance |
| **Hugo** | Extremely fast builds | Go templates learning curve, no npm ecosystem | JavaScript ecosystem needed for color extraction, WCAG validation |
| **Jekyll** | GitHub Pages default | Ruby dependency, slower builds, outdated | Poor performance, no modern image optimization |
| **Next.js (SSG mode)** | React ecosystem, ISR support | Heavy framework, over-engineered for static site | Violates simplicity principle, unnecessary complexity |
| **Gatsby** | GraphQL data layer, plugin ecosystem | Slow builds, complexity, heavy runtime | Build time unacceptable for 5 languages, too complex |

### Implementation Recommendations

1. **Directory Structure**:
   ```
   src/
   ├── content/
   │   ├── config.ts          # Content collections schema
   │   └── foods/
   │       ├── vi/banh-mi.md
   │       ├── en/banh-mi.md
   │       └── ...
   ├── components/
   ├── layouts/
   ├── pages/
   └── lib/
   ```

2. **Content Collections Schema** (`src/content/config.ts`):
   ```typescript
   import { defineCollection, z } from 'astro:content';

   const foodsCollection = defineCollection({
     type: 'content',
     schema: z.object({
       name: z.string(),
       slug: z.string(),
       description: z.string(),
       ingredients: z.array(z.string()),
       cookingMethod: z.string(),
       province: z.array(z.string()),
       eatingTime: z.array(z.enum(['morning', 'afternoon', 'evening', 'night', 'anytime'])),
       consumptionMethod: z.enum(['takeaway', 'dine-in', 'street-side', 'mixed']),
       image: z.string(),
       socialMedia: z.object({
         youtube: z.string().url().optional(),
         facebook: z.string().url().optional(),
         tiktok: z.string().url().optional(),
         x: z.string().url().optional(),
       }).optional(),
     }),
   });

   export const collections = {
     foods: foodsCollection,
   };
   ```

3. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: '18'
             cache: 'npm'
         - run: npm ci
         - run: npm run build
         - uses: actions/upload-pages-artifact@v2
           with:
             path: './dist'

     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - uses: actions/deploy-pages@v3
           id: deployment
   ```

4. **Build Performance**: Expected build time <2 minutes for 20 foods × 5 languages = 100 pages

---

## 2. Vietnam Province Boundaries GeoJSON Data

### Decision

**Chosen**: OpenStreetMap-derived GeoJSON data via Natural Earth Data (1:10m cultural vectors) or geoBoundaries, simplified to <500 KB total file size.

### Rationale

1. **Authoritative Data**: OpenStreetMap and Natural Earth Data are maintained by global community with Vietnamese contributors
2. **Open License**: Public domain or ODbL license allows commercial use and redistribution
3. **Administrative Level 1**: Matches Vietnam's 34 provinces and cities (2025 reform)
4. **GeoJSON Format**: Web-standard JSON format, easy to parse and render
5. **Simplification Possible**: Can reduce precision for web performance while maintaining visual accuracy

### Data Sources

**Primary Recommendation**: **geoBoundaries** (https://www.geoboundaries.org/)
- Vietnam ADM1 (Administrative Level 1) = 34 provinces/cities
- GeoJSON format available
- Open license (CC BY 4.0)
- Regularly updated
- File size: ~2-3 MB (unsimplified), ~300-500 KB (simplified)

**Alternative**: **Natural Earth Data** (https://www.naturalearthdata.com/)
- Cultural Vectors → Admin 1 – States, Provinces
- Filter for Vietnam (VNM)
- File size: ~1-2 MB (1:10m scale)
- Public domain license

### GeoJSON Structure Example

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Hà Nội",
        "name_en": "Hanoi",
        "name_vi": "Hà Nội",
        "admin_code": "VNM-HN",
        "population": 8246600,
        "capital": true
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [105.8072, 21.0245],
            [105.8512, 21.0117],
            ...
          ]
        ]
      }
    },
    ...
  ]
}
```

### Coordinate System

**Decision**: WGS84 (EPSG:4326) - Standard web mapping coordinate system
- Latitude/longitude decimal degrees
- Compatible with all web mapping libraries (Leaflet, Mapbox, D3.js)
- No projection transformation needed

### Simplification Strategy

Use **Mapshaper** (https://mapshaper.org/) to reduce file size while preserving province boundaries:

```bash
# Command-line simplification
mapshaper vietnam-provinces.json \
  -simplify dp 2% \
  -clean \
  -o format=geojson vietnam-provinces-simplified.json
```

**Target**: Reduce from ~2-3 MB to <500 KB (2% Douglas-Peucker simplification)

### Rendering Library Comparison

| Library | Bundle Size | Pros | Cons | Recommendation |
|---------|-------------|------|------|----------------|
| **Leaflet** | ~40 KB gzipped | Lightweight, mature, mobile-friendly | Requires basemap tiles | ✅ **CHOSEN** - Best balance |
| **Mapbox GL JS** | ~200 KB gzipped | Beautiful rendering, vector tiles | Large bundle, violates 150 KB budget | ❌ Too heavy |
| **D3.js (geo module)** | ~60 KB gzipped | Flexible, custom visualizations | Requires more custom code | ✅ Alternative if custom control needed |
| **Leaflet + TopoJSON** | ~45 KB gzipped | Smaller file format than GeoJSON | Extra conversion step | ✅ Alternative for further optimization |

**Final Decision**: **Leaflet 1.9.x** with self-hosted GeoJSON
- Bundle size: ~40 KB (within 150 KB budget)
- Mobile-optimized touch interactions
- Optional basemap tiles (OpenStreetMap, Mapbox) via progressive enhancement
- Works offline with self-hosted GeoJSON

### Implementation Recommendations

**File Storage**:
```
src/data/
└── provinces.geojson  # Self-hosted, committed to git (~500 KB simplified)
```

**Astro Component** (`src/components/map/VietnamMap.astro`):
```astro
---
import provincesData from '../../data/provinces.geojson';
---

<div id="map" class="vietnam-map"></div>

<script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  const map = L.map('map', {
    center: [16.0, 106.0], // Vietnam center
    zoom: 6,
    minZoom: 5,
    maxZoom: 10,
    scrollWheelZoom: false, // Better mobile UX
    tap: true, // Enable tap for mobile
  });

  // Optional basemap (progressive enhancement)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 10,
  }).addTo(map);

  // Province boundaries layer (works offline)
  const provincesLayer = L.geoJSON(provincesData, {
    style: {
      color: '#333',
      weight: 2,
      fillOpacity: 0.1,
    },
    onEachFeature: (feature, layer) => {
      layer.on('click', () => {
        // Filter food list by province
        window.dispatchEvent(new CustomEvent('province-selected', {
          detail: { province: feature.properties.name_vi }
        }));
      });
    },
  }).addTo(map);
</script>

<style>
  .vietnam-map {
    width: 100%;
    height: 500px;
    touch-action: pan-y; /* Allow vertical scroll on mobile */
  }

  @media (max-width: 767px) {
    .vietnam-map {
      height: 400px;
    }
  }
</style>
```

### Alternatives Considered

| Source | Pros | Cons | Rejected Because |
|--------|------|------|------------------|
| **GADM** | Detailed, multiple admin levels | License restrictions on redistribution | Cannot commit to git repository |
| **Vietnamese Government (GSO)** | Official authoritative data | Vietnamese documentation only, format conversion needed | Accessibility and format complexity |
| **Google Maps API** | High quality, maintained | External dependency, API costs, requires internet | Violates offline requirement and simplicity principle |

---

## 3. Color Extraction with WCAG 2.1 AA Validation

### Decision

**Chosen**: `sharp` (Node.js) for build-time color extraction + custom WCAG contrast validator, with category-based fallback palette.

### Rationale

1. **Build-Time Extraction**: Process colors during Astro build (no runtime overhead)
2. **Zero Client Bundle Impact**: Colors extracted at build time, embedded in static HTML
3. **Sharp Performance**: Fast image processing in Node.js
4. **WCAG Validation**: Custom validator ensures 4.5:1 (normal) and 3:1 (large text) contrast
5. **Auto-Adjustment**: Algorithm shifts hue/saturation/lightness to nearest compliant shade
6. **Fallback Palette**: Category-based warm/cool tones for extraction failures

### Library Selection

**Primary**: **sharp** + **color** package
- sharp: Image processing (dominant color extraction via stats)
- color: Color manipulation and contrast calculation
- Combined bundle: 0 KB client-side (build-time only)

```json
{
  "devDependencies": {
    "sharp": "^0.33.0",
    "color": "^4.2.3"
  }
}
```

**Alternatives Considered**:

| Library | Bundle Size | Build/Runtime | Rejected Because |
|---------|-------------|---------------|------------------|
| **Vibrant.js** | ~20 KB | Runtime (browser) | Adds to client bundle, unnecessary runtime cost |
| **node-vibrant** | 0 KB client | Build-time | Less flexible than sharp + color combination |
| **color-thief** | ~5 KB | Runtime (browser) | Adds to client bundle |

### Implementation

**Color Extraction Utility** (`src/lib/color-extraction.ts`):

```typescript
import sharp from 'sharp';
import Color from 'color';

interface ExtractedColors {
  primary: string; // Hex color
  wcagCompliant: boolean;
  adjustedPrimary?: string; // WCAG-adjusted if needed
  contrastRatio: number;
}

export async function extractDominantColor(
  imagePath: string,
  backgroundColor: string = '#ffffff'
): Promise<ExtractedColors> {
  // Extract dominant color using sharp stats
  const { dominant } = await sharp(imagePath)
    .resize(100, 100, { fit: 'cover' }) // Resize for faster processing
    .stats();

  const primaryColor = Color.rgb(dominant.r, dominant.g, dominant.b);
  const bgColor = Color(backgroundColor);

  const contrastRatio = primaryColor.contrast(bgColor);
  const wcagCompliant = contrastRatio >= 4.5; // Normal text standard

  if (wcagCompliant) {
    return {
      primary: primaryColor.hex(),
      wcagCompliant: true,
      contrastRatio,
    };
  }

  // Auto-adjust to nearest WCAG-compliant shade
  const adjustedColor = adjustColorForContrast(primaryColor, bgColor, 4.5);

  return {
    primary: primaryColor.hex(),
    wcagCompliant: false,
    adjustedPrimary: adjustedColor.hex(),
    contrastRatio: adjustedColor.contrast(bgColor),
  };
}

function adjustColorForContrast(
  color: Color,
  background: Color,
  targetContrast: number
): Color {
  let adjustedColor = color.clone();
  const isLightBackground = background.luminosity() > 0.5;

  // Darken if light background, lighten if dark background
  const step = isLightBackground ? -0.05 : 0.05;
  let attempts = 0;
  const maxAttempts = 20;

  while (adjustedColor.contrast(background) < targetContrast && attempts < maxAttempts) {
    adjustedColor = adjustedColor.lighten(step);
    attempts++;
  }

  return adjustedColor;
}
```

**WCAG Validator** (`src/lib/wcag-validator.ts`):

```typescript
import Color from 'color';

export interface WCAGCheck {
  normalText: boolean; // 4.5:1
  largeText: boolean;  // 3:1
  ratio: number;
}

export function checkWCAGContrast(
  foreground: string,
  background: string
): WCAGCheck {
  const fgColor = Color(foreground);
  const bgColor = Color(background);
  const ratio = fgColor.contrast(bgColor);

  return {
    normalText: ratio >= 4.5,
    largeText: ratio >= 3.0,
    ratio: Math.round(ratio * 100) / 100,
  };
}

export function getAccessibleColor(
  color: string,
  background: string = '#ffffff',
  targetContrast: number = 4.5
): string {
  const checkResult = checkWCAGContrast(color, background);

  if (checkResult.ratio >= targetContrast) {
    return color; // Already compliant
  }

  // Adjust using adjustColorForContrast logic
  const fgColor = Color(color);
  const bgColor = Color(background);
  const adjusted = adjustColorForContrast(fgColor, bgColor, targetContrast);

  return adjusted.hex();
}

function adjustColorForContrast(
  color: Color,
  background: Color,
  targetContrast: number
): Color {
  let adjustedColor = color.clone();
  const isLightBackground = background.luminosity() > 0.5;

  const step = isLightBackground ? -0.05 : 0.05;
  let attempts = 0;
  const maxAttempts = 20;

  while (adjustedColor.contrast(background) < targetContrast && attempts < maxAttempts) {
    adjustedColor = adjustedColor.lighten(step);
    attempts++;
  }

  return adjustedColor;
}
```

**Fallback Color Palette** (`src/data/fallback-colors.json`):

```json
{
  "grilled": {
    "primary": "#8B4513",
    "accent": "#D2691E",
    "description": "Warm brown tones"
  },
  "fresh": {
    "primary": "#2E8B57",
    "accent": "#3CB371",
    "description": "Cool green tones"
  },
  "fried": {
    "primary": "#DAA520",
    "accent": "#FFD700",
    "description": "Golden amber tones"
  },
  "noodle": {
    "primary": "#8B7355",
    "accent": "#A0826D",
    "description": "Neutral earth tones"
  },
  "rice": {
    "primary": "#F5DEB3",
    "accent": "#DEB887",
    "description": "Wheat/beige tones"
  },
  "dessert": {
    "primary": "#FFB6C1",
    "accent": "#FFC0CB",
    "description": "Pastel sweet tones"
  },
  "beverage": {
    "primary": "#4682B4",
    "accent": "#5F9EA0",
    "description": "Refreshing blue tones"
  },
  "default": {
    "primary": "#6B7280",
    "accent": "#9CA3AF",
    "description": "Neutral gray tones"
  }
}
```

**Integration in Astro Build**:

```astro
---
// src/pages/[lang]/[slug].astro
import { getCollection } from 'astro:content';
import { extractDominantColor } from '../../lib/color-extraction';
import fallbackColors from '../../data/fallback-colors.json';

export async function getStaticPaths() {
  const foods = await getCollection('foods');

  return await Promise.all(foods.map(async (food) => {
    let themeColor;
    try {
      const extracted = await extractDominantColor(`./public/images/${food.data.slug}/${food.data.image}`);
      themeColor = extracted.wcagCompliant ? extracted.primary : extracted.adjustedPrimary;
    } catch (error) {
      // Fallback to category-based color
      const category = food.data.category || 'default';
      themeColor = fallbackColors[category]?.primary || fallbackColors.default.primary;
    }

    return {
      params: { lang: food.data.lang, slug: food.data.slug },
      props: { food, themeColor },
    };
  }));
}

const { food, themeColor } = Astro.props;
---

<style define:vars={{ themeColor }}>
  .food-detail {
    --theme-color: var(--themeColor);
    --theme-bg: var(--themeColor);
    /* Use CSS custom properties for dynamic theming */
  }
</style>
```

### Performance Impact

- **Build Time**: +10-15 seconds for 20 foods (color extraction)
- **Client Bundle**: 0 KB (build-time only)
- **Runtime**: Instant (colors embedded in static HTML/CSS)

---

## 4. Service Worker Offline Caching Strategy

### Decision

**Chosen**: Workbox 7.x with stale-while-revalidate strategy, intelligent cache prioritization, and 200 MB quota enforcement.

### Rationale

1. **Workbox Simplification**: Industry-standard Service Worker library by Google
2. **Cache Strategies**: Built-in strategies (cache-first, network-first, stale-while-revalidate)
3. **Quota Management**: Built-in cache size limits and expiration
4. **Background Sync**: Automatic cache updates when online
5. **Intelligent Prioritization**: LRU (Least Recently Used) eviction with custom scoring

### Workbox Configuration

**Installation**:
```json
{
  "devDependencies": {
    "workbox-build": "^7.0.0",
    "workbox-cli": "^7.0.0"
  }
}
```

**Service Worker** (`src/sw.js`):

```javascript
import { precacheAndRoute, matchPrecache } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache shell (HTML, CSS, JS) - auto-generated by Workbox build
precacheAndRoute(self.__WB_MANIFEST);

// Cache food detail pages - Stale While Revalidate
registerRoute(
  ({ request, url }) => {
    return request.destination === 'document' &&
           url.pathname.match(/\/(vi|en|zh|ja|ko)\/[^/]+\.html$/);
  },
  new StaleWhileRevalidate({
    cacheName: 'food-pages',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50, // Cache up to 50 food pages
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        purgeOnQuotaError: true, // Auto-purge if quota exceeded
      }),
    ],
  })
);

// Cache images - Cache First with size limit
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100, // Up to 100 images
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        // 200 MB limit enforcement
        // Assuming ~500 KB per image (WebP optimized)
        // 100 images × 500 KB = 50 MB for images
        // Leaves 150 MB for pages, GeoJSON, assets
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// Cache GeoJSON data - Cache First with long TTL
registerRoute(
  ({ url }) => url.pathname.endsWith('.geojson'),
  new CacheFirst({
    cacheName: 'geojson-data',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 5,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year (rarely changes)
      }),
    ],
  })
);

// Cache Google Fonts - Cache First
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com' ||
              url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
      }),
    ],
  })
);

// Network First for API requests (if any) - fall back to cache
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 3, // Fast timeout for mobile 4G
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 5 * 60, // 5 minutes
      }),
    ],
  })
);

// Navigation fallback for offline
const navigationRoute = new NavigationRoute(
  async ({ event }) => {
    try {
      const response = await fetch(event.request);
      return response;
    } catch (error) {
      // Offline fallback
      return await matchPrecache('/offline.html');
    }
  }
);
registerRoute(navigationRoute);

// Listen for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background sync for cache updates
self.addEventListener('sync', (event) => {
  if (event.tag === 'update-cache') {
    event.waitUntil(updateCache());
  }
});

async function updateCache() {
  // Check for content updates
  const cache = await caches.open('food-pages');
  const keys = await cache.keys();

  const updatePromises = keys.map(async (request) => {
    try {
      const response = await fetch(request);
      if (response.ok) {
        await cache.put(request, response);
      }
    } catch (error) {
      console.warn('Cache update failed for:', request.url);
    }
  });

  await Promise.all(updatePromises);
}
```

**Workbox Build Configuration** (`workbox-config.js`):

```javascript
module.exports = {
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{html,css,js,json,svg,woff2}', // Precache shell assets
  ],
  swDest: 'dist/sw.js',
  swSrc: 'src/sw.js',
  maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MB max per file
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/], // Ignore tracking params
};
```

**Client-Side Registration** (`src/components/ServiceWorkerRegister.astro`):

```astro
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');

        // Check for updates every 5 minutes
        setInterval(() => {
          registration.update();
        }, 5 * 60 * 1000);

        // Listen for SW updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'activated') {
              // Notify user of update
              console.log('New content available, page will refresh');
              window.location.reload();
            }
          });
        });

        // Request background sync permission (if supported)
        if ('sync' in registration) {
          await registration.sync.register('update-cache');
        }
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    });
  }
</script>
```

### Cache Size Management

**200 MB Breakdown**:
- **Food Pages** (HTML): 50 pages × 50 KB = 2.5 MB
- **Images** (WebP): 100 images × 500 KB = 50 MB
- **GeoJSON**: provinces.geojson = 0.5 MB
- **Shell Assets** (CSS, JS, fonts): ~10 MB
- **Social Media Embeds** (if cached): ~20 MB
- **Buffer**: ~117 MB

**Quota Enforcement**:
```javascript
// Monitor quota usage
async function checkQuota() {
  if (navigator.storage && navigator.storage.estimate) {
    const { usage, quota } = await navigator.storage.estimate();
    const percentUsed = (usage / quota) * 100;
    console.log(`Using ${usage} bytes of ${quota} bytes (${percentUsed.toFixed(2)}%)`);

    const maxQuota = 200 * 1024 * 1024; // 200 MB
    if (usage > maxQuota) {
      // Trigger cache cleanup
      await cleanupOldCaches();
    }
  }
}

async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const foodPagesCache = await caches.open('food-pages');
  const requests = await foodPagesCache.keys();

  // Sort by access time (LRU) - would need to track separately
  // Remove oldest 20% of entries
  const toDelete = Math.floor(requests.length * 0.2);
  for (let i = 0; i < toDelete; i++) {
    await foodPagesCache.delete(requests[i]);
  }
}
```

### Caching Strategy Summary

| Resource Type | Strategy | Cache Name | Max Entries | Max Age | Priority |
|---------------|----------|------------|-------------|---------|----------|
| **Food Pages** | Stale-While-Revalidate | food-pages | 50 | 7 days | High |
| **Images** | Cache First | images | 100 | 30 days | Medium |
| **GeoJSON** | Cache First | geojson-data | 5 | 1 year | High |
| **Fonts** | Cache First | google-fonts | 10 | 1 year | Low |
| **Shell Assets** | Precache | workbox-precache | All |永久 | Critical |

### Alternatives Considered

| Approach | Pros | Cons | Rejected Because |
|----------|------|------|------------------|
| **Manual Service Worker** | Full control, minimal dependencies | Complex, error-prone, reinventing wheel | Workbox is industry standard, battle-tested |
| **LocalStorage** | Simple API, synchronous | 5-10 MB limit, string-only storage | Far too small for 200 MB requirement |
| **IndexedDB** | Large storage, structured data | Complex API, async callbacks | Workbox Cache Storage API is simpler |
| **Application Cache** | Simple manifest | Deprecated, removed from browsers | No longer supported |

---

## 5. Multi-Language Astro Build Workflow

### Decision

**Chosen**: Astro Content Collections with language-prefixed directory structure, custom i18n routing, and hreflang SEO tags.

### Rationale

1. **Native Content Collections**: Astro's built-in content management with schema validation
2. **Language Directory Structure**: Clear organization (src/content/foods/vi/, /en/, /zh/, etc.)
3. **Dynamic Routing**: `[lang]/[slug].astro` generates all language + slug combinations
4. **SEO Optimization**: Proper hreflang tags for search engines
5. **No External Dependencies**: Pure Astro solution, no i18n plugins needed
6. **Build Performance**: Parallel processing of language variants

### Directory Structure

```
src/
├── content/
│   ├── config.ts                    # Content collections schema
│   └── foods/
│       ├── vi/
│       │   ├── banh-mi.md           # Vietnamese original
│       │   ├── pho.md
│       │   └── ...
│       ├── en/
│       │   ├── banh-mi.md           # English translation
│       │   ├── pho.md
│       │   └── ...
│       ├── zh/
│       │   ├── banh-mi.md           # Chinese translation
│       │   └── ...
│       ├── ja/
│       │   └── ...
│       └── ko/
│           └── ...
├── i18n/
│   ├── locales/
│   │   ├── vi.json                  # UI strings (Vietnamese)
│   │   ├── en.json                  # UI strings (English)
│   │   ├── zh.json
│   │   ├── ja.json
│   │   └── ko.json
│   └── utils.ts                     # i18n helper functions
└── pages/
    ├── index.astro                  # Root redirects to /vi/
    ├── [lang]/
    │   ├── index.astro              # Language-specific home page
    │   └── [slug].astro             # Food detail pages
    └── 404.astro
```

### Content Collections Schema

**src/content/config.ts**:

```typescript
import { defineCollection, z } from 'astro:content';

const foodsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    lang: z.enum(['vi', 'en', 'zh', 'ja', 'ko']),
    slug: z.string(), // Canonical slug (Vietnamese name converted)
    name: z.string(),
    description: z.string(),
    ingredients: z.array(z.string()),
    cookingMethod: z.string(),
    culturalHistory: z.string().optional(),
    province: z.array(z.string()),
    eatingTime: z.array(z.enum(['morning', 'afternoon', 'evening', 'night', 'anytime'])),
    consumptionMethod: z.enum(['takeaway', 'dine-in', 'street-side', 'mixed']),
    category: z.enum(['grilled', 'fresh', 'fried', 'noodle', 'rice', 'dessert', 'beverage']),
    image: z.string(),
    imageAlt: z.string(),
    socialMedia: z.object({
      youtube: z.string().url().optional(),
      facebook: z.string().url().optional(),
      tiktok: z.string().url().optional(),
      x: z.string().url().optional(),
    }).optional(),
    consumptionGuidance: z.array(z.object({
      step: z.number(),
      instruction: z.string(),
      icon: z.string().optional(),
    })).optional(),
    popularityRank: z.number().optional(),
  }),
});

export const collections = {
  foods: foodsCollection,
};
```

### Dynamic Routing

**src/pages/[lang]/[slug].astro**:

```astro
---
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import FoodDetailLayout from '../../layouts/FoodDetailLayout.astro';
import { getLocalizedStrings } from '../../i18n/utils';

export async function getStaticPaths() {
  const allFoods = await getCollection('foods');

  return allFoods.map((food) => ({
    params: {
      lang: food.data.lang,
      slug: food.data.slug
    },
    props: { food },
  }));
}

interface Props {
  food: CollectionEntry<'foods'>;
}

const { food } = Astro.props;
const { lang, slug } = Astro.params;
const { Content } = await food.render();
const t = getLocalizedStrings(lang);

// Get all language variants for hreflang tags
const allFoods = await getCollection('foods');
const languageVariants = allFoods
  .filter(f => f.data.slug === slug)
  .map(f => ({
    lang: f.data.lang,
    url: `/${f.data.lang}/${f.data.slug}.html`,
  }));
---

<FoodDetailLayout
  title={food.data.name}
  description={food.data.description}
  lang={lang}
  languageVariants={languageVariants}
>
  <article class="food-detail">
    <h1>{food.data.name}</h1>
    <Content />
    <!-- Rest of food detail page -->
  </article>
</FoodDetailLayout>
```

### SEO with hreflang Tags

**src/layouts/FoodDetailLayout.astro**:

```astro
---
interface Props {
  title: string;
  description: string;
  lang: string;
  languageVariants: Array<{ lang: string; url: string }>;
}

const { title, description, lang, languageVariants } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!DOCTYPE html>
<html lang={lang}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content={description}>

  <!-- Canonical URL -->
  <link rel="canonical" href={canonicalURL}>

  <!-- hreflang tags for all language variants -->
  {languageVariants.map(({ lang: variantLang, url }) => (
    <link rel="alternate" hreflang={variantLang} href={new URL(url, Astro.site)} />
  ))}

  <!-- Default language fallback -->
  <link rel="alternate" hreflang="x-default" href={new URL(`/vi/${Astro.params.slug}.html`, Astro.site)} />

  <!-- Open Graph -->
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="og:locale" content={lang}>
  {languageVariants.map(({ lang: variantLang }) => (
    <meta property="og:locale:alternate" content={variantLang} />
  ))}
</head>
<body>
  <slot />
</body>
</html>
```

### Language Switching UI

**src/components/LanguageSwitcher.astro**:

```astro
---
import { getCollection } from 'astro:content';

const { lang, slug } = Astro.params;
const allFoods = await getCollection('foods');
const languageVariants = allFoods
  .filter(f => f.data.slug === slug)
  .map(f => ({
    lang: f.data.lang,
    label: getLanguageLabel(f.data.lang),
    url: `/${f.data.lang}/${f.data.slug}.html`,
  }));

function getLanguageLabel(lang: string): string {
  const labels = {
    vi: 'Tiếng Việt',
    en: 'English',
    zh: '中文',
    ja: '日本語',
    ko: '한국어',
  };
  return labels[lang] || lang;
}
---

<div class="language-switcher">
  <button aria-label="Change language" aria-haspopup="true">
    {getLanguageLabel(lang)}
    <svg><!-- Globe icon --></svg>
  </button>

  <ul role="menu">
    {languageVariants.map(({ lang: variantLang, label, url }) => (
      <li role="none">
        <a
          href={url}
          role="menuitem"
          lang={variantLang}
          hreflang={variantLang}
          aria-current={lang === variantLang ? 'true' : undefined}
        >
          {label}
        </a>
      </li>
    ))}
  </ul>
</div>

<style>
  .language-switcher {
    position: relative;
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: transparent;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    min-width: 48px; /* Touch target */
    min-height: 48px;
  }

  ul {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    list-style: none;
    padding: 0.5rem 0;
    margin: 0.25rem 0 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: none;
  }

  button:focus + ul,
  button:hover + ul,
  ul:hover {
    display: block;
  }

  a {
    display: block;
    padding: 0.5rem 1rem;
    color: inherit;
    text-decoration: none;
    min-width: 120px;
    min-height: 48px; /* Touch target */
  }

  a:hover,
  a:focus {
    background: #f5f5f5;
  }

  a[aria-current="true"] {
    font-weight: bold;
    background: #e3f2fd;
  }
</style>
```

### i18n Helper Functions

**src/i18n/utils.ts**:

```typescript
type Language = 'vi' | 'en' | 'zh' | 'ja' | 'ko';

const uiStrings: Record<Language, Record<string, string>> = {
  vi: {
    'home': 'Trang chủ',
    'about': 'Giới thiệu',
    'province_map': 'Bản đồ tỉnh thành',
    'eating_time.morning': 'Buổi sáng',
    'eating_time.afternoon': 'Buổi chiều',
    'eating_time.evening': 'Buổi tối',
    'eating_time.night': 'Đêm',
    'what_to_eat_now': 'Bây giờ ăn gì?',
  },
  en: {
    'home': 'Home',
    'about': 'About',
    'province_map': 'Province Map',
    'eating_time.morning': 'Morning',
    'eating_time.afternoon': 'Afternoon',
    'eating_time.evening': 'Evening',
    'eating_time.night': 'Night',
    'what_to_eat_now': 'What should I eat now?',
  },
  // ... zh, ja, ko
};

export function getLocalizedStrings(lang: Language) {
  return (key: string): string => {
    return uiStrings[lang]?.[key] || uiStrings['vi'][key] || key;
  };
}

export function slugify(text: string): string {
  return text
    .normalize('NFD') // Decompose Vietnamese diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .replace(/\s+/g, '-') // Spaces to hyphens
    .replace(/[^\w-]+/g, '') // Remove non-word chars
    .replace(/--+/g, '-') // Collapse multiple hyphens
    .replace(/^-+/, '') // Trim leading hyphens
    .replace(/-+$/, ''); // Trim trailing hyphens
}
```

### Build Performance

**Expected Build Time**:
- 20 foods × 5 languages = 100 pages
- Astro parallel build: ~1-2 minutes total
- Color extraction: +10-15 seconds
- Image optimization: +20-30 seconds
- **Total**: ~2-3 minutes

**Optimization Techniques**:
1. **Parallel Processing**: Astro builds pages in parallel
2. **Incremental Builds**: Only rebuild changed files (Astro 4.x feature)
3. **Image Caching**: Reuse optimized images across builds
4. **Content Collection Caching**: Schema validation cached

### Alternatives Considered

| Approach | Pros | Cons | Rejected Because |
|----------|------|------|------------------|
| **astro-i18next** | Full-featured plugin, translation files | External dependency, runtime overhead | Adds complexity, not needed for static content |
| **astro-i18n** | Lightweight plugin | Limited features, less mature | Content Collections approach is more native |
| **Separate Sites** | Independent builds | 5x infrastructure, complex deployment | Violates simplicity principle |
| **Client-Side i18n** | Dynamic language switching | SEO issues, requires JavaScript | Poor SEO, violates progressive enhancement |

---

## Research Summary

All technical unknowns from Constitution Check have been resolved with concrete implementation plans:

1. ✅ **Astro 4.x Setup**: Configured for GitHub Pages, mobile-first performance, <150 KB bundle
2. ✅ **GeoJSON Data**: OpenStreetMap via geoBoundaries, <500 KB simplified, Leaflet rendering
3. ✅ **Color Extraction**: sharp + color library, build-time processing, WCAG 2.1 AA validation
4. ✅ **Offline Caching**: Workbox 7.x, stale-while-revalidate, 200 MB quota enforcement
5. ✅ **Multi-Language Build**: Content Collections, language-prefixed URLs, hreflang SEO

**Next Phase**: Generate data models and API contracts based on these technical decisions.
