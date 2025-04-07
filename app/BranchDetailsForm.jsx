import React, { useState } from 'react';
import { View, ScrollView,Image, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Container = styled.View`
  
  flex: 1;
  background-color: #d8e8d2;
  align-items: center;
  justify-content: center;
`;


const Card = styled.View`
  marginTop: 150px;
  marginLeft: 15px;
  width: 90%;
  background-color: #f5f5dc;
  padding: 20px;
  border-radius: 15px;
  elevation: 5;
  align-items: center;
  justify-content: center;
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

export default function BranchDetailsForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { treeId, height, branches } = route.params;
  
  const [diameters, setDiameters] = useState(Array(branches).fill(''));

  const handleNext = () => {
    if (!treeId || !height || !branches ) {
      Alert.alert("Error", "Please enter all required details before proceeding.");
      return;
    }
  
    console.log("Navigating to UploadScreen with:", {
      treeId,
      height,
      branches,
      branchDiameters: diameters,
    });
  
    navigation.navigate("UploadScreen", {
      treeId,
      height,
      branches,
      branchDiameters: diameters,
    });
  };
  return (
    <ScrollView>
      <Container>
      
        <Card>
          <View style={{ alignItems: 'center', marginBottom: 10 }}>
            <Image source={require('../assets/images/tree-icon.png')} style={{ width: 80, height: 80 }} />
          </View>
          
          {diameters.map((diameter, index) => (
            <IconInput key={index}>
              <MaterialCommunityIcons name="diameter-outline" size={24} color="black" />
              <InputField placeholder={`Primary Stem ${index + 1} Diameter`} value={diameter} onChangeText={(value) => {
                const newDiameters = [...diameters];
                newDiameters[index] = value;
                setDiameters(newDiameters);
              }} keyboardType="numeric" />
            </IconInput>
          ))}
          <Button onPress={handleNext}>
            <ButtonText>Next</ButtonText>
          </Button>
        </Card>
      
      </Container>
    </ScrollView>
  );
}
