// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVwJyVcF-O41GrfNRa5FrLqBcxWhjVkQs",
  authDomain: "website-apple-app.firebaseapp.com",
  projectId: "website-apple-app",
  storageBucket: "website-apple-app.appspot.com",
  messagingSenderId: "872210084983",
  appId: "1:872210084983:web:2f0b0b6211af26fe7b0272",
  measurementId: "G-S5WL4JSWH9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
