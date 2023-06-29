import React from 'react';
import Header from './Header';
import { useState,useEffect } from 'react';

const Faq = () => {
    const [Data, setData] = useState();

    useEffect(() => {
        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
        fetch(`https://server.elfiro.com/api/v1/fag`, options)
            .then(response => response.json())
            .then(response => setData(response.data.fag.questions))
            .catch(err => console.error(err));
    }, [])

    const showAcardeon = (event) => {
        document.getElementsByClassName("item-faq")[event].classList.toggle("active");
    }

    var dataitemruils;

    if(Data != undefined)
    {
        dataitemruils = (
            <div className='box-item-faq'>
                {
                    Object.keys(Data.fag).map(key => {
                        var item = Data.fag[key];
                        return (
                            <div key={key} className='item-faq'>
                                <div className='header-item-faq width-max flex-box flex-justify-space' onClick={(e) => showAcardeon(key)}>
                                    <div dangerouslySetInnerHTML={{ __html: item.question}}></div>

                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#7007FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8.46997 10.6399L12 14.1599L15.53 10.6399" stroke="#7007FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>

                                <div dangerouslySetInnerHTML={{ __html: item.answer}} className='message-item-faq'>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div>
            <Header style="1rem 2rem" />
            
            <section id='main-rules' className='flex-box'>
                <div className='show-main-rules'>
                    <div className='header-main-rules flex-box'>
                        <span>سوالات متداول</span>
                    </div>

                    {dataitemruils}
                </div>
            </section>
        </div>
    );
};

export default Faq;