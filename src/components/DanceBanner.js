import React, { useState, useEffect, useRef } from 'react'
import DanceImage from '../assets/dancer1.png'
import DanceImage2 from '../assets/dancer2.png'
import { FaChevronLeft, FaChevronRight, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import {RxDotFilled} from 'react-icons/rx'

const DanceBanner = () => {
  
  const slides = [
    {   
        img: DanceImage,
        title: "Find your Beat",
        description: "Dance"
    },
    {
        img: DanceImage,
        title: "Sweat. Smile. Repeat",
        description: "Fitness"
    },
    {
        img: DanceImage,
        title: "Look good",
        description: "Photography"
    }
]
  
  const classesRef = useRef(null);
  
  const [currentIndex, setCurrentIndex ] = useState(0);
  
  const prevSlide = () => {
    const firstSlide = currentIndex === 0;
    const newIndex = firstSlide ? slides.length -1 : currentIndex -1;
    setCurrentIndex(newIndex);
  }
  const nextSlide = () => {
    const lastSlide = currentIndex === slides.length -1;
    const newIndex = lastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  }
  
  useEffect(() => {
    setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      4000
    );

  });
  
  return (
    
    <div id ="home"className='h-screen bg-[#1c1c36] bg-dancer1 bg-center bg-cover bg-blend-color-dodge sm:bg-gradient-to-r sm:to-[#000000] sm:from-[#1b007a] items-center relative flex justify-center group snap-start'>
      <div className='hidden sm:w-1/2 sm:flex sm:items-center'>
          <img src={slides[currentIndex].img} className='sm: max-w-xl'/>
      </div>
      <div className='bg-dancer '></div>
      <div className=' max-w-max sm:w-1/2 self-center'>
        <div className='flex-col sm:ml-20'>
          <p className='flex p-3 font-medium sm:font-semibold text-lg sm:text-2xl'>{slides[currentIndex].title}</p>
          <p className='flex p-3 sm:w-3/4 font-semi-bold text-4xl sm:text-6xl'>{slides[currentIndex].description} </p>
          <p className='p-3 flex gap-2 items-center'>
            <span className='text-base sm:text-lg'>Join Class</span> 
            <span className='border p-1 rounded-full pl-1.5'>
              <div className='cursor-pointer'><FaChevronRight /></div>  
            </span>
          </p>
        </div>
      </div>
      <div className='sm:hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 sm:text-2xl rounded-dull p-2 bg-black/20 text-white cursor-pointer'>
        <FaChevronLeft onClick={prevSlide}/>
      </div>
      <div className='sm:hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 sm:text-2xl rounded-dull p-2 bg-black/20 text-white cursor-pointer'>
        <FaChevronRight onClick={nextSlide}/>
      </div>
      <div className='absolute flex py-2 top-[85%] sm:top-[90%]'>
        {slides.map((slide, slideIndex) => (
          <div 
            key={slideIndex}
            onClick={()=>goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'>
            
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default DanceBanner

  
