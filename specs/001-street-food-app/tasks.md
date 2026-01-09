# Implementation Tasks: Vietnamese Street Food Discovery Platform

**Feature**: Vietnamese Street Food Discovery Platform
**Branch**: `001-street-food-app`
**Date**: 2026-01-08
**Total Tasks**: 125
**Estimated Duration**: 12-15 development days

---

## Implementation Strategy

### MVP Scope (Minimum Viable Product)

**MVP = Phase 1 (Setup) + Phase 2 (Foundational) + Phase 3 (US1: Browse Street Food)**

This delivers the core value proposition: users can discover and learn about Vietnamese street food items with detailed information, images, and cultural context.

**MVP Success Criteria**:
- ✅ 20 food items viewable with complete information
- ✅ Random 6-item discovery on home page
- ✅ Asynchronous content loading (no full page reloads)
- ✅ High-quality images (800×600+)
- ✅ Mobile-first responsive design (FCP <1.8s, LCP <2.5s)
- ✅ WCAG 2.1 AA compliance
- ✅ Deployed to GitHub Pages

**Post-MVP Increments** (delivered in priority order):
- **Increment 1 (P1)**: US5 - Province Map (geographic discovery)
- **Increment 2 (P2)**: US3 - Multi-Language Support (international reach)
- **Increment 3 (P2)**: US6 - Time-Based Recommendations (cultural authenticity)
- **Increment 4 (P2)**: US8 - Adaptive UI (enhanced engagement)
- **Increment 5 (P2)**: US2 - Location Information (actionable insights)
- **Increment 6 (P2)**: US7 - Offline Access (reliability)
- **Increment 7 (P3)**: US4 - Social Media Integration (community engagement)

---

## Phase Dependency Graph

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational) ← BLOCKING for all user stories
    ↓
    ├─→ Phase 3 (US1: Browse Food) [P1] ← MVP COMPLETE HERE
    │
    └─→ Phase 4 (US5: Province Map) [P1]
            │
            ├─→ Phase 5 (US3: Multi-Language) [P2]
            │       ↓
            ├─→ Phase 6 (US6: Time-Based) [P2]
            │       ↓
            ├─→ Phase 7 (US8: Adaptive UI) [P2]
            │       ↓
            ├─→ Phase 8 (US2: Location Info) [P2]
            │       ↓
            ├─→ Phase 9 (US7: Offline Access) [P2]
            │       ↓
            └─→ Phase 10 (US4: Social Media) [P3]
                    ↓
            Phase 11 (Polish & Cross-Cutting)
```

**Notes**:
- **Phase 2 is BLOCKING**: Must complete before any user story
- **Phase 3 (US1) is MVP**: Can deploy after this phase
- **Phases 4-10**: Can be delivered incrementally (each is independently deployable)
- **Phases within same priority can be parallelized** if multiple developers available

---

## Parallel Execution Opportunities

### Setup Phase (Phase 1)
**All tasks sequential** - dependencies on project structure.

### Foundational Phase (Phase 2)
**Parallelizable after T010**:
- **Track A**: T011-T013 (Astro config, TypeScript, build scripts)
- **Track B**: T014-T017 (Content Collections schema, base layout)
- **Track C**: T018-T020 (Image optimization, responsive styles)

### User Story Phases (Phase 3-10)
**Each user story is independently parallelizable**:
- Developer 1: Works on Phase 3 (US1)
- Developer 2: Works on Phase 4 (US5)
- Developer 3: Works on Phase 5 (US3)

Within each story, tasks marked `[P]` can run in parallel.

---

## Task Format Legend

```
- [ ] [TaskID] [P?] [Story?] Description with file path
      ↑       ↑    ↑         ↑
      |       |    |         └─ Clear action + exact file path
      |       |    └─────────── [US1-US8] User Story label (phases 3-10 only)
      |       └──────────────── [P] = Parallelizable (different files, no dependencies)
      └──────────────────────── Sequential ID (T001, T002, T003...)
