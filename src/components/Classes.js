import { useEffect, useState } from 'react';
import { firestore } from '../config/firebase.config';
import { getDocs, query, collection, doc, setDoc } from 'firebase/firestore';
import { RxCross2 } from "react-icons/rx";

const initialModalState = {
    isOpen: false,
    data: {
        id: '',
        name: '',
        startTime: '',
        endTime: '',
        days: {},
        trainer: '',
        level: '',
        description: ''
    }
};

const Classes = () => {

    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(initialModalState);

    const getDocsCategories = async (query) => {
        const categories = [];
        const querySnapshot = await getDocs(query);
        querySnapshot.forEach((doc) => {
            categories.push({
                id: doc.id,
                ...doc.data()
            });
        });
        setCategories(categories);
        setActiveCategory(categories.length ? categories[0]?.id : '');
    }

    const getClassSchedulesByCategory = async (category) => {
        if (!category) return;
        const classes = [];
        setIsLoading(true);
        const q = query(collection(firestore, "categories", category, "classes"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            classes.push({
                id: doc.id,
                ...doc.data()
            });
        });
        setClasses(classes);
        setIsLoading(false);
    }

    const showModal = ({id, name, description, startTime, endTime, days, trainer, level}) => {
        setModal({
            isOpen: true,
            data: {
                id,
                name,
                description,
                startTime,
                endTime,
                days,
                trainer,
                level
            }
        });
    }

    const enrollFormHandler = async (e) => {
        e.preventDefault();

        const name = e.target.name?.value;
        const email = e.target.email?.value;
        const age = e.target.age?.value;
        const phone = e.target.phone?.value;
        const classId = e.target.classId?.value;
        const category = e.target.category?.value;
        
        await setDoc(doc(firestore, "categories", category, "classes", classId, "users", email), {
            name,
            email,
            age,
            phone,
            classId
        });
        setModal(initialModalState);
    }

    const activateTab = (category) => {
        setActiveCategory(category);
    }

    useEffect(() => {
        getClassSchedulesByCategory(activeCategory);
    }, [activeCategory]);

    useEffect(() => {
        getDocsCategories(collection(firestore, "categories"));
    }, []);

    return (
        <div className="h-screen pt-10 snap-start bg-slate-500 bg-blend-multiply bg-gradient-to-tr from-[#55549D] to-[#120B2C] flex flex-col justify-center " id='classes'>
            {/* modal */}
            {modal.isOpen && <div className="fixed inset-0 bg-black bg-opacity-80 z-10 flex justify-center items-center text-white">
                <div className="bg-gradient-to-tr from-[#55549D] to-[#120B2C] p-5 rounded-md mx-3 flex flex-col gap-2 relative">
                    <h2 className="text-center">{modal.data.name}</h2>
                    {modal.data.trainer && modal.data.startTime && modal.data.endTime && <p className="text-center text-sm opacity-75">(<span>By trainer</span> {modal.data.trainer} from <span className="text-base">{modal.data.startTime}</span> to <span className="text-base">{modal.data.endTime}</span>)</p>}
                    {modal.data.level && <div className="text-xs opacity-50 text-center">{modal.data.level === 'All' ? 'Beginner/ Intermediate/ Advanced' : modal.data.level}</div>}
                    {/* {modal.data.description && <p className='text-sm opacity-70'>{modal.data.description}</p>} */}
                    {/* {modal.data.startTime && modal.data.endTime && <p className="text-center text-sm opacity-75">{`${modal.data.startTime} - ${modal.data.endTime}`}</p>} */}
                    <div className='self-center'>
                        {modal.data.days && typeof modal.data.days === 'object' &&
                            Object.values(modal.data.days).map(({day, active}) => <span className={`${active ? 'bg-green-200' : 'bg-[#535e68]'} px-1.5 mx-1.5 text-slate-800`}>{day?.slice(0,1)}</span>)
                        }
                    </div>
                    {/* form - name, email, age, phone */}
                    <form onSubmit={enrollFormHandler} className="text-black">
                        <input type="text" placeholder="Name" className="w-full p-2 my-2 rounded-md outline-none" id="name"/>
                        <input type="email" placeholder="Email" className="w-full p-2 my-2 rounded-md outline-none" id="email"/>
                        <div className="w-full flex max-md:flex-col sm:gap-2">
                            <input type="number" placeholder="Age" className="p-2 my-2 rounded-md outline-none" id="age"/>
                            <input type="number" placeholder="Phone" className="p-2 my-2 rounded-md outline-none" id="phone"/>
                        </div>
                        <input type="text" className="p-2 rounded-md outline-none hidden" value={modal.data.id} id="classId"/>
                        <input type="text" className="p-2 rounded-md outline-none hidden" value={activeCategory} id="category"/>
                        <button className="text-white font-semibold p-2 my-2 w-full rounded-md bg-[#0f09275a]" type="submit">SUBMIT</button>
                    </form>
                    <button onClick={() => setModal({isOpen: false, data: {}})} className="absolute top-3 right-3 p-1 rounded-2xl bg-slate-700">
                        <RxCross2 />
                    </button>
                </div>
            </div>}
            <div className="flex gap-5 text-lg font-semibold self-center">
                {categories.map(({id}) => <h2 className={`${activeCategory === id && 'border-b-2'} cursor-pointer hover:opacity-60`} onClick={() => activateTab(id)}>{id.toUpperCase()}</h2>)}
            </div>
            {isLoading ? <div role="status" className="mx-auto h-2/3 mt-10 items-center justify-center flex">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div> :
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-2/3 mt-10 px-4">
                {classes.map(({id, name, startTime, description, endTime, days, trainer, level, fees, freq}) => (
                    name && startTime && endTime && days && <div className="flex flex-col gap-1 bg-[#32445577] p-3 rounded-md h-fit">
                        <h2 className="text-center">{name}</h2>
                        {level && <div className="text-xs opacity-50 text-center">{level === 'All' ? 'Beginner/ Intermediate/ Advanced' : level}</div>}
                        <p><span className="text-sm opacity-75">Timing</span> {`${startTime} - ${endTime}`}</p>
                        {trainer && <p><span className="text-sm opacity-75">Trainer</span> {trainer}</p>}
                        {fees && <p><span className="text-sm opacity-75">Fees</span> {`Rs.${fees}/${freq}`}</p>}
                        <div className="text-gray-600 flex gap-2 flex-wrap">
                        {days && typeof days === 'object' &&
                            Object.values(days).map(({day, active}) => <span className={`${active ? 'bg-green-200' : 'bg-[#637280]'} px-1.5`}>{day?.slice(0,3)}</span>)
                        }
                        </div>
                        <button 
                        className="ms-auto px-3 py-1 mt-2 rounded-md bg-[#a290e95a]" 
                        onClick={() => showModal({id, name, startTime, description, endTime, days, trainer, level})}>
                            ENROLL
                        </button>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default Classes;