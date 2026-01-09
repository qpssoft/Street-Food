# Implementation Plan: Vietnamese Street Food Discovery Platform

**Branch**: `001-street-food-app` | **Date**: 2026-01-08 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-street-food-app/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

A mobile-first static web platform for discovering Vietnamese street food through interactive province maps, time-based recommendations, and multi-language content. Users can browse 20 curated food items at launch (80% completeness), view culturally authentic information in 5 languages, explore foods by province via an interactive Vietnam map, receive time-appropriate suggestions, and access content offline. Built with Astro static site generator for GitHub Pages deployment, using Markdown + YAML frontmatter for content-first architecture, with performance targets of FCP <1.8s and LCP <2.5s on mobile 4G networks.

## Technical Context

**Language/Version**: JavaScript (Node.js 18+) with Astro 4.x static site generator
**Primary Dependencies**: Astro (static site generator), GeoJSON (province boundaries), Service Worker API (offline caching)
**Storage**: Static Markdown files with YAML frontmatter (content), GeoJSON files (province boundaries), LocalStorage/Cache API (client-side offline cache, 200 MB limit)
**Testing**: Lighthouse CI (Core Web Vitals validation), Playwright (E2E testing), axe-core or pa11y (WCAG 2.1 AA accessibility testing), Vitest (unit tests for utilities)
**Target Platform**: Modern web browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+), mobile-first responsive design (320px-428px primary viewport)
**Project Type**: Static web application (single build output to GitHub Pages)
**Performance Goals**: Mobile 4G targets (PRIMARY) - FCP <1.8s, LCP <2.5s, TTI <3.8s; Desktop targets (SECONDARY) - FCP <1.2s, LCP <1.8s, TTI <2.5s; Lighthouse CI scores: mobile 90+, desktop 95+ required for merge
**Constraints**: GitHub Pages static hosting only (no server-side runtime), 200 MB maximum offline cache size, WCAG 2.1 Level AA compliance mandatory, JavaScript bundle <150 KB gzipped, critical CSS <14 KB inlined
**Scale/Scope**: 20 food items at launch (expanding post-launch), 5 languages (Vietnamese, English, Chinese, Japanese, Korean), 34 provinces (2025 Vietnam administrative reform), ~10-15 static pages (main page + detail pages + language variants)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Mandatory Principles (NON-NEGOTIABLE)

**✅ Principle I: Content-First Architecture**
- Static Markdown + YAML frontmatter: COMPLIANT (Astro native support)
- Git-based versioning: COMPLIANT (all content committed to repository)
- Static site generation: COMPLIANT (Astro build to HTML/CSS/JS)
- No database runtime: COMPLIANT (build-time data transformation only)
- Content schema validation: REQUIRES IMPLEMENTATION (YAML frontmatter validation in build pipeline)

**✅ Principle II: Progressive Web Experience**
- Core content without JavaScript: COMPLIANT (Astro generates static HTML)
- Service Worker offline caching: REQUIRES IMPLEMENTATION (200 MB limit, intelligent prioritization)
- Cache refresh <5s: REQUIRES IMPLEMENTATION (update check on app launch)
- Asynchronous loading: REQUIRES IMPLEMENTATION (no full page reloads after initial load)
- Fallback graceful degradation: COMPLIANT (static HTML works without JS)

**✅ Principle III: Accessibility & Inclusivity (NON-NEGOTIABLE)**
- WCAG 2.1 Level AA compliance: REQUIRES VALIDATION (automated axe-core/pa11y + manual audits)
- Color contrast 4.5:1 normal, 3:1 large: REQUIRES VALIDATION (dynamic themes must pass)
- Keyboard navigation: REQUIRES IMPLEMENTATION (all interactive elements)
- Screen reader support: REQUIRES IMPLEMENTATION (ARIA attributes, semantic HTML)
- Multi-language support (5 languages): REQUIRES IMPLEMENTATION (Vietnamese, English, Chinese, Japanese, Korean)
- No authentication barriers: COMPLIANT (universal free access by design)

**✅ Principle IV: Performance Budget (NON-NEGOTIABLE, MOBILE-FIRST)**
- Mobile FCP <1.8s, LCP <2.5s, TTI <3.8s: REQUIRES VALIDATION (Lighthouse CI on every PR)
- Desktop FCP <1.2s, LCP <1.8s, TTI <2.5s: REQUIRES VALIDATION (Lighthouse CI secondary target)
- JavaScript bundle <150 KB gzipped: REQUIRES VALIDATION (build size tracking)
- Critical CSS <14 KB inlined: REQUIRES IMPLEMENTATION (Astro inline critical CSS)
- Lighthouse mobile 90+, desktop 95+: REQUIRES VALIDATION (CI/CD blocking gate)
- Image optimization: REQUIRES IMPLEMENTATION (WebP with JPEG fallback, responsive srcset)

