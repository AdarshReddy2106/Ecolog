import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig';

const AdminTreeFormHeader = () => {
  const { currentUser } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Tree Data Form</Text>
      
      <TouchableOpacity 
        onPress={() => setShowProfileModal(true)}
        style={styles.profileButton}
      >
        <MaterialIcons name="account-circle" size={32} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showProfileModal}
        onRequestClose={() => setShowProfileModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setShowProfileModal(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <MaterialIcons name="account-circle" size={50} color="#4a7c59" />
              <Text style={styles.emailText}>{currentUser?.email}</Text>
              <Text style={styles.roleText}>Administrator</Text>
            </View>

            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => {
                setShowProfileModal(false);
                navigation.navigate('Admin');
              }}
            >
              <MaterialIcons name="dashboard" size={24} color="white" />
              <Text style={styles.buttonText}>Back to Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.modalButton, styles.logoutButton]}
              onPress={handleLogout}
            >
              <MaterialIcons name="logout" size={24} color="white" />
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4a7c59',
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingTop: 40,
    elevation: 5,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  modalContent: {
    backgroundColor: 'white',
    marginTop: 60,
    marginRight: 20,
    marginLeft: 'auto',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    width: 250,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
  },
  emailText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a7c59',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  roleText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default AdminTreeFormHeader; 