/**
 * Time-based Utilities
 *
 * Provides functions to determine current eating period and contextual messages.
 * Supports the "Bây giờ ăn gì?" feature for time-aware food suggestions.
 */

export type EatingTime = 'morning' | 'afternoon' | 'evening' | 'night' | 'anytime';

export interface TimeContext {
  period: EatingTime;
  greeting: string;
  description: string;
  icon: string;
}

/**
 * Get current eating period based on hour of day
 * - Morning: 5:00 - 10:59 (breakfast time)
 * - Afternoon: 11:00 - 14:59 (lunch time)
 * - Evening: 15:00 - 18:59 (snack/dinner prep time)
 * - Night: 19:00 - 4:59 (dinner/late night snack)
 */
export function getCurrentEatingPeriod(date: Date = new Date()): EatingTime {
  const hour = date.getHours();

  if (hour >= 5 && hour < 11) {
    return 'morning';
  } else if (hour >= 11 && hour < 15) {
    return 'afternoon';
  } else if (hour >= 15 && hour < 19) {
    return 'evening';
  } else {
    return 'night';
  }
}

/**
 * Get contextual message and greeting based on current time
 */
export function getTimeContext(lang: 'vi' | 'en' = 'vi'): TimeContext {
  const period = getCurrentEatingPeriod();

  const contexts: Record<'vi' | 'en', Record<EatingTime, Omit<TimeContext, 'period'>>> = {
    vi: {
      morning: {
        greeting: 'Chào buổi sáng!',
        description: 'Bắt đầu ngày mới với những món ăn sáng đặc trưng của Việt Nam',
        icon: '🌅',
      },
      afternoon: {
        greeting: 'Bây giờ ăn gì?',
        description: 'Khám phá các món ăn trưa ngon miệng và đầy đủ dinh dưỡng',
        icon: '☀️',
      },
      evening: {
        greeting: 'Chiều nay ăn gì?',
        description: 'Thưởng thức những món ăn nhẹ hoặc chuẩn bị cho bữa tối',
        icon: '🌇',
      },
      night: {
        greeting: 'Tối nay ăn gì?',
        description: 'Tận hưởng bữa tối với các món ăn đặc sắc của ẩm thực Việt',
        icon: '🌙',
      },
      anytime: {
        greeting: 'Khám phá ẩm thực',
        description: 'Những món ăn có thể thưởng thức bất cứ lúc nào',
        icon: '🍽️',
      },
    },
    en: {
      morning: {
        greeting: 'Good Morning!',
        description: 'Start your day with traditional Vietnamese breakfast dishes',
        icon: '🌅',
      },
      afternoon: {
        greeting: 'What to Eat Now?',
        description: 'Explore delicious and nutritious lunch options',
        icon: '☀️',
      },
      evening: {
        greeting: 'What for Dinner?',
        description: 'Enjoy light snacks or prepare for a great dinner',
        icon: '🌇',
      },
      night: {
        greeting: 'Tonight\'s Menu?',
        description: 'Savor exceptional Vietnamese dinner dishes',
        icon: '🌙',
      },
      anytime: {
        greeting: 'Explore Cuisine',
        description: 'Dishes you can enjoy anytime',
        icon: '🍽️',
      },
    },
  };

  return {
    period,
    ...contexts[lang][period],
  };
}

/**
 * Check if a food item is suitable for the current eating period
 */
export function isSuitableForCurrentTime(
  foodEatingTimes: EatingTime[],
  currentPeriod?: EatingTime
): boolean {
  const period = currentPeriod || getCurrentEatingPeriod();

  // Foods marked as 'anytime' are always suitable
  if (foodEatingTimes.includes('anytime')) {
    return true;
  }

  // Check if current period matches any of the food's eating times
  return foodEatingTimes.includes(period);
}

/**
 * Get user-friendly time period label
 */
export function getTimePeriodLabel(period: EatingTime, lang: 'vi' | 'en' = 'vi'): string {
  const labels: Record<'vi' | 'en', Record<EatingTime, string>> = {
    vi: {
      morning: 'Sáng',
      afternoon: 'Trưa',
      evening: 'Chiều',
      night: 'Tối',
      anytime: 'Mọi lúc',
    },
    en: {
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening',
      night: 'Night',
      anytime: 'Anytime',
    },
  };

  return labels[lang][period];
}
