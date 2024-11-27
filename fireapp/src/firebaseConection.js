import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyASXyGNLK_PyA-khyp9-M15Qy_uVw1g61I",
    authDomain: "curso-react-7859b.firebaseapp.com",
    projectId: "curso-react-7859b",
    storageBucket: "curso-react-7859b.firebasestorage.app",
    messagingSenderId: "278088586277",
    appId: "1:278088586277:web:81fad8bb037a4fb91a9bcc",
    measurementId: "G-Q2DTZ26Q41"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  export {db, auth};