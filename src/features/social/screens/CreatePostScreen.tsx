import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Banner } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { MOCK_SPECIES } from '../types';
import { postService } from '../services/PostService';
import { theme } from '../../../config/theme';

export const CreatePostScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [species, setSpecies] = useState('');
  const [location, setLocation] = useState<null | {
    latitude: number;
    longitude: number;
    name: string;
  }>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        name: `${address.city || ''}, ${address.region || ''}, ${address.country || ''}`,
      });
    } catch (error) {
      setError('Error getting location');
    }
  };

  const handleSubmit = async () => {
    if (!title || !species || !location) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await postService.createPost({
        title,
        description,
        species,
        location,
        imageUrl: image || undefined,
      });
      navigation.goBack();
    } catch (error) {
      setError('Error creating post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Banner
        visible={!!error}
        actions={[{ label: 'Dismiss', onPress: () => setError(null) }]}
      >
        {error}
      </Banner>

      <View style={styles.form}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          style={styles.input}
        />

        <Button
          mode="outlined"
          onPress={getCurrentLocation}
          style={styles.button}
          icon="map-marker"
        >
          {location ? location.name : 'Add Location'}
        </Button>

        <Button
          mode="outlined"
          onPress={pickImage}
          style={styles.button}
          icon="camera"
        >
          Add Photo
        </Button>

        {image && (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        )}

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          loading={loading}
          disabled={loading}
        >
          Create Post
        </Button>
      </View>

      {/* Banner Ad Space */}
      <View style={styles.adContainer}>
        <Banner visible={true}>
          Advertisement Space
        </Banner>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  button: {
    marginBottom: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  submitButton: {
    marginTop: 8,
    backgroundColor: theme.colors.primary,
  },
  adContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
});
