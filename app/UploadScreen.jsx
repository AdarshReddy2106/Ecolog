import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #d8e8d2;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.View`
  width: 90%;
  background-color: #f5f5dc;
  padding: 20px;
  border-radius: 15px;
  elevation: 5;
  align-items: center;
`;

const UploadButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
`;

const UploadText = styled.Text`
  font-size: 16px;
  margin-left: 10px;
  color: #4a7c59;
`;

const Button = styled.TouchableOpacity`
  background-color: #4a7c59;
  padding: 12px;
  border-radius: 10px;
  align-items: center;
  margin-top: 20px;
  width: 80%;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export default function UploadScreen({ route, navigation }) {
  const [image, setImage] = useState(null);

  // Function to pick an image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to take a photo using camera
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to handle saving data
  const handleSave = () => {
    if (!image) {
      Alert.alert("Error", "Please upload an image before saving.");
      return;
    }

    // Get tree details from previous screens
    const { treeId, height, numBranches, branchDiameters } = route.params;

    const treeData = {
      treeId,
      height,
      numBranches,
      branchDiameters,
      imageUri: image,
    };

    console.log("Tree Data Saved:", treeData);
    Alert.alert("Success", "Tree data has been saved!");

    // Navigate back to the first screen or home
    navigation.navigate("TreeDataForm");
  };

  return (
    <Container>
      <Card>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Upload Tree Image
        </Text>

        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 150, height: 150, borderRadius: 10, marginBottom: 10 }}
          />
        )}

        <UploadButton onPress={pickImage}>
          <UploadText>Choose from Gallery</UploadText>
        </UploadButton>

        <UploadButton onPress={takePhoto}>
          <UploadText>Take a Photo</UploadText>
        </UploadButton>

        <Button onPress={handleSave}>
          <ButtonText>Save Data</ButtonText>
        </Button>
      </Card>
    </Container>
  );
}
