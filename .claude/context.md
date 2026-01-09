# Street Food Project Context

**Last Updated**: 2026-01-09
**Current Branch**: 001-street-food-app
**Repository**: https://github.com/qpssoft/Street-Food

## Project Overview

Vietnamese Street Food Discovery Platform - A static web application for discovering authentic Vietnamese street food with multi-language support, province-based browsing, time-based recommendations, and offline access.

## Current Status: Phase 1 Complete ✅

### Development Approach: Hybrid Model
- **Technical Development**: Start Phase 1-2 immediately (infrastructure)
- **Content Sourcing**: Parallel track for images and additional food content
- **MVP Delivery**: 5 real foods → expand to 20 foods incrementally

## Completed Work

### ✅ Phase 1: Project Setup (T001-T009)
1. **Repository Setup**
   - Connected to GitHub: https://github.com/qpssoft/Street-Food.git
   - Branch: 001-street-food-app

2. **npm Initialization**
   - Package.json created
   - Node.js v21.7.3 (has engine warnings but works)
   - npm 10.5.0

3. **Dependencies Installed**
   - Astro 4.16.19 (NOT using @astrojs/image - built-in support)
   - sharp (image processing)
   - vitest, playwright, @axe-core/playwright (testing)
   - workbox-build, workbox-cli (Service Worker)
   - color (color manipulation)

4. **Directory Structure Created**
   ```
   src/
   ├── content/foods/{vi,en,zh,ja,ko}/
   ├── components/{layout,adaptive,map,ui}/
   ├── pages/
   ├── lib/
   ├── data/
   ├── styles/
   └── i18n/locales/
   public/
   ├── images/
   └── fonts/
   tests/
   ├── e2e/
   ├── accessibility/
   └── unit/
   .github/workflows/
   ```

