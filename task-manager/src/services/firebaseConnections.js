// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeObrXDCJKg3OwX1OwhDz6xNaWQfgdwlE",
  authDomain: "tickets-9fa0c.firebaseapp.com",
  projectId: "tickets-9fa0c",
  storageBucket: "tickets-9fa0c.firebasestorage.app",
  messagingSenderId: "150817319894",
  appId: "1:150817319894:web:bed82b4366b6cd96c91277"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export {auth, db, storage};
