import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { rgb } from 'polished';

const Admin = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/forest.png")}
        resizeMode="cover"
        style={styles.imagebackground}
      >
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('ViewExcel')}
        >
          <Text style={styles.buttonText}>View Excel Data</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('TreeDataForm')}
        >
          <Text style={styles.buttonText}>Add tree data</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  imagebackground: {
    flex: 1,
    width: "100%",
    height: "120%",
    paddingBottom: 100,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  button: {
    height: 60,
    width: 150,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,1.5)',
    padding: 6,
    marginLeft: 100,
    marginBottom: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    padding: 4,
  },
  header: {
    fontSize: 46,
    borderRadius: 45,
    fontWeight: 'bold',
    backgroundColor: rgb(127, 212, 78),
    color: rgb(96, 219, 40),
    marginBottom: 30,
  }
});

export default Admin;