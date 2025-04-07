// import React, { useState } from 'react';
// import { View, Image, Alert } from 'react-native';
// import styled from 'styled-components/native';
// import { useNavigation } from '@react-navigation/native';
// import { AntDesign, MaterialIcons, Octicons } from '@expo/vector-icons';
// import { useTreeData } from './TreeDataContext';

// const Container = styled.View`
//   flex: 1;
//   background-color: #d8e8d2;
//   align-items: center;
//   justify-content: center;
// `;

// const Card = styled.View`
//   width: 90%;
//   background-color: #f5f5dc;
//   padding: 20px;
//   border-radius: 15px;
//   elevation: 5;
// `;

// const IconInput = styled.View`
//   flex-direction: row;
//   align-items: center;
//   background-color: white;
//   border-radius: 10px;
//   margin-bottom: 15px;
//   padding: 10px;
// `;

// const InputField = styled.TextInput`
//   flex: 1;
//   font-size: 16px;
//   padding-left: 10px;
// `;

// const Button = styled.TouchableOpacity`
//   background-color: #4a7c59;
//   padding: 12px;
//   border-radius: 10px;
//   align-items: center;
//   margin-top: 10px;
// `;

// const ButtonText = styled.Text`
//   color: white;
//   font-size: 18px;
//   font-weight: bold;
// `;

// export default function TreeDataForm() {
//   const navigation = useNavigation();
  
//   // This component must be rendered within a TreeDataProvider
//   // in your App.js or navigation setup
//   const { updateTreeData, treeData, resetTreeData } = useTreeData();
  
  
//   // Initialize local state with context values or empty strings
//   const [treeId, setTreeId] = useState(treeData?.treeId || '');
//   const [height, setHeight] = useState(treeData?.height || '');
//   const [numBranches, setNumBranches] = useState(
//     treeData?.numBranches ? treeData.numBranches.toString() : ''
//   );

//   const handleNext = () => {
//     if (!treeId || !height || !numBranches) {
//       Alert.alert('Error', 'All fields are required!');
//       return;
//     }

//     const branches = parseInt(numBranches, 10);
    
//     // Update context with current form values
//     updateTreeData({
//       treeId,
//       height,
//       numBranches: branches
//     });

//     if (branches >= 1) {
//       navigation.navigate('BranchDetailsForm', { treeId, height, branches });
//     } else {
//       Alert.alert('Error', 'Number of branches should be at least 1');
//     }
//   };

//   return (
//     <Container>
//       <Card>
//         <View style={{ alignItems: 'center', marginBottom: 10 }}>
//           <Image source={require('../assets/images/tree-icon.png')} style={{ width: 80, height: 80 }} />
//         </View>

//         <IconInput>
//           <AntDesign name="idcard" size={20} color="#4a7c59" />
//           <InputField placeholder=" Tree ID" value={treeId} onChangeText={setTreeId} />
//         </IconInput>

//         <IconInput>
//           <Octicons name="number" size={24} color="black" />
//           <InputField 
//             placeholder=" Number of Primary Stems " 
//             value={numBranches} 
//             onChangeText={setNumBranches} 
//             keyboardType="numeric" 
//           />
//         </IconInput>
        
//         <IconInput>
//           <MaterialIcons name="height" size={24} color="black" />
//           <InputField 
//             placeholder="Height (in cm)" 
//             value={height} 
//             onChangeText={setHeight} 
//             keyboardType="numeric" 
//           />
//         </IconInput>

//         <Button onPress={handleNext}>
//           <ButtonText>Next</ButtonText>
//         </Button>
//       </Card>
//     </Container>
//   );
// }

import React, { useState, useEffect } from 'react';
import { View, Image, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons, Octicons } from '@expo/vector-icons';
import { useTreeData } from './TreeDataContext';

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

export default function TreeDataForm() {
  const navigation = useNavigation();
  
  // Initialize with default values first
  const [treeId, setTreeId] = useState('');
  const [height, setHeight] = useState('');
  const [numBranches, setNumBranches] = useState('');
  
  // Get context values
  const context = useTreeData();
  
  // Safely handle context values
  useEffect(() => {
    if (context && context.treeData) {
      setTreeId(context.treeData.treeId || '');
      setHeight(context.treeData.height || '');
      setNumBranches(context.treeData.numBranches ? context.treeData.numBranches.toString() : '');
    }
  }, [context]);

  const handleNext = () => {
    if (!treeId || !height || !numBranches) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    const branches = parseInt(numBranches, 10);
    
    // Update context with current form values
    if (context && context.updateTreeData) {
      context.updateTreeData({
        treeId,
        height,
        numBranches: branches
      });
    }

    if (branches >= 1) {
      navigation.navigate('BranchDetailsForm', { 
        treeId, 
        height, 
        branches 
      });
    } else {
      Alert.alert('Error', 'Number of branches should be at least 1');
    }
  };

  return (
    <Container>
      <Card>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Image source={require('../assets/images/tree-icon.png')} style={{ width: 80, height: 80 }} />
        </View>

        <IconInput>
          <AntDesign name="idcard" size={20} color="#4a7c59" />
          <InputField placeholder=" Tree ID" value={treeId} onChangeText={setTreeId} />
        </IconInput>

        <IconInput>
          <Octicons name="number" size={24} color="black" />
          <InputField 
            placeholder=" Number of Primary Stems " 
            value={numBranches} 
            onChangeText={setNumBranches} 
            keyboardType="numeric" 
          />
        </IconInput>
        
        <IconInput>
          <MaterialIcons name="height" size={24} color="black" />
          <InputField 
            placeholder="Height (in cm)" 
            value={height} 
            onChangeText={setHeight} 
            keyboardType="numeric" 
          />
        </IconInput>

        <Button onPress={handleNext}>
          <ButtonText>Next</ButtonText>
        </Button>
      </Card>
    </Container>
  );
}