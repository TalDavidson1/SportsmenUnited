import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { RutActivityCard } from '../components/RutActivityCard';
import { theme } from '../../../config/theme';

// Mock data for testing
const MOCK_RUT_ACTIVITY = {
  county: 'Warren',
  state: 'VA',
  activityLevel: 4,
  phase: 'peak-rut' as const,
  lastUpdated: new Date().toLocaleDateString(),
};

export const RutTrackerScreen = () => {
  const [county, setCounty] = useState('');
  const [state, setState] = useState('');
  const [activity, setActivity] = useState(MOCK_RUT_ACTIVITY);

  const handleSearch = () => {
    // TODO: Implement actual rut activity fetching
    console.log('Searching for rut activity in:', county, state);
  };

  const handleConfirm = () => {
    // TODO: Implement activity confirmation
    console.log('Confirming rut activity');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          label="County"
          value={county}
          onChangeText={setCounty}
          style={styles.input}
        />
        <TextInput
          label="State"
          value={state}
          onChangeText={setState}
          style={styles.input}
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
        <RutActivityCard
          {...activity}
          onConfirm={handleConfirm}
        />
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
