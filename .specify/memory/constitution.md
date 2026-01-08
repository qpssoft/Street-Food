<!--
═══════════════════════════════════════════════════════════════════════════════
SYNC IMPACT REPORT
═══════════════════════════════════════════════════════════════════════════════
Constitution Version: 1.0.0 → 1.1.0
Ratified: 2026-01-08
Last Modified: 2026-01-08

VERSION BUMP: MINOR (1.0.0 → 1.1.0)
Rationale: Added new sections (Code Quality Standards, UX Consistency), materially
expanded mobile-first performance requirements, and mandated GitHub Pages hosting.
No breaking changes to existing principles.

AFFECTED TEMPLATES:
- .specify/templates/spec-template.md ✓ (User stories, success criteria, requirements)
- .specify/templates/plan-template.md ✓ (Technical context, constitution check gates)
- .specify/templates/tasks-template.md ✓ (Task organization, testing approach)

MODIFIED PRINCIPLES:
- IV. Performance Budget: Enhanced mobile-first focus, stricter mobile targets
- Deployment: Changed from "any CDN or static host" to MANDATORY GitHub Pages
- Testing & Quality Assurance: Expanded with mobile-specific testing requirements

ADDED SECTIONS:
- VIII. Code Quality Standards (NEW): ESLint, Prettier, code review requirements
- IX. User Experience Consistency (NEW): Mobile-first design, touch targets, responsive breakpoints
- Mobile-First Testing: Device testing requirements, mobile performance budgets

KEY PRINCIPLES (UPDATED):
1. Content-First Architecture: Markdown + YAML frontmatter, static site generation
2. Progressive Web Experience: Core content first, offline-first caching strategy
3. Accessibility & Inclusivity: WCAG 2.1 Level AA (NON-NEGOTIABLE)
4. Performance Budget (MOBILE-FIRST): <2s page load on mobile, <1s filtering (NON-NEGOTIABLE)
5. Cultural Authenticity: Vietnamese culinary traditions, accurate translations
6. Simplicity & Iteration: 80% completeness at launch, YAGNI principles
7. Adaptive User Experience: Dynamic themes, consumption method templates
8. Code Quality Standards: ESLint, Prettier, code review gates (NEW)
9. User Experience Consistency: Mobile-first, touch targets 44x44px minimum (NEW)

GOVERNANCE:
- All feature specifications must align with these principles
- Performance budgets (mobile-first) and accessibility standards are non-negotiable
- GitHub Pages is the ONLY approved hosting platform
- Code quality gates MUST pass before merge
- Simplicity over complexity unless justified
- Constitution supersedes all other practices

═══════════════════════════════════════════════════════════════════════════════
-->

# Vietnamese Street Food Discovery Platform Constitution

## Core Principles

### I. Content-First Architecture

The platform is built on static, version-controlled content as the single source of truth.

**Requirements**:
- All food content MUST be stored in Markdown files with YAML frontmatter
- Content structure MUST be human-readable and git-friendly
- Static site generation MUST produce deployable HTML/CSS/JS without runtime compilation
- Content versioning MUST be managed through git history
- No database runtime - all data transformations happen at build time
- Content schema MUST be validated before site generation
- Markdown files MUST include: food name, description, materials, cooking methods, regions, images, eating times, consumption methods, social media links

**Rationale**: Enables simple hosting, version control, easy content updates by non-developers, and eliminates backend infrastructure complexity.

---

### II. Progressive Web Experience

Deliver core content first, then progressively enhance with advanced features.

**Requirements**:
- Core content (food information, images, descriptions) MUST load and be readable without JavaScript
- Progressive enhancement MUST add: filtering, time-based suggestions, offline caching, dynamic themes
- Offline-first strategy MUST cache critical content (up to 200 MB maximum)
- Service Worker MUST implement intelligent caching: prioritize frequently accessed food items, respect 200 MB limit, provide cache management UI
- Content updates MUST be checked on every app launch/visit when online
- Cache refresh MUST complete within 5 seconds when updates are available
- Asynchronous loading MUST be used for navigation (no full page reloads after initial load)
- Fallback experiences MUST degrade gracefully when JavaScript is unavailable

