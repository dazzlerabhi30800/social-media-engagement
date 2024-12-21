// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfYNJDfie4tBbwbL0HxIU0e4c0TzXy2Z4",
  authDomain: "social-media-engagement-app.firebaseapp.com",
  projectId: "social-media-engagement-app",
  storageBucket: "social-media-engagement-app.firebasestorage.app",
  messagingSenderId: "119699116990",
  appId: "1:119699116990:web:502e325a21d839cca0dfef",
  measurementId: "G-QJ6LT7X1KP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
