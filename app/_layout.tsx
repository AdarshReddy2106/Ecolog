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
import { StudentProvider } from './StudentContext';
import AuthRoute from './components/AuthRoute';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      // Hide the splash screen after the fonts have loaded and the
      // UI is ready.
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <TreeDataProvider>
          <StudentProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="HomeScreen" />
              <Stack.Screen name="LoginScreen" />
              <Stack.Screen name="SignUpScreen" />
              <Stack.Screen name="StudentDetails" />
              <Stack.Screen name="TreeDataForm" />
              <Stack.Screen name="BranchDetailsForm" />
              <Stack.Screen name="Upload" />
              <Stack.Screen name="ViewExcel" />
              <Stack.Screen name="Admin" />
              <Stack.Screen name="Profile" />
            </Stack>
            
            <StatusBar style="auto" />
          </StudentProvider>
        </TreeDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
