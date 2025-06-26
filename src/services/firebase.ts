import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMXquLxKxBCII6HMwME6_iMTQikpQSAkI",
  authDomain: "painelagendamento.firebaseapp.com",
  projectId: "painelagendamento",
  storageBucket: "painelagendamento.firebasestorage.app",
  messagingSenderId: "401720018483",
  appId: "1:401720018483:web:85824c441a2652de3e4546",
  measurementId: "G-330WJ9XVRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };