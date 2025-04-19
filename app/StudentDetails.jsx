import React, { useState } from 'react';
import { View, Image, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTreeData } from './TreeDataContext';
import { useAuth } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.View`
  flex: 1;
  background-color: #d8e8d2;
  align-items: center;
  justify-content: center;
`;

const Card = styled.View`
  width: 90%;
  background-color: #f5f5dc;
  padding: 20px;
  border-radius: 15px;
  elevation: 5;
`;

const IconInput = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;
`;

const InputField = styled.TextInput`
  flex: 1;
  font-size: 16px;
  padding-left: 10px;
`;

const Button = styled.TouchableOpacity`
  background-color: #4a7c59;
  padding: 12px;
  border-radius: 10px;
  align-items: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export default function StudentDetails() {
  const navigation = useNavigation();
  const { updateTreeData } = useTreeData();
  const { currentUser } = useAuth();
  
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [group, setGroup] = useState('');

  const handleNext = async () => {
    if (!name || !rollNo || !group) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      // Store student details in AsyncStorage for persistence
      const studentDetails = {
        studentName: name,
        studentRollNo: rollNo,
        studentGroup: group
      };

      await AsyncStorage.setItem(
        `studentDetails_${currentUser.email}`,
        JSON.stringify(studentDetails)
      );

      // Store in context
      updateTreeData({
        studentName: name,
        studentRollNo: rollNo,
        studentGroup: group
      });

      // Navigate to TreeDataForm without creating a database entry
      navigation.navigate('TreeDataForm');
    } catch (error) {
      Alert.alert('Error', 'Failed to save student details');
      console.error(error);
    }
  };

  return (
    <Container>
      <Card>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Image 
            source={require('../assets/images/tree-icon.png')} 
            style={{ width: 80, height: 80 }} 
          />
        </View>

        <IconInput>
          <AntDesign name="user" size={20} color="#4a7c59" />
          <InputField 
            placeholder="Student Name" 
            value={name} 
            onChangeText={setName}
          />
        </IconInput>

        <IconInput>
          <MaterialIcons name="format-list-numbered" size={24} color="#4a7c59" />
          <InputField 
            placeholder="Roll Number" 
            value={rollNo} 
            onChangeText={setRollNo}
          />
        </IconInput>
        
        <IconInput>
          <FontAwesome5 name="users" size={20} color="#4a7c59" />
          <InputField 
            placeholder="Group" 
            value={group} 
            onChangeText={setGroup}
          />
        </IconInput>

        <Button onPress={handleNext}>
          <ButtonText>Next</ButtonText>
        </Button>
      </Card>
    </Container>
  );
}
