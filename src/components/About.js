import React from 'react'
import YellowDancer from '../assets/dancer2.png';

const About = () => {
  return (
    <div className='h-screen flex justify-center item-center bg-dancer2 bg-center bg-cover bg-blend-overlay bg-[#222224] sm:bg-gradient-to-tr sm:from-[#161617] sm:via-[#4C4A4A] sm:via-60% sm:to-[#696665] items-center snap-start' id='about'>
        <div className='flex flex-col gap-5 sm:w-2/3 sm:pl-20'>
        <p className='sm:tracking-widest tracking-normal text-3xl p-3 sm:text-5xl '>ABOUT US</p>
        <p className='text-lg p-3 sm:text-2xl font-light'>At ChoreoFit, a multi studio, we strive to be your primary destination for fitness, dance, and photography. We hope to bring together fitness enthusiasts and dance aficionados to unleash their inner strength, grace, and confidence. In the process, we wish to create a community where one can leave the hustle and bustle of daily life to lose themself to inspire and be inspired. <br>We endevour to bring together an exceptional team of instructors. While our fitness experts will inspire you to conquer your goals, our dance instructors will guide you through mesmerizing choreographies. They will be more than just mentors; they would be motivators, cheerleaders, and friends.</br>

<br>With their unparalleled expertise and unwavering support, our instructors will empower you to reach new heights, both physically and mentally. So, whether you're sweating it out in a high-intensity workout or losing yourself in the rhythm of a dance class, you can trust that you're in the hands of those who are passionate about their craft. </br></p>
        </div>
        <div className='hidden sm:flex sm:1/2'>
            <img src={YellowDancer} />
        </div>
    </div>
  )
}

export default About