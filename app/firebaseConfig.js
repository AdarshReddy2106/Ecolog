// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGCdVqjTFyxvGmbqU9kHId62R9ONY0BKI",
  authDomain: "miyawaki-app.firebaseapp.com",
  projectId: "miyawaki-app",
  storageBucket: "miyawaki-app.firebasestorage.app",
  messagingSenderId: "591664820720",
  appId: "1:591664820720:web:32ab2e65df7b0884b1ad35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
export default app;