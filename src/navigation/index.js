import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Import screens
import SocialFeedScreen from '../features/social/screens/SocialFeedScreen';
import CreatePostScreen from '../features/social/screens/CreatePostScreen';
import ForecastScreen from '../features/forecast/screens/ForecastScreen';
import RutTrackerScreen from '../features/rutTracker/screens/RutTrackerScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Colors from the logo
const COLORS = {
  primary: '#1B2B5B',
  secondary: '#D42E34',
};

// Social Stack Navigator
export const SocialStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SocialFeed"
      component={SocialFeedScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CreatePost"
      component={CreatePostScreen}
      options={{
        title: 'Create Post',
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

// Main Tab Navigator
export const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Social Feed':
            iconName = focused ? 'post' : 'post-outline';
            break;
          case 'Forecast':
            iconName = focused ? 'weather-sunny' : 'weather-partly-cloudy';
            break;
          case 'Rut Tracker':
            iconName = focused ? 'bow-arrow' : 'bow-arrow';
            break;
          case 'Profile':
            iconName = focused ? 'account' : 'account-outline';
            break;
          default:
            iconName = 'help';
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: 'gray',
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: '#fff',
      headerShown: true,
    })}
  >
    <Tab.Screen
      name="Social Feed"
      component={SocialStack}
      options={{ headerShown: false }}
    />
    <Tab.Screen name="Forecast" component={ForecastScreen} />
    <Tab.Screen name="Rut Tracker" component={RutTrackerScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
