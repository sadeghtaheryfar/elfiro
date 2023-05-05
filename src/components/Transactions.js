import React from 'react';
import { useEffect,useState } from 'react';
import Link from 'antd/es/typography/Link';
import Header from './Header';
import Checkbox from 'antd/es/checkbox/Checkbox';

const Transactions = () => {    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    var idorder = window.location.pathname;
    const [Data, setData] = useState();
    const [userdata, setuserdata] = useState();

    useEffect(() => {
        const usertoken = localStorage.getItem("user-login");

        if(localStorage.getItem("user-login") != undefined)
        {
            if(usertoken != undefined)
            {
                const options = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`}
                };

                fetch('https://server.elfiro.com/api/v1/basic/user', options)
                    .then(response => response.json())
                    .then(response => {
                        if(response.status != "success")
                        {
                            window.location = "/Login"
                        }else{
                            setuserdata(response.data.user_data.user)
                        }
                    })
                    .catch(err => {
                        window.location = "/Login"
                    });
            }else{
                window.location = "/Login";
            }
        }else{
            window.location = "/Login";
        }

        if(idorder != undefined)
        {
            const options2 = {
                method: 'GET', 
                headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`}
            };
            fetch(`https://server.elfiro.com/api/v1/client${idorder}?page=1`, options2)
                .then(response => response.json())
                .then(response => {
                    setData(response.data.transaction.record);
                    console.log(response);
                })
                .catch(err => console.error(err));
        }
    }, [])

    var waitConfirm ;

    console.log(userdata);

    const sendConfirm = () => {
        const usertoken = localStorage.getItem("user-login");
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`},
            body: `{"transaction_id":${Data.id}}`
        };

        fetch(`https://server.elfiro.com/api/v1/client/transactions/${Data.id}`, options)
            .then(response => response.json())
            .then(response => {
                if(response.status === "success")
                {
                    document.getElementById("sucsend").innerHTML = response.data.message.transaction;
                }else{
                    if(response.data.message != undefined)
                    {
                        document.getElementById("errsend").innerHTML = response.data.message.transaction;
                    }
                }
            })
            .catch(err => console.log(err))
    }

    const startPay = () => {
        const usertoken = localStorage.getItem("user-login");
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`},
            body: `{"transaction_id":${Data.id}}`
        };

        fetch(`https://server.elfiro.com/api/v1/client/transactions/${Data.id}`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    const cancelPay = () => {
        const usertoken = localStorage.getItem("user-login");
        const options = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`},
            body: `{"transaction_id":${Data.id}}`
        };

        fetch(`https://server.elfiro.com/api/v1/client/transactions/${Data.id}`, options)
            .then(response => response.json())
            .then(response => {
                if(response.status === "success")
                {
                    document.getElementById("sucsend2").innerHTML = response.data.message.transaction;
                }else{
                    if(response.data.message != undefined)
                    {
                        document.getElementById("errsend2").innerHTML = response.data.message.transaction;
                    }
                }
            })
            .catch(err => console.log(err))
    }

    if(Data != undefined && userdata != undefined && Data.status === "wait_for_confirm")
    {
        if(Data.customer.phone === userdata.phone)
        {
            waitConfirm = (
                <section id='main-transsaction' className='flex-box flex-aling-right'>
                    <section id='header-main-tran'>
                        <div className='user-box-tran flex-box flex-justify-space'>
                            <div className='item-user-box-tran flex-box flex-column'>
                                <div className='flex-box'>
                                    <img src={Data.customer.profile_image} />

                                    <div className='flex-box bac-color-green'>
                                        <span>خریدار</span>
                                    </div>
                                </div>

                                <div>
                                    <span>{Data.customer.name}</span>
                                </div>

                                <div>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.23516 0.595215L7.92555 4.01979L11.7057 4.57231L8.97042 7.23648L9.61594 11.0002L6.23516 9.22229L2.85438 11.0002L3.49991 7.23648L0.764648 4.57231L4.54477 4.01979L6.23516 0.595215Z" stroke="#7007FA" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                
                                <div>
                                    <Link>مشاهده پروفایل</Link>
                                </div>
                            </div>

                            <div className='item-user-box-tran flex-box flex-column flex-justify-space'>
                                <div className='flex-box'>
                                    <img src={Data.seller.profile_image} />

                                    <div className='flex-box bac-color-blue'>
                                        <span>فروشنده</span>
                                    </div>
                                </div>

                                <div>
                                    <span>{Data.seller.name}</span>
                                </div>

                                <div>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.23516 0.595215L7.92555 4.01979L11.7057 4.57231L8.97042 7.23648L9.61594 11.0002L6.23516 9.22229L2.85438 11.0002L3.49991 7.23648L0.764648 4.57231L4.54477 4.01979L6.23516 0.595215Z" stroke="#7007FA" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                
                                <div>
                                    <Link>مشاهده پروفایل</Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className='border-header-tran'></div>

                        <div className='name-box-tran flex-box'>
                            <div className='flex-box'>
                                <img src={Data.order.image} />
                            </div>

                            <div className='width-max'>
                                <span>{Data.order.name}</span>
                            </div>
                        </div>
                        
                        <div className='border-header-tran'></div>
                        
                        <div className='price-box-tran flex-box'>
                            <span>{Data.order.price}</span>

                            <span>تومان</span>

                            <div></div>
                        </div>

                        <div className='flex-box secure-box-tran'>
                            <div>
                                <img src='https://server.elfiro.com/storage/photos/Frame 1.png' />
                            </div>
                            
                            <span>معامله با واسطه امن</span>
                        </div>
                    </section>

                    <section id='show-main-tran' className='width-max flex-box flex-aling-right'>
                        <div className='status-bar-tran'>
                            <div className='item-status-bar-tran item-status-bar-tran-active flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله اول</span>
                                    </div>

                                    <div>
                                        <span className='color-blue'>درخواست معامله</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله دوم</span>
                                    </div>

                                    <div>
                                        <span>پرداخت</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله سوم</span>
                                    </div>

                                    <div>
                                        <span>دریافت محصول</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله چهارم</span>
                                    </div>

                                    <div>
                                        <span>تایید و تغییر اطلاعات</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column flex-aling-right flex-right'>
                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله پنجم</span>
                                    </div>

                                    <div>
                                        <span>تکمیل فرایند</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='width-max flex-box'>
                            <div className='box-detalist-tran flex-box flex-column'>
                                <div className='image'>
                                    <img  src='https://elfiro.com/img/1.jpg'/> 
                                </div>

                                <div className='text flex-box flex-aling-right'>
                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.5005 21.0215C4.9745 21.0215 0.478516 16.5265 0.478516 11.0005C0.478516 5.47449 4.9745 0.979492 10.5005 0.979492C16.0255 0.979492 20.5215 5.47449 20.5215 11.0005C20.5215 16.5265 16.0255 21.0215 10.5005 21.0215ZM10.5005 2.97949C6.0775 2.97949 2.47852 6.57748 2.47852 11.0005C2.47852 15.4235 6.0775 19.0215 10.5005 19.0215C14.9225 19.0215 18.5215 15.4235 18.5215 11.0005C18.5215 6.57748 14.9225 2.97949 10.5005 2.97949Z" fill="#7007FA"/>
                                        <rect x="9.62793" y="5.42578" width="2" height="6.16992" fill="#7007FA"/>
                                        <rect x="11.4844" y="11.5342" width="1.99979" height="4.42391" transform="rotate(-44.9955 11.4844 11.5342)" fill="#7007FA"/>
                                    </svg>

                                    <span>{Data.current_status_data.message}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            )
        }else{
            waitConfirm = (
                <section id='main-transsaction' className='flex-box flex-aling-right'>
                    <section id='header-main-tran'>
                        <div className='user-box-tran flex-box flex-justify-space'>
                            <div className='item-user-box-tran flex-box flex-column'>
                                <div className='flex-box'>
                                    <img src={Data.customer.profile_image} />

                                    <div className='flex-box bac-color-green'>
                                        <span>خریدار</span>
                                    </div>
                                </div>

                                <div>
                                    <span>{Data.customer.name}</span>
                                </div>

                                <div>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.23516 0.595215L7.92555 4.01979L11.7057 4.57231L8.97042 7.23648L9.61594 11.0002L6.23516 9.22229L2.85438 11.0002L3.49991 7.23648L0.764648 4.57231L4.54477 4.01979L6.23516 0.595215Z" stroke="#7007FA" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                
                                <div>
                                    <Link>مشاهده پروفایل</Link>
                                </div>
                            </div>

                            <div className='item-user-box-tran flex-box flex-column flex-justify-space'>
                                <div className='flex-box'>
                                    <img src={Data.seller.profile_image} />

                                    <div className='flex-box bac-color-blue'>
                                        <span>فروشنده</span>
                                    </div>
                                </div>

                                <div>
                                    <span>{Data.seller.name}</span>
                                </div>

                                <div>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.23516 0.595215L7.92555 4.01979L11.7057 4.57231L8.97042 7.23648L9.61594 11.0002L6.23516 9.22229L2.85438 11.0002L3.49991 7.23648L0.764648 4.57231L4.54477 4.01979L6.23516 0.595215Z" stroke="#7007FA" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                
                                <div>
                                    <Link>مشاهده پروفایل</Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className='border-header-tran'></div>

                        <div className='name-box-tran flex-box'>
                            <div className='flex-box'>
                                <img src={Data.order.image} />
                            </div>

                            <div className='width-max'>
                                <span>{Data.order.name}</span>
                            </div>
                        </div>
                        
                        <div className='border-header-tran'></div>
                        
                        <div className='price-box-tran flex-box'>
                            <span>{Data.order.price}</span>

                            <span>تومان</span>

                            <div></div>
                        </div>

                        <div className='flex-box secure-box-tran'>
                            <div>
                                <img src='https://server.elfiro.com/storage/photos/Frame 1.png' />
                            </div>
                            
                            <span>معامله با واسطه امن</span>
                        </div>
                    </section>

                    <section id='show-main-tran' className='width-max flex-box flex-aling-right'>
                        <div className='status-bar-tran'>
                            <div className='item-status-bar-tran item-status-bar-tran-active flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله اول</span>
                                    </div>

                                    <div>
                                        <span className='color-blue'>درخواست معامله</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله دوم</span>
                                    </div>

                                    <div>
                                        <span>پرداخت</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله سوم</span>
                                    </div>

                                    <div>
                                        <span>دریافت محصول</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله چهارم</span>
                                    </div>

                                    <div>
                                        <span>تایید و تغییر اطلاعات</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column flex-aling-right flex-right'>
                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله پنجم</span>
                                    </div>

                                    <div>
                                        <span>تکمیل فرایند</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='width-max flex-box'>
                            <div className='box-detalist-tran flex-box flex-column'>
                                <div className='box-accept flex-box flex-column'>
                                    <div className='logo'>
                                        <img src='http://server.elfiro.com/storage/profiles/w0Lyoli1rzPWRxkU95WFlIJgF6RVVxirQEwdMkL8.jpg' />
                                    </div>

                                    <div className='name'>
                                        <span>sadegh</span>
                                    </div>

                                    <div className='detalist'>
                                        <span>{Data.current_status_data.message}</span>
                                    </div>
                                </div>

                                <div className='btn-accept'>
                                    <button onClick={() => sendConfirm(true)}>شروع معامله</button>

                                    <button onClick={() => sendConfirm(false)}>رد درخواست</button>
                                </div>

                                <div className='flex-box'>
                                    <span id='errsend' className='err-tiket-add'></span>
                                    <span id='sucsend' className='sucsess-tiket-add'></span>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            )
        }
    }

    if(Data != undefined && userdata != undefined && Data.status === "wait_for_pay")
    {
        if(Data.customer.phone === userdata.phone)
        {
            waitConfirm = (
                <section id='main-transsaction' className='flex-box flex-aling-right'>
                    <section id='header-main-tran'>
                        <div className='user-box-tran flex-box flex-justify-space'>
                            <div className='item-user-box-tran flex-box flex-column'>
                                <div className='flex-box'>
                                    <img src={Data.customer.profile_image} />

                                    <div className='flex-box bac-color-green'>
                                        <span>خریدار</span>
                                    </div>
                                </div>

                                <div>
                                    <span>{Data.customer.name}</span>
                                </div>

                                <div>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.23516 0.595215L7.92555 4.01979L11.7057 4.57231L8.97042 7.23648L9.61594 11.0002L6.23516 9.22229L2.85438 11.0002L3.49991 7.23648L0.764648 4.57231L4.54477 4.01979L6.23516 0.595215Z" stroke="#7007FA" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                
                                <div>
                                    <Link>مشاهده پروفایل</Link>
                                </div>
                            </div>

                            <div className='item-user-box-tran flex-box flex-column flex-justify-space'>
                                <div className='flex-box'>
                                    <img src={Data.seller.profile_image} />

                                    <div className='flex-box bac-color-blue'>
                                        <span>فروشنده</span>
                                    </div>
                                </div>

                                <div>
                                    <span>{Data.seller.name}</span>
                                </div>

                                <div>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.23516 0.595215L7.92555 4.01979L11.7057 4.57231L8.97042 7.23648L9.61594 11.0002L6.23516 9.22229L2.85438 11.0002L3.49991 7.23648L0.764648 4.57231L4.54477 4.01979L6.23516 0.595215Z" stroke="#7007FA" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                
                                <div>
                                    <Link>مشاهده پروفایل</Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className='border-header-tran'></div>

                        <div className='name-box-tran flex-box'>
                            <div className='flex-box'>
                                <img src={Data.order.image} />
                            </div>

                            <div className='width-max'>
                                <span>{Data.order.name}</span>
                            </div>
                        </div>
                        
                        <div className='border-header-tran'></div>
                        
                        <div className='price-box-tran flex-box'>
                            <span>{Data.order.price}</span>

                            <span>تومان</span>

                            <div></div>
                        </div>

                        <div className='box-pay-header-tran'>
                            <div className='inventory'>
                                <span>موجودی کیف پول : </span>

                                <span className='color-blue'>500000</span>

                                <span className='color-blue'>تومان</span>
                            </div>

                            <div className='use-wallet'>
                                <Checkbox>استفاده از کیف پول</Checkbox>
                            </div>

                            <div className='payment flex-box'>
                                <span>مبلغ قابل پرداخت</span>

                                <span> 10000 </span>

                                <span>تومان</span>
                            </div>

                            <div className='btns'>
                                <button onClick={startPay}>درگاه پرداخت</button>

                                <button onClick={cancelPay}>لغو معامله</button>
                            </div>
                        </div>

                        <div className='flex-box secure-box-tran'>
                            <div>
                                <img src='https://server.elfiro.com/storage/photos/Frame 1.png' />
                            </div>
                            
                            <span>معامله با واسطه امن</span>
                        </div>
                    </section>

                    <section id='show-main-tran' className='width-max flex-box flex-aling-right'>
                        <div className='status-bar-tran'>
                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله اول</span>
                                    </div>

                                    <div>
                                        <span>درخواست معامله</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran item-status-bar-tran-active flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله دوم</span>
                                    </div>

                                    <div>
                                        <span className='color-blue'>پرداخت</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله سوم</span>
                                    </div>

                                    <div>
                                        <span>دریافت محصول</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله چهارم</span>
                                    </div>

                                    <div>
                                        <span>تایید و تغییر اطلاعات</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column flex-aling-right flex-right'>
                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله پنجم</span>
                                    </div>

                                    <div>
                                        <span>تکمیل فرایند</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='width-max flex-box'>
                            <div className='box-detalist-tran flex-box flex-column'>
                                <div className='image'>
                                    <img  src='https://elfiro.com/img/2.jpg'/> 
                                </div>

                                <div className='text flex-box flex-aling-right'>
                                    <span>{Data.current_status_data.message}</span>
                                </div>

                                <div className='text flex-box flex-aling-right margin-vetical-1'>
                                    <span>12:00:00</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            )
        }else{
            waitConfirm = (
                <section id='main-transsaction' className='flex-box flex-aling-right'>
                    <section id='header-main-tran'>
                        <div className='user-box-tran flex-box flex-justify-space'>
                            <div className='item-user-box-tran flex-box flex-column'>
                                <div className='flex-box'>
                                    <img src={Data.customer.profile_image} />

                                    <div className='flex-box bac-color-green'>
                                        <span>خریدار</span>
                                    </div>
                                </div>

                                <div>
                                    <span>{Data.customer.name}</span>
                                </div>

                                <div>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.23516 0.595215L7.92555 4.01979L11.7057 4.57231L8.97042 7.23648L9.61594 11.0002L6.23516 9.22229L2.85438 11.0002L3.49991 7.23648L0.764648 4.57231L4.54477 4.01979L6.23516 0.595215Z" stroke="#7007FA" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                
                                <div>
                                    <Link>مشاهده پروفایل</Link>
                                </div>
                            </div>

                            <div className='item-user-box-tran flex-box flex-column flex-justify-space'>
                                <div className='flex-box'>
                                    <img src={Data.seller.profile_image} />

                                    <div className='flex-box bac-color-blue'>
                                        <span>فروشنده</span>
                                    </div>
                                </div>

                                <div>
                                    <span>{Data.seller.name}</span>
                                </div>

                                <div>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.23516 0.595215L7.92555 4.01979L11.7057 4.57231L8.97042 7.23648L9.61594 11.0002L6.23516 9.22229L2.85438 11.0002L3.49991 7.23648L0.764648 4.57231L4.54477 4.01979L6.23516 0.595215Z" stroke="#7007FA" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                
                                <div>
                                    <Link>مشاهده پروفایل</Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className='border-header-tran'></div>

                        <div className='name-box-tran flex-box'>
                            <div className='flex-box'>
                                <img src={Data.order.image} />
                            </div>

                            <div className='width-max'>
                                <span>{Data.order.name}</span>
                            </div>
                        </div>
                        
                        <div className='border-header-tran'></div>
                        
                        <div className='price-box-tran flex-box'>
                            <span>{Data.order.price}</span>

                            <span>تومان</span>

                            <div></div>
                        </div>

                        <div className='flex-box secure-box-tran'>
                            <div>
                                <img src='https://server.elfiro.com/storage/photos/Frame 1.png' />
                            </div>
                            
                            <span>معامله با واسطه امن</span>
                        </div>
                    </section>

                    <section id='show-main-tran' className='width-max flex-box flex-aling-right'>
                        <div className='status-bar-tran'>
                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله اول</span>
                                    </div>

                                    <div>
                                        <span>درخواست معامله</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran item-status-bar-tran-active flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله دوم</span>
                                    </div>

                                    <div>
                                        <span className='color-blue'>پرداخت</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله سوم</span>
                                    </div>

                                    <div>
                                        <span>دریافت محصول</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله چهارم</span>
                                    </div>

                                    <div>
                                        <span>تایید و تغییر اطلاعات</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column flex-aling-right flex-right'>
                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله پنجم</span>
                                    </div>

                                    <div>
                                        <span>تکمیل فرایند</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='width-max flex-box'>
                            <div className='box-detalist-tran flex-box flex-column'>
                                <div className='image'>
                                    <img  src='https://elfiro.com/img/2.jpg'/> 
                                </div>

                                <div className='text flex-box flex-aling-right'>
                                    <span>{Data.current_status_data.message}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            )
        }
    }

    if(Data != undefined && userdata != undefined && Data.status === "wait_for_send")
    {
        if(Data.customer.phone === userdata.phone)
        {
            waitConfirm = (
                <section id='main-transsaction' className='flex-box flex-aling-right'>
                    <section id='header-main-tran'>
                        <div className='user-box-tran flex-box flex-justify-space'>
                            <div className='item-user-box-tran flex-box flex-column'>
                                <div className='flex-box'>
                                    <img src={Data.customer.profile_image} />

                                    <div className='flex-box bac-color-green'>
                                        <span>خریدار</span>
                                    </div>
                                </div>

                                <div>
                                    <span>{Data.customer.name}</span>
                                </div>

                                <div>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.23516 0.595215L7.92555 4.01979L11.7057 4.57231L8.97042 7.23648L9.61594 11.0002L6.23516 9.22229L2.85438 11.0002L3.49991 7.23648L0.764648 4.57231L4.54477 4.01979L6.23516 0.595215Z" stroke="#7007FA" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                
                                <div>
                                    <Link>مشاهده پروفایل</Link>
                                </div>
                            </div>

                            <div className='item-user-box-tran flex-box flex-column flex-justify-space'>
                                <div className='flex-box'>
                                    <img src={Data.seller.profile_image} />

                                    <div className='flex-box bac-color-blue'>
                                        <span>فروشنده</span>
                                    </div>
                                </div>

                                <div>
                                    <span>{Data.seller.name}</span>
                                </div>

                                <div>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.23516 0.595215L7.92555 4.01979L11.7057 4.57231L8.97042 7.23648L9.61594 11.0002L6.23516 9.22229L2.85438 11.0002L3.49991 7.23648L0.764648 4.57231L4.54477 4.01979L6.23516 0.595215Z" stroke="#7007FA" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                
                                <div>
                                    <Link>مشاهده پروفایل</Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className='border-header-tran'></div>

                        <div className='name-box-tran flex-box'>
                            <div className='flex-box'>
                                <img src={Data.order.image} />
                            </div>

                            <div className='width-max'>
                                <span>{Data.order.name}</span>
                            </div>
                        </div>
                        
                        <div className='border-header-tran'></div>
                        
                        <div className='price-box-tran flex-box'>
                            <span>{Data.order.price}</span>

                            <span>تومان</span>

                            <div></div>
                        </div>

                        <div className='paysuc-box-tran flex-box'>
                            <span>پرداخت با موفقیت انجام شده</span>
                        </div>

                        <div className='flex-box secure-box-tran'>
                            <div>
                                <img src='https://server.elfiro.com/storage/photos/Frame 1.png' />
                            </div>
                            
                            <span>معامله با واسطه امن</span>
                        </div>
                    </section>

                    <section id='show-main-tran' className='width-max flex-box flex-aling-right'>
                        <div className='status-bar-tran'>
                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله اول</span>
                                    </div>

                                    <div>
                                        <span>درخواست معامله</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله دوم</span>
                                    </div>

                                    <div>
                                        <span>پرداخت</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran item-status-bar-tran-active flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله سوم</span>
                                    </div>

                                    <div>
                                        <span className='color-blue'>دریافت محصول</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله چهارم</span>
                                    </div>

                                    <div>
                                        <span>تایید و تغییر اطلاعات</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column flex-aling-right flex-right'>
                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله پنجم</span>
                                    </div>

                                    <div>
                                        <span>تکمیل فرایند</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='width-max flex-box'>
                            <div className='box-detalist-tran flex-box flex-column'>
                                <div className='image'>
                                    <img  src='https://elfiro.com/img/2.jpg'/> 
                                </div>

                                <div className='text flex-box flex-aling-right'>
                                    <span>{Data.current_status_data.message}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            )
        }else{
            waitConfirm = (
                <section id='main-transsaction' className='flex-box flex-aling-right'>
                    <section id='header-main-tran'>
                        <div className='user-box-tran flex-box flex-justify-space'>
                            <div className='item-user-box-tran flex-box flex-column'>
                                <div className='flex-box'>
                                    <img src={Data.customer.profile_image} />

                                    <div className='flex-box bac-color-green'>
                                        <span>خریدار</span>
                                    </div>
                                </div>

                                <div>
                                    <span>{Data.customer.name}</span>
                                </div>

                                <div>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.23516 0.595215L7.92555 4.01979L11.7057 4.57231L8.97042 7.23648L9.61594 11.0002L6.23516 9.22229L2.85438 11.0002L3.49991 7.23648L0.764648 4.57231L4.54477 4.01979L6.23516 0.595215Z" stroke="#7007FA" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                
                                <div>
                                    <Link>مشاهده پروفایل</Link>
                                </div>
                            </div>

                            <div className='item-user-box-tran flex-box flex-column flex-justify-space'>
                                <div className='flex-box'>
                                    <img src={Data.seller.profile_image} />

                                    <div className='flex-box bac-color-blue'>
                                        <span>فروشنده</span>
                                    </div>
                                </div>

                                <div>
                                    <span>{Data.seller.name}</span>
                                </div>

                                <div>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.23516 0.595215L7.92555 4.01979L11.7057 4.57231L8.97042 7.23648L9.61594 11.0002L6.23516 9.22229L2.85438 11.0002L3.49991 7.23648L0.764648 4.57231L4.54477 4.01979L6.23516 0.595215Z" stroke="#7007FA" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                
                                <div>
                                    <Link>مشاهده پروفایل</Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className='border-header-tran'></div>

                        <div className='name-box-tran flex-box'>
                            <div className='flex-box'>
                                <img src={Data.order.image} />
                            </div>

                            <div className='width-max'>
                                <span>{Data.order.name}</span>
                            </div>
                        </div>
                        
                        <div className='border-header-tran'></div>
                        
                        <div className='price-box-tran flex-box'>
                            <span>{Data.order.price}</span>

                            <span>تومان</span>

                            <div></div>
                        </div>

                        <div className='paysuc-box-tran flex-box'>
                            <span>پرداخت با موفقیت انجام شده</span>
                        </div>

                        <div className='flex-box secure-box-tran'>
                            <div>
                                <img src='https://server.elfiro.com/storage/photos/Frame 1.png' />
                            </div>
                            
                            <span>معامله با واسطه امن</span>
                        </div>
                    </section>

                    <section id='show-main-tran' className='width-max flex-box flex-aling-right'>
                        <div className='status-bar-tran'>
                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله اول</span>
                                    </div>

                                    <div>
                                        <span>درخواست معامله</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله دوم</span>
                                    </div>

                                    <div>
                                        <span>پرداخت</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran item-status-bar-tran-active flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله سوم</span>
                                    </div>

                                    <div>
                                        <span className='color-blue'>دریافت محصول</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله چهارم</span>
                                    </div>

                                    <div>
                                        <span>تایید و تغییر اطلاعات</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column flex-aling-right flex-right'>
                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله پنجم</span>
                                    </div>

                                    <div>
                                        <span>تکمیل فرایند</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='width-max flex-box'>
                            <div className='box-detalist-tran flex-box flex-column'>
                                <div className='image'>
                                    <img  src='https://elfiro.com/img/2.jpg'/> 
                                </div>

                                <div className='text flex-box flex-aling-right'>
                                    <span>{Data.current_status_data.message}</span>
                                </div>

                                <div className='box-send-detalist-tran width-max'>
                                    <div className='inp'>
                                        <label htmlFor='text-in-detalist-tran'>مشخصات محصول</label>
                                        <br />
                                        <textarea id='text-in-detalist-tran'></textarea>
                                    </div>

                                    <div className='btns flex-box'>
                                        <button onClick={startPay}>ارسال اطلاعات</button>

                                        <button onClick={cancelPay}>لغو معامله</button>
                                    </div>
                                    
                                    <div className='flex-box'>
                                        <span id='errsend2' className='err-tiket-add'></span>
                                        <span id='sucsend2' className='sucsess-tiket-add'></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            )
        }
    }

    if(Data != undefined && userdata != undefined && Data.status === "wait_for_receive")
    {
        if(Data.customer.phone === userdata.phone)
        {
            waitConfirm = (
                <section id='main-transsaction' className='flex-box flex-aling-right'>
                    <section id='header-main-tran'>
                        <div className='user-box-tran flex-box flex-justify-space'>
                            <div className='item-user-box-tran flex-box flex-column'>
                                <div className='flex-box'>
                                    <img src={Data.customer.profile_image} />

                                    <div className='flex-box bac-color-green'>
                                        <span>خریدار</span>
                                    </div>
                                </div>

                                <div>
                                    <span>{Data.customer.name}</span>
                                </div>

                                <div>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.23516 0.595215L7.92555 4.01979L11.7057 4.57231L8.97042 7.23648L9.61594 11.0002L6.23516 9.22229L2.85438 11.0002L3.49991 7.23648L0.764648 4.57231L4.54477 4.01979L6.23516 0.595215Z" stroke="#7007FA" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                
                                <div>
                                    <Link>مشاهده پروفایل</Link>
                                </div>
                            </div>

                            <div className='item-user-box-tran flex-box flex-column flex-justify-space'>
                                <div className='flex-box'>
                                    <img src={Data.seller.profile_image} />

                                    <div className='flex-box bac-color-blue'>
                                        <span>فروشنده</span>
                                    </div>
                                </div>

                                <div>
                                    <span>{Data.seller.name}</span>
                                </div>

                                <div>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.23516 0.595215L7.92555 4.01979L11.7057 4.57231L8.97042 7.23648L9.61594 11.0002L6.23516 9.22229L2.85438 11.0002L3.49991 7.23648L0.764648 4.57231L4.54477 4.01979L6.23516 0.595215Z" stroke="#7007FA" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                
                                <div>
                                    <Link>مشاهده پروفایل</Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className='border-header-tran'></div>

                        <div className='name-box-tran flex-box'>
                            <div className='flex-box'>
                                <img src={Data.order.image} />
                            </div>

                            <div className='width-max'>
                                <span>{Data.order.name}</span>
                            </div>
                        </div>
                        
                        <div className='border-header-tran'></div>
                        
                        <div className='price-box-tran flex-box'>
                            <span>{Data.order.price}</span>

                            <span>تومان</span>

                            <div></div>
                        </div>

                        <div className='paysuc-box-tran flex-box'>
                            <span>پرداخت با موفقیت انجام شده</span>
                        </div>

                        <div className='flex-box secure-box-tran'>
                            <div>
                                <img src='https://server.elfiro.com/storage/photos/Frame 1.png' />
                            </div>
                            
                            <span>معامله با واسطه امن</span>
                        </div>
                    </section>

                    <section id='show-main-tran' className='width-max flex-box flex-aling-right'>
                        <div className='status-bar-tran'>
                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله اول</span>
                                    </div>

                                    <div>
                                        <span>درخواست معامله</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله دوم</span>
                                    </div>

                                    <div>
                                        <span>پرداخت</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله سوم</span>
                                    </div>

                                    <div>
                                        <span>دریافت محصول</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran item-status-bar-tran-active flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله چهارم</span>
                                    </div>

                                    <div>
                                        <span className='color-blue'>تایید و تغییر اطلاعات</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column flex-aling-right flex-right'>
                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله پنجم</span>
                                    </div>

                                    <div>
                                        <span>تکمیل فرایند</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='width-max flex-box'>
                            <div className='box-detalist-tran flex-box flex-column'>
                                <div className='image'>
                                    <img  src='https://elfiro.com/img/3.jpg'/> 
                                </div>

                                <div className='text flex-box flex-aling-right'>
                                    <span>{Data.current_status_data.message}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            )
        }else{
            waitConfirm = (
                <section id='main-transsaction' className='flex-box flex-aling-right'>
                    <section id='header-main-tran'>
                        <div className='user-box-tran flex-box flex-justify-space'>
                            <div className='item-user-box-tran flex-box flex-column'>
                                <div className='flex-box'>
                                    <img src={Data.customer.profile_image} />

                                    <div className='flex-box bac-color-green'>
                                        <span>خریدار</span>
                                    </div>
                                </div>

                                <div>
                                    <span>{Data.customer.name}</span>
                                </div>

                                <div>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.23516 0.595215L7.92555 4.01979L11.7057 4.57231L8.97042 7.23648L9.61594 11.0002L6.23516 9.22229L2.85438 11.0002L3.49991 7.23648L0.764648 4.57231L4.54477 4.01979L6.23516 0.595215Z" stroke="#7007FA" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                
                                <div>
                                    <Link>مشاهده پروفایل</Link>
                                </div>
                            </div>

                            <div className='item-user-box-tran flex-box flex-column flex-justify-space'>
                                <div className='flex-box'>
                                    <img src={Data.seller.profile_image} />

                                    <div className='flex-box bac-color-blue'>
                                        <span>فروشنده</span>
                                    </div>
                                </div>

                                <div>
                                    <span>{Data.seller.name}</span>
                                </div>

                                <div>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>
                                    
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76348 0.595215L7.45387 4.01979L11.234 4.57231L8.49874 7.23648L9.14426 11.0002L5.76348 9.22229L2.3827 11.0002L3.02823 7.23648L0.292969 4.57231L4.07309 4.01979L5.76348 0.595215Z" fill="#7007FA"/>
                                    </svg>

                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.23516 0.595215L7.92555 4.01979L11.7057 4.57231L8.97042 7.23648L9.61594 11.0002L6.23516 9.22229L2.85438 11.0002L3.49991 7.23648L0.764648 4.57231L4.54477 4.01979L6.23516 0.595215Z" stroke="#7007FA" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                
                                <div>
                                    <Link>مشاهده پروفایل</Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className='border-header-tran'></div>

                        <div className='name-box-tran flex-box'>
                            <div className='flex-box'>
                                <img src={Data.order.image} />
                            </div>

                            <div className='width-max'>
                                <span>{Data.order.name}</span>
                            </div>
                        </div>
                        
                        <div className='border-header-tran'></div>
                        
                        <div className='price-box-tran flex-box'>
                            <span>{Data.order.price}</span>

                            <span>تومان</span>

                            <div></div>
                        </div>

                        <div className='paysuc-box-tran flex-box'>
                            <span>پرداخت با موفقیت انجام شده</span>
                        </div>

                        <div className='flex-box secure-box-tran'>
                            <div>
                                <img src='https://server.elfiro.com/storage/photos/Frame 1.png' />
                            </div>
                            
                            <span>معامله با واسطه امن</span>
                        </div>
                    </section>

                    <section id='show-main-tran' className='width-max flex-box flex-aling-right'>
                        <div className='status-bar-tran'>
                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله اول</span>
                                    </div>

                                    <div>
                                        <span>درخواست معامله</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله دوم</span>
                                    </div>

                                    <div>
                                        <span>پرداخت</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran item-status-bar-tran-active flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله سوم</span>
                                    </div>

                                    <div>
                                        <span className='color-blue'>دریافت محصول</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column'>
                                    <div></div>

                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله چهارم</span>
                                    </div>

                                    <div>
                                        <span>تایید و تغییر اطلاعات</span>
                                    </div>
                                </div>
                            </div>

                            <div className='item-status-bar-tran flex-box flex-right flex-aling-right'>
                                <div className='flex-box flex-column flex-aling-right flex-right'>
                                    <div></div>
                                </div>

                                <div>
                                    <div>
                                        <span>مرحله پنجم</span>
                                    </div>

                                    <div>
                                        <span>تکمیل فرایند</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='width-max flex-box'>
                            <div className='box-detalist-tran flex-box flex-column'>
                                <div className='image'>
                                    <img  src='https://elfiro.com/img/2.jpg'/> 
                                </div>

                                <div className='text flex-box flex-aling-right'>
                                    <span>{Data.current_status_data.message}</span>
                                </div>

                                <div className='box-send-detalist-tran width-max'>
                                    <div className='inp'>
                                        <label htmlFor='text-in-detalist-tran'>مشخصات محصول</label>
                                        <br />
                                        <textarea id='text-in-detalist-tran'></textarea>
                                    </div>

                                    <div className='btns flex-box'>
                                        <button onClick={startPay}>ارسال اطلاعات</button>

                                        <button onClick={cancelPay}>لغو معامله</button>
                                    </div>
                                    
                                    <div className='flex-box'>
                                        <span id='errsend2' className='err-tiket-add'></span>
                                        <span id='sucsend2' className='sucsess-tiket-add'></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            )
        }
    }
    
    return (
        <div>
            <Header style="1rem 2rem" />

            {waitConfirm}
        </div>
    );
};

export default Transactions;