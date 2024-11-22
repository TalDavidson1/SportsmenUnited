import React from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, Avatar, Title, Card, useTheme } from 'react-native-paper';

const ProfileScreen = () => {
  const theme = useTheme();
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [interests, setInterests] = React.useState('');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ padding: 16 }}>
        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <View style={{ alignItems: 'center', marginBottom: 24 }}>
              <Avatar.Icon
                size={80}
                icon="account"
                style={{ backgroundColor: theme.colors.primary }}
              />
              <Button
                mode="outlined"
                onPress={() => console.log('Change photo')}
                style={{ marginTop: 8 }}
              >
                Change Photo
              </Button>
            </View>

            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={{ marginBottom: 16 }}
            />
            <TextInput
              label="Location"
              value={location}
              onChangeText={setLocation}
              mode="outlined"
              style={{ marginBottom: 16 }}
            />
            <TextInput
              label="Bio"
              value={bio}
              onChangeText={setBio}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={{ marginBottom: 16 }}
            />
            <TextInput
              label="Hunting/Fishing Interests"
              value={interests}
              onChangeText={setInterests}
              mode="outlined"
              multiline
              numberOfLines={2}
              style={{ marginBottom: 16 }}
            />

            <Button
              mode="contained"
              onPress={() => console.log('Save profile')}
              style={{ backgroundColor: theme.colors.primary }}
            >
              Save Profile
            </Button>
          </Card.Content>
        </Card>

        {/* Ad Space */}
        <View style={{ height: 50, backgroundColor: '#eee', marginTop: 16, justifyContent: 'center', alignItems: 'center' }}>
          <Title>Ad Space</Title>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
