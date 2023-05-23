import React from 'react';
import { useState,useEffect } from 'react';

const NoPage = () => {
    const [number, Setnumber] = useState(5);

    useEffect(() => {
        const handle = setInterval(() => {
            Setnumber((prev) => {
                if(prev > 0)
                {
                    return prev-1
                }else{
                    return 0
                }
            })
        }, 1000);
    }, []);

    useEffect(() => {
        if(number === 0)
        {
            window.location = "/"
        }
    }, [number])
    

    return (
        <>
            <section id='main-nopage' className='flex-box flex-column'>
                <div className='image'>
                    <img src='https://server.elfiro.com/storage/photos/404.png' />
                </div>

                <div className='text-no'>
                    <span>متاسفانه صفحه مورد نظر پیدا نشد</span>
                </div>

                <div className='text-re'>
                    <span>تا</span>

                    <span id='show-number'>{number}</span>

                    <span>ثانیه دیگر برمیگردی صفحه اصلی</span>
                </div>
            </section>
        </>
    );
};

export default NoPage;