```

**Example**:
- `- [ ] T001 Create project structure` ← Setup phase (no story label)
- `- [ ] T012 [P] [US1] Create FoodCard component in src/components/ui/FoodCard.astro` ← Parallelizable, belongs to US1

---

## Phase 1: Project Setup

**Goal**: Initialize project with correct dependencies, directory structure, and configuration files per research.md recommendations.

**Duration**: 1-2 hours

### Tasks

- [ ] T001 Clone repository and checkout branch `001-street-food-app`
- [ ] T002 Initialize npm project and install Astro 4.x dependencies in package.json
- [ ] T003 Install image processing dependencies (sharp, @astrojs/image) in package.json
- [ ] T004 Install testing dependencies (vitest, playwright, @axe-core/playwright) in package.json
- [ ] T005 Install Workbox dependencies (workbox-build, workbox-cli) for Service Worker in package.json
- [ ] T006 Install color manipulation dependencies (color) in package.json
- [ ] T007 Create project directory structure: src/{content,components,pages,lib,data,styles,i18n}, public/{images,fonts}, tests/{e2e,accessibility,unit}
- [ ] T008 Create language-specific content directories: src/content/foods/{vi,en,zh,ja,ko}
- [ ] T009 Create component directories: src/components/{layout,adaptive,map,ui}

**Phase 1 Complete**: Project structure initialized with all dependencies.

---

## Phase 2: Foundational Infrastructure (BLOCKING)

**Goal**: Build core Astro configuration, Content Collections schema, and base layout that ALL user stories depend on.

**Duration**: 1-2 days

**CRITICAL**: This phase MUST complete before any user story work begins.

### Tasks

- [ ] T010 Create Astro configuration file (astro.config.mjs) with GitHub Pages settings, image optimization, and build options
- [ ] T011 [P] Configure TypeScript (tsconfig.json) for Astro Content Collections and strict type checking
- [ ] T012 [P] Create base package.json scripts: dev, build, preview, test, lint, format
- [ ] T013 [P] Configure ESLint (.eslintrc.js) and Prettier (.prettierrc) per Constitution Principle VIII
- [ ] T014 Define Content Collections schema in src/content/config.ts with Zod validation for Street Food Item entity
- [ ] T015 Create base HTML layout in src/layouts/BaseLayout.astro with mobile-first responsive structure
- [ ] T016 Create global styles in src/styles/global.css with CSS reset, mobile-first breakpoints (320px-428px primary)
- [ ] T017 Create typography styles in src/styles/typography.css with 16px minimum mobile font size
- [ ] T018 [P] Create accessibility styles in src/styles/accessibility.css for WCAG 2.1 AA compliance (focus indicators, skip links)
- [ ] T019 [P] Configure Astro Image service with sharp for build-time optimization in astro.config.mjs
- [ ] T020 [P] Create responsive image utility component in src/components/ui/ResponsiveImage.astro with WebP/JPEG fallback
- [ ] T021 Create slug generation utility in src/lib/slug-generator.ts to convert Vietnamese names to URL-safe slugs
- [ ] T022 Set up Git pre-commit hooks with Husky for ESLint and Prettier validation
- [ ] T023 Create .env.example file with environment variable templates (SITE_URL, PUBLIC_GOOGLE_ANALYTICS_ID)

**Phase 2 Complete**: Core infrastructure ready for all user stories.

**Validation Checkpoint**:
- ✅ `npm run dev` starts development server
- ✅ `npm run build` compiles without errors
- ✅ Content Collections schema validates successfully
- ✅ Base layout renders with correct responsive breakpoints

---

## Phase 3: User Story 1 - Browse Street Food Information (P1) [MVP]

**User Story**: As a food enthusiast or tourist, I want to discover Vietnamese street food items so I can learn about traditional dishes, see what they look like, and understand their cultural significance.

**Goal**: Deliver core browsing experience with 20 food items, random discovery, and detailed information pages.

**Duration**: 3-4 days

**Independent Test Criteria**:
- ✅ Home page displays random 6 food items with images and descriptions
- ✅ Clicking a food item navigates to detail page
- ✅ Detail page shows comprehensive information (materials, cooking methods, cultural history)
- ✅ Content loads asynchronously without full page reloads
- ✅ Mobile FCP <1.8s, LCP <2.5s (Lighthouse mobile 90+)
- ✅ WCAG 2.1 AA compliance verified

### Content Preparation

- [ ] T024 [P] [US1] Create Vietnamese food item content file for Bánh mì in src/content/foods/vi/banh-mi.md with complete YAML frontmatter
- [ ] T025 [P] [US1] Create Vietnamese food item content file for Phở in src/content/foods/vi/pho.md
- [ ] T026 [P] [US1] Create Vietnamese food item content files for 18 additional foods (total 20) in src/content/foods/vi/
- [ ] T027 [P] [US1] Add high-quality food images (800×600+ pixels) to public/images/[slug]/ directories for all 20 food items
- [ ] T028 [P] [US1] Optimize all food images using sharp to generate WebP versions with JPEG fallbacks

### Components

- [ ] T029 [P] [US1] Create Header component in src/components/layout/Header.astro with navigation and language switcher placeholder
- [ ] T030 [P] [US1] Create Footer component in src/components/layout/Footer.astro with copyright and links
- [ ] T031 [P] [US1] Create Navigation component in src/components/layout/Navigation.astro with mobile-first menu (44×44px touch targets)
- [ ] T032 [P] [US1] Create FoodCard component in src/components/ui/FoodCard.astro for displaying food items in grid with image, name, description
- [ ] T033 [US1] Create FoodDetailLayout in src/layouts/FoodDetailLayout.astro extending BaseLayout with SEO meta tags

### Pages & Routing

- [ ] T034 [US1] Create home page in src/pages/index.astro with random 6-item selection logic
- [ ] T035 [US1] Create dynamic food detail page in src/pages/[slug].astro using getStaticPaths() to generate routes for all Vietnamese food items
- [ ] T036 [US1] Implement asynchronous content loading using Astro's built-in partial hydration with View Transitions API
- [ ] T037 [US1] Create 404 error page in src/pages/404.astro

### Utilities & Logic

- [ ] T038 [P] [US1] Create random selection utility in src/lib/random-selection.ts to pick 6 items from food collection
- [ ] T039 [P] [US1] Create content query helpers in src/lib/content-queries.ts to fetch food items by slug, category, or province

### Testing & Validation

- [ ] T040 [US1] Write Playwright E2E test in tests/e2e/browsing.spec.ts to verify home page displays 6 random items
- [ ] T041 [US1] Write Playwright E2E test to verify clicking food card navigates to detail page
- [ ] T042 [US1] Write Playwright E2E test to verify detail page displays complete information (ingredients, cooking method, cultural history)
- [ ] T043 [US1] Write accessibility test in tests/accessibility/wcag.spec.ts using @axe-core/playwright to validate WCAG 2.1 AA compliance
- [ ] T044 [US1] Configure Lighthouse CI in .github/workflows/lighthouse-ci.yml with mobile 90+ and desktop 95+ thresholds
- [ ] T045 [US1] Run Lighthouse CI locally and verify mobile FCP <1.8s, LCP <2.5s, TTI <3.8s

### Deployment

- [ ] T046 [US1] Create GitHub Actions workflow in .github/workflows/build-deploy.yml for automated GitHub Pages deployment
- [ ] T047 [US1] Deploy MVP to GitHub Pages and verify production build performance

**Phase 3 Complete**: MVP READY - Users can browse 20 Vietnamese street food items with complete information.

**Deployment Checkpoint**: ✅ MVP can be deployed to production at this point.

---

## Phase 4: User Story 5 - Browse by Province Using Interactive Map (P1)

**User Story**: As a user interested in regional Vietnamese cuisine, I want to explore street food by selecting provinces on an interactive map of Vietnam so I can discover foods specific to each region.

**Goal**: Add interactive Vietnam province map with clickable boundaries for geographic food discovery.

**Duration**: 2-3 days

**Independent Test Criteria**:
- ✅ Home page displays interactive Vietnam map with 34 province boundaries
- ✅ Clicking a province filters food list to show only associated foods
- ✅ Province selection updates food list without full page reload
- ✅ Mobile touch interactions work correctly (tap to select)
- ✅ Map works offline with self-hosted GeoJSON data

### Data Acquisition

- [ ] T048 [US5] Download Vietnam province boundaries GeoJSON data from geoBoundaries (Admin Level 1)
- [ ] T049 [US5] Simplify GeoJSON using Mapshaper to reduce file size to <500 KB while preserving boundary accuracy
- [ ] T050 [US5] Add multi-language province names (vi, en, zh, ja, ko) to GeoJSON properties in src/data/provinces.geojson
- [ ] T051 [US5] Associate food items with provinces by adding province arrays to YAML frontmatter in src/content/foods/vi/*.md

### Components

- [ ] T052 [P] [US5] Install Leaflet.js library (npm install leaflet) for GeoJSON rendering
- [ ] T053 [US5] Create VietnamMap component in src/components/map/VietnamMap.astro with Leaflet integration
- [ ] T054 [US5] Create ProvinceLayer component in src/components/map/ProvinceLayer.astro for styling and click handling
- [ ] T055 [US5] Implement province selection state management using Astro islands with client:load directive

### Integration

- [ ] T056 [US5] Add VietnamMap component to home page (src/pages/index.astro) below random food selection
- [ ] T057 [US5] Create province filtering utility in src/lib/province-filter.ts to filter foods by selected province
- [ ] T058 [US5] Update home page to display filtered food list when province is selected
- [ ] T059 [US5] Handle provinces with no associated foods with appropriate messaging

### Testing

- [ ] T060 [US5] Write Playwright E2E test in tests/e2e/province-map.spec.ts to verify map renders with 34 provinces
- [ ] T061 [US5] Write Playwright E2E test to verify clicking province filters food list correctly
- [ ] T062 [US5] Write Playwright E2E test to verify map works on mobile viewport with touch interactions

**Phase 4 Complete**: Users can discover foods by province using interactive map.

---

## Phase 5: User Story 3 - Access Multi-Language Content (P2)

**User Story**: As an international user or Vietnamese learner, I want to view content in my preferred language so I can understand the information regardless of my Vietnamese language proficiency.

**Goal**: Support 5 languages (vi, en, zh, ja, ko) with language-prefixed URLs and language switching UI.

**Duration**: 3-4 days

**Independent Test Criteria**:
- ✅ All 20 food items have translations in 5 languages (100 content files)
- ✅ Language-prefixed URLs work (/vi/banh-mi.html, /en/banh-mi.html, etc.)
- ✅ Language switcher allows changing language while preserving current food item
- ✅ hreflang tags present for SEO optimization
- ✅ Vietnamese is default fallback when translation unavailable

### Content Translation

- [ ] T063 [P] [US3] Translate all 20 food items to English in src/content/foods/en/*.md with same slugs as Vietnamese originals
- [ ] T064 [P] [US3] Translate all 20 food items to Chinese in src/content/foods/zh/*.md
- [ ] T065 [P] [US3] Translate all 20 food items to Japanese in src/content/foods/ja/*.md
- [ ] T066 [P] [US3] Translate all 20 food items to Korean in src/content/foods/ko/*.md
- [ ] T067 [US3] Submit all translations for native speaker verification per Constitution v1.1.0 Principle V (P1 blocking gate)

### Routing & i18n Infrastructure

- [ ] T068 [US3] Update Content Collections schema in src/content/config.ts to validate lang field (enum: vi, en, zh, ja, ko)
- [ ] T069 [US3] Create language-prefixed dynamic routes in src/pages/[lang]/[slug].astro
- [ ] T070 [US3] Update getStaticPaths() to generate all language + slug combinations (20 foods × 5 languages = 100 pages)
- [ ] T071 [US3] Create i18n utility functions in src/i18n/utils.ts (getLocalizedStrings, slugify)
- [ ] T072 [P] [US3] Create UI translation files in src/i18n/locales/{vi,en,zh,ja,ko}.json with common strings

### Language Switching

- [ ] T073 [US3] Create LanguageSwitcher component in src/components/ui/LanguageSwitcher.astro with dropdown menu
- [ ] T074 [US3] Implement language switching logic to navigate to equivalent food page in selected language
- [ ] T075 [US3] Add LanguageSwitcher to Header component (src/components/layout/Header.astro)

### SEO Optimization

- [ ] T076 [US3] Add hreflang tags to FoodDetailLayout (src/layouts/FoodDetailLayout.astro) for all language variants
- [ ] T077 [US3] Add canonical URL and x-default hreflang (Vietnamese) to layout
- [ ] T078 [US3] Add Open Graph locale and alternate locale meta tags

### Testing

- [ ] T079 [US3] Write Playwright E2E test to verify all 5 language versions of a food item are accessible via URLs
- [ ] T080 [US3] Write Playwright E2E test to verify language switcher navigates to correct language variant
- [ ] T081 [US3] Write Playwright E2E test to verify default fallback to Vietnamese when translation unavailable

**Phase 5 Complete**: Users can access content in 5 languages with proper SEO optimization.

---

## Phase 6: User Story 6 - Discover Time-Appropriate Foods (P2)

**User Story**: As a user planning meals or curious about eating traditions, I want to see which foods are typically eaten at different times of day so I can experience Vietnamese street food authentically.

**Goal**: Display time-based food suggestions based on user's local time.

**Duration**: 1-2 days

**Independent Test Criteria**:
- ✅ Home page displays "Bây giờ ăn gì?" message with time-appropriate foods
- ✅ Food detail pages show eating time information
- ✅ Time filtering works based on current device time
- ✅ Foods marked as "anytime" appear in all time periods

### Data Enhancement

- [ ] T082 [P] [US6] Add eatingTime arrays to YAML frontmatter for all 20 food items in src/content/foods/vi/*.md
- [ ] T083 [P] [US6] Update eatingTime translations in language variants (en, zh, ja, ko)

### Utilities

- [ ] T084 [US6] Create eating time utility in src/lib/eating-time.ts with getCurrentEatingTime() function
- [ ] T085 [US6] Create time filtering utility in src/lib/eating-time.ts with filterFoodsByEatingTime() function
- [ ] T086 [P] [US6] Create eating time definitions with localized labels in src/lib/eating-time.ts

### Components & Integration

- [ ] T087 [US6] Create TimeBasedSuggestion component in src/components/ui/TimeBasedSuggestion.astro
- [ ] T088 [US6] Add time-based section to home page (src/pages/index.astro) with "Bây giờ ăn gì?" heading
- [ ] T089 [US6] Display filtered foods based on current time using client:load directive for dynamic time detection
- [ ] T090 [US6] Add eating time information to food detail page template (src/pages/[lang]/[slug].astro)

### Testing

- [ ] T091 [US6] Write unit tests in tests/unit/eating-time.test.ts to verify time period calculation (morning, afternoon, evening, night)
- [ ] T092 [US6] Write Playwright E2E test to verify time-based suggestions display on home page
- [ ] T093 [US6] Write Playwright E2E test to verify eating time information displays on food detail pages

**Phase 6 Complete**: Users can discover time-appropriate foods based on Vietnamese eating customs.

---

## Phase 7: User Story 8 - Experience Visually Adaptive Food Presentations (P2)

**User Story**: As a user exploring Vietnamese street food, I want each food's presentation to visually reflect its characteristics and show me the proper way to enjoy it.

**Goal**: Implement dynamic theme colors, adaptive UI templates, and consumption guidance.

**Duration**: 3-4 days

**Independent Test Criteria**:
- ✅ Food detail pages have unique theme colors extracted from food images
- ✅ All themes pass WCAG 2.1 AA contrast validation (4.5:1 normal text)
- ✅ Different consumption methods (takeaway, dine-in, street-side) use distinct templates
- ✅ Consumption guidance displays as inline cards with step-by-step instructions
- ✅ Fallback color palette used when extraction fails

### Data Preparation

- [ ] T094 [P] [US8] Add consumptionMethod field to YAML frontmatter for all food items (takeaway, dine-in, street-side, mixed)
- [ ] T095 [P] [US8] Add consumptionGuidance step-by-step arrays to YAML frontmatter for 75% of food items (SC-025)
- [ ] T096 [P] [US8] Add popularityRank field to YAML frontmatter for top 10 food items
- [ ] T097 [P] [US8] Add category field to YAML frontmatter for fallback color palette mapping (grilled, fresh, fried, noodle, rice, dessert, beverage)
- [ ] T098 [P] [US8] Create fallback color palette JSON in src/data/fallback-colors.json with category-based colors

### Color Extraction & WCAG Validation

- [ ] T099 [US8] Create color extraction utility in src/lib/color-extraction.ts using sharp to extract dominant colors from food images
- [ ] T100 [US8] Create WCAG validator utility in src/lib/wcag-validator.ts to calculate contrast ratios
- [ ] T101 [US8] Implement color adjustment algorithm in src/lib/wcag-validator.ts to shift colors to nearest WCAG-compliant shade
- [ ] T102 [US8] Create theme generator in src/lib/theme-generator.ts to orchestrate extraction, validation, and fallback logic

### Adaptive UI Templates

- [ ] T103 [P] [US8] Create ConsumptionMethodTemplate component in src/components/adaptive/ConsumptionMethodTemplate.astro with 4 layout variants
- [ ] T104 [P] [US8] Create ThemeProvider component in src/components/adaptive/ThemeProvider.astro to apply CSS custom properties for dynamic colors
- [ ] T105 [P] [US8] Create ConsumptionGuidance component in src/components/adaptive/ConsumptionGuidance.astro with inline card layout
- [ ] T106 [P] [US8] Create PopularityRank component in src/components/ui/PopularityRank.astro with visual badges (trophy, medal, star)

### Integration

- [ ] T107 [US8] Update food detail page (src/pages/[lang]/[slug].astro) to run theme generation at build time
- [ ] T108 [US8] Apply dynamic theme colors using Astro's define:vars directive in food detail page
- [ ] T109 [US8] Integrate ConsumptionMethodTemplate based on food's consumptionMethod field
- [ ] T110 [US8] Add ConsumptionGuidance component after main food description
- [ ] T111 [US8] Add PopularityRank badge to page header or hero section

### Testing & Validation

- [ ] T112 [US8] Write unit tests in tests/unit/color-extraction.test.ts to verify color extraction from sample images
- [ ] T113 [US8] Write unit tests in tests/unit/wcag-validator.test.ts to verify contrast ratio calculations
- [ ] T114 [US8] Write accessibility test to verify all generated themes pass WCAG 2.1 AA (4.5:1 normal text, 3:1 large text)
- [ ] T115 [US8] Validate that all 20 food items generate accessible themes (manual visual review + automated testing)

**Phase 7 Complete**: Users experience visually distinct, culturally authentic food presentations with consumption guidance.

---

## Phase 8: User Story 2 - Discover Where to Find Food (P2)

**User Story**: As a user interested in trying a specific street food, I want to find locations where it's sold so I can purchase or experience it.

**Goal**: Display geographic and online source information for food items.

**Duration**: 1 day

**Independent Test Criteria**:
- ✅ Food detail pages show regions/areas where food is found
- ✅ Online retailers/delivery services displayed if available
- ✅ Cities, districts, markets listed for physical locations
- ✅ Clear messaging when location data unavailable

### Data Enhancement

- [ ] T116 [P] [US2] Add location information to YAML frontmatter for all food items (regions, cities, markets)
- [ ] T117 [P] [US2] Add online source information to YAML frontmatter where available (retailers, delivery platforms)

### Components

- [ ] T118 [US2] Create LocationInfo component in src/components/ui/LocationInfo.astro to display geographic information
- [ ] T119 [US2] Create OnlineSource component in src/components/ui/OnlineSource.astro to display purchase options

### Integration

- [ ] T120 [US2] Add LocationInfo and OnlineSource components to food detail page (src/pages/[lang]/[slug].astro)
- [ ] T121 [US2] Handle missing location data gracefully with "Information coming soon" message

**Phase 8 Complete**: Users can find where to purchase or experience street food items.

---

## Phase 9: User Story 7 - Access Content Offline (P2)

**User Story**: As a user who may have unreliable internet connectivity, I want to access previously viewed content offline.

**Goal**: Implement Service Worker for offline caching with 200 MB quota enforcement.

**Duration**: 2-3 days

**Independent Test Criteria**:
- ✅ Previously viewed food pages accessible offline
- ✅ Non-cached content shows clear "requires connection" message
- ✅ Cache refreshes on app launch when online
- ✅ Cache size stays under 200 MB limit
- ✅ Service Worker installed and activated successfully

### Service Worker Implementation

- [ ] T122 [US7] Create Service Worker in src/sw.js with Workbox precaching configuration
- [ ] T123 [US7] Configure stale-while-revalidate caching strategy for food pages in src/sw.js
- [ ] T124 [US7] Configure cache-first strategy for images with 200 MB quota enforcement in src/sw.js
- [ ] T125 [US7] Configure cache-first strategy for GeoJSON with long TTL (1 year) in src/sw.js
- [ ] T126 [US7] Implement cache size tracking and LRU eviction logic in src/sw.js
- [ ] T127 [US7] Create workbox-config.js for build-time Service Worker generation

### Client-Side Registration

- [ ] T128 [US7] Create ServiceWorkerRegister component in src/components/ServiceWorkerRegister.astro
- [ ] T129 [US7] Add Service Worker registration to BaseLayout (src/layouts/BaseLayout.astro)
- [ ] T130 [US7] Implement update check on app launch with 5-minute interval
- [ ] T131 [US7] Create offline fallback page in src/pages/offline.astro

### Testing

- [ ] T132 [US7] Write Playwright E2E test in tests/e2e/offline.spec.ts to verify offline access to cached pages
- [ ] T133 [US7] Write Playwright E2E test to verify non-cached content shows offline message
- [ ] T134 [US7] Write test to verify Service Worker installs and activates correctly

**Phase 9 Complete**: Users can access previously viewed content offline with intelligent caching.

---

## Phase 10: User Story 4 - Connect with Social Media Content (P3)

**User Story**: As a user wanting deeper engagement, I want to see related social media content.

**Goal**: Integrate YouTube, Facebook, TikTok, and X (Twitter) links/embeds.

**Duration**: 1-2 days

**Independent Test Criteria**:
- ✅ Social media links display for 60% of food items (SC-006)
- ✅ Embedded or linked content shows for YouTube, Facebook, TikTok, X
- ✅ Graceful failure when social media unavailable
- ✅ Progressive enhancement (works without JavaScript)

### Data Enhancement

- [ ] T135 [P] [US4] Add socialMedia object to YAML frontmatter for 60% of food items (12 out of 20)
- [ ] T136 [P] [US4] Add YouTube, Facebook, TikTok, X URLs to socialMedia objects

### Components

- [ ] T137 [US4] Create SocialMediaIntegration component in src/components/ui/SocialMediaIntegration.astro
- [ ] T138 [US4] Implement progressive enhancement: links by default, optional embeds with client:visible
- [ ] T139 [US4] Handle missing social media content with "Content may be added in the future" message

### Integration

- [ ] T140 [US4] Add SocialMediaIntegration component to food detail page after consumption guidance
- [ ] T141 [US4] Ensure social media embeds lazy-load to maintain performance budget

### Testing

- [ ] T142 [US4] Write Playwright E2E test to verify social media links display and open correctly
- [ ] T143 [US4] Verify social media integration doesn't break offline functionality

**Phase 10 Complete**: Users can access community content and cooking demonstrations.

---

## Phase 11: Polish & Cross-Cutting Concerns

**Goal**: Final optimizations, analytics integration, accessibility audit, and deployment readiness.

**Duration**: 2-3 days

### Analytics & Observability

- [ ] T144 [P] Configure Google Analytics in BaseLayout (src/layouts/BaseLayout.astro) using PUBLIC_GOOGLE_ANALYTICS_ID
- [ ] T145 [P] Add custom events for food item views, province clicks, language switches
- [ ] T146 [P] Verify analytics tracking in development and production environments

### Accessibility Audit

- [ ] T147 Run comprehensive accessibility audit using axe DevTools on all 20 food detail pages
- [ ] T148 Fix any WCAG 2.1 AA violations found in audit
- [ ] T149 Test keyboard navigation on all interactive elements (map, language switcher, navigation)
- [ ] T150 Test screen reader support using NVDA/JAWS for critical user flows

### Performance Optimization

- [ ] T151 Run Lighthouse CI on production build and verify mobile 90+, desktop 95+ scores
- [ ] T152 Optimize JavaScript bundle size to <150 KB gzipped (current: check with `npm run build -- --verbose`)
- [ ] T153 Verify critical CSS inlined to <14 KB
- [ ] T154 Test mobile performance on real devices (iOS Safari, Chrome Mobile, Samsung Internet)

### Content Quality

- [ ] T155 Verify all 20 food items meet 80% completeness standard (SC-004: images, ingredients, cooking methods)
- [ ] T156 Submit P1 content for Vietnamese food culture expert review per Constitution Principle V
- [ ] T157 Submit all language translations for native speaker verification

### Documentation

- [ ] T158 [P] Update CLAUDE.md with final technology stack and commands
- [ ] T159 [P] Create CONTRIBUTING.md with content authoring guidelines and review process
- [ ] T160 [P] Document deployment process in quickstart.md

### Final Deployment

- [ ] T161 Create production GitHub Actions workflow in .github/workflows/build-deploy.yml with Lighthouse CI gates
- [ ] T162 Create pre-commit validation workflow in .github/workflows/pre-commit.yml for ESLint/Prettier
- [ ] T163 Create accessibility validation workflow in .github/workflows/accessibility.yml for automated WCAG testing
- [ ] T164 Deploy to GitHub Pages and verify all features work in production
- [ ] T165 Test production build on multiple devices and browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

**Phase 11 Complete**: Platform polished, validated, and production-ready.

---

## Summary by User Story

| User Story | Priority | Task Count | Duration | Deployable? |
|------------|----------|------------|----------|-------------|
| Setup (Phase 1) | - | 9 | 1-2 hours | No |
| Foundational (Phase 2) | - | 14 | 1-2 days | No |
| **US1: Browse Food** | **P1** | **23** | **3-4 days** | **✅ MVP** |
| US5: Province Map | P1 | 15 | 2-3 days | ✅ Yes |
| US3: Multi-Language | P2 | 19 | 3-4 days | ✅ Yes |
| US6: Time-Based | P2 | 12 | 1-2 days | ✅ Yes |
| US8: Adaptive UI | P2 | 22 | 3-4 days | ✅ Yes |
| US2: Location Info | P2 | 6 | 1 day | ✅ Yes |
| US7: Offline Access | P2 | 13 | 2-3 days | ✅ Yes |
| US4: Social Media | P3 | 9 | 1-2 days | ✅ Yes |
| Polish (Phase 11) | - | 22 | 2-3 days | ✅ Final |
| **TOTAL** | - | **165** | **12-15 days** | - |

---

## Parallel Execution Examples

### Example 1: Single Developer (Sequential)
```
Week 1: Phase 1 + Phase 2 + Phase 3 (MVP complete)
Week 2: Phase 4 + Phase 5
Week 3: Phase 6 + Phase 7 + Phase 8 + Phase 9
Week 4: Phase 10 + Phase 11
```

### Example 2: Two Developers (Parallel)
```
Developer A: Phase 1 → Phase 2 → Phase 3 (US1) → Phase 5 (US3) → Phase 7 (US8)
Developer B: Waits for Phase 2 → Phase 4 (US5) → Phase 6 (US6) → Phase 8 (US2) + Phase 9 (US7) → Phase 10 (US4)
Both: Phase 11 (Polish)

