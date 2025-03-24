import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


import LoginScreen from './Login-Page';
import SignUpScreen from './Sign-Up';
import forestImg from "@/assets/images/forest.png"


const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
      source={forestImg}
      resizeMode = "cover"
      style={styles.image}
      >
      <Text style={styles.title}>Tree Data Collection</Text>

      <Link href="/Login-Page" style={{ marginHorizontal: 'auto' }} 
      asChild>
      <Pressable style={styles.button}>
      <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      </Link>

      <Link href="/Sign-Up" style={{ marginHorizontal: 'auto' }} 
      asChild>
      <Pressable style={styles.button}>
      <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      </Link>
      </ImageBackground>
      
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    heigth: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 120,
    marginTop:-50,
   
  },
  link: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 4,
  },
  button: {
    height: 60,
    width:150,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 6,
    marginBottom: 50,

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
  }
})