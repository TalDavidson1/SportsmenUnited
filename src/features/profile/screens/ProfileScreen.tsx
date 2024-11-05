import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ProfileCard } from '../components/ProfileCard';

// Mock data for testing
const MOCK_PROFILE = {
  username: 'HunterJohn',
  bio: 'Passionate hunter and angler from Virginia',
  totalPosts: 15,
  totalLikes: 45,
  preferredSpecies: ['Whitetail Deer', 'Largemouth Bass', 'Turkey'],
};

export const ProfileScreen = () => {
  const [profile, setProfile] = useState(MOCK_PROFILE);

  const handleEdit = () => {
    // TODO: Implement profile editing
    console.log('Editing profile');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ProfileCard
          {...profile}
          onEdit={handleEdit}
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
});
