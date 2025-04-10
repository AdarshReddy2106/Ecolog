import { View, StyleSheet, Linking, TouchableOpacity, Text, ImageBackground } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Admin from './Admin';
import TreeDataForm from './TreeDataForm';

const ViewExcel = () => {
  const navigation = useNavigation();

  const openGoogleSheet = () => {
    const url = 'https://docs.google.com/spreadsheets/d/1__3lv4jGlz6Vy0exS3s5geuIr-GgdzUN/edit?gid=1816924567#gid=1816924567';
    Linking.openURL(url).catch(err =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View style={styles.container}>
    <ImageBackground
    source={require("../assets/images/forest.png")}
    resizeMode="cover"
    style={styles.imagebackground}>
      
      <TouchableOpacity style={styles.button} onPress={openGoogleSheet}>
        <Text style={styles.buttonText}>Open Google Sheet</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TreeDataForm')}>
        <Text style={styles.buttonText}>Go to Tree Data Form</Text>
      </TouchableOpacity>
      
      {/* Only add back button if coming from AdminDashboard */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Admin')}>
        <Text style={styles.buttonText}>Back to AdminDashboard</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign:'center',
    padding: 4,
  },
});

export default ViewExcel;