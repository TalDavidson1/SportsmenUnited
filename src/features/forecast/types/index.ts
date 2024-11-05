export interface LunarPhase {
  phase: 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'last-quarter' | 'waning-crescent';
  illumination: number; // 0-1
  date: string;
}

export interface ActivityForecast {
  date: string;
  lunarPhase: LunarPhase;
  huntingQuality: number; // 1-5
  fishingQuality: number; // 1-5
  majorTimes: string[]; // Best activity times
  minorTimes: string[]; // Good activity times
  weather?: {
    temperature: number;
    conditions: string;
    windSpeed: number;
    windDirection: string;
  };
}

export interface ForecastFilter {
  zipCode: string;
  date?: string;
  days?: number; // Number of days to forecast
}

// Constants for lunar impact on activity
export const LUNAR_IMPACT = {
  NEW_MOON: {
    hunting: 3,
    fishing: 4,
  },
  FULL_MOON: {
    hunting: 5,
    fishing: 5,
  },
  QUARTER_MOON: {
    hunting: 2,
    fishing: 3,
  },
  CRESCENT_MOON: {
    hunting: 1,
    fishing: 2,
  },
};

// Major feeding times (in hours from moonrise/moonset)
export const MAJOR_FEEDING_TIMES = [
  { start: -1, end: 1 }, // Around moonrise
  { start: 11, end: 13 }, // Around moon overhead
  { start: 23, end: 25 }, // Around moon underfoot
];

// Minor feeding times (in hours from major times)
export const MINOR_FEEDING_TIMES = [
  { start: 5, end: 7 },
  { start: 17, end: 19 },
];
