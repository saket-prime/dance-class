import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";

const initialModalState = {
    isOpen: false,
};

const imgPlaceholder = 'https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png?fit=1200%2C800&ssl=1';

const Trainers = ({ categories }) => {

    const [activeCategory, setActiveCategory] = useState(categories?.length ? categories[0] : '');
    const [modal, setModal] = useState(initialModalState);

    // trainer details renderer > youtube video, name, about and other details
    const trainerDetailsRenderer = ({ name, about, video, portfolio, gallery }) => {
        console.log('video', video, 'portfolio', portfolio, 'gallery', gallery)
        return (
            <div className="flex flex-col gap-3 overflow-y-auto">
                <div className="w-full bg-[#32445577] rounded-lg shadow-lg">
                <iframe className='w-full h-[550px] max-md:h-[300px] max-sm:h-[200px]' src={`https://www.youtube.com/embed/${video || portfolio?.length ? portfolio[0] : 'HtOPPO-d6kM'}`} title={name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <h2 className="text-2xl font-semibold">{name}</h2>
                <p>{about}</p>
                {gallery?.length && 
                <div>
                    <h1 className="text-2xl font-semibold mb-3">Gallery</h1>
                    <div className="gap-3 grid xl:grid-cols-3 md:grid-cols-1 sm:grid-cols-1">
                        {gallery?.map((img) => <img src={img} alt={name} className="" />)}
                    </div>
                </div>}
                {portfolio?.length && 
                <div>
                    <h1 className="text-2xl font-semibold mb-3">Videos</h1>
                    <div className="gap-3 grid xl:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 h-60">
                        {portfolio?.map((video) => <iframe width={"100%"} height={"100%"} src={`https://www.youtube.com/embed/${video}`} title={name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; full picture-in-picture; web-share" allowfullscreen></iframe>)}
                    </div>
                </div>}
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
        <div className="h-screen pt-10 snap-start bg-slate-500 bg-blend-multiply bg-gradient-to-tr from-[#55549D] to-[#120B2C] flex flex-col justify-center " id='trainers'>
            {/* modal */}
            {modal.isOpen && <div className="fixed inset-0 bg-black bg-opacity-80 z-10 flex justify-center items-center text-white px-4">
                <div className="bg-gradient-to-tr from-[#55549D] to-[#120B2C] p-5 pt-10 rounded-md mx-3 flex flex-col gap-2 relative h-2/3 lg:w-2/3 overflow-auto">
                    {trainerDetailsRenderer(modal.trainer || {})}
                    {/* form - name, email, age, phone */}
                    
                    <button onClick={() => setModal({isOpen: false, data: {}})} className="absolute top-3 right-3 p-1 rounded-2xl bg-slate-700">
                        <RxCross2 />
                    </button>
                </div>
            </div>}
            <h1 className="text-4xl font-bold text-white text-center mb-2 max-md:text-2xl">Our Trainers</h1>
            <div className="flex gap-5 text-lg font-semibold self-center items-center">
                {categories?.map((category) => <h2 className={`${activeCategory.id === category?.id && 'border-b-2'} cursor-pointer hover:opacity-60`} onClick={() => activateTab(category)}>{category?.id?.toUpperCase()}</h2>)}
            </div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-2/3 overflow-y-auto mt-10 px-4">
                {
                    activeCategory?.trainers?.map((trainer) => {
                        const {
                            name, 
                            gallery = [imgPlaceholder], 
                            about = 'A great trainer', 
                        } = trainer;
                        return (
                            <div className="max-h-full h-fit bg-[#32445577] border border-[#465e7477] rounded-lg shadow">
                                <img className="rounded-t-lg" src={gallery?.length ? gallery[0] : imgPlaceholder} alt={`${name}'s profile`} />
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-200">{name}</h5>
                                    <p className="mb-3 font-normal text-gray-400 about">{about}</p>
                                    <p onClick={() => showModal(trainer)} className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                        Know more
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