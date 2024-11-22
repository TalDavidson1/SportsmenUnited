import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, Button, SegmentedButtons, TextInput } from 'react-native-paper';
import { theme } from '../../../config/theme';

export default function RutTrackerScreen() {
  const [rutPhase, setRutPhase] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [county, setCounty] = useState('');
  const [state, setState] = useState('');

  const rutPhases = [
    { label: 'Pre-Rut', value: 'pre-rut' },
    { label: 'Peak-Rut', value: 'peak-rut' },
    { label: 'Post-Rut', value: 'post-rut' },
  ];

  const activityLevels = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Text style={styles.title}>Rut Activity Tracker</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rut Phase</Text>
          <SegmentedButtons
            value={rutPhase}
            onValueChange={setRutPhase}
            buttons={rutPhases}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity Level</Text>
          <SegmentedButtons
            value={activityLevel}
            onValueChange={setActivityLevel}
            buttons={activityLevels}
          />
        </View>

        <Button
          mode="contained"
          onPress={() => {}}
          style={styles.button}
          color={theme.colors.primary}
        >
          Submit Report
        </Button>
      </Surface>

      <View style={styles.adContainer}>
        <Text style={styles.adText}>Advertisement Space</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  surface: {
    padding: theme.spacing.md,
    elevation: 4,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    marginBottom: theme.spacing.sm,
  },
  button: {
    marginTop: theme.spacing.md,
  },
  adContainer: {
    height: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  adText: {
    color: theme.colors.placeholder,
  },
});
