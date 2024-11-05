import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from './src/config/theme';
import type { RootStackParamList } from './src/types/navigation';

// Import screens
import { SocialFeedScreen } from './src/features/social/screens/SocialFeedScreen';
import { ForecastScreen } from './src/features/forecast/screens/ForecastScreen';
import { RutTrackerScreen } from './src/features/rutTracker/screens/RutTrackerScreen';
import { ProfileScreen } from './src/features/profile/screens/ProfileScreen';

const Tab = createBottomTabNavigator<RootStackParamList>();

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
          <Tab.Screen
            name="Home"
            component={SocialFeedScreen}
            options={{
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
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="forest" color={color} size={size} />
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
    </SafeAreaProvider>
  );
}
