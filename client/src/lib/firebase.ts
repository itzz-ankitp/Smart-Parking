import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD3ZavWwPhPmRDc0_4wwFyX-hKQEA16NG4",
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "smart-parking-dee"}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "smart-parking-dee",
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "smart-parking-dee"}.firebasestorage.app`,
  messagingSenderId: "930805708863",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:930805708863:web:bbd399abc28ce89e7fa08a",
  measurementId: "G-PT172D70D5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
