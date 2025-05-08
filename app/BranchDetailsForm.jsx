import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Alert, Text } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTreeData } from './TreeDataContext';

const Container = styled.View`
  flex: 1;
  min-height: 100%;
  background-color: #d8e8d2;
  align-items: center;
  justify-content: center;
`;

const Card = styled.View`
  marginLeft: 5px;
  width: 90%;
  background-color: #f5f5dc;
  padding: 20px;
  border-radius: 15px;
  elevation: 5;
  align-items: center;
  justify-content: center;
`;

const StemContainer = styled.View`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
`;

const StemTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #4a7c59;
  margin-bottom: 10px;
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
  const { treeId, branches } = route.params;
  const { updateTreeData } = useTreeData();
  
  const [stemData, setStemData] = useState(
    Array(branches).fill().map(() => ({
      height: '',
      circumference: ''
    }))
  );

  useEffect(() => {
    // Reset stem data when component mounts
    setStemData(Array(branches).fill().map(() => ({
      height: '',
      circumference: ''
    })));
  }, [branches]);

  const handleNext = () => {
    if (!treeId || !branches) {
      Alert.alert("Error", "Please enter all required details before proceeding.");
      return;
    }

    // Collect all validation errors
    const errors = [];
    const validatedData = stemData.map((stem, index) => {
      const height = parseFloat(stem.height);
      const circumference = parseFloat(stem.circumference);

      if (!stem.height || stem.height.trim() === '') {
        errors.push(`Height for Primary Stem ${index + 1}`);
      }
      if (!stem.circumference || stem.circumference.trim() === '') {
        errors.push(`Circumference for Primary Stem ${index + 1}`);
      }
      if (isNaN(height) || height <= 0) {
        errors.push(`Valid height for Primary Stem ${index + 1}`);
      }
      if (isNaN(circumference) || circumference <= 0) {
        errors.push(`Valid circumference for Primary Stem ${index + 1}`);
      }

      return {
        height: height,
        circumference: circumference
      };
    });

    // If there are any errors, show them all at once
    if (errors.length > 0) {
      Alert.alert(
        "Required Fields Missing",
        `Please enter the following required fields:\n\n${errors.join('\n')}`,
        [{ text: "OK" }]
      );
      return;
    }

    // Update the context with the validated stem data
    updateTreeData({
      treeId,
      numBranches: branches,
      stemData: validatedData,
    });

    // Navigate to UploadScreen with the validated data
    navigation.navigate("UploadScreen", {
      treeId,
      branches,
      stemData: validatedData,
    });
  };

  const updateStemData = (index, field, value) => {
    const newStemData = [...stemData];
    newStemData[index] = {
      ...newStemData[index],
      [field]: value
    };
    setStemData(newStemData);
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Container>
        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
          <Card style={{marginLeft: '1'}}>
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
              <Image source={require('../assets/images/tree-icon.png')} style={{ width: 80, height: 80 }} />
            </View>
            
            {stemData.map((stem, index) => (
              <StemContainer key={index}>
                <StemTitle>Primary Stem {index + 1}</StemTitle>
                
                <IconInput>
                  <MaterialIcons name="height" size={24} color="black" />
                  <InputField
                    placeholder="Height (in meters)"
                    value={stem.height}
                    onChangeText={(value) => {
                      const numericValue = value.replace(/[^0-9.]/g, '');
                      if (numericValue === '' || !isNaN(parseFloat(numericValue))) {
                        updateStemData(index, 'height', numericValue);
                      }
                    }}
                    keyboardType="numeric"
                  />
                </IconInput>

                <IconInput>
                  <MaterialCommunityIcons name="diameter-outline" size={24} color="black" />
                  <InputField
                    placeholder="Circumference (in cm)"
                    value={stem.circumference}
                    onChangeText={(value) => {
                      const numericValue = value.replace(/[^0-9.]/g, '');
                      if (numericValue === '' || !isNaN(parseFloat(numericValue))) {
                        updateStemData(index, 'circumference', numericValue);
                      }
                    }}
                    keyboardType="numeric"
                  />
                </IconInput>
              </StemContainer>
            ))}

            <Text style={{ color: 'red', marginTop: 10, marginBottom: 10, textAlign: 'center' }}>
              *All fields are required
            </Text>

            <Button onPress={handleNext}>
              <ButtonText>Next</ButtonText>
            </Button>
          </Card>
        </View>
      </Container>
    </ScrollView>
  );
}
