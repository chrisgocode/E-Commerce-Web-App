// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC1KJxOtKxWaUSfc9b1jncWaO2gE8zH_qo",
  authDomain: "clone-f33b1.firebaseapp.com",
  projectId: "clone-f33b1",
  storageBucket: "clone-f33b1.appspot.com",
  messagingSenderId: "380251015248",
  appId: "1:380251015248:web:e5122a45ac4a0c33ee6955",
  measurementId: "G-N6XFR1LE72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
