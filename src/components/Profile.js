import React from 'react';
import Header from './Header';
import Sidebar from './Sidbar';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';


const Profile = () => {
    const [DataPrudect, SetDataPrudect] = useState();
    const [Data, SetData] = useState();
    const [Datauser, setDatauser] = useState();
    const [showD, setShowD] = useState(false);
    const handleCloseD = () => setShowD(false);
    const handleShowD = () => setShowD(true);
    const usertoken = localStorage.getItem("user-login");

    var username = window.location.pathname;

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`},
        };

        if(usertoken != undefined)
        {
            fetch('https://server.elfiro.com/api/v1/basic/user', options)
                .then(response => response.json())
                .then(response => setDatauser(response.data.user_data.user))
                .catch(err => console.log(err));

            fetch('https://server.elfiro.com/api/v1/client/auth', options)
                .then(response => response.json())
                .then(response => {
                    if(response.status === "success")
                    {
                        window.location = "/Dashboard/Profile/Authentication"
                    }
                })
                .catch(err => console.log(err));
        }
    },[])

    useEffect(() => {
        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
        if(username != undefined)
        {
            fetch(`https://server.elfiro.com/api/v1${username}`, options)
            .then(response => response.json())
            .then(result => {
                SetDataPrudect(result.data.orders.records);
                SetData(result);
            })
        }
    },[])

    const chengeShow = (event) => {
        if(event === "prudects")
        {
            document.getElementById("show-prudects-btn").classList.add("active");
            document.getElementById("show-comments-btn").classList.remove("active");
            document.getElementById("prudects-show-profile").classList.remove("hide-item");
            document.getElementById("comments-show-profile").classList.add("hide-item");

        }else{
            document.getElementById("show-prudects-btn").classList.remove("active");
            document.getElementById("show-comments-btn").classList.add("active");
            document.getElementById("prudects-show-profile").classList.add("hide-item");
            document.getElementById("comments-show-profile").classList.remove("hide-item");
        }
    }

    const [InOffendSub, setInOffendSub] = useState();
    const [InOffendDes, setInOffendDes] = useState();
    const SendOffend = () => {
        const usertoken = localStorage.getItem("user-login");
        
        if(Datauser != undefined && usertoken != undefined)
        {
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`},
                body : `{"phone":"${Datauser.phone}","subject":"${InOffendSub}","content":"${InOffendDes}"}`
            };
    
            fetch(`https://server.elfiro.com/api/v1/users/offend/${Data.data.user.record.user_name}`, options)
                .then(response => response.json())
                .then(response =>  {
                    if(response.status === "success")
                    {
                        document.getElementById("sucsend").innerHTML = response.data.message.content;
                    }else{
                        console.log(response);
                        if(response.data.message.subject != undefined)
                        {
                            document.getElementById("rr-subject-offend").innerHTML = response.data.message.subject;
                        }
                        if(response.data.message.content != undefined)
                        {
                            document.getElementById("rr-description-offend").innerHTML = response.data.message.content;
                        }
                        if(response.data.message.user != undefined)
                        {
                            document.getElementById("rr-description-offend").innerHTML = response.data.message.user;
                        }
                    }
                })
                .catch(err => console.log('>>>>>>>>>>>', err))
        }else{
            window.location = "/login";
        }
    }

    var ShowPrudect;
    var ShowComment;
    var ShowDetalist;

    if(DataPrudect != undefined && Data != undefined)
    {
        ShowPrudect = (
            <div className='flex-box flex-right flex-wrap'>
                {DataPrudect.map((item)=> {
                    if(item.status_label === "تایید شده")
                    {
                        return (
                            <div className='item-prudect-home' key={item.id}>
                                <Link to={`/orders/${item.id}`}>
                                    <div className='show-item-prudect-home'>
                                        <div className='top-item-prudect-home flex-box flex-justify-space'>
                                            <div className='flex-box flex-right'>
                                                <div>
                                                    <img src={item.category.default_image}></img>

                                                    {item.status_label === "تایید شده" && 
                                                        <div>
                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z" fill="#0094FF"/>
                                                                <path d="M6.45825 9.99993L8.81659 12.3583L13.5416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </div>
                                                    }
                                                </div>

                                                <div className='flex-box flex-column flex-aling-right'>
                                                    <span>{item.category.slug}</span>

                                                    <div>
                                                        <span>{item.created_at}</span>

                                                        <span> در </span>

                                                        <span>{item.city}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="img-item-prudect-home">
                                            <img src={item.image} />

                                            <div>
                                                <span>{item.category.title}</span>
                                            </div>
                                        </div>

                                        <div className="name-item-prudect-home">
                                            <span>{item.name}</span>
                                        </div>

                                        <div className='price-item-prudect-home flex-box flex-justify-space'>
                                            <div className='flex-box'>
                                                <span>{item.platforms}</span>
                                            </div>

                                            <div className='flex-box flex-aling-left flex-column'>
                                                <span>تومان</span>

                                                <span>{item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    }
                })}
            </div>
        );

        ShowComment = (
            <div id='comments-show-profile' className='hide-item'>
                {Data.data.comments.records.map((item)=> 
                    <div className='item-comments-profile' key={Math.random()}>
                        <div className='header flex-box flex-justify-space'>
                            <div className='flex-box'>
                                <div className='logo'>
                                    <img src={item.author.profile_image} />
                                </div>

                                <div>
                                    <div className='username'>
                                        <span>{item.author.user_name}</span>
                                    </div>

                                    {item.score === 1 && 
                                        <div className='star'>
                                            <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    }

                                    {item.score === 2 && 
                                        <div className='star'>
                                            <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    }

                                    {item.score === 3 && 
                                        <div className='star'>
                                            <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    }

                                    {item.score === 4 && 
                                        <div className='star'>
                                            <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    }

                                    {item.score === 5 && 
                                        <div className='star'>
                                            <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            
                                            <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className='flex-box'>
                                <div className='time'>
                                    <span>{item.created_at}</span>
                                </div>
                            </div>
                        </div>  

                        <div className='message'>
                            <p>{item.content}</p>
                        </div>
                    </div>
                )}
            </div>
        );

        ShowDetalist = (
            <div className='header-show-profile flex-box flex-aling-right flex-justify-space flex-column-mobile'>
                <div className='right flex-box flex-right'>
                    <div className='logo-image'>
                        <img src={Data.data.user.record.profile_image} />
                    </div>

                    <div>
                        <div className='name'>
                            <span>{Data.data.user.record.name}</span>
                        </div>
                        
                        <div className='star'>
                            {Data.data.user.record.score === 0 && 
                                <div className='star'>
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            }
                            
                            {Data.data.user.record.score === 1 && 
                                <div className='star'>
                                    <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            }

                            {Data.data.user.record.score === 2 && 
                                <div className='star'>
                                    <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            }

                            {Data.data.user.record.score === 3 && 
                                <div className='star'>
                                    <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            }

                            {Data.data.user.record.score === 4 && 
                                <div className='star'>
                                    <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            }

                            {Data.data.user.record.score === 5 && 
                                <div className='star'>
                                    <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    
                                    <svg className='active' width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.59057 1.30371L10.8157 5.81153L15.7915 6.53883L12.191 10.0457L13.0407 15L8.59057 12.6597L4.1404 15L4.99011 10.0457L1.38965 6.53883L6.36549 5.81153L8.59057 1.30371Z" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            }
                        </div>

                        <div className='description'>
                            <p>{Data.data.user.record.description}</p>
                        </div>
                    </div>  
                </div>

                <div className='left flex-box flex-left width-max-mo'>
                    <button className='flex-box' onClick={handleShowD}>
                        <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.4214 18.876H4.00633C2.56035 18.876 1.26537 18.128 0.542343 16.876C-0.180618 15.624 -0.180618 14.128 0.541367 12.876L6.74937 2.12402C7.47234 0.87204 8.76738 0.124023 10.2123 0.124023H10.2134C11.6593 0.124023 12.9543 0.871033 13.6783 2.12402L19.8854 12.876C20.6084 14.128 20.6094 15.623 19.8854 16.875C19.1623 18.128 17.8674 18.876 16.4214 18.876ZM10.2134 2.12402C9.49034 2.12402 8.84337 2.49805 8.48235 3.12402L2.27434 13.876C1.91234 14.502 1.91234 15.25 2.27434 15.876C2.63536 16.502 3.28337 16.876 4.00633 16.876H16.4214C17.1454 16.876 17.7923 16.502 18.1534 15.876C18.5154 15.25 18.5154 14.502 18.1534 13.876L11.9454 3.12402C11.5843 2.49704 10.9363 2.12402 10.2134 2.12402Z" fill="white"/>
                            <rect x="9.10742" y="5.88989" width="2" height="5.2124" fill="white"/>
                            <rect x="9.10742" y="12.0598" width="2" height="2.06396" fill="white"/>
                        </svg>

                        <span>ثبت تخلف</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Sidebar/>
            <Header />
            
            <section id='main-show-profile' className='padding-main-sidbar'>
                {ShowDetalist}

                <div className='navbra-show-profile flex-box flex-right'>
                    <button id='show-prudects-btn' onClick={(e) => chengeShow("prudects")} className='active'>آگهی ها</button>

                    <button id='show-comments-btn' onClick={(e) => chengeShow("comments")}>نظرات</button>
                </div>

                <div id='prudects-show-profile'>
                    {ShowPrudect}
                </div>

                {ShowComment}
            </section>

            {/* <!-- Modal --> */}
            <Modal className='modal-send-offend-order-mo' show={showD} onHide={handleCloseD} centered>
                <Modal.Body>
                    <Modal.Header  className='modal-header-send-offend-order-mo width-max flex-box flex-justify-space' closeButton>
                        <Modal.Title>گزارش تخلف</Modal.Title>
                    </Modal.Header>

                    <div className='flex-box flex-column'>
                        <div className='box-send-offend-modal width-max'>
                            <div>
                                <label htmlFor='name'>عنوان تخلف</label>
                                <span id='rr-subject-offend' className='err-tiket-add'></span>
                                <input type='text' id='subject' onChange={(e) => setInOffendSub(e.target.value)} />
                            </div>

                            <div>
                                <label htmlFor='description'>توضیحات</label>
                                <span id='rr-description-offend' className='err-tiket-add'></span>
                                <textarea type='text' id='description' onChange={(e) => setInOffendDes(e.target.value)} />
                            </div>

                            <div>
                                <button onClick={SendOffend}>ارسال تخلف</button>
                                <br/>
                                <span id='sucsend' className='sucsess-tiket-add'></span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Profile;