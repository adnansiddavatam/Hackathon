// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1IdC6AzWXaFY_OPvheiH45k33C-bWvxw",
  authDomain: "siuu-54023.firebaseapp.com",
  projectId: "siuu-54023",
  storageBucket: "siuu-54023.appspot.com",
  messagingSenderId: "946347458679",
  appId: "1:946347458679:web:3fd69b92fdeb92e5f7c672",
  measurementId: "G-1943VY85PG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);