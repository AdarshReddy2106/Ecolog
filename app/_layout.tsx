import { Stack } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import TreeDataProvider from './TreeDataContext';
import AuthProvider from './AuthContext';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
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
            <Stack.Screen name="Profile" />
          </Stack>
          <StatusBar style="auto" />
        </AuthProvider>
      </TreeDataProvider>
    </ThemeProvider>
  );
}
