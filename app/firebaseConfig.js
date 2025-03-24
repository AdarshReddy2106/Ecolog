// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQaxZ5SzIlL7dboeFNt1BV4l8GJRemk-w",
  authDomain: "appfinal-ec1e1.firebaseapp.com",
  projectId: "appfinal-ec1e1",
  storageBucket: "appfinal-ec1e1.firebasestorage.app",
  messagingSenderId: "647985723330",
  appId: "1:647985723330:web:cdbee7ac01c53b8ade885b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;