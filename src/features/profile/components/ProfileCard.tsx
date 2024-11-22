import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { theme } from '../../../config/theme';

type ProfileCardProps = {
  username: string;
  bio: string;
  avatarUrl?: string;
  totalPosts: number;
  totalLikes: number;
  preferredSpecies: string[];
  onEdit: () => void;
};

export const ProfileCard: React.FC<ProfileCardProps> = ({
  username,
  bio,
  avatarUrl,
  totalPosts,
  totalLikes,
  preferredSpecies,
  onEdit,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarText}>
                {username.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.headerText}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.bio}>{bio}</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{totalPosts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{totalLikes}</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
        </View>

        <View style={styles.speciesContainer}>
          <Text style={styles.speciesTitle}>Preferred Species:</Text>
          <View style={styles.speciesList}>
            {preferredSpecies.map((species, index) => (
              <View key={index} style={styles.speciesTag}>
                <Text style={styles.speciesText}>{species}</Text>
              </View>
            ))}
          </View>
        </View>

        <Button
          mode="contained"
          onPress={onEdit}
          style={styles.editButton}
          color={theme.colors.primary}
        >
          Edit Profile
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
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  avatarPlaceholder: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: '#666',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  speciesContainer: {
    marginBottom: 16,
  },
  speciesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  speciesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  speciesTag: {
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  speciesText: {
    color: theme.colors.primary,
    fontSize: 12,
  },
  editButton: {
    marginTop: 8,
  },
});
