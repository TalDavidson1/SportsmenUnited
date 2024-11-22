export type RutPhase = 'pre-rut' | 'early-rut' | 'peak-rut' | 'late-rut' | 'post-rut';

export type ActivityLevel = 1 | 2 | 3 | 4 | 5; // 1 = Low, 5 = Very High

export interface RutActivity {
  id: string;
  userId: string;
  state: string;
  county: string;
  phase: RutPhase;
  activityLevel: ActivityLevel;
  description?: string;
  date: string;
  confirmedBy: string[]; // Array of userIds who confirmed this activity
}

export interface RutReport {
  state: string;
  county: string;
  phase: RutPhase;
  activityLevel: ActivityLevel;
  description?: string;
}

export interface RutFilter {
  state?: string;
  county?: string;
  phase?: RutPhase;
  daysAgo?: number;
}

// Typical rut timing by region
export const RUT_TIMING = {
  NORTH: {
    preRut: { start: '10-15', end: '10-31' },
    peak: { start: '11-01', end: '11-15' },
    post: { start: '11-16', end: '11-30' },
  },
  SOUTH: {
    preRut: { start: '12-15', end: '12-31' },
    peak: { start: '01-01', end: '01-15' },
    post: { start: '01-16', end: '01-31' },
  },
  CENTRAL: {
    preRut: { start: '11-01', end: '11-15' },
    peak: { start: '11-16', end: '11-30' },
    post: { start: '12-01', end: '12-15' },
  },
};

// Activity level descriptions
export const ACTIVITY_DESCRIPTIONS = {
  1: 'Very Low - Minimal deer movement, mostly nocturnal',
  2: 'Low - Some movement, mainly early morning and late evening',
  3: 'Moderate - Regular movement throughout the day',
  4: 'High - Frequent movement, visible rutting behavior',
  5: 'Very High - Peak rut activity, constant movement and chasing',
};
