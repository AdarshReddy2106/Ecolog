import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { Link } from 'expo-router'


import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import forestImg from "@/assets/images/forest.png"
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useAuth } from "./AuthContext";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (user) {
      navigation.navigate('StudentDetails');
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
      source={require("../assets/images/forest.png")}
      resizeMode="cover"
      style={styles.imagebackground}
    >
        
          <Text style={styles.title}>Tree IQ</Text>
          
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
                onPress={() => navigation.navigate("SignUpScreen")}
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
                  onPress={() => navigation.navigate("ViewExcel")}
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
        </ImageBackground>
        </View>
  );
}

const styles = StyleSheet.create({
  imagebackground: {
    flex: 1,
    width: "100%",
    height: "120%",
    paddingBottom: 100,
    resizeMode: 'cover',
    justifyContent: 'center'

  },
  container: {
    flex: 1,
    flexDirection:'column',
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 80,
    marginTop:40,
    color: "white",
    textAlign: "center",
  },
  button: {
    height: 60,
    width:150,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,1.5)',
    padding: 6,
    marginLeft:100,
    marginBottom: 50,

  },
  adminButton: {
    backgroundColor: 'rgba(0,0,0,1.5)',
  },
  logoutButton: {
    backgroundColor: "#c0392b",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign:'center',
    padding: 4,
  },
});