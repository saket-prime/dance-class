import React from 'react'
import Home from './pages/Home'
import ContactUs from './components/ContactUs'
import About from './components/About'

const App = () => {
  return (
    <div className='text-[#C0BFC4] font-poppins snap-y snap-mandatory overflow-y-scroll max-h-screen'>
      <Home />
      <About />
      <ContactUs />
      
    </div>
    
  )
}

export default App