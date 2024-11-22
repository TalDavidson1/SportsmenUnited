import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Surface, FAB, Searchbar, Chip, Banner, Card } from 'react-native-paper';
import { theme } from '../../../config/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Mock data for initial testing
const mockPosts = [
  {
    id: '1',
    image: 'https://placeholder.com/300x200',
    title: '8-Point Buck',
    description: 'Great morning hunt!',
    location: 'Madison County, GA',
    species: 'Whitetail Deer',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    image: 'https://placeholder.com/300x200',
    title: '5lb Bass',
    description: 'Caught on topwater',
    location: 'Lake Oconee, GA',
    species: 'Largemouth Bass',
    timestamp: new Date().toISOString(),
  },
];

export default function SocialFeedScreen({ navigation }) {
  const [posts, setPosts] = useState(mockPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getSpeciesIcon = (species) => {
    if (species.toLowerCase().includes('bass') ||
        species.toLowerCase().includes('trout') ||
        species.toLowerCase().includes('fish')) {
      return 'fish';
    } else if (species.toLowerCase().includes('deer')) {
      return 'bow-arrow';
    } else if (species.toLowerCase().includes('turkey')) {
      return 'bird';
    }
    return 'paw';
  };

  const renderPost = ({ item }) => (
    <Card style={styles.postCard}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Title title={item.title} subtitle={item.timestamp} />
      <Card.Content>
        <Text>{item.description}</Text>
        <View style={styles.tagContainer}>
          <Chip icon="map-marker" style={styles.chip}>{item.location}</Chip>
          <Chip icon={getSpeciesIcon(item.species)} style={styles.chip}>{item.species}</Chip>
        </View>
      </Card.Content>
    </Card>
  );

  const filterPosts = () => {
    return posts.filter(post => {
      const matchesSearch = post.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.species.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecies = !selectedSpecies || post.species === selectedSpecies;
      return matchesSearch && matchesSpecies;
    });
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search by location or species"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        mode="bar"
      />

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['Whitetail Deer', 'Largemouth Bass', 'Turkey', 'Trout'].map((species) => (
            <Chip
              key={species}
              selected={selectedSpecies === species}
              onPress={() => setSelectedSpecies(selectedSpecies === species ? null : species)}
              style={styles.filterChip}
              icon={getSpeciesIcon(species)}
            >
              {species}
            </Chip>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filterPosts()}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.adContainer}>
        <Text style={styles.adText}>Advertisement Space</Text>
      </View>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
        color={theme.colors.background}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchbar: {
    margin: theme.spacing.md,
  },
  filterContainer: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  filterChip: {
    marginRight: theme.spacing.sm,
  },
  listContainer: {
    padding: theme.spacing.md,
  },
  postCard: {
    marginBottom: theme.spacing.md,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.sm,
  },
  chip: {
    marginRight: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  fab: {
    position: 'absolute',
    margin: theme.spacing.md,
    right: 0,
    bottom: 60,
    backgroundColor: theme.colors.primary,
  },
  adContainer: {
    height: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adText: {
    color: theme.colors.placeholder,
  },
});
