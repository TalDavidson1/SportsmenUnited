import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { PostCard } from '../components/PostCard';
import { theme } from '../../../config/theme';

// Mock data for testing
const MOCK_POSTS = [
  {
    id: '1',
    title: '8-Point Buck',
    location: 'Warren County, VA',
    species: 'Whitetail Deer',
    imageUrl: 'https://placeholder.com/deer1',
    likes: 24,
  },
  {
    id: '2',
    title: 'Lake Trophy Bass',
    location: 'Smith Mountain Lake, VA',
    species: 'Largemouth Bass',
    imageUrl: 'https://placeholder.com/bass1',
    likes: 18,
  },
];

export const SocialFeedScreen = () => {
  const [posts, setPosts] = useState(MOCK_POSTS);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {posts.map(post => (
          <PostCard
            key={post.id}
            title={post.title}
            location={post.location}
            species={post.species}
            imageUrl={post.imageUrl}
            likes={post.likes}
            onLike={() => handleLike(post.id)}
          />
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {}}
        color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});
