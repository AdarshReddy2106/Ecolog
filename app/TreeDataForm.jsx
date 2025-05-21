import React, { useState, useEffect } from 'react';
import { View, Image, Alert, ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AntDesign, MaterialIcons, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTreeData } from './TreeDataContext';
import { MaterialCommunityIcons as MaterialCommunityIconsExpo } from '@expo/vector-icons';
import Header from './components/Header';
import { useAuth } from './AuthContext';
import AdminTreeFormHeader from './components/AdminTreeFormHeader';

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
  const { treeData, updateTreeData, resetTreeData } = useTreeData();
  const { currentUser } = useAuth();
  
  const [treeId, setTreeId] = useState('');
  const [numBranches, setNumBranches] = useState('');
  const [isAdminInitialized, setIsAdminInitialized] = useState(false);
  const [lastUserId, setLastUserId] = useState(null);

  // Reset form when a new user starts
  useEffect(() => {
    if (currentUser?.email !== lastUserId) {
      setTreeId('');
      setNumBranches('');
      resetTreeData();
      setLastUserId(currentUser?.email);
    }
  }, [currentUser]);

  // Initialize form with context values only when navigating back
  useFocusEffect(
    React.useCallback(() => {
      if (currentUser?.email === lastUserId && treeData) {
        setTreeId(treeData.treeId || '');
        setNumBranches(treeData.numBranches ? treeData.numBranches.toString() : '');
      }

      // Initialize admin data if needed
      if (currentUser?.email === 'miyawaki.iitpkd@gmail.com' && !isAdminInitialized) {
        updateTreeData({
          studentName: 'admin',
          studentRollNo: '1',
          studentGroup: 'admin',
          isAdmin: true
        });
        setIsAdminInitialized(true);
      }
    }, [currentUser, lastUserId, treeData])
  );

  console.log('Current treeData:', treeData); // Add this for debugging

  const handleNext = () => {
    // Validate inputs
    if (!treeId || !numBranches) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    // Convert to numbers and validate
    const branchesNum = parseInt(numBranches, 10);

    if (isNaN(branchesNum) || branchesNum < 1) {
      Alert.alert('Error', 'Please enter a valid number of branches (must be at least 1)');
      return;
    }

    // Update context with validated numeric values
    updateTreeData({
      treeId,
      numBranches: branchesNum,
      isAdmin: currentUser?.email === 'miyawaki.iitpkd@gmail.com'
    });

    navigation.navigate('BranchDetailsForm', {
      treeId,
      branches: branchesNum,
      isAdmin: currentUser?.email === 'miyawaki.iitpkd@gmail.com'
    });
  };

  const isAdmin = currentUser?.email === 'miyawaki.iitpkd@gmail.com';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../assets/images/blackwp.webp")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Header />
        <Container>
          <Card>
            <View style={styles.iconContainer}>
              <Image 
                source={require('../assets/images/tree-icon.webp')} 
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