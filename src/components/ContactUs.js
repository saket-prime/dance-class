import React from 'react'
import { FaPhone } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";

const ContactUs = () => {
  return (
    <div className='h-screen bg-[#1c1c36] bg-dancer1 bg-center bg-cover bg-blend-color-dodge sm:bg-gradient-to-r sm:to-[#131324] sm:from-[#120b2c] relative flex justify-around snap-start' id='contact'>
        <div className='hidden sm:w-1/2 px-20 sm:flex sm:self-center'>
            <div>
                <p className='p-4 text-2xl  tracking-widest font-normal'>CONTACT INFORMATION</p>
                <p className='flex items-center gap-5 p-4 text-xl font-light'><FaPhone color='#55549D'/> +202 555 0789</p>
                <p className='flex items-center gap-5 p-4 text-xxl font-light'><AiOutlineMail color='#55549D' /> dance@email.com</p>
                <p className='flex items-center gap-5 p-4 text-xxl font-light'><GrLocation color='#55549D' /> 218 Pegg Rd, Morris, New York(NY), 13808 </p>
            </div>    
        </div>
        <div className='max-w-max  sm:w-1/2 sm:px-24 self-center'>
              <p className='py-8 px-14 w-auto text-2xl tracking-widest font-normal'> CONTACT US</p>
            <form className='flex flex-col  gap-10'>
                <input 
                type="text" 
                placeholder='Name' 
                class="bg-[#3D4651] placeholder-[#C0BFC4] border-none rounded focus:outline-none sm:w-80" />
                
                <input 
                type="text" 
                placeholder='Email' 
                class="bg-[#3D4651] placeholder-[#C0BFC4] border-none rounded shadow-none focus:outline-none w-auto" />

                <textarea 
                placeholder="Message"
                rows="4" 
                class="bg-[#3D4651] placeholder-[#C0BFC4] border-none rounded focus:outline-none w-auto resize-none"></textarea>
                
                <div class="flex items-center justify-between">
                <button 
                type="submit" 
                class="bg-[#55549D] text-[#C0BFC4] w-80 sm:w-80 py-2 px-4 focus:outline-none focus:shadow-outline">
                        SUBMIT
                </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ContactUs