import React from 'react';
import { useEffect,useState } from 'react';
import Header from './Header';
import ChatPage from './ChatPage';

const Chat = () => {
    const [Data, setData] = useState();
    const [Datauser, setDatauser] = useState();
    const [first, setfirst] = useState(1);
    const [datalistchat, setdatalistchat] = useState();
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
                            setDatauser(response.data.user_data.user)
                        }
                    })
                    .catch(err => {
                        window.location = "/Login"
                    });

                fetch('https://server.elfiro.com/api/v1/client/chat/list', options)
                .then(response => response.json())
                .then(response => {
                    setData(response);
                    setdatalistchat(response.data.groups.records.reverse());
                })
                .catch(err => console.log(err));
            }else{
                window.location = "/Login";
            }
        }else{
            window.location = "/Login";
        }
    }, [])

    const [ChatBoxHtml, setChatBoxHtml] = useState();

    const ShowChatBox = (event) => {
        document.getElementById("not-chat-box").classList.add("hide-item");
        document.getElementById("sidbar-chat").classList.add("hide-item-pc");
        document.getElementById("box-chat-main").classList.remove("hide-item-pc-f");
        setChatBoxHtml(<ChatPage id={event} />);
    }

    var ChatsList;

    if(Data != undefined && datalistchat != undefined && Datauser != undefined)
    {
        console.log(Data);
        ChatsList = (
            <div className='box-item-chat-sidbar'>
                {datalistchat.map((item)=> 
                    <div className='item-chat-sidbar flex-box' key={item.id} onClick={(e) => ShowChatBox(item.id)}>
                        {item.user1.id === Datauser.id ?(
                            <div className='width-max flex-box flex-right'>
                                <div className='image'>
                                    <img src={item.user2.profile_image} />

                                    {item.user2.status === "confirmed" && 
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z" fill="#0094FF"/>
                                            <path d="M6.45825 9.99993L8.81659 12.3583L13.5416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    }
                                </div>

                                <div className='detalist'>
                                    <div>
                                        <span>{item.user2.name}</span>
                                    </div>

                                    <div>
                                        <span>{item.user2.description}</span>
                                    </div>

                                </div>
                            </div>
                        ) : (
                            <div className='width-max flex-box flex-right'>
                                <div className='image'>
                                    <img src={item.user1.profile_image} />

                                    {item.user1.status === "confirmed" && 
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z" fill="#0094FF"/>
                                            <path d="M6.45825 9.99993L8.81659 12.3583L13.5416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    }
                                </div>

                                <div className='detalist'>
                                    <div>
                                        <span>{item.user1.name}</span>
                                    </div>

                                    <div>
                                        <span>{item.user1.description}</span>
                                    </div>

                                </div>
                            </div>
                        )}

                        <div className='last'>
                            <span>{item.last.date}</span>
                        </div>

                        <div className='active'></div>
                    </div>
                )}
            </div>
        )
        
    }
    
    return (
        <div>
            <Header style="1rem 2rem" />

            <section id='main-chat' className='flex-box flex-aling-right'>
                <section id='sidbar-chat'>
                    <div className='header-sidbar-chat flex-box'>
                        <span>چت  الفیرو</span>
                    </div>

                    
                    {ChatsList}
                </section>
                
                <section id='box-chat-main' className='width-max height-max flex-box hide-item-pc-f'>
                    <div id='not-chat-box' className='not-chat-box'>
                        <div className='image'>
                            <img src='https://elfiro.com/img/66.png' />
                        </div>

                        <div className='text flex-box'>
                            <span>هیچ گفتگویی وجود ندارد</span>
                        </div>
                    </div>

                    {ChatBoxHtml}
                </section>
            </section>
        </div>
    );
};

export default Chat;