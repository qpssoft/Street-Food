# Data Model: Vietnamese Street Food Discovery Platform

**Feature**: Vietnamese Street Food Discovery Platform
**Branch**: `001-street-food-app`
**Date**: 2026-01-08
**Phase**: Phase 1 (Design)

## Overview

This document defines the data entities, schemas, and relationships for the Vietnamese Street Food Discovery Platform. All content is stored as **Markdown files with YAML frontmatter**, managed through **Astro Content Collections** with TypeScript schema validation.

---

## Core Entities

### 1. Street Food Item

**Description**: Represents a Vietnamese street food dish with all associated metadata, multilingual content, and relationships.

**Storage**: `src/content/foods/[lang]/[slug].md`

**YAML Frontmatter Schema**:

```yaml
# Identifiers
lang: 'vi' | 'en' | 'zh' | 'ja' | 'ko'  # Language code
slug: string                             # Canonical slug (Vietnamese name, diacritics removed)

# Basic Information
name: string                             # Food name in current language
description: string                      # Brief description (1-2 sentences)

# Detailed Content
ingredients: string[]                    # List of ingredients/materials
cookingMethod: string                    # Preparation instructions
culturalHistory: string?                 # Origin story and cultural significance (optional)

# Classification
category: 'grilled' | 'fresh' | 'fried' | 'noodle' | 'rice' | 'dessert' | 'beverage'
consumptionMethod: 'takeaway' | 'dine-in' | 'street-side' | 'mixed'

# Geographic & Temporal Associations
province: string[]                       # Associated provinces (Vietnamese names)
eatingTime: ('morning' | 'afternoon' | 'evening' | 'night' | 'anytime')[]

# Visual Assets
image: string                            # Relative path to primary image (e.g., 'main.jpg')
imageAlt: string                         # Alt text for accessibility

# Social Media Integration
socialMedia:
  youtube?: string                       # YouTube video URL
  facebook?: string                      # Facebook post URL
  tiktok?: string                        # TikTok video URL
  x?: string                             # X (Twitter) post URL

# Consumption Guidance
consumptionGuidance:
  - step: number                         # Step number (1, 2, 3, ...)
    instruction: string                  # Instruction text
    icon?: string                        # Icon name (optional)

# Popularity
popularityRank?: number                  # Numeric ranking (1 = most popular)
```

**Example** (`src/content/foods/vi/banh-mi.md`):

```markdown
---
lang: vi
slug: banh-mi
name: Bánh mì
description: Bánh mì Việt Nam là món ăn đường phố nổi tiếng với vỏ giòn, nhân thịt, pate, và rau sống.

ingredients:
  - Bánh mì baguette
  - Pate gan
  - Thịt nguội (chả lụa, giò)
  - Rau sống (dưa chuột, ngò)
  - Ớt, tương ớt

cookingMethod: |
  1. Nướng bánh mì cho giòn
  2. Phết pate lên bánh
  3. Xếp thịt nguội, rau sống
  4. Thêm gia vị và tương ớt

culturalHistory: |
  Bánh mì Việt Nam xuất hiện từ thời Pháp thuộc, kết hợp bánh mì baguette của Pháp với nguyên liệu Việt Nam.

category: mixed
consumptionMethod: takeaway

province:
  - Hà Nội
  - Hồ Chí Minh
  - Đà Nẵng

eatingTime:
  - morning
  - afternoon
  - evening

image: main.jpg
imageAlt: Bánh mì Việt Nam với nhân thịt và rau sống

socialMedia:
  youtube: https://www.youtube.com/watch?v=example
  facebook: https://www.facebook.com/example/posts/123

consumptionGuidance:
  - step: 1
    instruction: Cắm bánh mì bằng giấy để tránh dính tay
    icon: wrap
  - step: 2
    instruction: Ăn trong vòng 30 phút khi bánh còn giòn
    icon: clock
  - step: 3
    instruction: Thêm tương ớt theo khẩu vị
    icon: spice

popularityRank: 1
---

# Bánh mì Việt Nam

Bánh mì là một trong những món ăn đường phố phổ biến nhất tại Việt Nam, kết hợp hương vị của vỏ bánh giòn với nhân thịt đa dạng và rau sống tươi mát.

## Nguồn gốc

Bánh mì Việt Nam xuất hiện trong thời kỳ Pháp thuộc (1887-1954), khi người Pháp mang bánh mì baguette đến Việt Nam...
</markdown>
```

**TypeScript Schema** (`src/content/config.ts`):

