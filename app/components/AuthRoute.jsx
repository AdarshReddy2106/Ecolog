import React, { useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function AuthRoute() {
  const { currentUser, isAdmin } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      if (currentUser) {
        if (isAdmin) {
          // If user is admin, always navigate to Admin dashboard
          navigation.reset({
            index: 0,
            routes: [{ name: 'Admin' }],
          });
        } else {
          // For regular users, always go to HomeScreen
          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          });
        }
      } else {
        // If no user is logged in, go to HomeScreen
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        });
      }
    };

    checkAuthAndNavigate();
  }, [currentUser, isAdmin, navigation]);

  return null;
} 