**Rationale**: Ensures accessibility across varying network conditions, respects device storage limits, and provides reliable offline access for users in low-connectivity environments.

---

### III. Accessibility & Inclusivity (NON-NEGOTIABLE)

Universal access to Vietnamese street food knowledge is a fundamental right of this platform.

**Requirements**:
- WCAG 2.1 Level AA compliance is MANDATORY for all pages and features
- Color contrast MUST meet minimum ratios: 4.5:1 for normal text, 3:1 for large text
- Dynamic theme colors MUST be validated against WCAG contrast requirements; fallback to category-based default palettes (warm tones for grilled, cool tones for fresh) if extraction fails
- Information MUST NEVER rely solely on color - always include text labels, icons, or patterns
- Keyboard navigation MUST support all interactive elements
- Screen reader support MUST provide meaningful labels and ARIA attributes
- Multi-language support MUST include: Vietnamese (primary default), English, Chinese, Japanese, Korean
- All images MUST include descriptive alt text in all supported languages
- No authentication barriers - universal free access to all content
- Text MUST be resizable up to 200% without loss of functionality
- Focus indicators MUST be clearly visible for keyboard navigation

**Rationale**: Ensures the platform serves all users regardless of ability, language, or technology access. Accessibility is not optional - it's foundational to the platform's mission of democratizing Vietnamese culinary knowledge.

---

### IV. Performance Budget (NON-NEGOTIABLE, MOBILE-FIRST)

Fast performance on mobile devices is the primary focus. Mobile users on limited data plans and lower-end devices are the primary audience.

**Mobile-First Measurable Targets (PRIMARY)**:
- Initial page load MUST complete in under 2 seconds on mobile 4G connection
- First Contentful Paint (FCP) MUST be under 1.8 seconds on mobile
- Largest Contentful Paint (LCP) MUST be under 2.5 seconds on mobile
- Time to Interactive (TTI) MUST be under 3.8 seconds on mobile
- Food filtering operations MUST complete in under 1 second on mobile devices
- Time-based food suggestions MUST render within 500ms on mobile
- Touch interactions MUST respond within 100ms (perceived instant)
- Cache refresh MUST complete within 5 seconds on mobile networks
- Images MUST be optimized: minimum 800x600px resolution, modern formats (WebP with JPEG fallback)
- Total JavaScript bundle MUST be under 150 KB (gzipped) - mobile networks prioritized
- Critical CSS MUST be inlined (< 14 KB), non-critical CSS lazy-loaded
- Lighthouse Performance score MUST be 90+ on mobile (primary) and 95+ on desktop
- Offline cache size MUST NOT exceed 200 MB (mobile storage constraints)

**Desktop Targets (SECONDARY)**:
- Initial page load MUST complete in under 1.5 seconds on desktop
- Food filtering MUST complete in under 750ms on desktop
- Lighthouse Performance score MUST be 95+ on desktop

**Enforcement**:
- Performance budgets MUST be tested in CI/CD pipeline with MOBILE FIRST
- Lighthouse CI MUST run on every pull request (mobile score is blocking)
- Performance regressions on mobile MUST block deployment
- Real-user monitoring via Google Analytics MUST track actual load times on mobile devices
- Mobile device testing REQUIRED on at least 3 different devices before release

**Rationale**: Mobile users on limited data plans and lower-end devices are primary audience. Fast load times on mobile directly impact SEO, user retention, and accessibility in bandwidth-constrained environments. Mobile performance is non-negotiable.

---

### V. Cultural Authenticity

Respect and accurately represent Vietnamese culinary traditions and cultural context.

