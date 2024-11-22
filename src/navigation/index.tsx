import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../features/social/types';
import { theme } from '../config/theme';

// Screens
import { SocialFeedScreen } from '../features/social/screens/SocialFeedScreen';
import { CreatePostScreen } from '../features/social/screens/CreatePostScreen';
import { ForecastScreen } from '../features/forecast/screens/ForecastScreen';
import { RutTrackerScreen } from '../features/rutTracker/screens/RutTrackerScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const SocialStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={SocialFeedScreen}
      options={{ title: 'Sportsmen United' }}
    />
    <Stack.Screen
      name="CreatePost"
      component={CreatePostScreen}
      options={{ title: 'Create Post' }}
    />
  </Stack.Navigator>
);

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={SocialStack}
          options={{
            tabBarLabel: 'Feed',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Forecast"
          component={ForecastScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="weather-partly-cloudy" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="RutTracker"
          component={RutTrackerScreen}
          options={{
            tabBarLabel: 'Rut',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="deer" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
