import React from 'react';
import { useEffect,useState,useRef } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

const Tickets = () => {
    var idticket = window.location.pathname;
    const usertoken = localStorage.getItem("user-login");
    const userName = localStorage.getItem("user-name");
    const userImage = localStorage.getItem("user-profile");
    const [userdata, setuserdata] = useState();
    const [data, setdata] = useState();
    const [messageForm, setmessageForm] = useState();
    const [fileForm, setfileForm] = useState();


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
                        }else{
                            fetch('https://server.elfiro.com/api/v1/basic/user', options)
                                .then(response => response.json())
                                .then(response => {
                                    if(response.status != "success")
                                    {
                                        window.location = "/Login";
                                    }else{
                                        setuserdata(response);
                                        localStorage.setItem('user-name', response.data.user_data.user.name);
                                        localStorage.setItem('user-profile', response.data.user_data.user.profile_image);
                                    }
                                })
                                .catch(err => {
                                    window.location = "/Login"
                                });

                            fetch(`https://server.elfiro.com/api/v1/client${idticket.toLowerCase()}`, options)
                                .then(response => response.json())
                                .then(response => {
                                    if(response.status === "error")
                                    {
                                        window.location = "/Dashboard/support";
                                    }else{
                                        setdata(response.data.ticket.record);
                        }
                    })
                    .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));
                
            }else{
                window.location = "/Login";
            }
        }else{
            window.location = "/Login";
        }
    }, [])

    var headerticket;
    var datachat;

    const sendAnswer = () => {
        var formdata = new FormData();
        formdata.append("content", messageForm);
        if(fileForm != undefined)
        {
            formdata.append("file[0]", fileForm);
        }

        var requestOptions = {
            method: 'POST',
            headers: {Authorization: `${usertoken}`},
            body: formdata,
            redirect: 'follow'
        };

        fetch(`https://server.elfiro.com/api/v1/client/tickets/${data.id}?_method=PUT`, requestOptions)
            .then(response => response.json())
            .then(response => {
                fechapi(response);
                document.getElementById("message").value = "";
                document.getElementById("file").value = "";
            })
            .catch(err => console.log(err));
    }
;
    const fechapi = (e) => {
        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`}
        };

        fetch(`https://server.elfiro.com/api/v1/client${idticket.toLowerCase()}`, options)
            .then(response => response.json())
            .then(response => {
                if(response.status === "error")
                {
                    window.location = "/Dashboard/support";
                }else{
                    setdata(response.data.ticket.record);
                }
            })
            .catch(err => console.log(err));
    }

    if(data != undefined)
    {
        headerticket = (
            <div className='box-header-ticketPage'>
                <span>موضوع تیکت : </span>

                <span>{data.subject}</span>

                <span> | </span>

                <span>{data.id}</span>

                <span> #</span>
            </div>
        );

        datachat = (
            <div className='box-item-ticketPage'>
                {data.children.map((item)=> {
                    if(item.sender_type === "user")
                    {
                        return (
                            <div className='item send' key={Math.random()}>
                                <div className='time'>
                                    <span>{item.date}</span>
                                </div>

                                <div className='message'>
                                    <span>{item.content}</span>
                                </div>

                                <div className='file'>
                                    {item.files[0] != undefined && 
                                        <a href={item.files[0]}>فایل</a>
                                    }
                                </div>
                            </div>
                        )
                    }else{
                        return (
                            <div className='item recive' key={Math.random()}>
                                <div className='time'>
                                    <span>{item.date}</span>
                                </div>

                                <div className='message' dangerouslySetInnerHTML={{ __html: item.content}}>

                                </div>

                                <div className='file'>
                                    {item.files[0] != undefined && 
                                        <a href={item.files[0]}>فایل</a>
                                    }
                                </div>
                            </div>
                        )
                    }
                })}

                <div className='item send'>
                    <div className='time'>
                        <span>{data.date}</span>
                    </div>

                    <div className='message'>
                        <span>{data.content}</span>
                    </div>

                    <div className='file'>
                        {data.files[0] != undefined && 
                            <a href={data.files[0]}>فایل</a>
                        }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header style="1rem 2rem" />

            <section id='main-dashboard' className='flex-box'>
                <section id='main-ticket-page'>
                    {headerticket}

                    <div className='box-answer-ticketPage'>
                        <div className='flex-box flex-column'>
                            <span id='message-error' className='error'></span>

                            <label htmlFor='message'>متن پیام : </label>

                            <textarea id='message' onChange={(e)=> setmessageForm(e.target.value)}></textarea>
                        </div>

                        <div className='box-send-btn flex-box flex-justify-space'>
                            <div>
                                <span id='message-error' className='error'></span>

                                <input type='file' id='file' onChange={(e)=> setfileForm(e.target.files[0])} />
                            </div>

                            <div>
                                <button onClick={sendAnswer}>ارسال پاسخ</button>
                            </div>
                        </div>
                    </div>

                    {datachat}
                </section>
            </section>
        </>
    );
};

export default Tickets;