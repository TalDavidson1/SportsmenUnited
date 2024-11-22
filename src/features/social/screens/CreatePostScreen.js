import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button, Text, Surface, Chip } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { theme } from '../../../config/theme';

export default function CreatePostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [species, setSpecies] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

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

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need location permissions to make this work!');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (address[0]) {
      setLocation(`${address[0].city}, ${address[0].region}`);
    }
  };

  const handlePost = () => {
    // Here we would normally send the post to a backend
    // For now, we'll just go back to the feed
    navigation.goBack();
  };

  const speciesOptions = [
    'Whitetail Deer', 'Largemouth Bass', 'Turkey', 'Trout',
    'Duck', 'Elk', 'Crappie', 'Catfish'
  ];

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.surface}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={pickImage}
          style={styles.button}
          icon="camera"
        >
          Add Photo
        </Button>

        {image && (
          <Image source={{ uri: image }} style={styles.image} />
        )}

        <Button
          mode="contained"
          onPress={getLocation}
          style={styles.button}
          icon="map-marker"
        >
          Add Location
        </Button>

        {location && (
          <Chip icon="map-marker" style={styles.chip}>{location}</Chip>
        )}

        <Text style={styles.label}>Select Species</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.speciesContainer}
        >
          {speciesOptions.map((option) => (
            <Chip
              key={option}
              selected={species === option}
              onPress={() => setSpecies(option)}
              style={styles.chip}
            >
              {option}
            </Chip>
          ))}
        </ScrollView>

        <Button
          mode="contained"
          onPress={handlePost}
          style={styles.submitButton}
          disabled={!title || !image || !species}
        >
          Post
        </Button>
      </Surface>

      <View style={styles.adContainer}>
        <Text style={styles.adText}>Advertisement Space</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  surface: {
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    elevation: 4,
    borderRadius: 8,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  button: {
    marginBottom: theme.spacing.md,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: theme.spacing.md,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: theme.spacing.sm,
    color: theme.colors.primary,
  },
  speciesContainer: {
    marginBottom: theme.spacing.md,
  },
  chip: {
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  submitButton: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  adContainer: {
    height: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing.md,
  },
  adText: {
    color: theme.colors.placeholder,
  },
});
