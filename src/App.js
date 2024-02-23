import React, { useEffect } from 'react'
import DanceBanner from './components/DanceBanner'
import Header from './components/Header'
import ContactUs from './components/ContactUs'
import About from './components/About'
import Classes from './components/Classes'
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth } from './config/firebase.config';
import Dashboard from './components/Dashboard'
import Faqs from './components/Faqs'
import Banner from './components/Banner'

const Index = () => {
  return (
    <div className='text-[#C0BFC4] font-poppins snap-y snap-mandatory overflow-y-scroll max-h-screen'>
      <Header />
      <Banner />
      <About />
      <Classes />
      <Faqs />
      <ContactUs />
    </div>
  )
}

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
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/' element={<Index />} exact></Route>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App