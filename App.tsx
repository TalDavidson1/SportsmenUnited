import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import { theme } from './src/config/theme';
import type { RootStackParamList } from './src/types/navigation';

const Tab = createBottomTabNavigator<RootStackParamList>();

// Placeholder components
const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{name} Screen</Text>
  </View>
);

const HomeScreen = () => <PlaceholderScreen name="Home" />;
const ForecastScreen = () => <PlaceholderScreen name="Forecast" />;
const PostScreen = () => <PlaceholderScreen name="Post" />;
const RutTrackerScreen = () => <PlaceholderScreen name="Rut Tracker" />;
const ProfileScreen = () => <PlaceholderScreen name="Profile" />;

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.text,
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.background,
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Forecast" component={ForecastScreen} />
          <Tab.Screen name="Post" component={PostScreen} />
          <Tab.Screen name="RutTracker" component={RutTrackerScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
