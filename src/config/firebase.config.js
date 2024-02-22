// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsHXwDgNgDp3L-FcSwzxbNoJPQ5BKYxDI",
    authDomain: "chore0fit.firebaseapp.com",
    projectId: "chore0fit",
    storageBucket: "chore0fit.appspot.com",
    messagingSenderId: "938687269274",
    appId: "1:938687269274:web:8c887918f455362784d223",
    measurementId: "G-1T01R5XF1N"
  };

export const singInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  // signInWithRedirect(auth, provider)
  signInWithPopup(auth, provider)
}
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { firestore, analytics, auth };