**Requirements**:
- Food names MUST use proper Vietnamese diacritics and romanization
- Cultural history and regional variations MUST be researched and fact-checked
- Translations MUST be culturally appropriate, not literal machine translations
- Eating customs and consumption guidance MUST reflect authentic Vietnamese practices
- Regional variations MUST acknowledge 34 provinces/cities administrative divisions (as of 2025)
- Social media content MUST link to credible Vietnamese food sources
- Recipe steps MUST reflect traditional preparation methods
- Content tone MUST be educational and respectful, avoiding exoticization

**Quality Standards**:
- Food content MUST be reviewed by Vietnamese food culture experts before publishing
- Translation accuracy MUST be verified by native speakers for each supported language
- Regional information MUST cite authoritative sources
- 80% content completeness at launch (as defined in SC-004: name, description, materials, cooking methods, regions, images, eating times)
- Iterative improvement to 100% completeness post-launch

**Rationale**: The platform serves as an educational resource - accuracy and cultural sensitivity are non-negotiable for credibility and respect toward Vietnamese culinary heritage.

---

### VI. Simplicity & Iteration

Start simple, deliver value early, iterate based on real usage data.

**Development Philosophy**:
- Launch with 20 food items at 80% completeness minimum (not 100% perfection)
- YAGNI (You Aren't Gonna Need It) - implement only specified features, no speculative additions
- Avoid over-engineering: use static site generation instead of complex backend systems
- No user accounts, authentication, or database runtime - keep architecture minimal
- No complex build processes initially - simple static file deployment to GitHub Pages
- Adaptive UI features (dynamic themes, consumption method templates) MUST maintain 70% consistent core layout
- Modern browsers only (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+) - no legacy browser support
- Mobile browsers MUST be primary testing target (iOS Safari, Chrome Mobile, Samsung Internet)

**Iteration Strategy**:
- Launch with P1 user stories (core browsing experience)
- Add P2/P3 features based on Google Analytics data and user feedback
- Content expansion prioritized by user search patterns and page views (mobile analytics prioritized)
- Performance optimizations driven by real-user monitoring data from mobile devices
- Complexity MUST be justified against user value and maintenance burden

**Rationale**: Faster time-to-value, reduced development risk, data-driven feature prioritization, and sustainable maintenance overhead.

---

### VII. Adaptive User Experience

UI adapts contextually based on food characteristics while maintaining accessibility and brand consistency.

**Requirements**:
- Dynamic theme colors MUST be extracted from food images using dominant color algorithms
- Color extraction failures MUST fallback to category-based palettes (warm/cool tones)
- All dynamic colors MUST pass WCAG 2.1 Level AA contrast validation
- Consumption method templates MUST maintain 70% consistent layout (navigation, header, footer)
- Consumption method templates MUST adapt 30% content sections (takeaway, dine-in, street-side contexts)
- Consumption guidance MUST display as step-by-step inline cards with icons
- Consumption guidance MUST be positioned after main description, before social media content
- Popularity rankings MUST use visual indicators (stars/badges) + numeric display (e.g., "#3 Most Popular")
- Popularity display MUST integrate into page header/hero section without overwhelming content
- Eating time periods MUST support multiple associations per food item
- Eating time filters MUST display: Morning (5-10), Afternoon (10-15), Evening (15-21), Night (21-5)

**Rationale**: Enhances user engagement through contextually relevant presentation while maintaining usability, accessibility, and brand identity across all food types.

---

### VIII. Code Quality Standards (NON-NEGOTIABLE)

Maintain high code quality through automated tooling and consistent standards.

**Code Style & Linting**:
- ESLint MUST be configured and enforced for all JavaScript/TypeScript code
- Prettier MUST be used for consistent code formatting across the codebase
- Pre-commit hooks MUST run ESLint and Prettier before allowing commits
- No ESLint errors allowed - warnings SHOULD be fixed but don't block commits
- Code MUST pass linting checks in CI/CD pipeline before merge

**Code Review Requirements**:
- All pull requests MUST be reviewed by at least one other developer
- Code reviews MUST verify compliance with constitutional principles
- Code reviews MUST check for security vulnerabilities (XSS, injection, etc.)
- No direct commits to main branch - all changes via pull requests
- Pull requests with failing tests MUST NOT be merged

**Documentation Standards**:
- All complex functions MUST include JSDoc comments explaining purpose, parameters, and return values
- README files MUST be maintained for each major component/directory
- API changes MUST be documented in CHANGELOG.md
- Breaking changes MUST include migration guides

**Rationale**: Consistent code quality reduces bugs, improves maintainability, and ensures team velocity remains high as the project grows.

---

### IX. User Experience Consistency (MOBILE-FIRST)

Deliver consistent, intuitive experiences across all devices with mobile as the primary focus.

**Mobile-First Design Requirements**:
- All designs MUST be created for mobile viewports first (320px-428px width)
- Touch targets MUST be minimum 44x44 pixels (iOS guidelines) or 48x48 pixels (Android guidelines)
- Interactive elements MUST have visible tap/click states with appropriate feedback
- Text MUST be readable without zooming (minimum 16px base font size on mobile)
- Forms MUST use appropriate input types for mobile keyboards (tel, email, number, etc.)
- Scrollable areas MUST have momentum scrolling on iOS (webkit-overflow-scrolling: touch)
- Navigation MUST be thumb-friendly on mobile devices (bottom navigation preferred)

**Responsive Breakpoints**:
- Mobile: 320px - 767px (PRIMARY TARGET)
- Tablet: 768px - 1023px
- Desktop: 1024px+ (SECONDARY TARGET)
- All breakpoints MUST be tested on real devices, not just browser dev tools

**Interaction Patterns**:
- Swipe gestures SHOULD be used for mobile navigation where appropriate
- Loading states MUST provide visual feedback within 100ms
- Error messages MUST be clear, actionable, and positioned near the relevant input
- Success confirmations MUST be visible but non-intrusive
- Modals/overlays MUST be dismissible with back button on mobile

**Visual Consistency**:
- 70% of layout MUST remain consistent across consumption method templates
- Brand colors, typography, and spacing MUST be consistent across all pages
- Icons MUST use consistent visual style (outline vs. filled)
- Animations MUST respect prefers-reduced-motion user preferences

**Rationale**: Mobile-first design ensures the best experience for the majority of users. Consistent UX patterns reduce cognitive load and improve task completion rates.

---

## Testing & Quality Assurance

### Testing Requirements

**Mandatory Tests (MOBILE-FIRST)**:
- Content validation: YAML frontmatter schema validation before build
- Accessibility testing: Automated WCAG 2.1 Level AA checks via axe-core or pa11y (mobile and desktop)
- Performance testing: Lighthouse CI on every pull request (mobile score 90+ REQUIRED, desktop 95+ REQUIRED)
- Mobile device testing: Test on at least 3 physical devices (iOS Safari, Chrome Mobile, Samsung Internet)
- Visual regression testing: Ensure adaptive UI changes don't break layouts on mobile and desktop
- Multi-language testing: Verify all content renders correctly in all 5 supported languages on mobile devices
- Offline functionality testing: Service Worker cache behavior validation on mobile networks
- Browser compatibility testing: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ (automated via BrowserStack or similar)
- Touch interaction testing: Verify all interactive elements work correctly with touch input
- Responsive design testing: Verify layout integrity across all breakpoints (320px, 375px, 428px, 768px, 1024px, 1440px)

**Mobile-Specific Testing**:
- Test on slow 3G networks (throttled) to verify performance under constraints
- Test with different device pixel ratios (1x, 2x, 3x)
- Test in landscape and portrait orientations
- Test with different system font sizes (accessibility settings)
- Test with battery saver mode enabled (reduced animations, limited processing)

**Optional Tests** (implement if time permits):
- Unit tests for JavaScript utilities (color extraction, filtering logic)
- Integration tests for Service Worker update flows
- User acceptance testing for cultural authenticity (expert review)
- A/B testing for UX improvements

**Testing Workflow**:
- Content authors MUST validate Markdown files locally before committing
- CI pipeline MUST run accessibility, performance, and content validation checks with MOBILE FIRST
- Pull requests MUST NOT be merged if mobile tests fail
- Manual review REQUIRED for cultural content accuracy
- Google Analytics MUST track real-world performance metrics post-deployment (mobile prioritized)

---

## Development Workflow

### Build Process
- Static site generator (e.g., 11ty, Hugo, Jekyll) MUST transform Markdown to HTML
- Build process MUST validate all content schemas before generation
- Image optimization MUST be automated during build (resize, compress, generate WebP with JPEG fallback)
- Images MUST be generated in multiple sizes for responsive srcset (320w, 640w, 1024w, 1920w)
- Multi-language builds MUST generate separate directories or routes per language
- Service Worker MUST be generated with cache manifest of critical assets
- Build output MUST be optimized for GitHub Pages deployment structure

### Deployment (MANDATORY: GITHUB PAGES)
- Platform MUST be hosted on GitHub Pages (github.io domain or custom domain via GitHub Pages)
- Static files (HTML, CSS, JS, images) MUST be deployable to GitHub Pages root or docs/ directory
- No server-side runtime required - pure static hosting via GitHub Pages
- Deployment MUST be triggered on main branch commits via GitHub Actions
- GitHub Actions workflow MUST include build, test, and deploy stages
- Staging environment SHOULD use GitHub Pages preview deployments for pre-release validation
- Custom domain (if used) MUST be configured through GitHub Pages settings with HTTPS enforced

**Rationale for GitHub Pages Requirement**: GitHub Pages provides free, reliable, high-performance hosting with global CDN, automatic HTTPS, and seamless integration with git-based content management. It enforces the simplicity principle and eliminates hosting costs.

### Content Management
- Content updates MUST be made via git commits to Markdown files
- Content authors MUST follow frontmatter schema documentation
- Content reviews MUST be conducted via pull requests
- Multi-language updates MUST include all supported languages or mark as incomplete
- Images MUST be committed to git repository or linked from external CDN (GitHub Pages compatible)

---

## Governance

### Constitution Authority
- This constitution SUPERSEDES all other development practices, style guides, or preferences
- All feature specifications MUST reference and comply with these core principles
- All implementation plans MUST include a "Constitution Check" section verifying alignment
- All pull requests MUST validate compliance with non-negotiable principles (Accessibility, Performance, Code Quality, Mobile-First)

### Amendments
- Constitution amendments REQUIRE documented rationale and impact analysis
- Amendment proposals MUST be reviewed by project stakeholders
- Breaking changes to core principles REQUIRE migration plan for existing content
- Version history MUST be maintained with clear changelog in Sync Impact Report

### Compliance Verification
- Every feature specification MUST map requirements to constitutional principles
- Implementation plans MUST document how design satisfies performance budgets (mobile-first) and accessibility standards
- Code reviews MUST verify compliance with code quality standards, simplicity philosophy, and mobile-first design
- Analytics dashboards MUST monitor real-world performance against targets (mobile metrics prioritized)
- Mobile device testing MUST be performed before each release

### Complexity Justification
- Any deviation from YAGNI principles MUST be documented in implementation plan
- Complexity MUST be justified against specific user value and constitutional principles
- Alternatives MUST be documented and rejection rationale provided
- Technical debt introduced MUST include remediation plan
- Mobile performance MUST NOT be compromised for desktop features

---

**Version**: 1.1.0 | **Ratified**: 2026-01-08 | **Last Amended**: 2026-01-08
