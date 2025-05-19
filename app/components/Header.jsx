import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../AuthContext';

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { currentUser } = useAuth();

  // Don't show header on LoginScreen and SignUpScreen
  if (route.name === 'LoginScreen' || route.name === 'SignUpScreen') {
    return null;
  }

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {route.name !== 'Home' && (
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>ECOLOG</Text>
      </View>
      {currentUser && (
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={32} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: 'rgba(164, 195, 147, 0.54)',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
    padding: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileButton: {
    padding: 8,
  },
});

export default Header; 