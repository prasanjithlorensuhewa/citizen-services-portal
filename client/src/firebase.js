// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBCnb9FyGu0eR8aXvNG_4SwMMIXHASkQEs",
    authDomain: "citizen-service-portal-dbe68.firebaseapp.com",
    projectId: "citizen-service-portal-dbe68",
    storageBucket: "citizen-service-portal-dbe68.appspot.com",
    messagingSenderId: "828748869641",
    appId: "1:828748869641:web:5506eeb62444ce5bd248d8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
