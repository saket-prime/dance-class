import Header from './components/Header'
import ContactUs from './components/ContactUs'
import About from './components/About'
import Classes from './components/Classes'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard'
import Faqs from './components/Faqs'
import Banner from './components/Banner'
import { firestore } from './config/firebase.config';
import { getDoc, doc , getDocs, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import Trainers from './components/Trainer';
import './global.css'

const Index = ({ data, isLoading, isError }) => {
  return (
    isLoading ? <div role="status" className="mx-auto h-screen items-center justify-center flex">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div> : isError ? <div>Error</div> :
    <div className='text-[#C0BFC4] font-poppins snap-y snap-mandatory overflow-y-scroll max-h-screen'>
      <Header />
      <Banner slides={data?.slides} />
      <About data={data?.about}/>
      <Classes categories={data?.categories}/>
      <Trainers categories={data?.categories}/>
      <Faqs faqs={data?.faqs}/>
      <ContactUs contact={data?.contact}/>
    </div>
  )
}

const App = () => {

  const [applicationContent, setApplicationContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState({isOpen: false, type: '', message: ''});

  const getDocsCategories = async (query) => {
    try {
        const categories = [];
        const querySnapshot = await getDocs(query);
        querySnapshot.forEach((doc) => {
            categories.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return categories;
    }
    catch (error) {
        setAlert({isOpen: true, type: 'error', message: 'Failed to fetch categories!'});
        return [];
    }
}

  const setData = async () => {
    try {
      setLoading(true);
      const docref = doc(firestore, "application", "content");
      const docSnap = await getDoc(docref);
      const categories = await getDocsCategories(collection(firestore, "categories"));
      setApplicationContent({
        ...docSnap.data(),
        categories: categories,
      });
      console.log("Document data:", {
        ...docSnap.data(),
        categories: categories,
      });
      setLoading(false);
    }
    catch (e) {
      setLoading(false);
      setError(true);
      console.error("Error getting document:", e);
    }
  }

  useEffect(() => {
    setData();
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/' element={<Index data={applicationContent} isLoading={loading} isError={error}/>} exact></Route>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App