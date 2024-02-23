import Header from './components/Header'
import ContactUs from './components/ContactUs'
import About from './components/About'
import Classes from './components/Classes'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
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