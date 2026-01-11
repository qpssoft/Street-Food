# Downloaded Image Resources

Generated: 2026-01-10

## Summary

Successfully downloaded **39 images** for 5 Vietnamese food items from authentic Vietnamese food websites.

---

## 1. Bánh Mì Chả Cá (Fish Cake Sandwich)
**Folder:** `public/image/banh-mi-cha-ca/`
**Source:** https://www.bachhoaxanh.com/kinh-nghiem-hay/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-1489610
**Images:** 11 files

### Main Recipe
- `main-1.jpg` - Main finished dish
- `main-2.jpg` - Alternative presentation
- `ingredients.jpg` - Raw ingredients layout
- `prep.jpg` - Preparation steps
- `frying.jpg` - Frying the fish cakes
- `sauce.jpg` - Special lemongrass sauce

### Variant Recipe (Ốp La Style)
- `variant-main.jpg` - Fried egg variant main dish
- `variant-ingredients.jpg` - Variant ingredients
- `variant-frying.jpg` - Frying process
- `variant-prep.jpg` - Preparation steps
- `variant-final.jpg` - Final plated dish

---

## 2. Bún Chả Hà Nội (Hanoi Grilled Pork with Noodles)
**Folder:** `public/image/bun-cha-ha-noi/`
**Source:** https://www.bachhoaxanh.com/kinh-nghiem-hay/cach-lam-bun-cha-ha-noi-truyen-thong-971481
**Images:** 10 files

- `main.jpg` - Main dish presentation
- `ingredients.jpg` - Complete ingredient layout
- `cutting.jpg` - Meat cutting technique
- `marinating.jpg` - Marinating process
- `grilling-prep.jpg` - Grilling preparation
- `grilled.jpg` - Finished grilled meat
- `sauce.jpg` - Dipping sauce preparation
- `plated.jpg` - Final plated dish
- `completed.jpg` - Completed recipe shot
- `serving.jpg` - Serving suggestion

---

## 3. Gỏi Cuốn (Fresh Spring Rolls)
**Folder:** `public/image/goi-cuon/`
**Source:** https://www.bachhoaxanh.com/kinh-nghiem-hay/cach-lam-goi-cuon-thom-ngon-don-gian-963738
**Images:** 6 files

- `main.jpg` - Main finished spring rolls
- `meat-prep.jpg` - Meat preparation
- `shrimp-cooking.jpg` - Shrimp cooking process
- `vegetables.jpg` - Vegetable preparation
- `rolling.jpg` - Rolling technique demonstration
- `final-with-sauce.jpg` - Final presentation with dipping sauce

---

## 4. Cà Phê Sữa Đá (Vietnamese Iced Coffee)
**Folder:** `public/image/ca-phe-sua-da/`
**Source:** https://thecoffeeclub.com.vn/ca-phe-sua-da-thuc-uong-bieu-tuong-viet-nam
**Images:** 5 files (multiple resolutions)

- `street-cafe-1200x806.jpg` - Street café scene (1200x806)
- `street-cafe-1200x900.jpg` - Street café scene (1200x900)
- `street-cafe-1200x675.jpg` - Street café scene (1200x675)
- `street-cafe-500x500.jpg` - Street café scene (500x500)
- `street-cafe-full.jpg` - Full resolution original

**Note:** All images show Vietnamese people enjoying iced milk coffee at street-side cafés, capturing the cultural significance of the beverage.

---

## 5. Phở Bò Hà Nội (Hanoi Beef Noodle Soup)
**Folder:** `public/image/pho-bo-ha-noi/`
**Source:** https://www.bachhoaxanh.com/kinh-nghiem-hay/cach-nau-pho-bo-ha-noi-962092
**Images:** 7 files

- `intro.jpg` - Introduction/overview
- `comparison.jpg` - Hanoi vs Nam Dinh style comparison
- `raw-beef.jpg` - Raw beef phở presentation
- `main.jpg` - Main finished beef phở (Tái)
- `ingredients.jpg` - Ingredient preparation
- `broth-cooking.jpg` - Broth cooking process
- `wine-variant.jpg` - Wine-braised beef variant

---

## Image Usage Guidelines

### File Naming Convention
- `main.jpg` - Primary finished dish photo
- `ingredients.jpg` - Raw ingredients mise en place
- `[step].jpg` - Preparation/cooking steps (e.g., prep, frying, grilling)
- `variant-[name].jpg` - Alternative recipe variations
- `[description]-[resolution].jpg` - Multiple resolutions (when available)

### Recommended Usage
1. **Hero Images:** Use main.jpg files for food card headers
2. **Recipe Steps:** Use step images (prep, frying, etc.) for cooking instructions
3. **Ingredients:** Use ingredients.jpg for shopping lists or ingredient sections
4. **Variants:** Use variant-* images to show different preparation styles
5. **Responsive Images:** Use multiple resolutions for ca-phe-sua-da for different screen sizes

### Image Optimization
All images are already optimized from source (CDN-hosted):
- Format: JPEG
- Source: Bach Hoa Xanh (cdn.tgdd.vn) and The Coffee Club Vietnam
- Quality: Web-optimized for fast loading

---

## Integration Notes

### For Astro Components
```astro
---
// Example usage in Astro component
const images = {
  bunCha: '/image/bun-cha-ha-noi/main.jpg',
  goiCuon: '/image/goi-cuon/main.jpg',
  // ... etc
}
---

<img src={images.bunCha} alt="Bún Chả Hà Nội" />
```

### For Food Data Files
Update your food item data structures to reference these image paths:

```json
{
  "id": "bun-cha-ha-noi",
  "images": {
    "main": "/image/bun-cha-ha-noi/main.jpg",
    "ingredients": "/image/bun-cha-ha-noi/ingredients.jpg",
    "steps": [
      "/image/bun-cha-ha-noi/cutting.jpg",
      "/image/bun-cha-ha-noi/marinating.jpg",
      "/image/bun-cha-ha-noi/grilling-prep.jpg",
      "/image/bun-cha-ha-noi/grilled.jpg"
    ]
  }
}
```

---

## Source Attributions

### Bach Hoa Xanh (cdn.tgdd.vn)
- Bánh Mì Chả Cá images
- Bún Chả Hà Nội images
- Gỏi Cuốn images
- Phở Bò Hà Nội images

### The Coffee Club Vietnam
- Cà Phê Sữa Đá images

**Note:** All images are sourced from reputable Vietnamese food websites for authentic representation of traditional Vietnamese cuisine.

---

*Last updated: 2026-01-10*
*Total images: 39*
*Total storage folders: 5*