**✅ Principle V: Cultural Authenticity**
- Vietnamese food culture expert review: REQUIRES PROCESS (hybrid gates: P1 pre-publish, P2/P3 staged)
- Native speaker translation verification: REQUIRES PROCESS (5 languages, P1 blocking gate)
- Vietnamese diacritics and romanization: REQUIRES IMPLEMENTATION (proper Unicode support)
- 34 provinces administrative divisions: REQUIRES DATA (2025 reform boundaries in GeoJSON)
- 80% content completeness at launch: REQUIRES CONTENT CURATION (20 food items minimum)

**✅ Principle VI: Simplicity & Iteration**
- 20 food items at 80% completeness: COMPLIANT (launch target per SC-004)
- YAGNI principles: COMPLIANT (static site, no backend, no user accounts)
- Modern browsers only: COMPLIANT (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Mobile browsers primary: COMPLIANT (iOS Safari, Chrome Mobile, Samsung Internet)
- GitHub Pages simple deployment: COMPLIANT (static files to GitHub Pages)

**✅ Principle VII: Adaptive User Experience**
- Dynamic theme colors from images: REQUIRES IMPLEMENTATION (color extraction algorithm + WCAG validation)
- Consumption method templates: REQUIRES IMPLEMENTATION (takeaway, dine-in, street-side, mixed)
- 70% consistent layout, 30% adaptive: REQUIRES IMPLEMENTATION (core components + adaptive sections)
- WCAG 2.1 AA contrast validation: REQUIRES IMPLEMENTATION (auto-adjust to compliant shades)
- Fallback color palette by category: REQUIRES IMPLEMENTATION (warm/cool tones mapping)

**✅ Principle VIII: Code Quality Standards (NON-NEGOTIABLE)**
- ESLint configured and enforced: REQUIRES IMPLEMENTATION (CI/CD pipeline)
- Prettier for code formatting: REQUIRES IMPLEMENTATION (pre-commit hooks)
- Pre-commit hooks: REQUIRES IMPLEMENTATION (ESLint + Prettier)
- Code review required: COMPLIANT (PR workflow assumption)
- No ESLint errors allowed: REQUIRES VALIDATION (CI/CD blocking gate)

**✅ Principle IX: User Experience Consistency (MOBILE-FIRST)**
- Mobile-first design (320px-428px): REQUIRES IMPLEMENTATION (responsive breakpoints)
- Touch targets 44x44px (iOS) or 48x48px (Android): REQUIRES IMPLEMENTATION (all interactive elements)
- Base font size 16px minimum on mobile: REQUIRES IMPLEMENTATION (typography system)
- Responsive breakpoints tested on real devices: REQUIRES TESTING (not just browser dev tools)
- Momentum scrolling on iOS: REQUIRES IMPLEMENTATION (webkit-overflow-scrolling: touch)

### Constitution Compliance Summary

**PASSED (Ready for Phase 0)**: All constitutional principles are either compliant by design or have clear implementation requirements. No violations requiring complexity justification.

**Action Items for Phase 0 Research**:
- Static site generator setup (Astro 4.x configuration)
- GeoJSON data sourcing (34 Vietnam provinces, 2025 reform)
- Color extraction algorithm evaluation (WCAG-compliant with fallbacks)
- Service Worker caching strategy design (200 MB limit, intelligent prioritization)
- Multi-language build workflow (language-prefixed slug URLs)
- Performance optimization techniques (mobile-first Core Web Vitals targets)

**Action Items for Phase 1 Design**:
- YAML frontmatter content schema (Street Food Item, Province, Eating Time)
- Adaptive UI template system (70/30 consistency principle)
- Offline cache management strategy (LocalStorage vs Cache API)
- GitHub Actions workflow configuration (Lighthouse CI + deployment)
- Accessibility validation pipeline (axe-core/pa11y integration)

## Project Structure

### Documentation (this feature)

```text
specs/001-street-food-app/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── content-schema.yaml  # YAML frontmatter schema for food items
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Static Web Application (Astro)
src/
├── content/             # Markdown + YAML frontmatter content
│   ├── foods/           # Food item content (20 at launch)
│   │   ├── vi/          # Vietnamese originals
│   │   ├── en/          # English translations
│   │   ├── zh/          # Chinese translations
│   │   ├── ja/          # Japanese translations
│   │   └── ko/          # Korean translations
│   ├── provinces/       # Province metadata (34 provinces)
│   └── config/          # Site configuration
├── components/          # Astro/React/Vue components
│   ├── layout/          # Core layout (70% consistent)
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── Navigation.astro
│   ├── adaptive/        # Adaptive UI (30% variable)
│   │   ├── ConsumptionMethodTemplate.astro
│   │   ├── ThemeProvider.astro
│   │   └── ConsumptionGuidance.astro
│   ├── map/             # Interactive province map
│   │   ├── VietnamMap.astro
│   │   └── ProvinceLayer.astro
│   └── ui/              # Reusable UI components
│       ├── FoodCard.astro
│       ├── TimeBasedSuggestion.astro
│       └── PopularityRank.astro
├── pages/               # Astro pages (generates static HTML)
│   ├── index.astro      # Home page (main listing + time-based suggestions)
│   ├── [lang]/          # Language-prefixed routes
│   │   └── [slug].astro # Food detail pages (dynamic routes)
│   └── 404.astro        # Error page
├── lib/                 # Utility libraries
│   ├── color-extraction.ts    # Dynamic theme color extraction
│   ├── wcag-validator.ts      # WCAG 2.1 AA contrast validation
│   ├── slug-generator.ts      # Vietnamese name to slug conversion
│   └── eating-time.ts         # Time-based filtering logic
├── data/                # Static data files
│   ├── provinces.geojson      # Vietnam province boundaries (self-hosted)
│   └── fallback-colors.json   # Category-based color palette
├── styles/              # Global styles
│   ├── global.css       # Base styles (mobile-first)
│   ├── typography.css   # 16px minimum mobile font size
│   └── accessibility.css      # WCAG 2.1 AA compliant styles
└── sw.js                # Service Worker (offline caching)

public/
├── images/              # Static images (food photos, optimized)
│   └── [food-slug]/     # Per-food image directory
└── fonts/               # Web fonts (subset for performance)

tests/
├── e2e/                 # Playwright end-to-end tests
│   ├── browsing.spec.ts
│   ├── province-map.spec.ts
│   └── offline.spec.ts
├── accessibility/       # WCAG 2.1 AA validation tests
│   └── wcag.spec.ts     # axe-core or pa11y integration
└── unit/                # Vitest unit tests
    ├── color-extraction.test.ts
    ├── slug-generator.test.ts
    └── eating-time.test.ts

.github/
└── workflows/
    ├── lighthouse-ci.yml      # Lighthouse CI performance validation
    ├── accessibility.yml      # WCAG 2.1 AA automated testing
    ├── build-deploy.yml       # Build and deploy to GitHub Pages
    └── pre-commit.yml         # ESLint + Prettier validation
```

**Structure Decision**: Static web application structure chosen based on:
- Astro static site generator (Constitution Principle I: Content-First Architecture)
- GitHub Pages hosting requirement (Constitution deployment mandate)
- Mobile-first responsive design (Constitution Principle IX)
- Content-first organization (Markdown + YAML frontmatter in `src/content/`)
- 5-language support (language-prefixed directory structure)
- Progressive enhancement (Service Worker for offline, optional JavaScript for interactivity)
- Separation of concerns (content, components, pages, utilities, data)

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No violations requiring justification.** All technical choices align with constitutional principles:
- Static site architecture satisfies Simplicity & Iteration (Principle VI)
- No backend runtime eliminates infrastructure complexity
- Content-first Markdown + YAML frontmatter satisfies Principle I
- Astro component islands architecture enables Progressive Web Experience (Principle II) while maintaining simplicity
- Mobile-first design satisfies Performance Budget (Principle IV) and UX Consistency (Principle IX)

---

## Phase 0: Research & Technology Evaluation

*This section will be populated by the `/speckit.plan` command during Phase 0 execution.*

[Phase 0 will generate `research.md` to resolve all "REQUIRES IMPLEMENTATION" and "REQUIRES VALIDATION" items from Constitution Check]

## Phase 1: Data Model & Contracts

*This section will be populated by the `/speckit.plan` command during Phase 1 execution.*

[Phase 1 will generate `data-model.md`, `contracts/content-schema.yaml`, and `quickstart.md`]
