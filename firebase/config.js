import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getReactNativePersistence } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCM-_cs15OZpX1DALzhIWOARiSeUYrg4wQ",
  authDomain: "phylab-mobile.firebaseapp.com",
  projectId: "phylab-mobile",
  storageBucket: "phylab-mobile.firebasestorage.app",
  messagingSenderId: "799955510735",
  appId: "1:799955510735:web:947da1067e39f27f2c1eba",
  measurementId: "G-CFBZJ8D4ST"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeApp(app, (
    persistance = getReactNativePersistence(AsyncStorage)
));

export const db = getFirestore(app);

export const userRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');