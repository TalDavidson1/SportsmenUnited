import { LunarPhase, ActivityForecast, ForecastFilter, LUNAR_IMPACT, MAJOR_FEEDING_TIMES, MINOR_FEEDING_TIMES } from '../types';

class ForecastService {
  private calculateLunarPhase(date: Date): LunarPhase {
    // Simplified lunar phase calculation
    // One lunar cycle is approximately 29.53 days
    const LUNAR_CYCLE = 29.53;

    // Known new moon date as reference
    const KNOWN_NEW_MOON = new Date('2024-01-11T04:57:00Z');

    const daysSinceNewMoon = (date.getTime() - KNOWN_NEW_MOON.getTime()) / (1000 * 60 * 60 * 24);
    const currentAge = (daysSinceNewMoon % LUNAR_CYCLE + LUNAR_CYCLE) % LUNAR_CYCLE;

    // Calculate phase and illumination
    let phase: LunarPhase['phase'];
    let illumination: number;

    if (currentAge < 1) {
      phase = 'new';
      illumination = 0;
    } else if (currentAge < 7.4) {
      phase = 'waxing-crescent';
      illumination = currentAge / 7.4;
    } else if (currentAge < 8.4) {
      phase = 'first-quarter';
      illumination = 0.5;
    } else if (currentAge < 14.8) {
      phase = 'waxing-gibbous';
      illumination = 0.5 + ((currentAge - 7.4) / 7.4) * 0.5;
    } else if (currentAge < 15.8) {
      phase = 'full';
      illumination = 1;
    } else if (currentAge < 22.1) {
      phase = 'waning-gibbous';
      illumination = 1 - ((currentAge - 15.8) / 7.4) * 0.5;
    } else if (currentAge < 23.1) {
      phase = 'last-quarter';
      illumination = 0.5;
    } else {
      phase = 'waning-crescent';
      illumination = ((29.53 - currentAge) / 7.4);
    }

    return {
      phase,
      illumination,
      date: date.toISOString(),
    };
  }

  private calculateActivityQuality(lunarPhase: LunarPhase): { hunting: number; fishing: number } {
    let quality = { hunting: 3, fishing: 3 }; // Default medium quality

    switch (lunarPhase.phase) {
      case 'full':
        quality = LUNAR_IMPACT.FULL_MOON;
        break;
      case 'new':
        quality = LUNAR_IMPACT.NEW_MOON;
        break;
      case 'first-quarter':
      case 'last-quarter':
        quality = LUNAR_IMPACT.QUARTER_MOON;
        break;
      case 'waxing-crescent':
      case 'waning-crescent':
        quality = LUNAR_IMPACT.CRESCENT_MOON;
        break;
      default:
        // For gibbous phases, interpolate between quarter and full
        const baseQuality = LUNAR_IMPACT.QUARTER_MOON;
        const peakQuality = LUNAR_IMPACT.FULL_MOON;
        const factor = lunarPhase.illumination;
        quality = {
          hunting: Math.round(baseQuality.hunting + (peakQuality.hunting - baseQuality.hunting) * factor),
          fishing: Math.round(baseQuality.fishing + (peakQuality.fishing - baseQuality.fishing) * factor),
        };
    }

    return quality;
  }

  private calculateActivityTimes(date: Date): { majorTimes: string[]; minorTimes: string[] } {
    // Simplified calculation using moonrise at 6 AM as reference
    const baseTime = new Date(date);
    baseTime.setHours(6, 0, 0, 0);

    const formatTime = (hours: number): string => {
      const totalHours = (hours + 24) % 24;
      const period = totalHours >= 12 ? 'PM' : 'AM';
      const displayHours = totalHours % 12 || 12;
      return `${displayHours}:00 ${period}`;
    };

    const majorTimes = MAJOR_FEEDING_TIMES.map(time => {
      const startHour = (6 + time.start) % 24;
      const endHour = (6 + time.end) % 24;
      return `${formatTime(startHour)} - ${formatTime(endHour)}`;
    });

    const minorTimes = MINOR_FEEDING_TIMES.map(time => {
      const startHour = (6 + time.start) % 24;
      const endHour = (6 + time.end) % 24;
      return `${formatTime(startHour)} - ${formatTime(endHour)}`;
    });

    return { majorTimes, minorTimes };
  }

  async getForecast(filter: ForecastFilter): Promise<ActivityForecast[]> {
    const forecasts: ActivityForecast[] = [];
    const startDate = filter.date ? new Date(filter.date) : new Date();
    const days = filter.days || 7;

    for (let i = 0; i < days; i++) {
      const forecastDate = new Date(startDate);
      forecastDate.setDate(startDate.getDate() + i);

      const lunarPhase = this.calculateLunarPhase(forecastDate);
      const quality = this.calculateActivityQuality(lunarPhase);
      const times = this.calculateActivityTimes(forecastDate);

      forecasts.push({
        date: forecastDate.toISOString(),
        lunarPhase,
        huntingQuality: quality.hunting,
        fishingQuality: quality.fishing,
        majorTimes: times.majorTimes,
        minorTimes: times.minorTimes,
      });
    }

    return forecasts;
  }
}

export const forecastService = new ForecastService();
