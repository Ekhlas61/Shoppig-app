import firebase from 'firebase/compat/app'
// import { initializeApp } from "firebase/app";
// auth
import {getAuth} from 'firebase/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkq60GPx9eBMqLiRLYX2IKk0-glVdA9yc",
  authDomain: "clone-7dc68.firebaseapp.com",
  projectId: "clone-7dc68",
  storageBucket: "clone-7dc68.firebasestorage.app",
  messagingSenderId: "11905535322",
  appId: "1:11905535322:web:340d2a1e5f77365c127763",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=app.firestore()

