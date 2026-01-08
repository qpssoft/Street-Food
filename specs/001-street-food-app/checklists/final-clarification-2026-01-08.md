# Final Implementation Clarification Report: Vietnamese Street Food Discovery Platform

**Session Date**: 2026-01-08
**Focus**: Final pre-planning clarifications for implementation-ready specification
**Feature**: [spec.md](../spec.md)
**Status**: ✅ COMPLETED

## Session Overview

This final clarification session resolved the last remaining ambiguities before proceeding to implementation planning (`/speckit.plan`). The session focused on critical technical and process decisions that bridge the gap between the specification's "WHAT" and the planning phase's "HOW", ensuring alignment with Constitution v1.1.0 requirements.

## Questions & Answers

### Q1: Static Site Generator Selection

**Question**: Which static site generator should be used for GitHub Pages deployment to meet Constitution v1.1.0 performance budgets (mobile FCP <1.8s, LCP <2.5s, Lighthouse 90+)?

**Answer**: **Astro**

**Rationale**:
- Modern framework with component islands architecture (ships zero JavaScript by default, adds only what's needed)
- Excellent performance characteristics aligned with mobile-first Core Web Vitals targets
- Native support for modern image optimization (WebP, AVIF, responsive srcset)
- Built-in Markdown + YAML frontmatter support for content-first architecture
- Requires custom GitHub Actions build workflow (not Jekyll default) but provides superior performance
- Active community and strong ecosystem for progressive enhancement features

**Implementation Impact**:
- Updated assumption about build process to specify Astro
- Confirms GitHub Actions custom workflow required (Constitution deployment section already mandates this)
- Aligns with Constitution Principle I (Content-First Architecture) and Principle IV (Performance Budget)

---

### Q2: Food Item Unique Identifiers

**Question**: How should food items be uniquely identified across 5 languages and 34 provinces for URL routing and content organization?

**Answer**: **Slug-based with language prefix**

**Strategy**:
- Vietnamese name serves as canonical identifier (e.g., `banh-mi`)
- Diacritics removed, spaces replaced with hyphens for URL-safe slugs
- Language-prefixed URLs for SEO optimization:
  - `/vi/banh-mi.html` (Vietnamese)
  - `/en/banh-mi.html` (English)
  - `/zh/banh-mi.html` (Chinese)
  - `/ja/banh-mi.html` (Japanese)
  - `/ko/banh-mi.html` (Korean)
- Human-readable URLs support SEO and user sharing
- Single source of truth (Vietnamese name) with predictable routing pattern

**Implementation Impact**:
- Updated FR-005 to specify language-prefixed URL pattern with slug-based identifiers
- Updated FR-008 to define canonical slug identifier derivation from Vietnamese name
- Updated Street Food Item entity to include "canonical slug identifier" attribute
- Added assumption about slug-based routing strategy
- Aligns with Constitution Principle I (Content-First Architecture) and FR-006 (SEO optimization)

---

### Q3: Core Web Vitals Alignment

**Question**: Should the specification performance targets match Constitution v1.1.0 mobile-first Core Web Vitals (FCP <1.8s, LCP <2.5s, TTI <3.8s) or keep generic "2 seconds page load"?

**Answer**: **Update SC-002 with mobile-first Core Web Vitals**

**Rationale**:
- Constitution v1.1.0 Principle IV mandates specific mobile-first performance budgets
- Generic "2 seconds" is not testable via Lighthouse CI (which measures FCP, LCP, TTI, not total load time)
- Specification success criteria should directly align with constitutional requirements
- Mobile-first targets ensure primary audience (mobile users on limited data) gets best experience
- Provides clear, measurable targets for CI/CD pipeline validation

**Updated Success Criterion**:
- **SC-002**: Content loads asynchronously meeting mobile-first Core Web Vitals performance budgets (Constitution v1.1.0 Principle IV):
  - **Mobile 4G targets (PRIMARY)**: FCP <1.8s, LCP <2.5s, TTI <3.8s
  - **Desktop targets (SECONDARY)**: FCP <1.2s, LCP <1.8s, TTI <2.5s
  - Measured via Lighthouse CI on every pull request
  - Mobile score 90+ and desktop score 95+ required for merge

**Implementation Impact**:
- Replaced generic SC-002 with specific Core Web Vitals metrics
- Aligns specification with Constitution v1.1.0 Principle IV (Performance Budget NON-NEGOTIABLE)
- Provides testable, enforceable performance gates for CI/CD

---

### Q4: Province Boundary Data Source

**Question**: Where will the province boundary geographic data for the interactive Vietnam map come from?

**Answer**: **Hybrid approach (self-hosted GeoJSON + optional third-party basemap tiles)**

**Strategy**:
- **Self-hosted GeoJSON**: Province boundary shapes committed to git repository
  - Full control over data accuracy (34 provinces as of 2025 reform)
  - No external API dependencies for core functionality
  - Offline-compatible (critical for FR-029-FR-034)
  - Version-controlled alongside content
  - Aligns with Constitution Principle I (Content-First Architecture) and Principle VI (Simplicity)

- **Optional third-party basemap tiles**: Visual enhancement layer (e.g., Mapbox, OpenStreetMap)
  - Progressive enhancement - map works without basemap
  - Improves visual quality and user experience
  - Can be lazy-loaded to maintain performance budget
  - Graceful degradation if tiles unavailable

**Benefits**:
- Balances control (self-hosted boundaries) with quality (enhanced visuals)
- Supports offline access requirement (FR-030)
- No single point of failure - core map works without external services
- Maintains constitutional simplicity while allowing enhancement
- Static files deployable to GitHub Pages

**Implementation Impact**:
- Added clarification to Final Implementation Clarification Session
- Added assumption about hybrid GeoJSON + basemap tiles approach
- Aligns with Constitution Principle I (static content), Principle II (progressive enhancement), and Principle VI (simplicity)
- Supports FR-018 (interactive map), FR-020 (clickable provinces), FR-021 (province filtering)

---

### Q5: Cultural Authenticity Review Process

**Question**: How should the cultural authenticity review process be structured to balance Constitution v1.1.0 Principle V requirements with Simplicity & Iteration principles?

**Answer**: **Hybrid gates approach**

**Strategy**:
- **P1 Features (Core Experience)**: Pre-publish review required
  - Vietnamese food culture expert review for accuracy and cultural sensitivity
  - Native speaker translation verification for all 5 languages
  - Blocking gate - content cannot be published without approval
  - Applies to: Core food browsing (US-001), province map (US-005), fundamental food content

- **P2/P3 Features (Enhancements)**: Staged review with post-launch iteration
  - Launch with 80% completeness (SC-004 standard)
  - Expert review happens iteratively after initial publication
  - Corrections and improvements deployed continuously
  - Applies to: Time-based recommendations (US-006), offline access (US-007), social media integration (US-003)

**Rationale**:
- **Balances two constitutional principles**:
  - Principle V (Cultural Authenticity): "Food content MUST be reviewed by Vietnamese food culture experts before publishing"
  - Principle VI (Simplicity & Iteration): "Launch with 20 food items at 80% completeness minimum (not 100% perfection)"
- **Ensures core quality** while allowing **launch velocity**
- P1 features are user-facing content that defines platform credibility
- P2/P3 features are contextual enhancements that can iterate
- Aligns with existing SC-004 definition of 80% completeness at launch

**Implementation Impact**:
- Added clarification to Final Implementation Clarification Session
- Added assumption documenting hybrid gates review process
- Provides clear quality gates for content pipeline
- Balances Constitution Principle V (Cultural Authenticity) with Principle VI (Simplicity & Iteration)

---

## Specification Updates Summary

### Final Implementation Clarification Session (New Section)
Added 5 Q&A entries documenting all implementation-critical decisions:
1. Astro static site generator selection
2. Slug-based URL routing with language prefixes
3. Mobile-first Core Web Vitals alignment
4. Hybrid GeoJSON + basemap tiles for province boundaries
5. Hybrid gates cultural authenticity review process

### Success Criteria Updates
- **SC-002**: Updated from generic "under 2 seconds" to specific mobile-first Core Web Vitals:
  - Mobile: FCP <1.8s, LCP <2.5s, TTI <3.8s (PRIMARY)
  - Desktop: FCP <1.2s, LCP <1.8s, TTI <2.5s (SECONDARY)
  - Lighthouse CI enforcement: mobile 90+, desktop 95+

### Functional Requirements Updates
- **FR-005**: Enhanced with language-prefixed URL pattern using slug-based identifiers
- **FR-008**: Defined canonical slug identifier derivation from Vietnamese name

### Key Entities Updates
- **Street Food Item**: Added "canonical slug identifier (derived from Vietnamese name, e.g., `banh-mi`)" attribute

### Assumptions Updates
Added 3 new assumptions:
1. **Astro static site generator**: Build process with GitHub Actions workflow, component islands architecture, mobile performance targets
2. **Slug-based identifiers**: Vietnamese name slugified as canonical ID with language-prefixed URLs for SEO
3. **Hybrid GeoJSON + basemap tiles**: Self-hosted province boundaries with optional third-party visual enhancement
4. **Hybrid gates review**: P1 features require pre-publish expert review; P2/P3 use staged review with post-launch iteration

---

## Coverage Analysis

### ✅ Resolved Ambiguities

**Technical Architecture**:
- ✅ Static site generator choice (Astro)
- ✅ URL routing strategy (slug-based with language prefixes)
- ✅ Province boundary data source (hybrid GeoJSON + basemap tiles)
- ✅ Performance measurement approach (Core Web Vitals via Lighthouse CI)

**Content & Quality**:
- ✅ Cultural authenticity review process (hybrid gates by priority)
- ✅ Content identifier strategy (Vietnamese name as canonical slug)
- ✅ Multi-language URL structure (language-prefixed paths)

**Performance & Compliance**:
- ✅ Mobile-first performance targets (Core Web Vitals aligned to Constitution)
- ✅ Performance validation method (Lighthouse CI with blocking gates)
- ✅ Offline capability data strategy (self-hosted GeoJSON supports FR-030)

### 🔧 Deferred to Planning Phase

The following technical details are intentionally left for the planning phase (as they are implementation "HOW" not specification "WHAT"):

**Build & Deployment**:
- GitHub Actions workflow configuration details
- Astro build optimization strategies
- Image optimization pipeline specifics
- Service Worker cache strategy implementation

**Data & APIs**:
- Social media embed API integration details
- Google Analytics configuration and tracking events
- Color extraction algorithm selection
- GeoJSON data sourcing and conversion process

**UI & Components**:
- Component library selection (if any)
- Adaptive theme color algorithm implementation
- Consumption method template HTML/CSS structure
- Map rendering library choice (for GeoJSON visualization)

**Testing & Quality**:
- Lighthouse CI configuration and thresholds fine-tuning
- ESLint/Prettier rule configuration
- Accessibility testing tool selection (axe-core vs pa11y)
- Visual regression testing implementation

These implementation details are appropriate for the planning phase where technical architecture, tool selection, and development workflows are designed.

---

## Validation

### Specification Completeness
- ✅ No [NEEDS CLARIFICATION] markers remain
- ✅ All functional requirements are testable and unambiguous
- ✅ Success criteria are measurable and aligned with Constitution v1.1.0
- ✅ User stories have clear acceptance scenarios
- ✅ Edge cases are identified with resolution strategies
- ✅ Assumptions document all pre-planning decisions
- ✅ Scope is clearly bounded (In Scope vs Out of Scope)

### Constitutional Alignment
- ✅ **Principle I (Content-First Architecture)**: Astro with Markdown + YAML frontmatter, GeoJSON committed to git
- ✅ **Principle II (Progressive Web Experience)**: Hybrid basemap tiles (optional enhancement), offline-compatible core
- ✅ **Principle III (Accessibility NON-NEGOTIABLE)**: WCAG 2.1 AA enforced, SC-022 validates compliance
- ✅ **Principle IV (Performance Budget NON-NEGOTIABLE)**: SC-002 now matches mobile-first Core Web Vitals targets
- ✅ **Principle V (Cultural Authenticity)**: Hybrid gates review process balances quality with iteration
- ✅ **Principle VI (Simplicity & Iteration)**: Astro simplicity, 80% completeness launch, staged review for P2/P3
- ✅ **Principle VII (Adaptive User Experience)**: Specified in FR-039-FR-050, SC-023-SC-030
- ✅ **Principle VIII (Code Quality Standards)**: CI/CD pipeline with Lighthouse CI, ESLint/Prettier assumed
- ✅ **Principle IX (UX Consistency Mobile-First)**: SC-002 mobile-first, SC-009 mobile/desktop support

### Readiness for Planning
- ✅ All P1 features clearly defined with success criteria
- ✅ Technical foundation decisions made (Astro, slug URLs, GeoJSON)
- ✅ Performance targets quantified and testable
- ✅ Quality gates defined (hybrid review process)
- ✅ Geographic data strategy supports offline requirement
- ✅ Multi-language strategy supports SEO optimization
- ✅ Specification remains technology-agnostic where appropriate (defers HOW to planning)

---

## Recommendations

### ✅ Ready for Implementation Planning

The specification is **COMPLETE and READY** to proceed to `/speckit.plan`. All critical pre-planning ambiguities have been resolved while maintaining appropriate abstraction for the planning phase to determine implementation details.

### Planning Phase Priorities

When executing `/speckit.plan`, prioritize these implementation design areas:

**P1 - Critical Path**:
1. **Astro Project Setup**: Configure GitHub Actions build workflow for GitHub Pages deployment
2. **Content Schema**: Define YAML frontmatter structure for food items (20 items at launch per SC-001)
3. **Slug-based Routing**: Implement language-prefixed URL generation from Vietnamese canonical names
4. **Province GeoJSON**: Source, validate, and commit Vietnam province boundaries (34 provinces per 2025 reform)
5. **Mobile-First Performance**: Configure Lighthouse CI with SC-002 Core Web Vitals thresholds (mobile 90+, desktop 95+)
6. **Cultural Review Workflow**: Establish P1 pre-publish expert review gates and P2/P3 staged review process

**P2 - Foundation**:
7. **Adaptive UI System**: Design consumption method templates (takeaway, dine-in, street-side, mixed) with 70/30 consistency
8. **Color Extraction Pipeline**: Implement dynamic theme color extraction with WCAG 2.1 AA validation and category-based fallbacks
9. **Multi-Language Build**: Configure Astro to generate language-prefixed static pages for all 5 languages
10. **Offline Access**: Design Service Worker caching strategy (200 MB limit per FR-033, SC-019)

**P3 - Enhancement**:
11. **Social Media Integration**: Design embed strategy for YouTube, Facebook, TikTok, X (progressive enhancement)
12. **Time-based Recommendations**: Implement eating time filtering logic (morning/afternoon/evening/night)
13. **Interactive Map**: Select GeoJSON rendering library and integrate optional basemap tiles
14. **Google Analytics**: Configure tracking events for success criteria measurement (SC-002, SC-008, SC-025)

### Quality Assurance Focus

**Mobile-First Testing** (Constitution Principle IX):
- Test on physical devices (iOS Safari, Chrome Mobile, Samsung Internet) - not just browser dev tools
- Validate Core Web Vitals on real 4G networks (throttled)
- Verify 44x44px touch targets (iOS) / 48x48px (Android)
- Test landscape and portrait orientations

**Cultural Authenticity Validation** (Constitution Principle V):
- Establish expert reviewer pool (Vietnamese food culture specialists)
- Define native speaker verification process for 5 languages
- Create content completeness checklist (80% standard per SC-004)
- Document regional variation sources and citations

**Performance Gates** (Constitution Principle IV):
- Configure Lighthouse CI to block PRs failing mobile 90+ / desktop 95+
- Monitor Core Web Vitals in Google Analytics post-launch
- Set up performance budget alerts (150 KB JS bundle limit)
- Test offline cache efficiency (200 MB limit enforcement)

**Accessibility Compliance** (Constitution Principle III):
- Integrate automated WCAG 2.1 AA testing (axe-core or pa11y)
- Verify color contrast for all adaptive themes (4.5:1 normal, 3:1 large)
- Test keyboard navigation for all interactive elements
- Validate screen reader support with ARIA attributes

---

## Session Metrics

**Questions Asked**: 5
**Questions Answered**: 5 (100%)
**Specification Updates**: 8 sections modified
- Final Implementation Clarification Session: 5 Q&A entries added
- Success Criteria: 1 criterion updated (SC-002)
- Functional Requirements: 2 requirements enhanced (FR-005, FR-008)
- Key Entities: 1 entity updated (Street Food Item)
- Assumptions: 4 new assumptions added

**Constitutional Alignment**: 9/9 principles addressed
**Readiness Status**: ✅ **READY FOR `/speckit.plan`**

---

## Notes

This final clarification session successfully resolved all implementation-critical ambiguities while preserving the specification's technology-agnostic nature where appropriate. Key achievements:

1. **Technical Foundation Established**: Astro, slug-based routing, hybrid GeoJSON strategy, Core Web Vitals targets
2. **Quality Process Defined**: Hybrid gates review balances cultural authenticity with launch velocity
3. **Performance Quantified**: SC-002 now has testable mobile-first metrics aligned with Constitution v1.1.0
4. **Offline Capability Enabled**: Self-hosted GeoJSON supports FR-030 offline requirement
5. **SEO Optimized**: Language-prefixed slug URLs support FR-006, FR-007, SC-007
6. **Constitutional Compliance**: All 9 Constitution v1.1.0 principles validated and aligned

The specification now provides a **complete, unambiguous, testable foundation** for implementation planning. All P1 features have clear success criteria, technical decisions bridge to planning without overspecifying, and quality gates ensure constitutional compliance.

---

**Clarification Session Completed**: 2026-01-08
**Specification Version**: Implementation-Ready with Final Clarifications
**Status**: ✅ **PASSED - READY FOR `/speckit.plan`**
