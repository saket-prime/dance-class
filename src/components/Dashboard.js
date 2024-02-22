import { useEffect, useState } from "react";
import { firestore, auth, singInWithGoogle } from "../config/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, getDocs, collection, setDoc, addDoc } from "firebase/firestore";
import { RxCross2 } from "react-icons/rx";

const initalDaysState = {
    0: {
        day: 'Monday',
        active: false
    },
    1: {
        day: 'Tuesday',
        active: false
    },
    2: {
        day: 'Wednesday',
        active: false
    },
    3: {
        day: 'Thursday',
        active: false
    },
    4: {
        day: 'Friday',
        active: false
    },
    5: {
        day: 'Saturday',
        active: false
    },
    6: {
        day: 'Sunday',
        active: false
    }
};

const level = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const freq = ['Month', 'Week', 'Session'];

const Dashboard = () => {

    const [user, setUser] = useState(null);
    const [days, setDays] = useState(initalDaysState);
    const [modal, setModal] = useState(false);
    const [categories, setCategories] = useState([]);

    const addClass = () => {
        setModal(true);
    }

    const onAddDay = (e, key) => {
        const newDays = {
            ...days
        };
        newDays[key].active = e.target.checked;
        setDays(newDays);
    }

    const onAddClass = async (e) => {
        e.preventDefault();
        const name = e.target.name?.value;
        const description = e.target.description?.value;
        const startTime = e.target.startTime?.value;
        const endTime = e.target.endTime?.value;
        const trainer = e.target.trainer?.value;
        const level = e.target.level?.value;
        const category = e.target.category?.value;
        const fees = e.target.fees?.value;
        const freq = e.target.freq?.value;

        const updatedDays = {};
        Object.keys(days).forEach((key) => {
            updatedDays[key] = {
                ...days[key]
            }
        });

        const data = {
            name,
            description,
            startTime,
            endTime,
            days: updatedDays,
            trainer,
            level,
            fees,
            freq
        }

        await addDoc(collection(firestore, "categories", category, "classes"), data);
        e.target.reset();
        setModal(false);
        setDays(initalDaysState);
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const querySnapshot = await getDoc(doc(firestore, "users", "admins"));
                const admins = querySnapshot.data();
                if (admins?.emails?.includes(user.email)) {
                    const categories = []
                    setUser(user);
                    const querySnapshot = await getDocs(collection(firestore, "categories"))
                    querySnapshot.forEach((doc) => {
                        categories.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                    setCategories(categories);
                }
            }
        });
    }, []);

    return (
        <div className="h-screen snap-start bg-black text-white sm:p-12 p-3 flex justify-between items-center">
            {/* modal */}
            {modal && <div className="fixed inset-0 bg-black bg-opacity-90 z-10 flex justify-center items-center text-white">
                <div className="bg-gradient-to-tr from-[#55549D] to-[#120B2C] p-5 rounded-md mx-3 flex flex-col gap-2 relative">
                    <h2 className="text-center">Add Class</h2>
                    <form className="text-black" onSubmit={onAddClass}>
                        <div className="flex flex-col gap-2">
                            <input type="text" placeholder="Class Name*" className="p-2 rounded-md" id="name" required/>
                            <textarea placeholder="Description" className="p-2 rounded-md" id="description"></textarea>
                            <div className="flex gap-2 items-center">
                                <span className="text-white">Start time*</span><input type="time" className="p-2 rounded-md" id="startTime" required/>
                                <span className="text-white">End time*</span><input type="time" className="p-2 rounded-md" id="endTime" required/>
                            </div>
                            <div className="flex gap-2 text-white">
                                {Object.keys(days).map((key, index) => {
                                    return <label key={index} className="flex items-center gap-1">
                                        <input type="checkbox" onChange={(e) => onAddDay(e, key)} defaultChecked={days[key].active}/>
                                        <span>{days[key].day}</span>
                                    </label>
                                })}
                            </div>
                            <input type="text" placeholder="Trainer" className="p-2 rounded-md" id="trainer"/>
                            <select className="p-2 rounded-md" id="level">
                                {level.map((l, index) => {
                                    return <option key={index} value={l}>{l}</option>
                                })}
                            </select>
                            <div className="flex items-center gap-2">
                                <input type="number" placeholder="Fees" className="p-2 rounded-md" id="fees"/>
                                <span className="text-white">per</span>
                                <select className="p-2 rounded-md" id="freq">
                                    {freq.map((f, index) => {
                                        return <option key={index} value={f}>{f}</option>
                                    })}
                                </select>
                            </div>
                            <select className="p-2 rounded-md" id="category">
                                <option value="0">Select Category</option>
                                {categories.map((c, index) => {
                                    return <option key={index} value={c.id}>{c.id}</option>
                                })}
                            </select>
                            <button className="bg-green-50 text-black p-2 rounded-md" type="submit">Add Class</button>
                        </div>
                    </form>
                    <button onClick={() => setModal(false)} className="absolute top-3 right-3 p-1 rounded-2xl bg-slate-700">
                        <RxCross2 />
                    </button>
                </div>
            </div>}
            <div className="flex justify-between">
                <h1 className="text-xl font-semibold">Dashboard for Admins</h1>
                {!user ? <button onClick={singInWithGoogle} className="bg-green-50 font-black">SingIn</button> :
                <button className="bg-green-50 text-black px-3 rounded-md font-semibold" onClick={addClass}>Add Class</button>}
            </div>
        </div>
    );
}

export default Dashboard;