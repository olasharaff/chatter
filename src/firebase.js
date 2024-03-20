// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMUaZkjFmbE8dK8yt6equlBezhewMqHS8",
  authDomain: "chatterapp-js.firebaseapp.com",
  projectId: "chatterapp-js",
  storageBucket: "chatterapp-js.appspot.com",
  messagingSenderId: "457037400159",
  appId: "1:457037400159:web:585305bfda05fde663f3ea",
  measurementId: "G-PQBVNXF2Y4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app)
