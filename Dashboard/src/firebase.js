// src/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA68iGDFKuKV45is5SORE5eXpjB6zRFmO8",
  authDomain: "portfolioweb-71b39.firebaseapp.com",
  projectId: "portfolioweb-71b39",
  storageBucket: "portfolioweb-71b39.firebasestorage.app",
  messagingSenderId: "978915691750",
  appId: "1:978915691750:web:7294688728f7a9411abf27",
  measurementId: "G-Q93M592T98",
};

// Initialize Firebase (only once)
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);
const firestore = getFirestore(app);

// Export Firestore methods
export { db, collection, addDoc, firestore, getDoc, doc, setDoc };