```typescript
import { defineCollection, z } from 'astro:content';

export const collections = {
  foods: defineCollection({
    type: 'content',
    schema: z.object({
      // Identifiers
      lang: z.enum(['vi', 'en', 'zh', 'ja', 'ko']),
      slug: z.string().regex(/^[a-z0-9-]+$/), // Lowercase, alphanumeric, hyphens only

      // Basic Information
      name: z.string().min(1).max(100),
      description: z.string().min(10).max(500),

      // Detailed Content
      ingredients: z.array(z.string()).min(1),
      cookingMethod: z.string().min(10),
      culturalHistory: z.string().optional(),

      // Classification
      category: z.enum(['grilled', 'fresh', 'fried', 'noodle', 'rice', 'dessert', 'beverage']),
      consumptionMethod: z.enum(['takeaway', 'dine-in', 'street-side', 'mixed']),

      // Geographic & Temporal
      province: z.array(z.string()).min(1).max(10),
      eatingTime: z.array(z.enum(['morning', 'afternoon', 'evening', 'night', 'anytime'])).min(1),

      // Visual Assets
      image: z.string(),
      imageAlt: z.string(),

      // Social Media
      socialMedia: z.object({
        youtube: z.string().url().optional(),
        facebook: z.string().url().optional(),
        tiktok: z.string().url().optional(),
        x: z.string().url().optional(),
      }).optional(),

      // Consumption Guidance
      consumptionGuidance: z.array(z.object({
        step: z.number().int().positive(),
        instruction: z.string(),
        icon: z.string().optional(),
      })).optional(),

      // Popularity
      popularityRank: z.number().int().positive().optional(),
    }),
  }),
};
```

**Validation Rules**:
- `slug`: Must be lowercase, alphanumeric with hyphens (URL-safe)
- `name`: 1-100 characters
- `description`: 10-500 characters (brief summary)
- `ingredients`: At least 1 ingredient required
- `province`: 1-10 provinces (reasonable limit)
- `eatingTime`: At least 1 time period required
- `consumptionGuidance.step`: Positive integers only

**Relationships**:
- **Many-to-Many with Province**: One food can be associated with multiple provinces
- **Many-to-Many with Eating Time**: One food can be eaten at multiple times
- **One-to-One with Category**: Each food belongs to exactly one category
- **One-to-Many Language Variants**: Same `slug` across different `lang` values

**File Naming Convention**:
```
src/content/foods/[lang]/[slug].md

Examples:
- src/content/foods/vi/banh-mi.md
- src/content/foods/en/banh-mi.md
- src/content/foods/zh/banh-mi.md
```

**Computed Properties** (generated at build time):
```typescript
interface ComputedFood {
  // Base from YAML frontmatter
  ...frontmatter,

  // Computed at build time
  themeColor: string;                   // Extracted from image via sharp
  wcagCompliant: boolean;               // WCAG 2.1 AA validation result
  adjustedThemeColor?: string;          // Auto-adjusted if not compliant
  fallbackColorUsed: boolean;           // True if extraction failed
  url: string;                          // `/${lang}/${slug}.html`
  alternateLanguages: LanguageVariant[]; // All language variants for hreflang
}

interface LanguageVariant {
  lang: string;
  url: string;
}
```

---

### 2. Province

**Description**: Represents a Vietnamese province or city (34 total as of 2025 administrative reform).

**Storage**: `src/data/provinces.geojson` (GeoJSON format with properties)

**GeoJSON Structure**:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": "VNM-HN",
        "name_vi": "Hà Nội",
        "name_en": "Hanoi",
        "name_zh": "河内",
        "name_ja": "ハノイ",
        "name_ko": "하노이",
        "capital": true,
        "population": 8246600,
        "region": "Northern Vietnam"
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

**Properties Schema**:
- `id`: Unique identifier (ISO 3166-2:VN code or custom)
- `name_vi`: Vietnamese name (with diacritics)
- `name_en`: English name
- `name_zh`: Chinese name
- `name_ja`: Japanese name
- `name_ko`: Korean name
- `capital`: Boolean (true for Hanoi)
- `population`: Integer (latest census data)
- `region`: String ("Northern", "Central", "Southern Vietnam")
- `geometry`: GeoJSON Polygon or MultiPolygon

**Relationships**:
- **Many-to-Many with Street Food Item**: Provinces can have multiple foods; foods can be in multiple provinces

---

### 3. Eating Time

**Description**: Time-of-day categories with defined hour ranges for time-based food recommendations.

