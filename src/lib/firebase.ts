import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
// IMPORTANT: Replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCJ4S9ryr2ckuswIdq5e-OhTY_HCvEgcoM",
  authDomain: "purusharth-class.firebaseapp.com",
  projectId: "purusharth-class",
  storageBucket: "purusharth-class.firebasestorage.app",
  messagingSenderId: "142187667474",
  appId: "1:142187667474:web:8562e3aafcc847c1c0f8cb",
  measurementId: "G-WWRW3FW0VH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services (no Firebase Storage - using Cloudinary instead)
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
