# Quick Start Guide: Vietnamese Street Food Discovery Platform

**Feature**: Vietnamese Street Food Discovery Platform
**Branch**: `001-street-food-app`
**Date**: 2026-01-08
**Target Audience**: Developers setting up local development environment

## Overview

This guide helps developers quickly set up and start working on the Vietnamese Street Food Discovery Platform. Expected setup time: **15-20 minutes**.

---

## Prerequisites

### Required Software

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (included with Node.js)
- **Git**: v2.0.0 or higher ([Download](https://git-scm.com/))
- **Code Editor**: VS Code recommended ([Download](https://code.visualstudio.com/))

### Recommended VS Code Extensions

```bash
# Install via VS Code extensions marketplace
code --install-extension astro-build.astro-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

### Verify Installation

```bash
node --version  # Should be v18.0.0+
npm --version   # Should be v9.0.0+
git --version   # Should be v2.0.0+
```

---

## Project Setup

### 1. Clone Repository

```bash
git clone https://github.com/[username]/Street-Food.git
cd Street-Food
```

### 2. Checkout Feature Branch

```bash
git checkout 001-street-food-app

# Or create new branch from main
git checkout -b 001-street-food-app
```

### 3. Install Dependencies

```bash
npm install
```

**Expected Duration**: 2-3 minutes

**Key Dependencies Installed**:
- Astro 4.x (static site generator)
- Sharp (image processing)
- Workbox (Service Worker)
- Zod (schema validation)
- Vitest (unit testing)
- Playwright (E2E testing)

### 4. Initialize Project Structure

```bash
# Create required directories
mkdir -p src/content/foods/{vi,en,zh,ja,ko}
mkdir -p src/components/{layout,adaptive,map,ui}
mkdir -p src/pages/{vi,en,zh,ja,ko}
mkdir -p src/lib src/data src/styles src/i18n/locales
mkdir -p public/images public/fonts
mkdir -p tests/{e2e,accessibility,unit}
mkdir -p .github/workflows
```

### 5. Set Up Configuration Files

**Create `.env` file** (local development only):

```bash
# .env (DO NOT COMMIT)
SITE_URL=http://localhost:4321
PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

**Verify `astro.config.mjs`**:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://[username].github.io',
  base: '/Street-Food',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  compressHTML: true,
});
```

---

## Development Workflow

### Start Development Server

```bash
npm run dev
```

**Output**:
```
🚀 astro v4.0.0 started in 125ms

  ┃ Local    http://localhost:4321/
  ┃ Network  use --host to expose
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

**Hot Module Replacement (HMR)**: Enabled by default - changes auto-refresh.

### Build for Production

```bash
npm run build
```

**Output**: `dist/` directory with static HTML/CSS/JS

**Verify Build**:
```bash
npm run preview
```

Opens production build at [http://localhost:4322](http://localhost:4322)

### Run Tests

```bash
# Unit tests (Vitest)
npm run test

# E2E tests (Playwright)
npm run test:e2e

# Accessibility tests
npm run test:a11y

# All tests
npm run test:all
```

### Code Quality Checks

```bash
# ESLint
npm run lint

# Prettier (format check)
npm run format:check

# Prettier (auto-fix)
npm run format

# TypeScript type checking
npm run typecheck
```

---

## Adding Your First Food Item

### Step 1: Create Vietnamese Original

**File**: `src/content/foods/vi/pho.md`

```markdown
---
lang: vi
slug: pho
name: Phở
description: Món phở Việt Nam với nước dùng trong, bánh phở mềm, và thịt bò hoặc gà.

ingredients:
  - Bánh phở
  - Thịt bò/gà
  - Hành tây
  - Gừng
  - Ngò, húng quế

cookingMethod: |
  1. Nấu nước dùng từ xương bò
  2. Trần bánh phở
  3. Xếp thịt, bánh phở vào tô
  4. Chan nước dùng nóng
  5. Thêm rau thơm

culturalHistory: |
  Phở xuất hiện vào đầu thế kỷ 20 tại Hà Nội, trở thành món ăn quốc hồn quốc túy của Việt Nam.

category: noodle
consumptionMethod: dine-in

province:
  - Hà Nội
  - Hồ Chí Minh
  - Nam Định

eatingTime:
  - morning
  - afternoon
  - anytime

image: main.jpg
imageAlt: Tô phở Việt Nam với thịt bò và rau thơm

socialMedia:
  youtube: https://www.youtube.com/watch?v=example

consumptionGuidance:
  - step: 1
    instruction: Thêm rau sống và ớt theo khẩu vị
    icon: spice
  - step: 2
    instruction: Vắt chanh vào tô phở
    icon: drink
  - step: 3
    instruction: Dùng đũa và thìa để ăn
    icon: utensils

popularityRank: 2
---

# Phở Việt Nam

Phở là món ăn sáng truyền thống và nổi tiếng nhất của Việt Nam...

## Nguồn gốc

Phở xuất hiện vào đầu thế kỷ 20 tại Hà Nội...

## Biến thể

- **Phở Bắc**: Nước dùng trong, ít gia vị
- **Phở Nam**: Nước dùng ngọt hơn, nhiều rau thơm
```

### Step 2: Add Food Image

**Create image directory**:
```bash
mkdir -p public/images/pho
```

**Add image** (minimum 800×600px, optimized WebP/JPEG):
```bash
public/images/pho/main.jpg  # High-quality food photo
```

**Image Requirements**:
- **Format**: JPEG or PNG (Astro auto-converts to WebP)
- **Resolution**: Minimum 800×600px
- **File Size**: < 500 KB (optimized)
- **Subject**: Clear food photo with good lighting

### Step 3: Create Translations

**Copy to other languages**:

```bash
cp src/content/foods/vi/pho.md src/content/foods/en/pho.md
cp src/content/foods/vi/pho.md src/content/foods/zh/pho.md
cp src/content/foods/vi/pho.md src/content/foods/ja/pho.md
cp src/content/foods/vi/pho.md src/content/foods/ko/pho.md
```

**Translate content** (keep same `slug: pho`):

**File**: `src/content/foods/en/pho.md`

```markdown
---
lang: en
slug: pho
name: Phở (Vietnamese Noodle Soup)
description: Vietnamese phở with clear broth, soft rice noodles, and beef or chicken.

ingredients:
  - Rice noodles
  - Beef/Chicken
  - Onions
  - Ginger
  - Cilantro, basil

cookingMethod: |
  1. Simmer beef bones for broth
  2. Blanch rice noodles
  3. Place meat and noodles in bowl
  4. Pour hot broth
  5. Add fresh herbs

culturalHistory: |
  Phở emerged in early 20th century Hanoi, becoming Vietnam's national dish.

category: noodle
consumptionMethod: dine-in

province:
  - Hà Nội
  - Hồ Chí Minh
  - Nam Định

eatingTime:
  - morning
  - afternoon
  - anytime

image: main.jpg
imageAlt: Vietnamese phở bowl with beef and fresh herbs

socialMedia:
  youtube: https://www.youtube.com/watch?v=example

consumptionGuidance:
  - step: 1
    instruction: Add fresh vegetables and chili to taste
    icon: spice
  - step: 2
    instruction: Squeeze lime into the bowl
    icon: drink
  - step: 3
    instruction: Use chopsticks and spoon to eat
    icon: utensils

popularityRank: 2
---

# Vietnamese Phở

Phở is the most famous traditional breakfast dish of Vietnam...
```

### Step 4: Validate Content Schema

```bash
# Astro automatically validates on build
npm run build
```

**Expected Output** (if schema valid):
```
✓ Content collections built successfully
✓ 10 pages built in 1.5s
```

**If Validation Fails**:
```
❌ Error: Invalid frontmatter
   File: src/content/foods/vi/pho.md
   Field: eatingTime
   Expected: array of enum values
   Received: string "morning"
```

Fix errors and rebuild.

### Step 5: View Your Food Page

**Start dev server**:
```bash
npm run dev
```

**Navigate to**:
- Vietnamese: [http://localhost:4321/vi/pho.html](http://localhost:4321/vi/pho.html)
- English: [http://localhost:4321/en/pho.html](http://localhost:4321/en/pho.html)

---

## Common Tasks

### Task: Add Vietnam Province Boundaries

**Download GeoJSON data**:

1. Visit [geoBoundaries](https://www.geoboundaries.org/)
2. Select: Vietnam → Administrative Level 1 → Download GeoJSON
3. Save as: `src/data/provinces.geojson`

**Simplify GeoJSON** (optional, reduces file size):

```bash
# Install Mapshaper
npm install -g mapshaper

# Simplify (2% Douglas-Peucker)
mapshaper src/data/provinces.geojson \
  -simplify dp 2% \
  -clean \
  -o format=geojson src/data/provinces-simplified.geojson

# Use simplified version
mv src/data/provinces-simplified.geojson src/data/provinces.geojson
```

### Task: Extract Color from Food Image

**Utility**: Already implemented in `src/lib/color-extraction.ts`

**Usage** (build-time automatic):

```typescript
import { extractDominantColor } from '../lib/color-extraction';

const colorData = await extractDominantColor('./public/images/pho/main.jpg');
console.log(colorData.primary); // e.g., "#8B4513"
console.log(colorData.wcagCompliant); // true/false
```

**Manual Testing**:

```bash
# Add test script to package.json
npm run test:colors
```

### Task: Configure Service Worker Offline Cache

**File**: `src/sw.js`

**Workbox Configuration**:

```javascript
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache shell assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache food pages
registerRoute(
  ({ url }) => url.pathname.match(/\/(vi|en|zh|ja|ko)\/[^/]+\.html$/),
  new StaleWhileRevalidate({
    cacheName: 'food-pages',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        purgeOnQuotaError: true, // Enforce 200 MB limit
      }),
    ],
  })
);
```

**Build Service Worker**:

```bash
# Workbox CLI
npx workbox generateSW workbox-config.js
```

### Task: Run Lighthouse CI Locally

**Install Lighthouse CI**:

```bash
npm install -g @lhci/cli
```

**Run Performance Test**:

```bash
# Build production
npm run build

# Run Lighthouse CI
lhci autorun --config=.lighthouserc.json
```

**Expected Output**:
```
✓ Mobile Performance: 92 (target: 90+)
✓ Desktop Performance: 96 (target: 95+)
✓ Accessibility: 100
✓ Best Practices: 100
✓ SEO: 100
```

### Task: Add New Language

**Steps**:

1. **Update `src/content/config.ts`**:
   ```typescript
   lang: z.enum(['vi', 'en', 'zh', 'ja', 'ko', 'th']), // Add 'th' for Thai
   ```

2. **Create language directory**:
   ```bash
   mkdir -p src/content/foods/th
   mkdir -p src/i18n/locales
   ```

3. **Add UI translations** (`src/i18n/locales/th.json`):
   ```json
   {
     "home": "หน้าแรก",
     "about": "เกี่ยวกับ",
     "province_map": "แผนที่จังหวัด",
     "eating_time.morning": "ตอนเช้า"
   }
   ```

4. **Translate all food items** to Thai

5. **Update routing** in `src/pages/[lang]/[slug].astro`

---

## Troubleshooting

### Issue: Build Fails with "Module not found"

**Cause**: Missing dependency or incorrect import path

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Astro cache
rm -rf .astro
npm run build
```

### Issue: Images Not Loading

**Cause**: Incorrect image path or missing file

**Check**:
1. Image exists at `public/images/[slug]/[filename]`
2. YAML frontmatter `image` field matches filename
3. File extension is lowercase (.jpg, not .JPG)

**Solution**:
```bash
# Verify image path
ls -la public/images/pho/main.jpg

# Fix in YAML frontmatter
image: 'main.jpg'  # Correct
image: 'Main.JPG'  # Wrong
```

### Issue: TypeScript Errors in VS Code

**Cause**: TypeScript not recognizing Astro types

**Solution**:
```bash
# Generate TypeScript declarations
npm run astro sync

# Restart VS Code TypeScript server
# In VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Issue: Service Worker Not Updating

**Cause**: Browser caching old Service Worker

**Solution**:
```bash
# In browser DevTools:
# Application → Service Workers → Unregister
# Then hard reload: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

### Issue: Lighthouse Score Too Low

**Common Causes**:
1. **Images too large**: Optimize with `sharp` or `squoosh.app`
2. **Too much JavaScript**: Check bundle size with `npm run build -- --verbose`
3. **Render-blocking CSS**: Ensure critical CSS is inlined
4. **Slow server**: Use production build, not dev server

**Check Bundle Sizes**:
```bash
npm run build -- --verbose

# Output shows:
# main.js: 45 KB (gzipped: 15 KB)
# vendor.js: 120 KB (gzipped: 40 KB)  ← Check this is <150 KB
```

---

## Useful Commands Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (localhost:4321) |
| `npm run build` | Build production site → `dist/` |
| `npm run preview` | Preview production build (localhost:4322) |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:e2e` | Run end-to-end tests (Playwright) |
| `npm run test:a11y` | Run accessibility tests (axe-core) |
| `npm run lint` | Run ESLint |
| `npm run format` | Auto-format code (Prettier) |
| `npm run typecheck` | Check TypeScript types |
| `npm run astro sync` | Generate TypeScript declarations |

---

## Next Steps

1. **Add 20 Food Items**: Create content files for all launch foods
2. **Translate to 5 Languages**: Vietnamese, English, Chinese, Japanese, Korean
3. **Add Province GeoJSON**: Download and simplify Vietnam boundaries
4. **Configure GitHub Actions**: Set up CI/CD pipeline (see `.github/workflows/`)
5. **Run Lighthouse CI**: Validate performance targets (mobile 90+, desktop 95+)
6. **Submit for Review**: Create PR for cultural authenticity expert review

---

## Getting Help

**Documentation**:
- Astro Docs: [docs.astro.build](https://docs.astro.build)
- Workbox Docs: [developers.google.com/web/tools/workbox](https://developers.google.com/web/tools/workbox)
- Lighthouse CI: [github.com/GoogleChrome/lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci)

**Project Resources**:
- Feature Spec: [specs/001-street-food-app/spec.md](spec.md)
- Implementation Plan: [specs/001-street-food-app/plan.md](plan.md)
- Data Model: [specs/001-street-food-app/data-model.md](data-model.md)
- Content Schema: [specs/001-street-food-app/contracts/content-schema.yaml](contracts/content-schema.yaml)

**Team Communication**:
- GitHub Issues: Report bugs and feature requests
- Pull Requests: Code review and collaboration

---

**Setup Complete!** You're ready to start developing the Vietnamese Street Food Discovery Platform. 🚀
