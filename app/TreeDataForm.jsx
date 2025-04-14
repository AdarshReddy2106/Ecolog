import React, { useState, useEffect } from 'react';
import { View, Image, Alert, ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTreeData } from './TreeDataContext';
import { MaterialCommunityIcons as MaterialCommunityIconsExpo } from '@expo/vector-icons';
import Header from './components/Header';
import { useAuth } from './AuthContext';

const Container = styled.View`
  flex: 1;
  padding-top: 20px;
  align-items: center;
  justify-content: center;
  background-color: #d8e8d2;
`;

const Card = styled.View`
  width: 90%;
  background-color: #f5f5dc;
  padding: 20px;
  border-radius: 15px;
  elevation: 5;
  margin-top: 20px;
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

const TreeDataForm = () => {
  const navigation = useNavigation();
  const { treeData, updateTreeData } = useTreeData();
  const { loading } = useAuth();
  
  const [treeId, setTreeId] = useState('');
  const [height, setHeight] = useState('');
  const [numBranches, setNumBranches] = useState('');
  const [mainBranchDiameter, setMainBranchDiameter] = useState('');

  useEffect(() => {
    // Initialize form with context values
    if (treeData) {
      setTreeId(treeData.treeId || '');
      setHeight(treeData.height ? treeData.height.toString() : '');
      setNumBranches(treeData.numBranches ? treeData.numBranches.toString() : '');
      setMainBranchDiameter(treeData.mainBranchDiameter ? treeData.mainBranchDiameter.toString() : '');
    }
  }, [treeData]);

  if (loading) {
    return null; // or a loading spinner
  }

  console.log('Current treeData:', treeData); // Add this for debugging

  const handleNext = () => {
    // Validate inputs
    if (!treeId || !height || !numBranches || !mainBranchDiameter) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    // Get student details from context
    const { studentName, studentRollNo, studentGroup } = treeData;

    // Convert to numbers and validate
    const heightNum = parseFloat(height);
    const branchesNum = parseInt(numBranches, 10);
    const mainDiameterNum = parseFloat(mainBranchDiameter);

    if (isNaN(heightNum) || heightNum <= 0) {
      Alert.alert('Error', 'Please enter a valid height (must be greater than 0)');
      return;
    }

    if (isNaN(branchesNum) || branchesNum < 1) {
      Alert.alert('Error', 'Please enter a valid number of branches (must be at least 1)');
      return;
    }

    if (isNaN(mainDiameterNum) || mainDiameterNum <= 0) {
      Alert.alert('Error', 'Please enter a valid main branch diameter (must be greater than 0)');
      return;
    }

    // Update context with validated numeric values
    updateTreeData({
      treeId,
      height: heightNum,
      numBranches: branchesNum,
      mainBranchDiameter: mainDiameterNum,
      studentName,
      studentRollNo,
      studentGroup
    });

    navigation.navigate('BranchDetailsForm', {
      treeId,
      height: heightNum,
      branches: branchesNum,
      mainBranchDiameter: mainDiameterNum,
      studentName,
      studentRollNo,
      studentGroup
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../assets/images/blackwp.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Header />
        <Container>
          <Card>
            <View style={styles.iconContainer}>
              <Image 
                source={require('../assets/images/tree-icon.png')} 
                style={styles.treeIcon}
                resizeMode="contain"
              />
            </View>
            
            <IconInput>
              <AntDesign name="idcard" size={24} color="black" />
              <InputField
                placeholder="Tree ID"
                value={treeId}
                onChangeText={setTreeId}
              />
            </IconInput>

            <IconInput>
              <MaterialIcons name="height" size={24} color="black" />
              <InputField
                placeholder="Tree Height (in meters)"
                value={height}
                onChangeText={(text) => {
                  // Only allow valid numeric input
                  const numericValue = text.replace(/[^0-9.]/g, '');
                  if (numericValue === '' || !isNaN(parseFloat(numericValue))) {
                    setHeight(numericValue);
                  }
                }}
                keyboardType="numeric"
              />
            </IconInput>

            <IconInput>
              <MaterialCommunityIcons name="diameter" size={24} color="black" />
              <InputField
                placeholder="Main Branch Diameter (in cm)"
                value={mainBranchDiameter}
                onChangeText={(text) => {
                  // Only allow valid numeric input
                  const numericValue = text.replace(/[^0-9.]/g, '');
                  if (numericValue === '' || !isNaN(parseFloat(numericValue))) {
                    setMainBranchDiameter(numericValue);
                  }
                }}
                keyboardType="numeric"
              />
            </IconInput>

            <IconInput>
              <Octicons name="number" size={24} color="black" />
              <InputField
                placeholder="Number of Primary Stems"
                value={numBranches}
                onChangeText={(text) => {
                  // Only allow positive integers
                  const intValue = text.replace(/[^0-9]/g, '');
                  if (intValue === '' || !isNaN(parseInt(intValue))) {
                    setNumBranches(intValue);
                  }
                }}
                keyboardType="numeric"
              />
            </IconInput>

            <Button onPress={handleNext}>
              <ButtonText>Next</ButtonText>
            </Button>
          </Card>
        </Container>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  treeIcon: {
    width: 80,
    height: 80,
  },
});

export default TreeDataForm;