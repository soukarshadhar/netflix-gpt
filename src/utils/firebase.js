// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflixgpt-cf9bc.firebaseapp.com",
  projectId: "netflixgpt-cf9bc",
  storageBucket: "netflixgpt-cf9bc.appspot.com",
  messagingSenderId: "593119955848",
  appId: "1:593119955848:web:aef7d8189b4ffb0d4d083d",
  measurementId: "G-ECZLK8MS8F",
});
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
