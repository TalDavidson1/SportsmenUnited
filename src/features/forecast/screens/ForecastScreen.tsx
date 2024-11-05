import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { ForecastCard } from '../components/ForecastCard';
import { theme } from '../../../config/theme';

// Mock data for testing
const MOCK_FORECAST = {
  date: new Date().toLocaleDateString(),
  lunarPhase: 'Waxing Gibbous',
  huntingQuality: 4,
  fishingQuality: 3,
  majorTimes: ['6:30 AM - 8:30 AM', '6:45 PM - 8:45 PM'],
  minorTimes: ['12:15 PM - 1:15 PM', '12:30 AM - 1:30 AM'],
};

export const ForecastScreen = () => {
  const [zipCode, setZipCode] = useState('');
  const [forecast, setForecast] = useState(MOCK_FORECAST);

  const handleSearch = () => {
    // TODO: Implement actual forecast fetching
    console.log('Searching for forecast in:', zipCode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          label="Enter Zip Code"
          value={zipCode}
          onChangeText={setZipCode}
          style={styles.input}
          keyboardType="numeric"
          maxLength={5}
        />
        <Button
          mode="contained"
          onPress={handleSearch}
          style={styles.button}
          color={theme.colors.primary}
        >
          Search
        </Button>
      </View>
      <ScrollView>
        <ForecastCard {...forecast} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: 'white',
    elevation: 4,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
  },
});
