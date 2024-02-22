import React, { useEffect } from 'react'
import Home from './pages/Home'
import ContactUs from './components/ContactUs'
import About from './components/About'
import Classes from './components/Classes'

import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth } from './config/firebase.config';
import Dashboard from './components/Dashboard'
import Faqs from './components/Faqs'

const App = () => {

  useEffect(() => {
    // const provider = new GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    // // signInWithRedirect(auth, provider)
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     const user = result.user;
    //     console.log(user);
    //   }).catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     const email = error.email;
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     console.log(error);
    //   });
  }, []);

  return (
    <div className='text-[#C0BFC4] font-poppins snap-y snap-mandatory overflow-y-scroll max-h-screen'>
      <Home />
      <About />
      <Classes />
      <Faqs />
      <Dashboard />
      {/* <ContactUs /> */}
      
    </div>
    
  )
}

export default App