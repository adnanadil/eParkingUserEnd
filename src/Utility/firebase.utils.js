// This files helps in initializing firebase to be used with this app
// Firebase is a backend service that provides various features such as cloud storage 
// database, user auth and several other features. 

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdlRpCo1T8fdiPXhOXpvEkamyTQF6k3Ug",
  authDomain: "eparking-88b16.firebaseapp.com",
  projectId: "eparking-88b16",
  storageBucket: "eparking-88b16.appspot.com",
  messagingSenderId: "477634532887",
  appId: "1:477634532887:web:8475b01c3b2f1311342e52",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
