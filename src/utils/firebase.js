// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAadP_0GCS6P1ctyOiBVmeu2aIM9nco1Lw",
  authDomain: "netflixgpt-6db42.firebaseapp.com",
  projectId: "netflixgpt-6db42",
  storageBucket: "netflixgpt-6db42.appspot.com",
  messagingSenderId: "453759087630",
  appId: "1:453759087630:web:089cf14ec2351c9ea7f85f",
  measurementId: "G-5NM32Q9LVR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
