// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3t5WcnaT86agFriE_ixqwrcEs4pt4Knw",
  authDomain: "netflix-gpt-e24c8.firebaseapp.com",
  projectId: "netflix-gpt-e24c8",
  storageBucket: "netflix-gpt-e24c8.appspot.com",
  messagingSenderId: "18976669843",
  appId: "1:18976669843:web:bacb98a7ab7b43ea7a4d66",
  measurementId: "G-M7B3GWXSBK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
