import React from 'react';
import { SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './AuthContext';
import { TreeDataProvider } from './TreeDataContext';

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import TreeDataForm from './TreeDataForm';
import BranchDetailsForm from './BranchDetailsForm';
import UploadScreen from './UploadScreen';
import AdminDashboard from './AdminDashboard';
import TreeDataListScreen from './TreeDataListScreen';
const Stack = createNativeStackNavigator();

function MainNavigator() {
  return (
    
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="LoginScreen" 
                component={LoginScreen} 
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="SignUpScreen" 
                component={SignUpScreen} 
                options={{ headerShown: false }}
              />
              
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
              <Stack.Screen 
                name="TreeDataList" 
                component={TreeDataListScreen} 
                options={{ title: 'Saved Trees' }}
              />
              
              <Stack.Screen 
                name="AdminDashboard" 
                component={AdminDashboard} 
                options={{ title: 'Admin Dashboard' }}
              />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <TreeDataProvider>
      
        <MainNavigator />
      
    </TreeDataProvider>
  );
}


// export default function App() {
//   return (
    
      
//       <AuthProvider>
        
          
//           <SafeAreaView style={{ flex: 1 }}>
//             <Stack.Navigator initialRouteName="Home">
//             <TreeDataProvider>
              
//               </TreeDataProvider>
//             </Stack.Navigator>
//           </SafeAreaView>
        
//       </AuthProvider>
      
    
//   );
// }
