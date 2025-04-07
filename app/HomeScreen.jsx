import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { Link } from 'expo-router'


import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import forestImg from "@/assets/images/forest.png"
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setIsAdmin(["admin@example.com", "a@gmail.com"].includes(user.email));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/blackwp.png")}
      style={styles.imagebackground}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Tree Data Collection</Text>
          
          {!user ? (
            // Show these buttons when user is not logged in
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("SignupScreen")}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </>
          ) : (
            // Show these buttons when user is logged in
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("TreeDataForm")}
              >
                <Text style={styles.buttonText}>Add Tree Data</Text>
              </TouchableOpacity>
              
              {isAdmin && (
                <TouchableOpacity
                  style={[styles.button, styles.adminButton]}
                  onPress={() => navigation.navigate("AdminDashboard")}
                >
                  <Text style={styles.buttonText}>View Excel</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={[styles.button, styles.logoutButton]} 
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imagebackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4a7c59",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  adminButton: {
    backgroundColor: "#2c3e50",
  },
  logoutButton: {
    backgroundColor: "#c0392b",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});