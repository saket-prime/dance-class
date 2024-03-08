import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='absolute w-full z-10'>
          <div className='flex justify-between items-center max-w-6xl mx-auto p-6'>
        <h1 className='font-bold text-xl sm:text-2xl'><a href='#home'>ChoreoFit</a></h1>
              <ul className='flex gap-5'>
                  <li className='hidden sm:block'><a href='#about'>ABOUT</a></li>
                  <li className='hidden sm:block'><a href='#classes'>CLASS</a></li>
                  <li className='hidden sm:block'><a href='#trainers'>TRAINERS</a></li>
                  <li className='hidden sm:block'><a href='#faq'>FAQ</a></li>
                  <li className='hidden sm:block'><a href='#contact'>CONTACT US</a></li>
            </ul>
        </div>
    </header>
  )
}

export default Header