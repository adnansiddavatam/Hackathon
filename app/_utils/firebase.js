import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
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
export const auth = getAuth(app);

// Initialize Firebase Analytics only on client-side
export let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((isSupported) => {
    if (isSupported) {
      analytics = getAnalytics(app);
    }
  });
}
