// // app/services/treeService.js
// import { supabase } from '../supabaseConfig';
// import * as FileSystem from 'expo-file-system';

// export const saveTreeData = async (treeData, imageUri) => {
//   try {
//     // First upload the image to Supabase Storage
//     let imageUrl = null;
//     if (imageUri) {
//       const fileExt = imageUri.split('.').pop();
//       const fileName = `${Date.now()}.${fileExt}`;
//       const filePath = `${FileSystem.documentDirectory}${fileName}`;
      
//       // Copy the image to a local directory
//       await FileSystem.copyAsync({
//         from: imageUri,
//         to: filePath
//       });
      
//       // Read the file as a binary file
//       const fileReader = await FileSystem.readAsStringAsync(filePath, { encoding: FileSystem.EncodingType.Base64 });
      
//       // Upload to Supabase Storage
//       const { data, error } = await supabase.storage
//         .from('tree-images')
//         .upload(`trees/${fileName}`, decode(fileReader), {
//           contentType: `image/${fileExt}`
//         });
      
//       if (error) {
//         throw new Error('Error uploading image: ' + error.message);
//       }
      
//       // Get the URL of the uploaded image
//       const { data: { publicUrl } } = supabase.storage
//         .from('tree-images')
//         .getPublicUrl(`trees/${fileName}`);
      
//       imageUrl = publicUrl;
//     }
    
//     // Then save the tree data to the database
//     const { data, error } = await supabase
//       .from('trees')
//       .insert([
//         {
//           tree_id: treeData.treeId,
//           height: parseFloat(treeData.height),
//           num_primary_stems: parseInt(treeData.numBranches, 10),
//           primary_stem_diameters: treeData.branchDiameters,
//           image_url: imageUrl
//         }
//       ]);
    
//     if (error) {
//       throw new Error('Error saving tree data: ' + error.message);
//     }
    
//     return data;
//   } catch (error) {
//     console.error('Error in saveTreeData:', error);
//     throw error;
//   }
// };

// // Helper function to decode base64
// function decode(base64) {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
//   let str = atob(base64);
//   let len = str.length;
//   let bytes = new Uint8Array(len);
//   for (let i = 0; i < len; i++) {
//     bytes[i] = str.charCodeAt(i);
//   }
//   return bytes;
// }


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
    console.log("Starting saveTreeData with imageUri:", imageUri);
    
    // Get the current Firebase user
    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      throw new Error('User not authenticated. Please log in.');
    }

    const firebaseUid = currentUser.uid;
    console.log("Authenticated user:", firebaseUid);
    
    // Process the image
    let imageUrl = null;
    if (imageUri) {
      console.log("Processing image...");
      
      try {
        // Generate a unique filename
        const timestamp = Date.now();
        const fileName = `${firebaseUid}_${timestamp}.jpg`;
        const filePath = `public/${fileName}`;  // Using 'public' folder for unrestricted access
        
        // Read the file directly as base64
        const base64Data = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64
        });
        
        // Convert base64 to array buffer
        const arrayBuffer = base64ToArrayBuffer(base64Data);
        
        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('tree-images')
          .upload(filePath, arrayBuffer, {
            contentType: 'image/jpeg',
            cacheControl: '3600',
            upsert: true  // Allow overwriting in case of conflicts
          });
          
        if (uploadError) {
          console.error("Upload error details:", uploadError);
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }
        
        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('tree-images')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrl;
        console.log("Image uploaded successfully, URL:", imageUrl);
      } catch (imageError) {
        console.error("Image processing error:", imageError);
        throw new Error(`Failed to process image: ${imageError.message}`);
      }
    }
    
    // First, let's check the table structure
    console.log("Checking table structure...");
    const { data: columns, error: columnError } = await supabase
      .from('Tree Data')
      .select()
      .limit(1);
      
    if (columnError) {
      console.error("Error checking table structure:", columnError);
      throw new Error(`Failed to check table structure: ${columnError.message}`);
    }
    
    // Log the available columns
    console.log("Available columns:", Object.keys(columns?.[0] || {}));
    
    // Save the tree data to database
    console.log("Saving tree data to database...");

    console.log("Inserting into DB:", {
      "Tree ID": treeData.treeId,
      "Tree Height": treeData.height,
      "Number of Primary Stems": treeData.numBranches,
      "Primary Stem Diameters": treeData.branchDiameters,
    });

    
    const { data, error } = await supabase
      .from('Tree Data')
      .insert({
        "Tree Id": treeData.treeId,
        "Tree Height": parseFloat(treeData.height),
        "Number of Primary Stems": parseInt(treeData.numBranches, 10),
        "Primary Stem Diameters": treeData.branchDiameters,
        "Main Stem Diameter": parseFloat(treeData.mainBranchDiameter),
        "Image URL": imageUrl,
        "User ID": firebaseUid,
        "created_at": new Date().toISOString()
      });
    
    if (error) {
      console.error("Database insert error:", error);
      throw new Error(`Error saving tree data: ${error.message}`);
    }
    
    console.log("Tree data saved successfully");
    return data;
  } catch (error) {
    console.error('Error in saveTreeData:', error);
    throw error;
  }
}