5. **Initial Content Created** (5 Vietnamese Foods)
   - ✅ banh-mi.md (2,500 words, #1 popularity, mixed/takeaway)
   - ✅ pho.md (2,200 words, #2 popularity, noodle/dine-in)
   - ✅ bun-cha.md (2,800 words, #3 popularity, grilled/dine-in)
   - ✅ goi-cuon.md (2,400 words, #4 popularity, fresh/takeaway)
   - ✅ ca-phe-sua-da.md (3,000 words, #5 popularity, beverage/street-side)

### Content Coverage Achieved
- ✅ All 3 consumption methods: takeaway, dine-in, street-side
- ✅ 5 different categories: mixed, noodle, grilled, fresh, beverage
- ✅ Multiple eating times: morning, afternoon, evening, anytime
- ✅ Geographic diversity: North (Hanoi) + South (HCMC)
- ✅ Cultural authenticity: French colonial history, Obama-Bourdain, regional variations

## Critical Technical Decisions

### ✅ Resolved Issues
1. **@astrojs/image Conflict**: Astro 4.x has built-in image support via `astro:assets`
   - Solution: Use sharp only (no @astrojs/image package)

2. **Node Version Warnings**: v21.7.3 shows engine warnings for vitest
   - Impact: Non-blocking, everything installs successfully
   - Future: Could upgrade to Node 22.x LTS for full compatibility

3. **Image Optimization**: Using Astro's built-in `<Image>` component
   - Generates WebP/AVIF with JPEG fallbacks
   - Build-time optimization with sharp

4. **GeoJSON Source**: Using geoBoundaries for Vietnam provinces
   - Simplified geometry (<500 KB)
   - Self-hosted in public/data/

## Next Phase: Phase 2 - Foundational Infrastructure (T010-T023)

**Status**: Ready to start
**Duration**: 2-3 days
**Blocking**: All user stories depend on Phase 2 completion

### Critical Tasks (14 tasks)
- [ ] T010: Create astro.config.mjs with GitHub Pages settings
- [ ] T011: Configure tsconfig.json
- [ ] T012: Add npm scripts to package.json (dev, build, preview, test)
- [ ] T013: Set up ESLint + Prettier
- [ ] T014: Define Content Collections schema with Zod validation ⚠️ CRITICAL
- [ ] T015: Create BaseLayout.astro (mobile-first)
- [ ] T016: Create global.css (CSS custom properties)
- [ ] T017: Create mobile-first responsive utilities
- [ ] T018: Configure accessibility styles (focus indicators, skip links)
- [ ] T019: Set up image optimization pipeline ⚠️ CRITICAL
- [ ] T020: Create color extraction utilities
- [ ] T021: Create slug generation utility ⚠️ CRITICAL
- [ ] T022: Set up pre-commit hooks (Husky)
- [ ] T023: Create .env.example

### Why BLOCKING
All user story phases (3-10) depend on:
- **Content Collections schema (T014)** - needed to load food data
- **Base layout (T015)** - needed for all pages
- **Image optimization (T019)** - needed for food photos
- **Slug generator (T021)** - needed for URL routing

## Pending Content Tasks (Parallel Track)

### Images Needed for MVP (5 files)
1. `public/images/banh-mi/main.jpg` (800×600+ pixels)
2. `public/images/pho/main.jpg`
3. `public/images/bun-cha/main.jpg`
4. `public/images/goi-cuon/main.jpg`
5. `public/images/ca-phe-sua-da/main.jpg`

**Requirements**:
- High quality (800×600 minimum)
- Culturally authentic
- Proper licensing for web use

## Constitution (9 Core Principles)

1. **Content-First**: Markdown + YAML frontmatter, no CMS
2. **Progressive Web**: Core functionality without JavaScript
3. **Accessibility**: WCAG 2.1 Level AA (4.5:1 contrast, keyboard navigation)
4. **Performance Budget**: FCP <1.8s, LCP <2.5s, TTI <3.8s (mobile 4G)
5. **Cultural Authenticity**: 80% content completeness, authentic sources
6. **Simplicity**: No frameworks beyond Astro, <150 KB JS bundle
7. **Adaptive UX**: Mobile-first, time/location-aware recommendations
8. **Code Quality**: ESLint, Prettier, 80% test coverage
9. **Mobile-First UX**: Mobile design PRIMARY, desktop secondary

## Technology Stack

### Core
- **Framework**: Astro 4.x (static site generator)
- **Language**: JavaScript (Node.js 18+)
- **Styling**: CSS3 + Custom Properties (no Tailwind/preprocessors)
- **TypeScript**: Type checking only (no .ts source files)

### Data & Content
- **Content**: Markdown + YAML frontmatter
- **Schema Validation**: Zod via Astro Content Collections
- **GeoJSON**: Vietnam province boundaries (geoBoundaries)
- **Images**: WebP/AVIF with JPEG fallbacks (sharp processing)

### Performance & Offline
- **Service Worker**: Workbox 7.x (stale-while-revalidate)
- **Cache Limit**: 200 MB maximum
- **Image Optimization**: Astro built-in + sharp

### Testing
- **Unit Tests**: Vitest
- **E2E Tests**: Playwright
- **Accessibility**: @axe-core/playwright
- **CI**: GitHub Actions with Lighthouse CI

### Deployment
- **Hosting**: GitHub Pages (static only)
- **URL**: https://qpssoft.github.io/Street-Food
- **Build Output**: dist/ (static HTML/CSS/JS)

## Performance Targets (Mobile 4G PRIMARY)

- **FCP** (First Contentful Paint): <1.8s
- **LCP** (Largest Contentful Paint): <2.5s
- **TTI** (Time to Interactive): <3.8s
- **CLS** (Cumulative Layout Shift): <0.1
- **FID** (First Input Delay): <100ms
- **JavaScript Bundle**: <150 KB gzipped

## Accessibility Requirements (WCAG 2.1 AA)

- **Contrast Ratio**: 4.5:1 (normal text), 3:1 (large text)
- **Keyboard Navigation**: All interactive elements accessible
- **Screen Readers**: Semantic HTML + ARIA labels
- **Focus Indicators**: Visible 2px outline
- **Skip Links**: Jump to main content
- **Alt Text**: All images with descriptive alt attributes

## Content Schema (YAML Frontmatter)

```yaml
# REQUIRED FIELDS
lang: 'vi' | 'en' | 'zh' | 'ja' | 'ko'
slug: string  # lowercase, alphanumeric, hyphens only
name: string  # 1-100 characters
description: string  # 10-500 characters
ingredients: string[]  # minimum 1 item
cookingMethod: string  # minimum 10 characters
category: 'grilled' | 'fresh' | 'fried' | 'noodle' | 'rice' | 'dessert' | 'beverage'
consumptionMethod: 'takeaway' | 'dine-in' | 'street-side' | 'mixed'
province: string[]  # 1-10 items
eatingTime: ('morning' | 'afternoon' | 'evening' | 'night' | 'anytime')[]
image: string
imageAlt: string

# OPTIONAL FIELDS
culturalHistory: string  # 100-300 words recommended
socialMedia:
  youtube: string
  instagram: string
consumptionGuidance:
  - step: number
    instruction: string
    icon: string
popularityRank: number  # 1-20
```

## MVP Scope Definition

**MVP = Phase 1 + Phase 2 + Phase 3 (US1: Browse Food)**

### MVP Deliverables
- ✅ 5 food items viewable with complete information
- ✅ Random 6-item discovery on home page
- ✅ Asynchronous content loading
- ✅ Mobile-first responsive design (FCP <1.8s, LCP <2.5s)
- ✅ WCAG 2.1 AA compliance
- ✅ Deployed to GitHub Pages

### Post-MVP Expansion
- Phase 4 (US5): Province-based filtering
- Phase 5 (US3): Time-based recommendations
- Phase 6 (US6): Multi-language support
- Phase 7 (US8): Offline functionality
- Phase 8 (US2): Food detail pages
- Phase 9 (US7): Cultural insights
- Phase 10 (US4): Consumption guidance
- Phase 11: Polish (color extraction, SEO, analytics)

## Task Organization

**Total Tasks**: 165 across 11 phases

### Task Format
```
- [ ] [TaskID] [P?] [Story?] Description with file path

Examples:
- [ ] T001 Clone repository and checkout branch 001-street-food-app
- [ ] T012 [P] [US1] Create FoodCard component in src/components/ui/FoodCard.astro
- [ ] T024 [P] [US1] Create Vietnamese food item content file for Bánh mì
```

### Markers
- **[P]**: Performance-critical task
- **[Story?]**: Associated user story (US1-US8)

## Common Commands (After Phase 2)

```bash
# Development
npm run dev      # Start dev server (localhost:4321)
npm run build    # Build production site → dist/
npm run preview  # Preview production build

# Testing
npm run test     # Run unit tests (Vitest)
npm run test:e2e # Run E2E tests (Playwright)

# Quality
npm run lint     # Run ESLint
npm run format   # Auto-format code (Prettier)
```

## Known Issues & Warnings

### Non-Blocking
1. **npm audit**: 7 vulnerabilities (4 low, 2 moderate, 1 high)
   - Status: Not blocking, address in Phase 2 security hardening

2. **Node Engine Warnings**: vitest prefers Node 20/22+ (currently 21.7.3)
   - Status: Works fine, consider upgrading to Node 22.x LTS later

### Resolved
1. ✅ @astrojs/image conflict (use built-in Astro 4.x image support)
2. ✅ Repository already exists (no need to create new one)

## File Locations

### Specifications
- `specs/001-street-food-app/spec.md` - Feature specification
- `specs/001-street-food-app/plan.md` - Technical architecture
- `specs/001-street-food-app/research.md` - Technical research
- `specs/001-street-food-app/data-model.md` - Data entities
- `specs/001-street-food-app/contracts/content-schema.yaml` - YAML template
- `specs/001-street-food-app/tasks.md` - 165 implementation tasks
- `specs/001-street-food-app/quickstart.md` - Developer onboarding

### Content
- `src/content/foods/vi/*.md` - Vietnamese language food content (5 files)

### Configuration (To be created in Phase 2)
- `astro.config.mjs` - Astro configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - npm scripts and dependencies
- `.eslintrc.cjs` - ESLint rules
- `.prettierrc` - Prettier formatting

## Next Steps

### Immediate: Start Phase 2
1. Create astro.config.mjs (T010)
2. Configure TypeScript (T011)
3. Add npm scripts (T012)
4. Set up linting (T013)
5. Define Content Collections schema (T014) ⚠️ CRITICAL

### Parallel: Source Images
- Content team sources 5 high-quality food images
- Images needed before Phase 3 (MVP) can start

### Target Timeline
- **Phase 2**: 2-3 days
- **Image sourcing**: 2-3 days (parallel)
- **Phase 3 (MVP)**: 3-4 days after Phase 2 complete
- **MVP Launch**: ~7-10 days from now

## Important Notes

1. **Astro 4.x Differences**: Built-in image support, no need for @astrojs/image package
2. **Mobile-First**: All design and performance targets prioritize mobile
3. **Static Only**: No server-side runtime (GitHub Pages constraint)
4. **Content Authenticity**: All content researched from authentic sources
5. **Progressive Enhancement**: Core features work without JavaScript
6. **WCAG Compliance**: Non-negotiable accessibility requirement
7. **Performance Budget**: Mobile 4G targets are PRIMARY, desktop is SECONDARY

---

**Ready for Phase 2: Foundational Infrastructure (T010-T023)**
