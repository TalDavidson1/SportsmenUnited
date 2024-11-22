import { RutActivity, RutReport, RutFilter, RutPhase, ActivityLevel, RUT_TIMING } from '../types';

class RutTrackerService {
  private activities: RutActivity[] = [
    {
      id: '1',
      userId: 'user1',
      state: 'Virginia',
      county: 'Warren',
      phase: 'peak-rut',
      activityLevel: 4,
      description: 'Lots of chasing activity, multiple bucks following does',
      date: new Date(2024, 10, 10).toISOString(),
      confirmedBy: ['user2', 'user3']
    },
    {
      id: '2',
      userId: 'user2',
      state: 'Virginia',
      county: 'Shenandoah',
      phase: 'pre-rut',
      activityLevel: 3,
      description: 'Starting to see some scrapes and rubs',
      date: new Date(2024, 10, 5).toISOString(),
      confirmedBy: ['user1']
    }
  ];

  async getActivities(filter?: RutFilter): Promise<RutActivity[]> {
    let filteredActivities = [...this.activities];

    if (filter) {
      if (filter.state) {
        filteredActivities = filteredActivities.filter(
          activity => activity.state.toLowerCase() === filter.state?.toLowerCase()
        );
      }

      if (filter.county) {
        filteredActivities = filteredActivities.filter(
          activity => activity.county.toLowerCase() === filter.county?.toLowerCase()
        );
      }

      if (filter.phase) {
        filteredActivities = filteredActivities.filter(
          activity => activity.phase === filter.phase
        );
      }

      if (filter.daysAgo) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - filter.daysAgo);
        filteredActivities = filteredActivities.filter(
          activity => new Date(activity.date) >= cutoffDate
        );
      }
    }

    return filteredActivities.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async reportActivity(report: RutReport): Promise<RutActivity> {
    const newActivity: RutActivity = {
      id: Date.now().toString(),
      userId: 'currentUser', // TODO: Replace with actual user ID
      ...report,
      date: new Date().toISOString(),
      confirmedBy: []
    };

    this.activities.unshift(newActivity);
    return newActivity;
  }

  async confirmActivity(activityId: string, userId: string): Promise<RutActivity> {
    const activity = this.activities.find(a => a.id === activityId);
    if (!activity) {
      throw new Error('Activity not found');
    }

    if (!activity.confirmedBy.includes(userId)) {
      activity.confirmedBy.push(userId);
    }

    return activity;
  }

  async getRegionalRutTiming(state: string): Promise<typeof RUT_TIMING[keyof typeof RUT_TIMING]> {
    // Simplified region determination based on state
    const northernStates = ['ME', 'NH', 'VT', 'NY', 'MI', 'WI', 'MN'];
    const southernStates = ['FL', 'GA', 'AL', 'MS', 'LA', 'SC', 'NC'];

    if (northernStates.includes(state.toUpperCase())) {
      return RUT_TIMING.NORTH;
    } else if (southernStates.includes(state.toUpperCase())) {
      return RUT_TIMING.SOUTH;
    } else {
      return RUT_TIMING.CENTRAL;
    }
  }

  async getCurrentPhase(state: string): Promise<RutPhase> {
    const timing = await this.getRegionalRutTiming(state);
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const dateStr = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    if (this.isDateInRange(dateStr, timing.preRut)) {
      return 'pre-rut';
    } else if (this.isDateInRange(dateStr, timing.peak)) {
      return 'peak-rut';
    } else if (this.isDateInRange(dateStr, timing.post)) {
      return 'post-rut';
    } else {
      return 'post-rut'; // Default to post-rut outside of defined periods
    }
  }

  private isDateInRange(date: string, range: { start: string; end: string }): boolean {
    const [month, day] = date.split('-').map(Number);
    const [startMonth, startDay] = range.start.split('-').map(Number);
    const [endMonth, endDay] = range.end.split('-').map(Number);

    const dateNum = month * 100 + day;
    const startNum = startMonth * 100 + startDay;
    const endNum = endMonth * 100 + endDay;

    return dateNum >= startNum && dateNum <= endNum;
  }
}

export const rutTrackerService = new RutTrackerService();