**Storage**: Hardcoded in application logic (not database/file)

**Definition**:

```typescript
enum EatingTimePeriod {
  MORNING = 'morning',     // 5:00 - 10:00
  AFTERNOON = 'afternoon', // 10:00 - 15:00
  EVENING = 'evening',     // 15:00 - 21:00
  NIGHT = 'night',         // 21:00 - 5:00
  ANYTIME = 'anytime',     // All day
}

interface EatingTimeDefinition {
  id: EatingTimePeriod;
  label: Record<Language, string>; // Localized labels
  startHour: number;                // 24-hour format (0-23)
  endHour: number;                  // 24-hour format (0-23)
  wrapsMidnight: boolean;           // True for night period
  icon: string;                     // Icon name
}

const eatingTimeDefinitions: EatingTimeDefinition[] = [
  {
    id: 'morning',
    label: {
      vi: 'Buổi sáng',
      en: 'Morning',
      zh: '早上',
      ja: '朝',
      ko: '아침',
    },
    startHour: 5,
    endHour: 10,
    wrapsMidnight: false,
    icon: 'sunrise',
  },
  {
    id: 'afternoon',
    label: {
      vi: 'Buổi chiều',
      en: 'Afternoon',
      zh: '下午',
      ja: '午後',
      ko: '오후',
    },
    startHour: 10,
    endHour: 15,
    wrapsMidnight: false,
    icon: 'sun',
  },
  {
    id: 'evening',
    label: {
      vi: 'Buổi tối',
      en: 'Evening',
      zh: '晚上',
      ja: '夕方',
      ko: '저녁',
    },
    startHour: 15,
    endHour: 21,
    wrapsMidnight: false,
    icon: 'sunset',
  },
  {
    id: 'night',
    label: {
      vi: 'Đêm',
      en: 'Night',
      zh: '夜晚',
      ja: '夜',
      ko: '밤',
    },
    startHour: 21,
    endHour: 5, // Next day
    wrapsMidnight: true,
    icon: 'moon',
  },
  {
    id: 'anytime',
    label: {
      vi: 'Bất kỳ lúc nào',
      en: 'Anytime',
      zh: '任何时间',
      ja: 'いつでも',
      ko: '언제든지',
    },
    startHour: 0,
    endHour: 24,
    wrapsMidnight: false,
    icon: 'clock',
  },
];
```

**Utility Functions**:

```typescript
function getCurrentEatingTime(date: Date = new Date()): EatingTimePeriod {
  const hour = date.getHours();

  if (hour >= 5 && hour < 10) return EatingTimePeriod.MORNING;
  if (hour >= 10 && hour < 15) return EatingTimePeriod.AFTERNOON;
  if (hour >= 15 && hour < 21) return EatingTimePeriod.EVENING;
  return EatingTimePeriod.NIGHT; // 21:00 - 5:00
}

function filterFoodsByEatingTime(
  foods: StreetFoodItem[],
  period: EatingTimePeriod
): StreetFoodItem[] {
  return foods.filter(food =>
    food.eatingTime.includes(period) ||
    food.eatingTime.includes(EatingTimePeriod.ANYTIME)
  );
}
```

**Relationships**:
- **Many-to-Many with Street Food Item**: Foods can be eaten at multiple times; each time period has multiple foods

---

### 4. Consumption Method

**Description**: Categorizes how food is typically consumed, affecting UI template selection.

**Storage**: Enum in TypeScript, stored in YAML frontmatter of food items

**Definition**:

