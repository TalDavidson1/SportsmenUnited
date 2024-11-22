import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1B2B5B',
    secondary: '#D42E34',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#1B2B5B',
  },
};

import SocialFeedScreen from './src/features/social/screens/SocialFeedScreen.js';
import CreatePostScreen from './src/features/social/screens/CreatePostScreen.js';
import ForecastScreen from './src/features/forecast/screens/ForecastScreen.js';
import RutTrackerScreen from './src/features/rutTracker/screens/RutTrackerScreen.js';
import ProfileScreen from './src/features/profile/screens/ProfileScreen.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function SocialStack() {
  return (
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
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
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
                    iconName = focused ? 'arrow-projectile' : 'arrow-projectile';
                    break;
                  case 'Profile':
                    iconName = focused ? 'account' : 'account-outline';
                    break;
                  default:
                    iconName = 'help';
                }

                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: theme.colors.primary,
              tabBarInactiveTintColor: theme.colors.placeholder,
              headerStyle: {
                backgroundColor: theme.colors.primary,
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
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
