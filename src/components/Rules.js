import React from 'react';
import Header from './Header';
import { useState,useEffect } from 'react';

const Rules = () => {
    const [Data, setData] = useState();

    useEffect(() => {
        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
        fetch(`https://server.elfiro.com/api/v1/laws`, options)
            .then(response => response.json())
            .then(response => setData(response.data.laws.laws))
            .catch(err => console.error(err));
    }, [])

    var dataitemruils;

    if(Data != undefined)
    {
        dataitemruils = (
            <div className='box-item-rules'>
                {
                    Object.keys(Data).map(key => {
                        var item = Data[key];
                        return (
                            <div key={key} className='item-rules flex-box flex-aling-right'>
                                <div className='count flex-box'>
                                    <span>{Number(key) + 1}</span>
                                </div>

                                <div className='message width-max' dangerouslySetInnerHTML={{ __html: item.content}}>

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
                        <span>قوانین</span>
                    </div>

                    <div className='confirmd-main-rules flex-box'>
                        <span>* استفاده از سایت به منزله پذیرش این توافق نامه است *</span>
                    </div>

                    <div className='description-main-rules'>
                        <span>در این متن منظور از « فارس گیمر » ، «فروشگاه» ، «فروشگاه فارس گیمر » ، «سایت و وبسایت فارس گیمر » ، «سایت» ، «وبسایت» ، «ما» ، «تیم انجام سفارشات» ، «این فروشگاه» ، «اپراتور» «گروه فورتنایت فا» ، فروشگاه فارس گیمر یعنی www.farsgamer.com و «کاربر» ، «کاربران» «مشتری» ، «مشتریان» ، «خریدار» ، «خریداران» ، «شما» و «خود مشتری» به معنی خریداران محصول، مشتریان، بازدیدکنندگان و کلیه کسانی که از خدمات و محصولات فارس گیمر استفاده می کنند می باشد. همچنین «سفارش» ، «کالا» ، «خدمات» ، «سفارشات» ، شامل محصولات و آیتم های درون بازی است و همچنین «کالا های فیزیکی » کالا هایی است که برای آدرس کاربر ارسال خواهد شد.</span>
                    </div>

                    {dataitemruils}
                </div>
            </section>
        </div>
    );
};

export default Rules;