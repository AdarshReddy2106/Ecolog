import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import { auth } from './firebaseConfig';
import { supabase } from './supabaseConfig';

export default function Profile() {
  const { currentUser } = useAuth();
  const navigation = useNavigation();
  const [studentDetails, setStudentDetails] = useState(null);

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      if (!currentUser) return;

      const { data, error } = await supabase
        .from('Tree Data')
        .select('Student_Name, Student_Roll_No, Student_Group')
        .eq('User_Email', currentUser.email)
        .order('Created_At', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setStudentDetails(data[0]);
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
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
              console.error('Error logging out:', error);
            }
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/blackwp.png")}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Profile</Text>
          
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{currentUser?.email}</Text>
          </View>

          {studentDetails && (
            <>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Student Name</Text>
                <Text style={styles.value}>{studentDetails.Student_Name}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>Roll Number</Text>
                <Text style={styles.value}>{studentDetails.Student_Roll_No}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>Group</Text>
                <Text style={styles.value}>{studentDetails.Student_Group}</Text>
              </View>
            </>
          )}
          
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 