```typescript
enum ConsumptionMethod {
  TAKEAWAY = 'takeaway',     // Portable, eat while walking
  DINE_IN = 'dine-in',       // Sit at table, requires utensils
  STREET_SIDE = 'street-side', // Standing/sitting on small stools
  MIXED = 'mixed',           // Multiple valid methods
}

interface ConsumptionMethodDefinition {
  id: ConsumptionMethod;
  label: Record<Language, string>;
  description: string;
  templateVariant: string; // CSS class or template name
  portability: 'high' | 'medium' | 'low';
  requiresUtensils: boolean;
  typicalSetting: string;
}

const consumptionMethodDefinitions: ConsumptionMethodDefinition[] = [
  {
    id: 'takeaway',
    label: {
      vi: 'Mang đi',
      en: 'Takeaway',
      zh: '外带',
      ja: 'テイクアウト',
      ko: '테이크아웃',
    },
    description: 'Portable food, eaten while walking or on-the-go',
    templateVariant: 'template-takeaway',
    portability: 'high',
    requiresUtensils: false,
    typicalSetting: 'Street vendors, wrapped in paper/banana leaves',
  },
  {
    id: 'dine-in',
    label: {
      vi: 'Ăn tại chỗ',
      en: 'Dine-in',
      zh: '堂食',
      ja: '店内',
      ko: '매장식사',
    },
    description: 'Sit at table, requires utensils (chopsticks, spoon)',
    templateVariant: 'template-dine-in',
    portability: 'low',
    requiresUtensils: true,
    typicalSetting: 'Restaurants, food courts, sit-down street stalls',
  },
  {
    id: 'street-side',
    label: {
      vi: 'Ăn vỉa hè',
      en: 'Street-side',
      zh: '路边',
      ja: '路上',
      ko: '길거리',
    },
    description: 'Standing or sitting on small stools at roadside',
    templateVariant: 'template-street-side',
    portability: 'medium',
    requiresUtensils: true,
    typicalSetting: 'Low plastic stools, street vendors with portable kitchens',
  },
  {
    id: 'mixed',
    label: {
      vi: 'Hỗn hợp',
      en: 'Mixed',
      zh: '混合',
      ja: 'ミックス',
      ko: '혼합',
    },
    description: 'Can be consumed in multiple ways (takeaway + dine-in)',
    templateVariant: 'template-mixed',
    portability: 'medium',
    requiresUtensils: false,
    typicalSetting: 'Flexible - available in multiple formats',
  },
];
```

**Template Adaptation** (70% consistent, 30% adaptive):

```typescript
interface TemplateLayout {
  core: CoreLayoutComponents;     // 70% consistent
  adaptive: AdaptiveContentSections; // 30% variable
}

interface CoreLayoutComponents {
  header: true;   // Always present
  navigation: true;
  footer: true;
  languageSwitcher: true;
  provinceFilter: true;
}

interface AdaptiveContentSections {
  heroImageTreatment: 'full-bleed' | 'contained' | 'split';
  consumptionGuidanceLayout: 'inline-cards' | 'sidebar' | 'collapsible';
  popularityRankPosition: 'header' | 'hero' | 'sidebar';
  socialMediaPlacement: 'after-content' | 'sidebar' | 'footer';
}

const templateAdaptations: Record<ConsumptionMethod, AdaptiveContentSections> = {
  takeaway: {
    heroImageTreatment: 'full-bleed', // Emphasize portability
    consumptionGuidanceLayout: 'inline-cards', // Quick steps
    popularityRankPosition: 'header', // High visibility
    socialMediaPlacement: 'footer', // Secondary
  },
  'dine-in': {
    heroImageTreatment: 'contained', // Table setting context
    consumptionGuidanceLayout: 'sidebar', // Detailed instructions
    popularityRankPosition: 'hero', // Integrated into image
    socialMediaPlacement: 'after-content', // Engage diners
  },
  'street-side': {
    heroImageTreatment: 'split', // Show food + environment
    consumptionGuidanceLayout: 'collapsible', // Optional details
    popularityRankPosition: 'header', // Traditional significance
    socialMediaPlacement: 'sidebar', // Cultural videos
  },
  mixed: {
    heroImageTreatment: 'contained', // Balanced approach
    consumptionGuidanceLayout: 'inline-cards', // Multiple methods
    popularityRankPosition: 'header', // Standard placement
    socialMediaPlacement: 'after-content', // Standard placement
  },
};
```

**Relationships**:
- **One-to-One with Street Food Item**: Each food has exactly one consumption method

---

### 5. UI Theme Configuration

**Description**: Stores visual presentation attributes for dynamic theming.

**Storage**: Computed at build time, embedded in static HTML/CSS via CSS custom properties

**Schema**:

```typescript
interface UIThemeConfiguration {
  // Color Extraction Results
  extractedColor: string | null;        // Hex color from image (or null if failed)
  wcagCompliant: boolean;                // WCAG 2.1 AA validation result
  adjustedColor: string | null;          // Auto-adjusted color (if needed)
  fallbackCategoryColor: string | null;  // Category-based fallback (if extraction failed)
  finalThemeColor: string;               // Final color used in UI

  // Contrast Validation
  normalTextContrast: number;            // Contrast ratio for normal text
  largeTextContrast: number;             // Contrast ratio for large text
  contrastHistory: ContrastAdjustment[]; // Adjustment attempts

  // Template Configuration
  consumptionMethod: ConsumptionMethod;
  templateVariant: string;               // CSS class name
  layoutAdaptations: AdaptiveContentSections;
}

interface ContrastAdjustment {
  attempt: number;
  color: string;
  contrastRatio: number;
  passed: boolean;
}
```

