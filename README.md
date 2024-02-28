{applicationData && 
                <div>
                    <h2 className="text-xl font-semibold">Application</h2>
                    {
                        applicationData?.content && <div className="flex flex-col gap-2">
                            <h3>Content:</h3>
                            <p>{JSON.stringify(applicationData?.content)}</p>
                        </div>
                    }
                    {
                        applicationData?.faqs?.faqs && <div className="flex flex-col gap-2">
                            <h3>FAQs:</h3>
                            <ul>
                                {
                                    applicationData?.faqs?.faqs?.map((faq, index) => {
                                        return <li key={index} className="flex flex-col gap-2">
                                            <h4>{faq.question}</h4>
                                            <p>{faq.answer}</p>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    }
                    {
                        applicationData?.queries && <div className="flex flex-col gap-2">
                            <h3>Queries:</h3>
                            <ul>
                                {
                                    Object.values(applicationData?.queries)?.map((query, index) => {
                                        return <li key={index} className="flex flex-col gap-2">
                                            <h4>{query.name}</h4>
                                            <p>{query.email}</p>
                                            <p>{query.message}</p>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    }
                </div>
            }