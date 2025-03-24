import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import TreeDataForm from './TreeDataForm';
import BranchDetailsForm from './BranchDetailsForm';
import UploadScreen from './UploadScreen';
import AdminDashboard from './AdminDashboard';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator initialRouteName="Home">
            {/* Auth Screens */}
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Signup" 
              component={SignUpScreen} 
              options={{ headerShown: false }}
            />

            {/* Main App Screens */}
            <Stack.Screen 
              name="TreeDataForm" 
              component={TreeDataForm} 
              options={{ title: 'Tree Data Entry' }}
            />
            <Stack.Screen 
              name="BranchDetailsForm" 
              component={BranchDetailsForm} 
              options={{ title: 'Branch Details' }}
            />
            <Stack.Screen 
              name="UploadScreen" 
              component={UploadScreen} 
              options={{ title: 'Upload Data' }}
            />

            {/* Admin Screens */}
            <Stack.Screen 
              name="AdminDashboard" 
              component={AdminDashboard} 
              options={{ title: 'Admin Dashboard' }}
            />
          </Stack.Navigator>
      </SafeAreaView>
    </AuthProvider>
  );
}

export default App;