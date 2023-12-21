// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCAL8nvrRATmE_6arPur_M2XvHq9F-Lqw",
  authDomain: "chatapp-9cbb9.firebaseapp.com",
  projectId: "chatapp-9cbb9",
  storageBucket: "chatapp-9cbb9.appspot.com",
  messagingSenderId: "541457610983",
  appId: "1:541457610983:web:a76b12e616190f8f03ca42",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
