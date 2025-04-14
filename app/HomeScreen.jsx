import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from "react-native";
import React from "react";
import { useRouter } from 'expo-router';
import { useAuth } from "./AuthContext";
import { auth } from './firebaseConfig';
import Header from './components/Header';

export default function HomeScreen() {
  const router = useRouter();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    // Show confirmation alert
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
          style: "destructive", // This makes the button red on iOS
          onPress: async () => {
            try {
              await auth.signOut();
              router.replace('/');
            } catch (error) {
              console.error("Error logging out:", error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {currentUser && <Header />}
      <ImageBackground
        source={require("../assets/images/forest.png")}
        resizeMode="cover"
        style={styles.imagebackground}
      >
        <Text style={styles.title}>Tree IQ</Text>
        
        {!currentUser ? (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/LoginScreen')}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/SignUpScreen')}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('TreeDataForm')}
            >
              <Text style={styles.buttonText}>Add Tree Data</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.logoutButton]} 
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagebackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 80,
    color: "white",
  },
  button: {
    height: 60,
    width: 150,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 6,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#c0392b",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});