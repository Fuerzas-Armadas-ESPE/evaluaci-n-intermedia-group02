// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from '@firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFV3qybOWMrZ1dWG4aduvVNbrtqiaaboA",
  authDomain: "inventario-grupo02.firebaseapp.com",
  projectId: "inventario-grupo02",
  storageBucket: "inventario-grupo02.appspot.com",
  messagingSenderId: "771284447347",
  appId: "1:771284447347:web:935d96a1419bc79bbafa06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
