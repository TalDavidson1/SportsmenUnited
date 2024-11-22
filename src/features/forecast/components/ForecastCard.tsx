import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { theme } from '../../../config/theme';

type ForecastCardProps = {
  date: string;
  lunarPhase: string;
  huntingQuality: number;
  fishingQuality: number;
  majorTimes: string[];
  minorTimes: string[];
};

export const ForecastCard: React.FC<ForecastCardProps> = ({
  date,
  lunarPhase,
  huntingQuality,
  fishingQuality,
  majorTimes,
  minorTimes,
}) => {
  const renderQualityStars = (quality: number) => {
    return '★'.repeat(quality) + '☆'.repeat(5 - quality);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.phase}>Lunar Phase: {lunarPhase}</Text>

        <View style={styles.qualityContainer}>
          <Text style={styles.label}>Hunting Quality:</Text>
          <Text style={styles.stars}>{renderQualityStars(huntingQuality)}</Text>
        </View>

        <View style={styles.qualityContainer}>
          <Text style={styles.label}>Fishing Quality:</Text>
          <Text style={styles.stars}>{renderQualityStars(fishingQuality)}</Text>
        </View>

        <View style={styles.timesContainer}>
          <View style={styles.timeSection}>
            <Text style={styles.timeLabel}>Major Times:</Text>
            {majorTimes.map((time, index) => (
              <Text key={index} style={styles.time}>{time}</Text>
            ))}
          </View>

          <View style={styles.timeSection}>
            <Text style={styles.timeLabel}>Minor Times:</Text>
            {minorTimes.map((time, index) => (
              <Text key={index} style={styles.time}>{time}</Text>
            ))}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  phase: {
    fontSize: 16,
    marginBottom: 12,
    color: '#666',
  },
  qualityContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  stars: {
    fontSize: 16,
    color: theme.colors.secondary,
  },
  timesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  timeSection: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
});
