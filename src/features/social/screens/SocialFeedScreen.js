import React from 'react';
import { View, FlatList } from 'react-native';
import { FAB, Card, Title, Paragraph, useTheme, Avatar } from 'react-native-paper';

const SocialFeedScreen = ({ navigation }) => {
  const theme = useTheme();
  const [posts, setPosts] = React.useState([
    {
      id: '1',
      title: '8-Point Buck',
      location: 'Montgomery County, VA',
      species: 'Whitetail Deer',
      date: '2024-02-20',
      likes: 12
    },
    {
      id: '2',
      title: 'Lake Trophy',
      location: 'Smith Mountain Lake, VA',
      species: 'Bass',
      date: '2024-02-19',
      likes: 8
    },
  ]);

  const getSpeciesIcon = (species) => {
    if (species.toLowerCase().includes('deer')) return 'bow-arrow';
    if (species.toLowerCase().includes('bass') || species.toLowerCase().includes('fish')) return 'fish';
    if (species.toLowerCase().includes('turkey')) return 'bird';
    return 'paw';
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Card style={{ margin: 8, elevation: 2 }}>
            <Card.Content>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Avatar.Icon size={40} icon={getSpeciesIcon(item.species)} />
                <View style={{ marginLeft: 12 }}>
                  <Title>{item.title}</Title>
                  <Paragraph style={{ color: '#666' }}>{item.species}</Paragraph>
                </View>
              </View>
              <Paragraph>📍 {item.location}</Paragraph>
              <Paragraph>📅 {item.date}</Paragraph>
              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <Paragraph>❤️ {item.likes} likes</Paragraph>
              </View>
            </Card.Content>
          </Card>
        )}
        keyExtractor={item => item.id}
      />
      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: theme.colors.primary,
        }}
        onPress={() => navigation.navigate('CreatePost')}
      />
      {/* Ad Space */}
      <View style={{ height: 50, backgroundColor: '#eee', position: 'absolute', bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
        <Paragraph>Ad Space</Paragraph>
      </View>
    </View>
  );
};

export default SocialFeedScreen;
