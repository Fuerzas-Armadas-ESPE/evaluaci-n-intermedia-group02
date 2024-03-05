// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from '@firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNIJseUFFJwQKET-I9pN468Su66py0ubs",
  authDomain: "inventario-grupo02-ba08d.firebaseapp.com",
  projectId: "inventario-grupo02-ba08d",
  storageBucket: "inventario-grupo02-ba08d.appspot.com",
  messagingSenderId: "1049785973528",
  appId: "1:1049785973528:web:1e98f66135c5c0e88dbc6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);