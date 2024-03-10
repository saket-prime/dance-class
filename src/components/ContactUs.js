import { FaPhone } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { firestore } from '../config/firebase.config';
import { setDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ContactUs = () => {

  const [formAlert, setFormAlert] = useState({
    type: '',
    message: '',
  });

  const querySubmitHandler = async (e) => {
    try{
      e.preventDefault();

      const name = e.target.name?.value;
      const email = e.target.email?.value;
      const message = e.target.message?.value;

      await setDoc(doc(firestore, "application", "queries", "queries", uuidv4()), {
        name,
        email,
        message
      });

      e.target.reset();
      setFormAlert({
        type: 'success',
        message: 'Query submitted successfully'
      });
    } catch (error) {
      setFormAlert({
        type: 'error',
        message: 'Could not submit query'
      });
      console.error('Could not submit query',);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormAlert({
        type: '',
        message: '',
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [formAlert]);

  return (
    <div className='h-screen bg-[#1c1c36] bg-dancer1 bg-center bg-cover bg-blend-color-dodge sm:bg-gradient-to-r sm:to-[#131324] sm:from-[#120b2c] relative flex max-sm:flex-col-reverse justify-center gap-10 snap-start' id='contact'>
        <div className='sm:w-1/2 flex items-center justify-center'>
            <div>
                <p className='p-2 text-2xl max-sm:text-base tracking-widest font-normal'>CONTACT US</p>
                <p className='flex items-center gap-5 p-2 max-sm:text-sm text-xl font-light'><FaPhone color='#55549D'/> +91 7738 301628</p>
                <p className='flex items-center gap-5 p-2 max-sm:text-sm text-xxl font-light'><GrLocation color='#55549D' /> D4 (Podium Level), Tower D, Panchshil Towers, Kharadi, Pune </p>
            </div>    
        </div>
        <div className='sm:w-1/2 self-center flex justify-center flex-col items-center'>
              <p className='py-8 px-14 w-auto text-2xl tracking-widest font-normal'> CONTACT US</p>
            <form className='flex flex-col gap-5' onSubmit={querySubmitHandler}>
                <input 
                type="text" 
                placeholder='Name' 
                class="bg-[#3D4651] placeholder-[#C0BFC4] border-none rounded focus:outline-none sm:w-80" 
                id="name"
                />
                
                <input 
                type="text" 
                placeholder='Email' 
                class="bg-[#3D4651] placeholder-[#C0BFC4] border-none rounded shadow-none focus:outline-none w-auto" 
                id="email"
                />

                <textarea 
                placeholder="Message"
                rows="4" 
                class="bg-[#3D4651] placeholder-[#C0BFC4] border-none rounded focus:outline-none w-auto resize-none"
                id="message"
                ></textarea>
                
                <div class="flex flex-col items-center justify-between">
                <button 
                type="submit" 
                class="bg-[#55549D] text-[#C0BFC4] w-80 sm:w-80 py-2 px-4 focus:outline-none focus:shadow-outline">
                        SUBMIT
                </button>
                <div>
                  {formAlert.type === 'success' && <p className='text-green-500'>{formAlert.message}</p>}
                  {formAlert.type === 'error' && <p className='text-red-500'>{formAlert.message}</p>}
                </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ContactUs