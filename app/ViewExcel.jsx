import { View, StyleSheet, Linking, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MyButton from './MyButton';

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
      <Text style={styles.header}>Excel Data View</Text>
      
      <TouchableOpacity style={styles.button} onPress={openGoogleSheet}>
        <Text style={styles.buttonText}>Open Google Sheet</Text>
      </TouchableOpacity>
      
      <MyButton 
        title="Go to Tree Data Form" 
        onPress={() => navigation.navigate('TreeDataForm')} 
      />
      
      {/* Only add back button if coming from AdminDashboard */}
      <MyButton 
        title="Back to Admin Dashboard" 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 10,
  }
});

export default ViewExcel;