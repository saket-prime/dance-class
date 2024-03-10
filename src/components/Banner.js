import React, { useState, useEffect, useRef } from 'react'
import DanceImage from '../assets/dancer1.png'
import { FaChevronLeft, FaChevronRight, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import "../slide.css"

const Banner = () => {
    
    const colors = ["#0088FE", "#00C49F", "#FFBB28"];
    const delay = 4000;
    
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
    
    
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    const prevSlide = () => {
        const firstSlide = index === 0;
        const newIndex = firstSlide ? slides.length - 1 : index - 1;
        setIndex(newIndex);
    }
    const nextSlide = () => {
        const lastSlide = index === slides.length - 1;
        const newIndex = lastSlide ? 0 : index + 1;
        setIndex(newIndex);
    }

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === colors.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div id = "home"className="slideshow snap-start relative group">
            <div
                className="slideshowSlider "
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        className=" inline-flex bg-dancer1 bg-center bg-cover bg-blend-color-dodge sm:bg-gradient-to-r sm:to-[#1c1c24] sm:from-[#1b007a] h-screen w-full items-center"
                        key={index}
                        style={{ backgroundColor: "#000000",}  }
                    >
                        <div className='hidden sm:w-1/2 sm:flex sm:items-center'>
                            <img src={slide.img} className=' sm:max-w-xl' />
                        </div>
                        <div className='bg-dancer '></div>
                        <div className=' max-w-max sm:w-1/2 self-center'>
                            <div className='flex-col sm:ml-20'>
                                <p className='flex p-3 font-medium sm:font-semibold text-lg sm:text-2xl'>{slide.title}</p>
                                <p className='flex p-3 text-wrap font-semi-bold text-4xl sm:text-6xl'>{slide.description} </p>
                                <p className='p-3 flex gap-2 items-center'>
                                    <span className='text-base sm:text-lg'>Join Class</span>
                                    <span className='border p-1 rounded-full pl-1.5'>
                                        <a href='#classes' className='cursor-pointer'><FaChevronRight /></a>
                                    </span>
                                </p>
                            </div>
                            <!--<div className=' absolute ml-20 top-[90%] flex items-center gap-1' >
                                <p className='p-3 text-xs'> FOLLOW US </p>
                                <hr className='w-10' />
                                <div className='flex gap-3 p-3'>
                                    <p><FaFacebook /></p>
                                    <p><FaInstagram /></p>
                                    <p><FaYoutube /></p>
                                </div>-->
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 sm:text-2xl rounded-dull p-2 bg-black/20 text-white cursor-pointer'>
                <FaChevronLeft onClick={prevSlide} />
            </div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 sm:text-2xl rounded-dull p-2 bg-black/20 text-white cursor-pointer'>
                <FaChevronRight onClick={nextSlide} />
            </div>

            <div className="absolute top-[85%] sm:top-[90%] text-center ml-0 mr-0 left-0 right-0 ">
                {colors.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slideshowDot${index === idx ? " active" : ""}`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
    
}

export default Banner;