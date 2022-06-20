// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnEEoX7_DdEZ_Ab7TqpVKumG4glscemb4",
  authDomain: "mob-mentality-1a972.firebaseapp.com",
  projectId: "mob-mentality-1a972",
  storageBucket: "mob-mentality-1a972.appspot.com",
  messagingSenderId: "1064243714039",
  appId: "1:1064243714039:web:4b1b3d271a2ffe52bcc0f2",
  measurementId: "G-C9HN3LLWHD",
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
 
export { app, db };