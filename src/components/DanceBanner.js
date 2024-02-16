import React from 'react'
import DanceImage from '../assets/dancer1.png'
import { FaChevronRight, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const DanceBanner = () => {
  return (
    <div className='h-screen bg-[#1c1c36] bg-dancer1 bg-center bg-cover bg-blend-color-dodge sm:bg-gradient-to-r sm:to-[#131324] sm:from-[#120b2c] items-center relative flex justify-center'>
      <div className='hidden sm:w-1/2 sm:flex sm:items-center'>
          <img src={DanceImage}/>
      </div>
      <div className='bg-dancer '></div>
      <div className=' max-w-max sm:w-1/2 self-center'>
        <div className='flex-col sm:ml-20'>
          <p className='flex p-3 font-medium sm:font-semibold text-lg sm:text-2xl'>Enjoy Each Step Along The Way.</p>
          <p className='flex p-3 sm:w-3/4 font-semi-bold text-4xl sm:text-6xl'>Learn To Dance With Style </p>
          <p className='p-3 flex gap-2 items-center'>
            <span className='text-base sm:text-lg'>Join Class</span> 
            <span className='border p-1 rounded-full pl-1.5'>
              <FaChevronRight />
            </span>
          </p>
        </div>
        <div className='sm:ml-20 absolute bottom-4 flex items-center gap-1'>
            <p className='p-3 text-xs'> FOLLOW US </p>
            <hr className='w-10'/>
            <div className='flex gap-3 p-3'>    
              <p><FaFacebook /></p>
              <p><FaInstagram /></p>
              <p><FaYoutube /></p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DanceBanner