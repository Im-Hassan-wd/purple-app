import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBx1KfCu_YznL7kV4s9ZjOm6h7LNM1hkJQ",
  authDomain: "purple-chat-app-162d8.firebaseapp.com",
  projectId: "purple-chat-app-162d8",
  storageBucket: "purple-chat-app-162d8.appspot.com",
  messagingSenderId: "16013353696",
  appId: "1:16013353696:web:ef789a084b5354b055e685",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
