import React from 'react';
import { useEffect,useState } from 'react';
import Header from './Header';
import ChatPage from './ChatPage';

const Chat = () => {
    useEffect(() => {
        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
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
    }, [])
    
    return (
        <div>
            <Header style="1rem 2rem" />

            <section id='main-chat' className='flex-box flex-aling-right'>
                <section id='sidbar-chat'>
                    <div className='header-sidbar-chat flex-box'>
                        <span>چت  الفیرو</span>
                    </div>

                    <div className='box-item-chat-sidbar'>
                        <div className='item-chat-sidbar item-chat-sidbar-active flex-box'>
                            <div className='width-max flex-box flex-right'>
                                <div className='image'>
                                    <img src='http://server.elfiro.com/storage/profiles/w0Lyoli1rzPWRxkU95WFlIJgF6RVVxirQEwdMkL8.jpg' />

                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z" fill="#0094FF"/>
                                        <path d="M6.45825 9.99993L8.81659 12.3583L13.5416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>

                                <div className='detalist'>
                                    <div>
                                        <span>sadegh</span>
                                    </div>

                                    <div>
                                        <span>مدیر دوبلاژ : سخیر این دردسترس دسترس  دسترس دسترس</span>
                                    </div>

                                </div>
                            </div>

                            <div className='last'>
                                <span>امروز</span>
                            </div>

                            <div className='active'></div>
                        </div>

                        <div className='item-chat-sidbar flex-box'>
                            <div className='width-max flex-box flex-right'>
                                <div className='image'>
                                    <img src='http://server.elfiro.com/storage/profiles/w0Lyoli1rzPWRxkU95WFlIJgF6RVVxirQEwdMkL8.jpg' />

                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z" fill="#0094FF"/>
                                        <path d="M6.45825 9.99993L8.81659 12.3583L13.5416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>

                                <div className='detalist'>
                                    <div>
                                        <span>sadegh</span>
                                    </div>

                                    <div>
                                        <span>مدیر دوبلاژ : سخیر این دردسترس دسترس  دسترس دسترس</span>
                                    </div>
                                </div>
                            </div>

                            <div className='last'>
                                <span>امروز</span>
                            </div>

                            <div className='active'></div>
                        </div>

                        <div className='item-chat-sidbar flex-box'>
                            <div className='width-max flex-box flex-right'>
                                <div className='image'>
                                    <img src='http://server.elfiro.com/storage/profiles/w0Lyoli1rzPWRxkU95WFlIJgF6RVVxirQEwdMkL8.jpg' />

                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z" fill="#0094FF"/>
                                        <path d="M6.45825 9.99993L8.81659 12.3583L13.5416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>

                                <div className='detalist'>
                                    <div>
                                        <span>sadegh</span>
                                    </div>

                                    <div>
                                        <span>مدیر دوبلاژ : سخیر این دردسترس دسترس  دسترس دسترس</span>
                                    </div>
                                </div>
                            </div>

                            <div className='last'>
                                <span>امروز</span>
                            </div>

                            <div className='active'></div>
                        </div>

                        <div className='item-chat-sidbar flex-box'>
                            <div className='width-max flex-box flex-right'>
                                <div className='image'>
                                    <img src='http://server.elfiro.com/storage/profiles/w0Lyoli1rzPWRxkU95WFlIJgF6RVVxirQEwdMkL8.jpg' />

                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z" fill="#0094FF"/>
                                        <path d="M6.45825 9.99993L8.81659 12.3583L13.5416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>

                                <div className='detalist'>
                                    <div>
                                        <span>sadegh</span>
                                    </div>

                                    <div>
                                        <span>مدیر دوبلاژ : سخیر این دردسترس دسترس  دسترس دسترس</span>
                                    </div>
                                </div>
                            </div>

                            <div className='last'>
                                <span>امروز</span>
                            </div>

                            <div className='active'></div>
                        </div>
                    </div>
                </section>
                
                <section id='box-chat-main' className='width-max height-max flex-box'>
                    {/* <div className='not-chat-box'>
                        <div className='image'>
                            <img src='https://elfiro.com/img/66.png' />
                        </div>

                        <div className='text flex-box'>
                            <span>هیچ گفتگویی وجود ندارد</span>
                        </div>
                    </div> */}

                    <ChatPage />
                </section>
            </section>
        </div>
    );
};

export default Chat;