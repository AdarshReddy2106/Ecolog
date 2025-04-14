import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../AuthContext';

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { currentUser } = useAuth();

  // Don't show header on HomeScreen when user is not logged in
  if (route.name === 'Home' && !currentUser) {
    return null;
  }

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Tree IQ</Text>
      {currentUser && (
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={32} color="black" />
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