// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_B2DzIms7C73jEuFBro9UwUbcJUWBX_4",
    authDomain: "dance-studio-20297.firebaseapp.com",
    projectId: "dance-studio-20297",
    storageBucket: "dance-studio-20297.appspot.com",
    messagingSenderId: "700201958249",
    appId: "1:700201958249:web:b786e0c4a08b31442e5bf8",
    measurementId: "G-YTMK8G9EM6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);