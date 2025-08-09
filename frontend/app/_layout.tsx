import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AIProvider } from './context/AIContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AIProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack></Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AIProvider>
  );
}
