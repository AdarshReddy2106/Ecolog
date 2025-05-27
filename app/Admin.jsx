import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AdminHeader from './components/AdminHeader';
import { auth } from './firebaseConfig';

const Admin = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await auth.signOut();
              navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
              });
            } catch (error) {
              console.error('Error signing out:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AdminHeader />
      <ImageBackground
        source={require("../assets/images/forest.webp")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('ViewExcel')}
          >
            <MaterialIcons name="table-chart" size={24} color="white" />
            <Text style={styles.buttonText}>View Excel Data</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('TreeDataForm')}
          >
            <MaterialIcons name="add-circle-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Add Tree Data</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]} 
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={24} color="white" />
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 124, 89, 0.9)', // #4a7c59 with opacity
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginVertical: 10,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: 'rgba(220, 53, 69, 0.9)', // red color for logout
  },
});

export default Admin;