import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Faqs = ({ faqs }) => {
    return (
        <div className="h-screen snap-start flex flex-col items-center justify-center bg-[#1e134d] gap-5" id="faq">
            <h1 className="text-xl text-white">Frequently Asked Questions</h1>
            <div className="px-2 max-w-4xl w-full h-2/3 overflow-y-auto">
                {/* use acccordian to show all faqs question and answer */}
                {faqs &&
                    faqs?.map((faq, index) => 
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