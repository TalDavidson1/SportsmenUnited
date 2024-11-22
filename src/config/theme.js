import { MD3LightTheme } from 'react-native-paper';
import { DefaultTheme } from '@react-navigation/native';

const colors = {
  primary: '#1B2B5B',
  secondary: '#D42E34',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#1B2B5B',
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors,
  },
  elevation: {
    level0: 0,
    level1: 2,
    level2: 3,
    level3: 4,
    level4: 6,
    level5: 8,
  },
};

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
  },
};
