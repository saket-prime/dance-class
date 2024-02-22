import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { firestore } from "../config/firebase.config";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

const Faqs = () => {

    const [faqs, setFaqs] = useState([]);

    const getFaqs = async () => {
        const querySnapshot = await getDoc(doc(firestore, "application", "faqs"));
        if (querySnapshot.exists() && querySnapshot.data()?.faqs) {
            setFaqs(querySnapshot.data()?.faqs);
        }
    }

    useEffect(() => {
        getFaqs();
    }, []);

    return (
        <div className="h-screen snap-start flex flex-col items-center justify-center bg-[#1e134d] gap-5">
            <h1 className="text-xl text-white">Frequently Asked Questions</h1>
            <div className="px-2 max-w-4xl w-full">
                {/* use acccordian to show all faqs question and answer */}
                {
                    faqs.map((faq, index) => 
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            {faq.question}
                        </AccordionSummary>
                        <AccordionDetails>
                                {faq.answer}
                        </AccordionDetails>
                    </Accordion>
                    )
                }
            </div>
        </div>
    );
    }

export default Faqs;