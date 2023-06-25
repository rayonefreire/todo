// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBay4CK_8j6IYzr1Yvss8eGxwENcinxJok",
  authDomain: "todo-1623c.firebaseapp.com",
  projectId: "todo-1623c",
  storageBucket: "todo-1623c.appspot.com",
  messagingSenderId: "367556331177",
  appId: "1:367556331177:web:716a26732a9ab437f5cbb8"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
