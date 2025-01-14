import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM-_cs15OZpX1DALzhIWOARiSeUYrg4wQ",
  authDomain: "phylab-mobile.firebaseapp.com",
  projectId: "phylab-mobile",
  storageBucket: "phylab-mobile.appspot.com",
  messagingSenderId: "799955510735",
  appId: "1:799955510735:web:947da1067e39f27f2c1eba",
  measurementId: "G-CFBZJ8D4ST",
  databaseURL: "https://phylab-mobile-default-rtdb.firebaseio.com/"
};

// Initialize Firebase app only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export services
export const auth = getAuth(app); // Firebase Auth instance
export const db = getDatabase(app); // Database instance
