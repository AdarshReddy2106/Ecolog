import { View, StyleSheet, Linking, TouchableOpacity, Text, ImageBackground } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AdminTreeFormHeader from './components/AdminTreeFormHeader';
import { useAuth } from './AuthContext';

const ViewExcel = () => {
  const navigation = useNavigation();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.email === 'miyawaki.iitpkd@gmail.com';

  const openGoogleSheet = () => {
    const url = 'https://docs.google.com/spreadsheets/d/1__3lv4jGlz6Vy0exS3s5geuIr-GgdzUN/edit?gid=1816924567#gid=1816924567';
    Linking.openURL(url).catch(err =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View style={styles.container}>
      {isAdmin && <AdminTreeFormHeader />}
      <ImageBackground
        source={require("../assets/images/forest.webp")}
        resizeMode="cover"
        style={styles.imagebackground}
      >
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.button} onPress={openGoogleSheet}>
            <Text style={styles.buttonText}>Open Google Sheet</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.backButton]} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back to AdminDashboard</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imagebackground: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#4a7c59',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 5,
  },
  backButton: {
    backgroundColor: '#666',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ViewExcel;