**Build-Time Generation** (`src/lib/theme-generator.ts`):

```typescript
import { extractDominantColor } from './color-extraction';
import { checkWCAGContrast, getAccessibleColor } from './wcag-validator';
import fallbackColors from '../data/fallback-colors.json';

export async function generateThemeConfig(
  food: StreetFoodItem
): Promise<UIThemeConfiguration> {
  const imagePath = `./public/images/${food.slug}/${food.image}`;
  let extractedColor: string | null = null;
  let wcagCompliant = false;
  let adjustedColor: string | null = null;
  let fallbackCategoryColor: string | null = null;
  const contrastHistory: ContrastAdjustment[] = [];

  // Attempt color extraction
  try {
    const extracted = await extractDominantColor(imagePath);
    extractedColor = extracted.primary;

    // Validate WCAG contrast
    const wcagCheck = checkWCAGContrast(extractedColor, '#ffffff');
    wcagCompliant = wcagCheck.normalText;

    contrastHistory.push({
      attempt: 1,
      color: extractedColor,
      contrastRatio: wcagCheck.ratio,
      passed: wcagCompliant,
    });

    if (!wcagCompliant) {
      // Auto-adjust to compliant shade
      adjustedColor = getAccessibleColor(extractedColor, '#ffffff', 4.5);
      const adjustedCheck = checkWCAGContrast(adjustedColor, '#ffffff');

      contrastHistory.push({
        attempt: 2,
        color: adjustedColor,
        contrastRatio: adjustedCheck.ratio,
        passed: adjustedCheck.normalText,
      });
    }
  } catch (error) {
    console.warn(`Color extraction failed for ${food.slug}, using fallback`);
  }

  // Fallback to category-based color if extraction failed
  if (!extractedColor) {
    const category = food.category || 'default';
    fallbackCategoryColor = fallbackColors[category]?.primary || fallbackColors.default.primary;
  }

  // Determine final theme color
  const finalThemeColor = adjustedColor || extractedColor || fallbackCategoryColor!;

  // Get template adaptations
  const layoutAdaptations = templateAdaptations[food.consumptionMethod];

  return {
    extractedColor,
    wcagCompliant,
    adjustedColor,
    fallbackCategoryColor,
    finalThemeColor,
    normalTextContrast: wcagCompliant ? contrastHistory[0].contrastRatio : contrastHistory[1]?.contrastRatio || 0,
    largeTextContrast: wcagCompliant ? contrastHistory[0].contrastRatio : contrastHistory[1]?.contrastRatio || 0,
    contrastHistory,
    consumptionMethod: food.consumptionMethod,
    templateVariant: consumptionMethodDefinitions.find(m => m.id === food.consumptionMethod)!.templateVariant,
    layoutAdaptations,
  };
}
```

**CSS Integration** (embedded in static HTML):

```astro
---
const themeConfig = await generateThemeConfig(food);
---

<style define:vars={{
  themeColor: themeConfig.finalThemeColor,
  themeVariant: themeConfig.templateVariant,
}}>
  .food-detail {
    --theme-primary: var(--themeColor);
    --theme-light: color-mix(in srgb, var(--theme-primary) 20%, white);
    --theme-dark: color-mix(in srgb, var(--theme-primary) 80%, black);
  }

  .food-detail.template-takeaway {
    /* Takeaway-specific styles */
  }

  .food-detail.template-dine-in {
    /* Dine-in-specific styles */
  }
</style>
```

**Relationships**:
- **One-to-One with Street Food Item**: Each food has exactly one theme configuration

---

### 6. Food Category

**Description**: Classification system for fallback color palette mapping.

**Storage**: Hardcoded enum, referenced in fallback-colors.json

**Definition**:

