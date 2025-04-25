import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../AuthContext';

const AdminHeader = () => {
  const { currentUser } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Admin Dashboard</Text>
      
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
            </View>
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
  },
  emailText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default AdminHeader; 