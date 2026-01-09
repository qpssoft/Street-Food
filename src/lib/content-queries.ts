/**
 * Content Query Helpers
 *
 * Functions for querying Astro Content Collections.
 * Provides type-safe access to food items with filtering capabilities.
 */

import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Food item type from Content Collections
 */
export type FoodItem = CollectionEntry<'foods'>;

/**
 * Get all food items for a specific language
 *
 * @param lang - Language code ('vi', 'en', 'zh', 'ja', 'ko')
 * @returns Array of food items in the specified language
 *
 * @example
 * const vietnameseFoods = await getFoodsByLanguage('vi');
 */
export async function getFoodsByLanguage(
  lang: 'vi' | 'en' | 'zh' | 'ja' | 'ko' = 'vi'
): Promise<FoodItem[]> {
  const allFoods = await getCollection('foods');
  return allFoods.filter((food) => food.data.lang === lang);
}

/**
 * Get a single food item by slug and language
 *
 * @param slug - Food item slug (e.g., 'banh-mi')
 * @param lang - Language code (default: 'vi')
 * @returns Food item or undefined if not found
 *
 * @example
 * const banhMi = await getFoodBySlug('banh-mi', 'vi');
 */
export async function getFoodBySlug(
  slug: string,
  lang: 'vi' | 'en' | 'zh' | 'ja' | 'ko' = 'vi'
): Promise<FoodItem | undefined> {
  const foods = await getFoodsByLanguage(lang);
  return foods.find((food) => food.slug === slug);
}

/**
 * Get food items by category
 *
 * @param category - Food category
 * @param lang - Language code (default: 'vi')
 * @returns Array of food items in the specified category
 *
 * @example
 * const noodleDishes = await getFoodsByCategory('noodle', 'vi');
 */
export async function getFoodsByCategory(
  category: 'grilled' | 'fresh' | 'fried' | 'noodle' | 'rice' | 'dessert' | 'beverage',
  lang: 'vi' | 'en' | 'zh' | 'ja' | 'ko' = 'vi'
): Promise<FoodItem[]> {
  const foods = await getFoodsByLanguage(lang);
  return foods.filter((food) => food.data.category === category);
}

/**
 * Get food items associated with a specific province
 *
 * @param provinceName - Province name in Vietnamese (e.g., 'Hà Nội', 'Hồ Chí Minh')
 * @param lang - Language code (default: 'vi')
 * @returns Array of food items associated with the province
 *
 * @example
 * const hanoiFoods = await getFoodsByProvince('Hà Nội', 'vi');
 */
export async function getFoodsByProvince(
  provinceName: string,
  lang: 'vi' | 'en' | 'zh' | 'ja' | 'ko' = 'vi'
): Promise<FoodItem[]> {
  const foods = await getFoodsByLanguage(lang);
  return foods.filter((food) => food.data.province.includes(provinceName));
}

/**
 * Get food items by eating time
 *
 * @param eatingTime - Eating time ('morning', 'afternoon', 'evening', 'night', 'anytime')
 * @param lang - Language code (default: 'vi')
 * @returns Array of food items suitable for the specified eating time
 *
 * @example
 * const morningFoods = await getFoodsByEatingTime('morning', 'vi');
 */
export async function getFoodsByEatingTime(
  eatingTime: 'morning' | 'afternoon' | 'evening' | 'night' | 'anytime',
  lang: 'vi' | 'en' | 'zh' | 'ja' | 'ko' = 'vi'
): Promise<FoodItem[]> {
  const foods = await getFoodsByLanguage(lang);
  return foods.filter((food) => food.data.eatingTime.includes(eatingTime));
}

/**
 * Get food items by consumption method
 *
 * @param method - Consumption method ('takeaway', 'dine-in', 'street-side', 'mixed')
 * @param lang - Language code (default: 'vi')
 * @returns Array of food items with the specified consumption method
 *
 * @example
 * const takeawayFoods = await getFoodsByConsumptionMethod('takeaway', 'vi');
 */
export async function getFoodsByConsumptionMethod(
  method: 'takeaway' | 'dine-in' | 'street-side' | 'mixed',
  lang: 'vi' | 'en' | 'zh' | 'ja' | 'ko' = 'vi'
): Promise<FoodItem[]> {
  const foods = await getFoodsByLanguage(lang);
  return foods.filter((food) => food.data.consumptionMethod === method);
}

/**
 * Get food items sorted by popularity rank
 *
 * @param lang - Language code (default: 'vi')
 * @param limit - Maximum number of items to return (optional)
 * @returns Array of food items sorted by popularity (ascending rank)
 *
 * @example
 * const top10Foods = await getFoodsByPopularity('vi', 10);
 */
export async function getFoodsByPopularity(
  lang: 'vi' | 'en' | 'zh' | 'ja' | 'ko' = 'vi',
  limit?: number
): Promise<FoodItem[]> {
  const foods = await getFoodsByLanguage(lang);

  // Filter foods that have a popularity rank
  const rankedFoods = foods.filter((food) => food.data.popularityRank !== undefined);

  // Sort by popularity rank (ascending - 1 is most popular)
  const sorted = rankedFoods.sort(
    (a, b) => (a.data.popularityRank ?? Infinity) - (b.data.popularityRank ?? Infinity)
  );

  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Get current time-based eating time
 * Returns the appropriate eating time based on current hour
 *
 * @returns Current eating time category
 *
 * @example
 * getCurrentEatingTime() // 'morning' if called between 5 AM and 11 AM
 */
export function getCurrentEatingTime(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 11) return 'morning'; // 5 AM - 11 AM
  if (hour >= 11 && hour < 14) return 'afternoon'; // 11 AM - 2 PM
  if (hour >= 14 && hour < 18) return 'afternoon'; // 2 PM - 6 PM
  if (hour >= 18 && hour < 22) return 'evening'; // 6 PM - 10 PM
  return 'night'; // 10 PM - 5 AM
}

/**
 * Get food items appropriate for current time
 *
 * @param lang - Language code (default: 'vi')
 * @returns Array of food items suitable for current eating time
 *
 * @example
 * const currentFoods = await getCurrentTimeFoods('vi');
 */
export async function getCurrentTimeFoods(
  lang: 'vi' | 'en' | 'zh' | 'ja' | 'ko' = 'vi'
): Promise<FoodItem[]> {
  const currentTime = getCurrentEatingTime();
  return getFoodsByEatingTime(currentTime, lang);
}

/**
 * Search food items by name or description
 *
 * @param query - Search query string
 * @param lang - Language code (default: 'vi')
 * @returns Array of matching food items
 *
 * @example
 * const results = await searchFoods('bánh', 'vi');
 */
export async function searchFoods(
  query: string,
  lang: 'vi' | 'en' | 'zh' | 'ja' | 'ko' = 'vi'
): Promise<FoodItem[]> {
  const foods = await getFoodsByLanguage(lang);
  const lowercaseQuery = query.toLowerCase();

  return foods.filter(
    (food) =>
      food.data.name.toLowerCase().includes(lowercaseQuery) ||
      food.data.description.toLowerCase().includes(lowercaseQuery)
  );
}
