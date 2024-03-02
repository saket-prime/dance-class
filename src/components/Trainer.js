import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";

const initialModalState = {
    isOpen: false,
};

const Trainers = ({ categories }) => {

    const [activeCategory, setActiveCategory] = useState(categories?.length ? categories[0] : '');
    const [modal, setModal] = useState(initialModalState);

    // trainer details renderer > youtube video, name, about and other details
    const trainerDetailsRenderer = ({ name, about, video }) => {
        return (
            <div className="flex flex-col gap-3">
                <iframe width="100%" height="315" src={video} title={name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <h2 className="text-2xl font-semibold">{name}</h2>
                <p>{about}</p>
            </div>
        )
    }

    const showModal = (trainer) => {
        setModal({
            isOpen: true,
            trainer: trainer,
        });
    }

    const activateTab = (category) => {
        setActiveCategory(category);
    }

    return (
        <div className="h-screen pt-10 snap-start bg-slate-500 bg-blend-multiply bg-gradient-to-tr from-[#55549D] to-[#120B2C] flex flex-col justify-center " id='classes'>
            {/* modal */}
            {modal.isOpen && <div className="fixed inset-0 bg-black bg-opacity-80 z-10 flex justify-center items-center text-white">
                <div className="bg-gradient-to-tr from-[#55549D] to-[#120B2C] p-5 pt-10 rounded-md mx-3 flex flex-col gap-2 relative">
                    {trainerDetailsRenderer(modal.trainer || {})}
                    {/* form - name, email, age, phone */}
                    
                    <button onClick={() => setModal({isOpen: false, data: {}})} className="absolute top-3 right-3 p-1 rounded-2xl bg-slate-700">
                        <RxCross2 />
                    </button>
                </div>
            </div>}
            <div className="flex gap-5 text-lg font-semibold self-center">
                {categories?.map((category) => <h2 className={`${activeCategory.id === category?.id && 'border-b-2'} cursor-pointer hover:opacity-60`} onClick={() => activateTab(category)}>{category?.id?.toUpperCase()}</h2>)}
            </div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-2/3 overflow-y-auto mt-10 px-4">
                {
                    activeCategory?.trainers?.map((trainer) => {
                        const {
                            name, 
                            img = 'https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png?fit=1200%2C800&ssl=1', 
                            about = 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.', 
                            video,
                        } = trainer;
                        return (
                            <div className="max-h-full h-fit bg-white border border-gray-200 rounded-lg shadow">
                                <img className="rounded-t-lg" src={img} alt={`${name}'s profile`} />
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{name}</h5>
                                    <p className="mb-3 font-normal text-gray-700 about">{about}</p>
                                    <p onClick={() => showModal({name, video, about})} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                        Read more
                                         <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                        </svg>
                                    </p>
                                </div>
                            </div>
                            )
                    })
                }
            </div>
        </div>
    )
}

export default Trainers;