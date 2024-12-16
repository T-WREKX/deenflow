// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIB36Ys5YY6V52dqRAdpMtJr24Ct9nlRQ",
  authDomain: "suzanne-64273.firebaseapp.com",
  projectId: "suzanne-64273",
  storageBucket: "suzanne-64273.firebasestorage.app",
  messagingSenderId: "1023293209186",
  appId: "1:1023293209186:web:063191c6ac495a61b46f3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };