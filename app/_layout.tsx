import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from './AuthContext';
import { TreeDataProvider } from './TreeDataContext';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TreeDataProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="HomeScreen" />
            <Stack.Screen name="LoginScreen" />
            <Stack.Screen name="SignUpScreen" />
            <Stack.Screen name="StudentDetails" />
            <Stack.Screen name="TreeDataForm" />
            <Stack.Screen name="BranchDetailsForm" />
            <Stack.Screen name="Upload" />
            <Stack.Screen name="view-excel" />
            <Stack.Screen name="admin" />
          </Stack>
          <StatusBar style="auto" />
        </AuthProvider>
      </TreeDataProvider>
    </ThemeProvider>
  );
}
