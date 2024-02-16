import React from 'react'
import YellowDancer from '../assets/dancer2.png';

const About = () => {
  return (
    <div className='h-screen flex justify-center item-center bg-dancer2 bg-center bg-cover bg-blend-overlay bg-[#222224] sm:bg-gradient-to-tr sm:from-[#161617] sm:via-[#4C4A4A] sm:via-60% sm:to-[#696665] items-center snap-start' id='about'>
        <div className='flex flex-col gap-5 sm:w-2/3 sm:pl-20'>
        <p className='sm:tracking-widest tracking-normal text-3xl p-3 sm:text-5xl '>EVERYTHING ABOUT US</p>
        <p className='text-lg p-3 sm:text-2xl font-light'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat.  </p>
        </div>
        <div className='hidden sm:flex sm:1/2'>
            <img src={YellowDancer} />
        </div>
    </div>
  )
}

export default About