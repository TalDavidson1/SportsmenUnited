import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { theme } from '../../../config/theme';

type RutActivityCardProps = {
  county: string;
  state: string;
  activityLevel: number;
  phase: 'pre-rut' | 'peak-rut' | 'post-rut';
  lastUpdated: string;
  onConfirm: () => void;
};

export const RutActivityCard: React.FC<RutActivityCardProps> = ({
  county,
  state,
  activityLevel,
  phase,
  lastUpdated,
  onConfirm,
}) => {
  const renderActivityLevel = (level: number) => {
    const maxLevel = 5;
    return (
      <View style={styles.activityLevelContainer}>
        {[...Array(maxLevel)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.activityDot,
              {
                backgroundColor:
                  index < level ? theme.colors.secondary : '#E0E0E0',
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.location}>{county}, {state}</Text>
        <Text style={styles.phase}>Phase: {phase}</Text>

        <View style={styles.activityContainer}>
          <Text style={styles.label}>Activity Level:</Text>
          {renderActivityLevel(activityLevel)}
        </View>

        <Text style={styles.updated}>Last Updated: {lastUpdated}</Text>

        <Button
          mode="contained"
          onPress={onConfirm}
          style={styles.confirmButton}
          color={theme.colors.primary}
        >
          Confirm Activity
        </Button>
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
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  phase: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  activityContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  activityLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  activityDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
  },
  updated: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  confirmButton: {
    marginTop: 8,
  },
});
