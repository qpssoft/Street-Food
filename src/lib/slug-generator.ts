/**
 * Slug Generator Utility
 *
 * Converts Vietnamese food names to URL-safe slugs.
 * Handles Vietnamese diacritics removal and URL sanitization.
 *
 * Constitution Principle V: Vietnamese diacritics and romanization support.
 */

/**
 * Vietnamese diacritics mapping to ASCII equivalents
 */
const VIETNAMESE_DIACRITICS_MAP: Record<string, string> = {
  // Lowercase
  à: 'a',
  á: 'a',
  ả: 'a',
  ã: 'a',
  ạ: 'a',
  ă: 'a',
  ằ: 'a',
  ắ: 'a',
  ẳ: 'a',
  ẵ: 'a',
  ặ: 'a',
  â: 'a',
  ầ: 'a',
  ấ: 'a',
  ẩ: 'a',
  ẫ: 'a',
  ậ: 'a',
  đ: 'd',
  è: 'e',
  é: 'e',
  ẻ: 'e',
  ẽ: 'e',
  ẹ: 'e',
  ê: 'e',
  ề: 'e',
  ế: 'e',
  ể: 'e',
  ễ: 'e',
  ệ: 'e',
  ì: 'i',
  í: 'i',
  ỉ: 'i',
  ĩ: 'i',
  ị: 'i',
  ò: 'o',
  ó: 'o',
  ỏ: 'o',
  õ: 'o',
  ọ: 'o',
  ô: 'o',
  ồ: 'o',
  ố: 'o',
  ổ: 'o',
  ỗ: 'o',
  ộ: 'o',
  ơ: 'o',
  ờ: 'o',
  ớ: 'o',
  ở: 'o',
  ỡ: 'o',
  ợ: 'o',
  ù: 'u',
  ú: 'u',
  ủ: 'u',
  ũ: 'u',
  ụ: 'u',
  ư: 'u',
  ừ: 'u',
  ứ: 'u',
  ử: 'u',
  ữ: 'u',
  ự: 'u',
  ỳ: 'y',
  ý: 'y',
  ỷ: 'y',
  ỹ: 'y',
  ỵ: 'y',

  // Uppercase
  À: 'A',
  Á: 'A',
  Ả: 'A',
  Ã: 'A',
  Ạ: 'A',
  Ă: 'A',
  Ằ: 'A',
  Ắ: 'A',
  Ẳ: 'A',
  Ẵ: 'A',
  Ặ: 'A',
  Â: 'A',
  Ầ: 'A',
  Ấ: 'A',
  Ẩ: 'A',
  Ẫ: 'A',
  Ậ: 'A',
  Đ: 'D',
  È: 'E',
  É: 'E',
  Ẻ: 'E',
  Ẽ: 'E',
  Ẹ: 'E',
  Ê: 'E',
  Ề: 'E',
  Ế: 'E',
  Ể: 'E',
  Ễ: 'E',
  Ệ: 'E',
  Ì: 'I',
  Í: 'I',
  Ỉ: 'I',
  Ĩ: 'I',
  Ị: 'I',
  Ò: 'O',
  Ó: 'O',
  Ỏ: 'O',
  Õ: 'O',
  Ọ: 'O',
  Ô: 'O',
  Ồ: 'O',
  Ố: 'O',
  Ổ: 'O',
  Ỗ: 'O',
  Ộ: 'O',
  Ơ: 'O',
  Ờ: 'O',
  Ớ: 'O',
  Ở: 'O',
  Ỡ: 'O',
  Ợ: 'O',
  Ù: 'U',
  Ú: 'U',
  Ủ: 'U',
  Ũ: 'U',
  Ụ: 'U',
  Ư: 'U',
  Ừ: 'U',
  Ứ: 'U',
  Ử: 'U',
  Ữ: 'U',
  Ự: 'U',
  Ỳ: 'Y',
  Ý: 'Y',
  Ỷ: 'Y',
  Ỹ: 'Y',
  Ỵ: 'Y',
};

/**
 * Remove Vietnamese diacritics from a string
 *
 * @param text - Text with Vietnamese diacritics
 * @returns Text with diacritics replaced by ASCII equivalents
 *
 * @example
 * removeDiacritics('Bánh mì') // 'Banh mi'
 * removeDiacritics('Phở bò') // 'Pho bo'
 */
export function removeDiacritics(text: string): string {
  return text
    .split('')
    .map((char) => VIETNAMESE_DIACRITICS_MAP[char] || char)
    .join('');
}

/**
 * Generate a URL-safe slug from Vietnamese food name
 *
 * Process:
 * 1. Remove Vietnamese diacritics
 * 2. Convert to lowercase
 * 3. Replace spaces with hyphens
 * 4. Remove non-alphanumeric characters (except hyphens)
 * 5. Remove consecutive hyphens
 * 6. Trim hyphens from start and end
 *
 * @param name - Vietnamese food name
 * @returns URL-safe slug
 *
 * @example
 * generateSlug('Bánh mì') // 'banh-mi'
 * generateSlug('Phở bò') // 'pho-bo'
 * generateSlug('Cà phê sữa đá') // 'ca-phe-sua-da'
 * generateSlug('Gỏi cuốn') // 'goi-cuon'
 */
export function generateSlug(name: string): string {
  if (!name || typeof name !== 'string') {
    throw new Error('generateSlug: name must be a non-empty string');
  }

  return (
    removeDiacritics(name)
      .toLowerCase()
      // Replace spaces with hyphens
      .replace(/\s+/g, '-')
      // Remove non-alphanumeric characters (except hyphens)
      .replace(/[^a-z0-9-]/g, '')
      // Remove consecutive hyphens
      .replace(/-+/g, '-')
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, '')
  );
}

/**
 * Validate a slug format
 *
 * @param slug - Slug to validate
 * @returns True if slug is valid (lowercase alphanumeric with hyphens only)
 *
 * @example
 * isValidSlug('banh-mi') // true
 * isValidSlug('Banh-Mi') // false (uppercase)
 * isValidSlug('banh_mi') // false (underscore)
 * isValidSlug('banh-mi-') // false (trailing hyphen)
 */
export function isValidSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') {
    return false;
  }

  // Must be lowercase alphanumeric with hyphens only
  // Cannot start or end with hyphen
  // Cannot have consecutive hyphens
  const slugRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Generate language-prefixed URL path for a food item
 *
 * @param slug - URL-safe slug
 * @param lang - Language code ('vi', 'en', 'zh', 'ja', 'ko')
 * @returns Language-prefixed path
 *
 * @example
 * generateFoodPath('banh-mi', 'vi') // '/vi/banh-mi'
 * generateFoodPath('banh-mi', 'en') // '/en/banh-mi'
 */
export function generateFoodPath(
  slug: string,
  lang: 'vi' | 'en' | 'zh' | 'ja' | 'ko' = 'vi'
): string {
  if (!isValidSlug(slug)) {
    throw new Error(`generateFoodPath: invalid slug format "${slug}"`);
  }

  return `/${lang}/${slug}`;
}

/**
 * Extract slug from a language-prefixed path
 *
 * @param path - Language-prefixed path (e.g., '/vi/banh-mi')
 * @returns Slug extracted from path
 *
 * @example
 * extractSlugFromPath('/vi/banh-mi') // 'banh-mi'
 * extractSlugFromPath('/en/banh-mi') // 'banh-mi'
 */
export function extractSlugFromPath(path: string): string | null {
  const match = path.match(/^\/[a-z]{2}\/([a-z0-9-]+)/);
  return match?.[1] ?? null;
}