```typescript
enum FoodCategory {
  GRILLED = 'grilled',
  FRESH = 'fresh',
  FRIED = 'fried',
  NOODLE = 'noodle',
  RICE = 'rice',
  DESSERT = 'dessert',
  BEVERAGE = 'beverage',
}

interface CategoryColorPalette {
  category: FoodCategory;
  primary: string;   // Hex color
  accent: string;    // Hex color
  description: string;
  tonality: 'warm' | 'cool' | 'neutral';
}

const categoryPalettes: CategoryColorPalette[] = [
  {
    category: 'grilled',
    primary: '#8B4513', // Saddle Brown
    accent: '#D2691E',  // Chocolate
    description: 'Warm brown tones for grilled meats',
    tonality: 'warm',
  },
  {
    category: 'fresh',
    primary: '#2E8B57', // Sea Green
    accent: '#3CB371',  // Medium Sea Green
    description: 'Cool green tones for fresh vegetables/herbs',
    tonality: 'cool',
  },
  {
    category: 'fried',
    primary: '#DAA520', // Goldenrod
    accent: '#FFD700',  // Gold
    description: 'Golden amber tones for fried foods',
    tonality: 'warm',
  },
  {
    category: 'noodle',
    primary: '#8B7355', // Burlywood4
    accent: '#A0826D',  // Tan
    description: 'Neutral earth tones for noodle dishes',
    tonality: 'neutral',
  },
  {
    category: 'rice',
    primary: '#F5DEB3', // Wheat
    accent: '#DEB887',  // Burlywood
    description: 'Wheat/beige tones for rice dishes',
    tonality: 'neutral',
  },
  {
    category: 'dessert',
    primary: '#FFB6C1', // Light Pink
    accent: '#FFC0CB',  // Pink
    description: 'Pastel sweet tones for desserts',
    tonality: 'cool',
  },
  {
    category: 'beverage',
    primary: '#4682B4', // Steel Blue
    accent: '#5F9EA0',  // Cadet Blue
    description: 'Refreshing blue tones for beverages',
    tonality: 'cool',
  },
];
```

**Relationships**:
- **One-to-Many with Street Food Item**: Each category can have multiple foods
- **One-to-One with UI Theme Configuration**: Each theme uses one category for fallback

---

### 7. Popularity Rank

**Description**: Numeric ranking of food items based on defined criteria.

**Storage**: Stored in YAML frontmatter `popularityRank` field

**Schema**:

```typescript
interface PopularityRank {
  rank: number;                    // Numeric rank (1 = most popular)
  displayFormat: 'badge' | 'stars' | 'number';
  label: Record<Language, string>; // Localized display text
}

interface PopularityMetrics {
  views: number;                   // Page views (from Google Analytics)
  socialMentions: number;          // Social media mentions count
  traditionalSignificance: number; // Expert rating (1-10)
  weightedScore: number;           // Combined score
}

function calculatePopularityRank(metrics: PopularityMetrics): number {
  // Weighted scoring algorithm
  const viewsWeight = 0.4;
  const socialWeight = 0.3;
  const traditionalWeight = 0.3;

  const weightedScore =
    (metrics.views * viewsWeight) +
    (metrics.socialMentions * socialWeight) +
    (metrics.traditionalSignificance * 10 * traditionalWeight);

  return weightedScore;
}

function getPopularityDisplayLabel(
  rank: number,
  lang: Language
): string {
  if (rank === 1) {
    return {
      vi: '#1 Phổ biến nhất',
      en: '#1 Most Popular',
      zh: '#1 最受欢迎',
      ja: '#1 最も人気',
      ko: '#1 가장 인기',
    }[lang];
  }

  if (rank <= 10) {
    return {
      vi: `Top ${rank} Truyền thống`,
      en: `Top ${rank} Traditional`,
      zh: `前${rank}名传统`,
      ja: `トップ${rank}伝統`,
      ko: `상위 ${rank} 전통`,
    }[lang];
  }

  return {
    vi: `#${rank}`,
    en: `#${rank}`,
    zh: `#${rank}`,
    ja: `#${rank}`,
    ko: `#${rank}`,
  }[lang];
}
```

**Visual Indicators**:

```typescript
interface PopularityBadge {
  rank: number;
  icon: string;                    // Icon name (star, medal, trophy)
  color: string;                   // Hex color
  position: 'header' | 'hero' | 'sidebar';
}

function getPopularityBadge(rank: number): PopularityBadge {
  if (rank === 1) {
    return {
      rank,
      icon: 'trophy',
      color: '#FFD700', // Gold
      position: 'header',
    };
  }

  if (rank <= 5) {
    return {
      rank,
      icon: 'medal',
      color: '#C0C0C0', // Silver
      position: 'header',
    };
  }

  if (rank <= 10) {
    return {
      rank,
      icon: 'star',
      color: '#CD7F32', // Bronze
      position: 'hero',
    };
  }

  return {
    rank,
    icon: 'trending',
    color: '#6B7280', // Gray
    position: 'sidebar',
  };
}
```

**Relationships**:
- **One-to-One with Street Food Item**: Each food has at most one popularity rank

---

### 8. Consumption Guidance

**Description**: Step-by-step instructions for proper enjoyment of food.

**Storage**: Array in YAML frontmatter `consumptionGuidance` field

**Schema**:

```typescript
interface ConsumptionGuidanceStep {
  step: number;        // Sequential step number (1, 2, 3, ...)
  instruction: string; // Instruction text
  icon?: string;       // Optional icon name
}