Timeline: ~8-10 days
```

### Example 3: Three Developers (Maximum Parallelization)
```
Developer A: Phase 1 → Phase 2 → Phase 3 (US1) → Phase 6 (US6) → Phase 9 (US7)
Developer B: Waits for Phase 2 → Phase 4 (US5) → Phase 5 (US3) → Phase 10 (US4)
Developer C: Waits for Phase 2 → Phase 7 (US8) → Phase 8 (US2)
All: Phase 11 (Polish)

Timeline: ~6-8 days
```

---

## Task Validation Checklist

✅ **Format Compliance**:
- [x] All tasks use `- [ ] [TaskID] [P?] [Story?] Description with file path` format
- [x] Task IDs are sequential (T001-T165)
- [x] [P] marker only on parallelizable tasks (different files, no dependencies)
- [x] [US1-US8] labels present on all user story tasks (Phases 3-10)
- [x] File paths are absolute and specific

✅ **Organization**:
- [x] Tasks organized by user story priority (P1 → P2 → P3)
- [x] Phase 2 (Foundational) clearly marked as BLOCKING
- [x] Each user story has independent test criteria
- [x] Dependencies documented in phase graph

✅ **Completeness**:
- [x] MVP scope clearly defined (Phase 1 + 2 + 3)
- [x] Each user story maps to functional requirements
- [x] All entities from data-model.md covered
- [x] All technical decisions from research.md implemented

✅ **Testability**:
- [x] Each user story has test tasks (E2E, accessibility, unit)
- [x] Success criteria measurable
- [x] Independent test criteria defined per story

---

**Tasks Generation Complete**: 165 tasks across 11 phases, organized by user story priority with clear MVP scope and parallel execution opportunities.

**Next Steps**:
1. Review and approve task breakdown
2. Begin Phase 1 (Setup) - ~1-2 hours
3. Complete Phase 2 (Foundational) - BLOCKING for all stories
4. Deliver MVP (Phase 3 - US1) - First deployable increment
5. Iterate through remaining user stories in priority order
