import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, TextInput, Button, Avatar } from 'react-native-paper';
import { theme } from '../../../config/theme';

export default function ProfileScreen() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <View style={styles.avatarContainer}>
          <Avatar.Icon size={80} icon="account" color={theme.colors.primary} />
          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.photoButton}
            color={theme.colors.primary}
          >
            Change Photo
          </Button>
        </View>

        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Location"
          value={location}
          onChangeText={setLocation}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Bio"
          value={bio}
          onChangeText={setBio}
          mode="outlined"
          style={styles.input}
          multiline
          numberOfLines={3}
        />

        <Button
          mode="contained"
          onPress={() => {}}
          style={styles.button}
          color={theme.colors.primary}
        >
          Save Profile
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  photoButton: {
    marginTop: theme.spacing.sm,
  },
  input: {
    marginBottom: theme.spacing.md,
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
