// services/treeService.js
import { supabase } from '../supabaseConfig';
import { getAuth } from 'firebase/auth';
import * as FileSystem from 'expo-file-system';

// Helper function to convert base64 to array buffer
function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function saveTreeData(treeData, imageUri) {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      throw new Error('User not authenticated. Please log in.');
    }

    // Add validation check for stemData
    if (!treeData.stemData || !Array.isArray(treeData.stemData)) {
      throw new Error('Invalid stem data format');
    }

    // Validate numeric fields
    const numBranches = parseInt(treeData.numBranches, 10);
    const stemData = treeData.stemData.map((stem, index) => {
      if (!stem || typeof stem.height === 'undefined' || typeof stem.circumference === 'undefined') {
        throw new Error(`Missing data for Primary Stem ${index + 1}`);
      }

      const height = parseFloat(stem.height);
      const circumference = parseFloat(stem.circumference);

      if (isNaN(height) || height <= 0) {
        throw new Error(`Invalid height for Primary Stem ${index + 1}`);
      }
      if (isNaN(circumference) || circumference <= 0) {
        throw new Error(`Invalid circumference for Primary Stem ${index + 1}`);
      }

      return {
        height,
        circumference
      };
    });

    let imageUrl = null;
    if (imageUri) {
      // Read the image file
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Generate a unique filename
      const filename = `tree-images/${currentUser.uid}/${Date.now()}.jpg`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('tree-images')
        .upload(filename, base64ToArrayBuffer(base64), {
          contentType: 'image/jpeg',
        });

      if (uploadError) {
        throw new Error(`Failed to upload image: ${uploadError.message}`);
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('tree-images')
        .getPublicUrl(filename);

      imageUrl = publicUrl;
    }

    // Prepare data for database
    const dbData = {
      "Tree_Id": treeData.treeId || '',
      "Number_of_Primary_Stems": numBranches,
      "Stem_Data": stemData,
      "Student_Name": treeData.studentName,
      "Student_Roll_No": treeData.studentRollNo,
      "Student_Group": treeData.studentGroup,
      "User_Email": currentUser.email,
      "User_ID": currentUser.uid,
      "Image_URL": imageUrl,
      "Created_At": new Date().toISOString()
    };

    console.log('Data being sent to database:', dbData);

    // Insert data into database
    const { data, error } = await supabase
      .from('Tree Data')
      .insert([dbData]);

    if (error) {
      console.error('Database Error:', error);
      throw new Error(`Failed to save tree data: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error in saveTreeData:', error);
    throw error;
  }
}

