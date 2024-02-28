import { useEffect, useState } from "react";
import { firestore, auth, singInWithGoogle } from "../config/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, getDocs, collection, addDoc } from "firebase/firestore";
import { RxCross2 } from "react-icons/rx";
import { FaPen } from "react-icons/fa";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    const [expandedCategory, setExpandedCategory] = useState(-1);
    const [expandedClass, setExpandedClass] = useState(-1);
    const [activeCategoryUsers, setActiveCategoryUsers] = useState([]);
    const [applicationData, setApplicationData] = useState({});

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

    const onApplicationContentUpdate = async (e) => {
        e.preventDefault();
    }

    const addClassFormRenderer = () => {
        return (
            <div>
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
            </div>
        )
    }

    const applicationContentUpdateFormRenderer = () => {
        return applicationData?.content && (
            <form className="text-black" onSubmit={onApplicationContentUpdate}>
                {
                    Object.keys(applicationData.content).map((key, index) => {
                        return (
                            <div key={index} className="flex flex-col gap-2">
                                <label>{key}</label>
                                <input type="text" defaultValue={applicationData.content[key]} id={key}/>
                            </div>
                        )
                    })
                }
            </form>
        )
    }

    const expandCategory = (e, expanded, index) => {
        setExpandedClass(-1);
        setExpandedCategory(expanded ? index : -1);
    }

    const accordianExpandHandler = async (index, category, classId) => {
        if (index === expandedClass) {
            setExpandedClass(-1);
            return;
        } 
        setExpandedClass(index);
        setActiveCategoryUsers([]);
        const userSnapshot = await getDocs(collection(firestore, "categories", category, "classes", classId, "users"));
        const users = [];
        userSnapshot.docs.forEach(doc => {
            users.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        setActiveCategoryUsers(users);
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const querySnapshot = await getDoc(doc(firestore, "users", "admins"));
                const admins = querySnapshot.data();
                // const tempCategories = []
                if (admins?.emails?.includes(user.email)) {
                    setUser(user);
                    const querySnapshot = await getDocs(collection(firestore, "categories"))
                    const promises = querySnapshot.docs.map(async (doc) => {
                        const classes = [];
                        const categorySnapshot = await getDocs(collection(firestore, "categories", doc.id, "classes"));
                        categorySnapshot.forEach((classDoc) => {
                            classes.push({
                                id: classDoc.id,
                                ...classDoc.data()
                            });
                        });
                        return {
                            id: doc.id,
                            ...doc.data(),
                            classes,
                        };
                    });
                    const tempCategories = await Promise.all(promises);
                    setCategories(tempCategories);
                    const applicationSnapshot = await getDocs(collection(firestore, "application"));
                    const applications = {};
                    applicationSnapshot?.docs?.forEach((doc) => {
                        applications[doc.id] = doc.data();
                    });
                    console.log(applications, "application");
                    setApplicationData(applications);
                }
            }
        });
    }, []);

    return (
        <div className="min-h-screen bg-black text-white sm:p-12 p-3 flex flex-col gap-3">
            {/* modal */}
            {modal && <div className="fixed inset-0 bg-black bg-opacity-90 z-10 flex justify-center items-center text-white">
                <div className="bg-gradient-to-tr from-[#55549D] to-[#120B2C] p-5 rounded-md mx-3 flex flex-col gap-2 relative">
                    {addClassFormRenderer()}
                    <button onClick={() => setModal(false)} className="absolute top-3 right-3 p-1 rounded-2xl bg-slate-700">
                        <RxCross2 />
                    </button>
                </div>
            </div>}
            <div className="w-full flex justify-between pt-20">
                <h1 className="text-xl font-semibold">Dashboard for Admins</h1>
                {!user ? <button onClick={singInWithGoogle} className="bg-green-50 text-black px-3 rounded-md font-semibold">SingIn</button> :
                <button className="bg-green-50 text-black px-3 rounded-md font-semibold" onClick={addClass}>Add Class</button>}
            </div>
            <div>
                <h2 className="text-xl font-semibold">Categories</h2>
                {/* categories accordian with classes as accoridians list */}
                {
                    categories.map((category, index) => {
                        return (
                            <Accordion key={index} expanded={expandedCategory === index} onChange={(e, expanded) => expandCategory(e, expanded, index)}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                    {category.id}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="flex flex-col gap-2">
                                        {
                                            category.classes.map(({id, name, level, fees, freq, startTime, endTime, days }, index) => {
                                                if (name && startTime && endTime && days )
                                                    return (
                                                    <Accordion expanded={expandedClass === index}>
                                                        <AccordionSummary 
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel2a-content"
                                                            id="panel2a-header"
                                                            onClick={() => accordianExpandHandler(index, category.id, id)}
                                                        >
                                                            <div key={index} className="w-full p-2 bg-[#55549d8c] rounded-md flex justify-between gap-2">
                                                                <span>{name}</span>
                                                                <span className="text-sm opacity-65">{level === 'All' ? 'Beginner/Intermediate/Advanced' : level}</span>
                                                                <span>{startTime}-{endTime}</span>
                                                            </div>
                                                         </AccordionSummary>
                                                         <AccordionDetails>
                                                                <div className="flex max-sm:flex-col gap-2 items-center">
                                                                    <span>Days:</span>
                                                                    <div className="flex gap-2">
                                                                        {Object.values(days).map(({day, active}, index) => {
                                                                            return active && <span key={index} className="p-1 bg-green-50 rounded-md">{day}</span>
                                                                        })}
                                                                    </div>
                                                                </div>
                                                                    <span>Fees: {fees} per {freq}</span>
                                                                    <div>
                                                                        <h3 >Enrolled Users List:</h3>
                                                                        {/* table for the enrolled user */}
                                                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                                            <thead className="text-xs text-white uppercase bg-slate-700 dark:text-gray-400">
                                                                                <tr className="py-2">
                                                                                    <th>Name</th>
                                                                                    <th>Email</th>
                                                                                    <th>Age</th>
                                                                                    <th>Phone</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody >
                                                                                {
                                                                                    activeCategoryUsers.map((user, index) => {
                                                                                        return (
                                                                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 py-1">
                                                                                            <td>{user.name}</td>
                                                                                            <td>{user.email}</td>
                                                                                            <td>{user.age}</td>
                                                                                            <td>{user.phone}</td>
                                                                                        </tr>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                            </AccordionDetails>
                                                    </Accordion>
                                                    )
                                            })
                                        }
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </div>
            <div>
                {applicationContentUpdateFormRenderer()}
            </div>
        </div>
    );
}

export default Dashboard;