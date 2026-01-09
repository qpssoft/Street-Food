/**
 * Random Selection Utility
 *
 * Functions for randomly selecting items from collections.
 * Used for home page discovery feature (6 random food items).
 */

/**
 * Shuffle an array using Fisher-Yates algorithm
 *
 * @param array - Array to shuffle
 * @returns Shuffled copy of the array
 *
 * @example
 * shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4] (random order)
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }
  return shuffled;
}

/**
 * Select N random items from an array
 *
 * @param array - Array to select from
 * @param count - Number of items to select
 * @returns Array of randomly selected items
 *
 * @throws {Error} If count is greater than array length
 *
 * @example
 * selectRandom([1, 2, 3, 4, 5], 3) // [2, 5, 1] (random selection of 3 items)
 * selectRandom(['a', 'b', 'c'], 2) // ['c', 'a'] (random selection of 2 items)
 */
export function selectRandom<T>(array: T[], count: number): T[] {
  if (count > array.length) {
    throw new Error(`Cannot select ${count} items from array of length ${array.length}`);
  }

  if (count === array.length) {
    return shuffle(array);
  }

  const shuffled = shuffle(array);
  return shuffled.slice(0, count);
}

/**
 * Select 6 random items from an array (default for home page)
 *
 * @param array - Array to select from
 * @returns Array of 6 randomly selected items (or all items if less than 6)
 *
 * @example
 * selectSixRandom(foodItems) // 6 random food items
 */
export function selectSixRandom<T>(array: T[]): T[] {
  const count = Math.min(6, array.length);
  return selectRandom(array, count);
}

/**
 * Weighted random selection
 * Items with higher weight have higher probability of being selected
 *
 * @param items - Array of items with weights
 * @param count - Number of items to select
 * @returns Array of randomly selected items based on weights
 *
 * @example
 * const items = [
 *   { food: 'Bánh mì', weight: 10 },
 *   { food: 'Phở', weight: 5 },
 *   { food: 'Bún chả', weight: 3 }
 * ];
 * selectWeightedRandom(items, 2) // More likely to include Bánh mì
 */
export function selectWeightedRandom<T extends { weight: number }>(items: T[], count: number): T[] {
  if (count > items.length) {
    throw new Error(`Cannot select ${count} items from array of length ${items.length}`);
  }

  const selected: T[] = [];
  const remaining = [...items];

  for (let i = 0; i < count; i++) {
    // Calculate total weight of remaining items
    const totalWeight = remaining.reduce((sum, item) => sum + item.weight, 0);

    // Select random value between 0 and totalWeight
    let random = Math.random() * totalWeight;

    // Find the item that corresponds to this random value
    for (let j = 0; j < remaining.length; j++) {
      const item = remaining[j]!;
      random -= item.weight;
      if (random <= 0) {
        selected.push(item);
        remaining.splice(j, 1);
        break;
      }
    }
  }

  return selected;
}
