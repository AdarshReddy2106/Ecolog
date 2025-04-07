// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4KJ7HA5SKO2wy7FDJMlaPBo4ExUe8kGQ",
  authDomain: "copy-b1ab7.firebaseapp.com",
  projectId: "copy-b1ab7",
  storageBucket: "copy-b1ab7.firebasestorage.app",
  messagingSenderId: "154588596563",
  appId: "1:154588596563:web:839bbdfba02a23f627b9a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getFirestore(app);
export default app;