type ConsumptionGuidance = ConsumptionGuidanceStep[];
```

**Icon Mapping**:

```typescript
const consumptionIcons: Record<string, string> = {
  wrap: '🌯',         // Wrapping food
  unwrap: '📦',       // Unwrapping
  spice: '🌶️',        // Adding spice/sauce
  utensils: '🥢',     // Using chopsticks/utensils
  fold: '🔁',         // Folding
  bite: '😋',         // Taking a bite
  drink: '🥤',        // Drinking beverage
  clock: '⏰',        // Timing consideration
  temperature: '🔥',  // Temperature note
  share: '👥',        // Sharing etiquette
};
```

**Display Format** (inline cards):

```astro
---
const { consumptionGuidance } = food;
---

{consumptionGuidance && consumptionGuidance.length > 0 && (
  <section class="consumption-guidance">
    <h2>How to Enjoy</h2>
    <ol class="guidance-steps">
      {consumptionGuidance.map(({ step, instruction, icon }) => (
        <li class="guidance-step">
          {icon && <span class="step-icon" aria-hidden="true">{consumptionIcons[icon]}</span>}
          <div class="step-content">
            <span class="step-number">Step {step}</span>
            <p class="step-instruction">{instruction}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
)}
```

**Relationships**:
- **One-to-Many with Street Food Item**: Each food can have multiple guidance steps

---

### 9. Offline Cache Entry

**Description**: Represents cached content for offline access.

**Storage**: Browser Cache API (managed by Service Worker)

**Schema** (Service Worker cache metadata):

```typescript
interface OfflineCacheEntry {
  url: string;                     // Cached resource URL
  cachedAt: number;                // Timestamp (Unix epoch)
  version: string;                 // Content version identifier (e.g., git commit hash)
  size: number;                    // Bytes
  type: 'page' | 'image' | 'asset' | 'geojson';
  expires: number;                 // Expiration timestamp
  priority: 'critical' | 'high' | 'medium' | 'low';
  accessCount: number;             // Number of times accessed (for LRU)
  lastAccessed: number;            // Last access timestamp
}

interface CacheManifest {
  entries: OfflineCacheEntry[];
  totalSize: number;               // Total cache size in bytes
  maxSize: number;                 // 200 MB limit
  lastUpdated: number;             // Last cache update timestamp
}
```

**Cache Management Logic**:

```typescript
async function addToCacheWithQuota(
  url: string,
  response: Response,
  metadata: Partial<OfflineCacheEntry>
): Promise<void> {
  const cache = await caches.open('food-pages');
  const manifest = await getCacheManifest();

  // Check quota
  if (manifest.totalSize >= manifest.maxSize) {
    // Evict low-priority, least-recently-used entries
    await evictLRUEntries(manifest.maxSize * 0.2); // Free up 20%
  }

  // Clone response to read size
  const clonedResponse = response.clone();
  const blob = await clonedResponse.blob();
  const size = blob.size;

  // Store in cache
  await cache.put(url, response);

  // Update manifest
  const entry: OfflineCacheEntry = {
    url,
    cachedAt: Date.now(),
    version: metadata.version || 'unknown',
    size,
    type: metadata.type || 'page',
    expires: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
    priority: metadata.priority || 'medium',
    accessCount: 0,
    lastAccessed: Date.now(),
  };

  manifest.entries.push(entry);
  manifest.totalSize += size;
  await saveCacheManifest(manifest);
}

async function evictLRUEntries(targetBytes: number): Promise<void> {
  const cache = await caches.open('food-pages');
  const manifest = await getCacheManifest();

  // Sort by last accessed (ascending) and priority (low first)
  const sortedEntries = manifest.entries.sort((a, b) => {
    if (a.priority !== b.priority) {
      const priorityOrder = { low: 0, medium: 1, high: 2, critical: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return a.lastAccessed - b.lastAccessed;
  });

  let freedBytes = 0;
  const toEvict: string[] = [];

  for (const entry of sortedEntries) {
    if (entry.priority === 'critical') break; // Never evict critical
    if (freedBytes >= targetBytes) break;

    toEvict.push(entry.url);
    freedBytes += entry.size;
  }

  // Evict entries
  for (const url of toEvict) {
    await cache.delete(url);
    manifest.entries = manifest.entries.filter(e => e.url !== url);
    manifest.totalSize -= manifest.entries.find(e => e.url === url)?.size || 0;
  }

  await saveCacheManifest(manifest);
}
```

**Relationships**:
- **Many-to-One with Street Food Item**: Each food page can be cached as an offline entry

---

## Entity Relationships Diagram

```
┌─────────────────────┐        ┌──────────────────┐
│  Street Food Item   │◄──────►│  Province        │
│  (Markdown + YAML)  │        │  (GeoJSON)       │
└─────────────────────┘        └──────────────────┘
         │ 1                            ▲
         │                              │
         │ n                            │ n
         ▼                              │
┌─────────────────────┐                 │
│   Eating Time       │                 │
│   (Enum)            │                 │
└─────────────────────┘                 │
         │ n                            │
         │                              │
         │ 1                            │
         ▼                              │
┌─────────────────────┐        ┌──────────────────┐
│ Consumption Method  │───────►│  Food Category   │
│   (Enum)            │   1:1  │  (Enum)          │
└─────────────────────┘        └──────────────────┘
         │ 1                            │ 1
         │                              │
         ▼                              ▼
┌─────────────────────┐        ┌──────────────────┐
│ UI Theme Config     │───────►│ Fallback Colors  │
│ (Build-time)        │  uses  │ (JSON)           │
└─────────────────────┘        └──────────────────┘
         │ 1
         │
         ▼
┌─────────────────────┐
│ Popularity Rank     │
│ (YAML field)        │
└─────────────────────┘
         │ 1
         │
         ▼
┌─────────────────────┐
│Consumption Guidance │
│ (YAML array)        │
└─────────────────────┘
         │ n
         │
         ▼
┌─────────────────────┐
│Offline Cache Entry  │
│(Service Worker Cache│
└─────────────────────┘
```

---

## Implementation Notes

### Content Authoring Workflow

1. **Create Vietnamese Original**:
   ```bash
   touch src/content/foods/vi/banh-mi.md
   ```

2. **Fill YAML Frontmatter** (schema-validated):
   - All required fields (name, description, ingredients, etc.)
   - Vietnamese diacritics preserved
   - Slug derived from Vietnamese name

3. **Write Markdown Content**:
   - Cultural history, detailed preparation
   - Markdown formatting for readability

4. **Generate Translations** (4 languages):
   - Copy to `/en/`, `/zh/`, `/ja/`, `/ko/`
   - Translate content, preserve slug
   - Native speaker verification (P1 blocking gate)

5. **Add Image Assets**:
   ```bash
   public/images/banh-mi/main.jpg
   ```

6. **Build & Validate**:
   ```bash
   npm run build  # Astro validates schema, generates static pages
   ```

### Validation Rules

**Build-Time Validation** (Astro Content Collections):
- Schema type checking (Zod)
- Required field validation
- Enum value validation
- URL format validation

**Pre-Commit Validation** (Git hooks):
- YAML syntax check
- Image file existence check
- Minimum content completeness (80% per SC-004)

**CI/CD Validation**:
- Lighthouse CI (Core Web Vitals)
- WCAG 2.1 AA accessibility tests
- Broken link detection

---

## Performance Considerations

### Build Time

**Expected Build Duration**:
- 20 foods × 5 languages = 100 Markdown files
- Color extraction: ~0.5s per food = 10s total
- Image optimization: ~1s per image = 20s total
- Page generation: ~0.5s per page = 50s total
- **Total**: ~2-3 minutes

### Runtime Performance

**Page Load** (static HTML):
- No database queries
- All data embedded in HTML
- CSS custom properties for dynamic themes
- Instant rendering

**Offline Cache**:
- First visit: Download pages as viewed
- Subsequent visits: Serve from cache (instant)
- Background sync: Update stale cache entries

---

## Summary

All data entities are defined with:
- ✅ Clear schemas (TypeScript + Zod validation)
- ✅ Storage strategy (Markdown + YAML frontmatter, GeoJSON)
- ✅ Relationships mapped
- ✅ Validation rules
- ✅ Build-time generation logic
- ✅ Performance considerations

**Next Step**: Generate contracts (YAML frontmatter schema example files)
