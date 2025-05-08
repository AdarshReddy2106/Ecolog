import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library"; // Add this import
import styled from "styled-components/native";
import { saveTreeData } from "./services/treeService";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import { useTreeData } from './TreeDataContext';
import { auth } from './firebaseConfig';
import { supabase } from './supabaseConfig';
import { useAuth } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
  
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

export default function UploadScreen() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { resetTreeData } = useTreeData();
  const { currentUser } = useAuth();

  const handleSave = async () => {
    try {
      setLoading(true);
      
      if (!image) {
        Alert.alert("Error", "Please upload an image before saving.");
        return;
      }

      let studentDetails;

      // Handle admin case
      if (currentUser?.email === 'miyawaki.iitpkd@gmail.com') {
        studentDetails = {
          studentName: 'admin',
          studentRollNo: '1',
          studentGroup: 'admin'
        };
      } else {
        // For regular users, check AsyncStorage
        const storedDetails = await AsyncStorage.getItem(`studentDetails_${currentUser.email}`);
        if (!storedDetails) {
          Alert.alert("Error", "Student details not found. Please complete student details first.");
          navigation.navigate('StudentDetails');
          return;
        }
        studentDetails = JSON.parse(storedDetails);
      }

      // Rest of your existing code remains the same
      const { treeId, branches, stemData } = route.params;

      if (!stemData || !Array.isArray(stemData)) {
        Alert.alert("Error", "Invalid or missing stem data. Please go back and enter the measurements again.");
        return;
      }

      const dataToSave = {
        treeId,
        numBranches: branches,
        stemData,
        studentName: studentDetails.studentName,
        studentRollNo: studentDetails.studentRollNo,
        studentGroup: studentDetails.studentGroup,
        userEmail: currentUser.email
      };

      await saveTreeData(dataToSave, image);
      
      Alert.alert(
        "Success", 
        "Tree data has been saved!",
        [{ 
          text: "OK", 
          onPress: () => {
            // Reset the tree data
            resetTreeData();
            // Navigate back to TreeDataForm
            navigation.reset({
              index: 0,
              routes: [{ name: 'TreeDataForm' }],
            });
          }
        }]
      );
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to save data");
      console.error('Error in handleSave:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to pick an image from gallery
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to access photo library");
      console.error(error);
    }
  };

  // Function to take a photo without cropping
  const takePhoto = async () => {
    try {
      // Request camera permissions first
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert("Permission denied", "Camera permission is required to take photos");
        return;
      }
      
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: false, // No automatic cropping
        quality: 0.8,
      });
      
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to access camera");
      console.error(error);
    }
  };

  // Function specifically to crop the current image
  const cropCurrentImage = async () => {
    if (!image) {
      Alert.alert("Error", "No image to crop");
      return;
    }

    try {
      // First, request permissions to save the image temporarily
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission denied", "Media library permission is required to crop images");
        return;
      }
      
      // Save the current image to the media library temporarily
      const asset = await MediaLibrary.createAssetAsync(image);
      
      // Now launch the image picker with editing enabled
      // The user will need to select the image they just saved
      Alert.alert(
        "Crop Image",
        "Select the same image from your recent photos and then crop it",
        [
          {
            text: "OK",
            onPress: async () => {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true, // Enable crop interface
                aspect: [9, 16],
                quality: 1,
              });
              
              if (!result.canceled) {
                setImage(result.assets[0].uri);
              }
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to crop image");
      console.error(error);
    }
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
          <Text style={{ fontSize: 16, color: "#4a7c59" }}>📁 Choose from Gallery</Text>
        </UploadButton>
        
        <UploadButton onPress={takePhoto}>
          <Text style={{ fontSize: 16, color: "#4a7c59" }}>📷 Take a Photo</Text>
        </UploadButton>
        
        {/* Only show crop button when there's an image */}
        {image && (
          <UploadButton onPress={cropCurrentImage}>
            <Text style={{ fontSize: 16, color: "#4a7c59" }}>✂️ Crop Image</Text>
          </UploadButton>
        )}
        
        <Button onPress={handleSave} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <ButtonText>Save Data</ButtonText>
          )}
        </Button>
      </Card>
    </Container>
  );
}