import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyButton from './MyButton';

const Admin = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      
      <MyButton 
        title="View Excel Data" 
        onPress={() => navigation.navigate('ViewExcel')} 
      />
      
      <View style={styles.spacer} />
      
      <MyButton 
        title="Enter Tree Data" 
        onPress={() => navigation.navigate('TreeDataForm')} 
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  spacer: {
    height: 20,
  }
});

export default Admin;