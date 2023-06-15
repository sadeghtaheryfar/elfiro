import React from 'react';
import Header from './Header';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const Bookmarks = () => {
    const usertoken = localStorage.getItem("user-login");
    const [userdata, setuserdata] = useState();
    const [data, setdata] = useState();


    useEffect(() => {
        if(localStorage.getItem("user-login") != undefined)
        {
            if(usertoken != undefined)
            {
                const options = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`}
                };

                fetch('https://server.elfiro.com/api/v1/client/auth', options)
                    .then(response => response.json())
                    .then(response => {
                        if(response.status === "success")
                        {
                            window.location = "/Dashboard/Profile/Authentication"
                        }
                    })
                    .catch(err => console.log(err));

                fetch('https://server.elfiro.com/api/v1/basic/user', options)
                    .then(response => response.json())
                    .then(response => {
                        if(response.status != "success")
                        {
                            window.location = "/Login";
                        }else{
                            setuserdata(response);
                        }
                    })
                    .catch(err => {
                        window.location = "/Login"
                    });

                fetch(`https://server.elfiro.com/api/v1/client/bookmarks`, options)
                    .then(response => response.json())
                    .then(response => setdata(response.data))
                    .catch(err => console.log(err));
            }else{
                window.location = "/Login";
            }
        }else{
            window.location = "/Login";
        }
    }, [])

    const UNsaveOrder = (id) => {
        const options = {
            method: 'Delete',
            headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`},
        };

        if(usertoken != undefined)
        {
            fetch(`https://server.elfiro.com/api/v1/client/bookmarks/${id}`, options)
                .then(response => response.json())
                .then(response => console.log('>>>>>>>>>>>', response))
                .catch(err => console.log(err));
        }else{
            window.location = "/login";
        }
    }

    console.log(data);

    var dataBookmarks;

    if(data != undefined)
    {
        dataBookmarks = (
            <div id='prudect-home' className='flex-box flex-right flex-wrap'>
                {data.map((item,index)=> 
                    <div className='item-prudect-home' key={Math.random()}>
                        <div className='show-item-prudect-home'>
                            <Link to={`/orders/${item.order.id}`} className='top-item-prudect-home flex-box flex-justify-space'>
                                <div className='flex-box flex-right'>
                                    <div>
                                        <img src={item.order.user.user_profile}></img>

                                        {item.order.status_label === "تایید شده" && 
                                            <div>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z" fill="#0094FF"/>
                                                    <path d="M6.45825 9.99993L8.81659 12.3583L13.5416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        }
                                    </div>

                                    <div className='flex-box flex-column flex-aling-right'>
                                        <span>{item.order.user.user_name}</span>

                                        <div>
                                            <span>{item.order.created_at}</span>

                                            <span> در </span>

                                            <span>{item.order.city}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <div onClick={() => window.location = `/orders/${item.order.id}`} className="img-item-prudect-home">
                                <img src={item.order.image} />

                                <div>
                                    <span>{item.order.created_at}</span>
                                </div>
                            </div>

                            <div onClick={() => window.location = `/orders/${item.order.id}`} className="name-item-prudect-home">
                                <span>{item.order.name}</span>
                            </div>

                            <div className='price-item-prudect-home flex-box flex-justify-space'>
                                <div className='flex-box' onClick={() => UNsaveOrder(item.order.id)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 2L2 22" stroke="#7007FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M20.68 8.70996V19.71C20.68 21.72 19.24 22.57 17.48 21.59L11 17.54" stroke="#7007FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M3.31995 19.95V5.86C3.31995 3.74 5.04995 2 7.17995 2H16.8299C18.0399 2 19.1199 2.56 19.8299 3.44" stroke="#7007FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>

                                <div className='flex-box flex-aling-left flex-column'>
                                    <span>تومان</span>

                                    <span>{item.order.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <Header style="1rem 2rem" />
            
            <section id='main-rules' className='flex-box'>
                <div className='show-main-rules'>
                    <div className='header-main-rules flex-box'>
                        <svg className='margin-horizontal-1' width="15" height="21" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5582 3.45V18.84C13.5582 19.299 13.1402 19.581 12.8152 19.341L8.00417 15.779C7.84816 15.663 7.65117 15.663 7.49416 15.779L2.68317 19.341C2.35916 19.581 1.94116 19.299 1.94116 18.84V3.45C1.94116 2.37801 2.66916 1.5 3.55916 1.5H11.9402C12.8302 1.5 13.5582 2.37801 13.5582 3.45Z" stroke="#7007FA" strokeWidth="2"/>
                        </svg>

                        <span>مورد علاقه</span>
                    </div>

                    {dataBookmarks}
                </div>
            </section>
        </div>
    );
};

export default Bookmarks;