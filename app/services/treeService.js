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

    // Validate numeric fields first
    const height = parseFloat(treeData.height);
    const numBranches = parseInt(treeData.numBranches, 10);
    const mainBranchDiameter = parseFloat(treeData.mainBranchDiameter);
    const branchDiameters = treeData.branchDiameters.map(d => parseFloat(d));

    // Check if any numeric values are invalid
    if (isNaN(height)) {
      throw new Error('Invalid tree height');
    }
    if (isNaN(numBranches)) {
      throw new Error('Invalid number of branches');
    }
    if (isNaN(mainBranchDiameter)) {
      throw new Error('Invalid main branch diameter');
    }
    if (branchDiameters.some(d => isNaN(d))) {
      throw new Error('Invalid branch diameters');
    }

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

    // Prepare data ensuring all numeric fields have valid numbers
    const dbData = {
      "Tree_Id": treeData.treeId || '',
      "Tree_Height": height,
      "Number_of_Primary_Stems": numBranches,
      "Primary_Stem_Diameters": branchDiameters,
      "Main_Branch_Diameter": mainBranchDiameter,
      "Student_Name": treeData.studentName,  // Use the passed student name
      "Student_Roll_No": treeData.studentRollNo,
      "Student_Group": treeData.studentGroup,
      "User_Email": treeData.userEmail,
      "Image_URL": imageUrl,
      "User_ID": currentUser.uid,
      "Created_At": new Date().toISOString()
    };

    console.log('Data being saved:', dbData);

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

