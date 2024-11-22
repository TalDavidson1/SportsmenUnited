import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, TextInput, Button, Card, ActivityIndicator } from 'react-native-paper';
import { theme } from '../../../config/theme';

// Lunar phase calculation helper functions
const calculateLunarPhase = (date) => {
  const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
                 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
  const daysSinceNew = Math.floor((date - new Date('2024-01-11')) / (24 * 60 * 60 * 1000));
  const phaseIndex = Math.floor((daysSinceNew % 29.5) / 3.7);
  return phases[phaseIndex % 8];
};

const calculateActivityRating = (lunarPhase, timeOfDay) => {
  const ratings = {
    'Full Moon': { morning: 4, evening: 5 },
    'New Moon': { morning: 3, evening: 4 },
    'First Quarter': { morning: 4, evening: 3 },
    'Last Quarter': { morning: 3, evening: 4 },
    'Waxing Crescent': { morning: 3, evening: 3 },
    'Waning Crescent': { morning: 2, evening: 3 },
    'Waxing Gibbous': { morning: 5, evening: 4 },
    'Waning Gibbous': { morning: 4, evening: 3 },
  };
  return ratings[lunarPhase]?.[timeOfDay] || 3;
};

const getBestTimes = (date) => {
  const sunrise = new Date(date);
  sunrise.setHours(6, 30, 0);
  const sunset = new Date(date);
  sunset.setHours(18, 30, 0);
  return {
    morning: sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    evening: sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
};

const renderRatingStars = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

const ForecastCard = ({ day }) => (
  <Card style={styles.forecastCard}>
    <Card.Content>
      <Text style={styles.subtitle}>{day.date}</Text>
      <View style={styles.forecastRow}>
        <Text style={styles.label}>Lunar Phase:</Text>
        <Text>{day.lunarPhase}</Text>
      </View>
      <View style={styles.forecastRow}>
        <Text style={styles.label}>Morning Rating:</Text>
        <Text>{renderRatingStars(day.morningRating)} ({day.times.morning})</Text>
      </View>
      <View style={styles.forecastRow}>
        <Text style={styles.label}>Evening Rating:</Text>
        <Text>{renderRatingStars(day.eveningRating)} ({day.times.evening})</Text>
      </View>
    </Card.Content>
  </Card>
);

export default function ForecastScreen() {
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState(null);

  const handleGetForecast = () => {
    if (!zipCode || zipCode.length !== 5) {
      return;
    }
    setLoading(true);

    // Generate 7-day forecast
    const next7Days = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const phase = calculateLunarPhase(date);
      const times = getBestTimes(date);

      next7Days.push({
        date: date.toLocaleDateString(),
        lunarPhase: phase,
        morningRating: calculateActivityRating(phase, 'morning'),
        eveningRating: calculateActivityRating(phase, 'evening'),
        times,
      });
    }

    setTimeout(() => {
      setForecast(next7Days);
      setLoading(false);
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.surface}>
        <Text style={styles.title}>Hunting & Fishing Forecast</Text>

        <View style={styles.inputContainer}>
          <TextInput
            label="Enter Zip Code"
            value={zipCode}
            onChangeText={text => setZipCode(text.replace(/[^0-9]/g, '').slice(0, 5))}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
            maxLength={5}
          />

          <Button
            mode="contained"
            onPress={handleGetForecast}
            loading={loading}
            disabled={!zipCode || zipCode.length !== 5}
            style={styles.button}
          >
            Get Forecast
          </Button>
        </View>

        {loading && (
          <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loading} />
        )}

        {forecast && (
          <View>
            {forecast.map((day, index) => (
              <ForecastCard key={index} day={day} />
            ))}
          </View>
        )}
      </Surface>

      <View style={styles.adContainer}>
        <Text style={styles.adText}>Advertisement Space</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  surface: {
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    elevation: 4,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  input: {
    marginBottom: theme.spacing.sm,
  },
  button: {
    marginTop: theme.spacing.sm,
  },
  loading: {
    marginVertical: theme.spacing.lg,
  },
  forecastCard: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    fontWeight: '500',
  },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
  },
  label: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  adContainer: {
    height: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing.md,
    borderRadius: 8,
  },
  adText: {
    color: theme.colors.placeholder,
  },
});
