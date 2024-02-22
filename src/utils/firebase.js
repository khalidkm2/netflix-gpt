// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAD1WlC8-G45_Tv6HJ3iE5Q2ImhdzACcAE",
  authDomain: "netflix-gpt-3c7fc.firebaseapp.com",
  projectId: "netflix-gpt-3c7fc",
  storageBucket: "netflix-gpt-3c7fc.appspot.com",
  messagingSenderId: "426618470665",
  appId: "1:426618470665:web:597b892ba17afbab3e13d8",
  measurementId: "G-NMV92EWRQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
