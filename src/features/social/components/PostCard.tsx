import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { theme } from '../../../config/theme';

type PostCardProps = {
  title: string;
  location: string;
  species: string;
  imageUrl?: string;
  likes: number;
  onLike: () => void;
};

export const PostCard: React.FC<PostCardProps> = ({
  title,
  location,
  species,
  imageUrl,
  likes,
  onLike,
}) => {
  return (
    <Card style={styles.card}>
      {imageUrl && (
        <Card.Cover source={{ uri: imageUrl }} style={styles.image} />
      )}
      <Card.Content>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.details}>Location: {location}</Text>
        <Text style={styles.details}>Species: {species}</Text>
        <View style={styles.likeContainer}>
          <Button
            icon="thumb-up"
            mode="text"
            onPress={onLike}
            style={styles.likeButton}
          >
            {likes} Likes
          </Button>
        </View>
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
  image: {
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.colors.primary,
  },
  details: {
    fontSize: 14,
    marginBottom: 4,
    color: '#666',
  },
  likeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  likeButton: {
    marginLeft: 8,
  },
});
