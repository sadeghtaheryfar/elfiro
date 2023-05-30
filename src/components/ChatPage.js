/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect,useState,useRef } from 'react';
import Modal from 'react-bootstrap/Modal';

const ChatPage = (props) => {
    const [Data, setData] = useState();
    const [DataUser, setDataUser] = useState();
    const [DataRuils, setDataRuils] = useState();
    const [MessageIN, setMessageIN] = useState();
    const containerRef = useRef(null);
    const [showD, setShowD] = useState(false);
    const handleCloseD = () => setShowD(false);
    const handleShowD = () => setShowD(true);
    const usertoken = localStorage.getItem("user-login");
    var DataHeader;
    var DataChatItem;

    useEffect(() => {
        if(props != undefined)
        {
            const options = {
                method: 'GET',
                headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`},
            };

            fetch(`https://server.elfiro.com/api/v1/client/chat/list/${props.id}`, options)
                .then(response => response.json())
                .then(response => setData(response))
                .catch(err => console.log(err));

            fetch('https://server.elfiro.com/api/v1/basic/user', options)
                .then(response => response.json())
                .then(response => setDataUser(response.data.user_data.user))
                .catch(err => console.log(err));

            fetch('https://server.elfiro.com/api/v1/chat-laws')
                .then(response => response.json())
                .then(response => setDataRuils(response.data.laws.chat_laws))
                .catch(err => console.log(err));
        }
    }, [props])

    const ExitChatM = () => {
        document.getElementById("sidbar-chat").classList.remove("hide-item-pc");
        document.getElementById("box-chat-main").classList.add("hide-item-pc-f");
    }

    const [InOffendSub, setInOffendSub] = useState();
    const [InOffendDes, setInOffendDes] = useState();
    const SendOffend = () => {
        const usertoken = localStorage.getItem("user-login");
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`},
            body : `{"phone":"${DataUser.phone}","subject":"${InOffendSub}","content":"${InOffendDes}"}`
        };

        fetch(`https://server.elfiro.com/api/v1/users/offend/${Data.user.user_name}`, options)
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
    }

    var ruilsChat;

    if(Data != undefined && DataUser != undefined)
    {
        DataHeader = (
            <div id='hedaer-page-chat' className='flex-box flex-justify-space width-max'>
                <div className='logo-hedaer-page-chat flex-box width-max'>
                    {DataUser.id === Data.data.group.record.user1.id ?(
                        <div className='width-max flex-box flex-right'>
                            <div className='icon-exit-chat-mobile hide-item-mobile' onClick={ExitChatM}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>

                            <div className='image'>
                                <img src={Data.data.group.record.user2.profile_image} />

                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z" fill="#0094FF"/>
                                    <path d="M6.45825 9.99993L8.81659 12.3583L13.5416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>

                            <div className='detalist'>
                                <div>
                                    <span>{Data.data.group.record.user2.name}</span>
                                </div>

                                <div>
                                    <span>{Data.data.group.record.user2.description}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='width-max flex-box flex-right'>
                            <div className='icon-exit-chat-mobile hide-item-mobile' onClick={ExitChatM}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>

                            <div className='image'>
                                <img src={Data.data.group.record.user1.profile_image} />

                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z" fill="#0094FF"/>
                                    <path d="M6.45825 9.99993L8.81659 12.3583L13.5416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>

                            <div className='detalist'>
                                <div>
                                    <span>{Data.data.group.record.user1.name}</span>
                                </div>

                                <div>
                                    <span>{Data.data.group.record.user1.description}</span>
                                </div>
                            </div>
                        </div>
                    )

                    }
                    
                </div>

                <div className='flex-box flex-left'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3Z" stroke="#292D32" strokeWidth="1.5"/>
                    <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" stroke="#292D32" strokeWidth="1.5"/>
                    <path d="M12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17Z" stroke="#292D32" strokeWidth="1.5"/>
                    </svg>
                </div>
            </div>
        )

        DataChatItem = (
            <div id='box-show-chat' className='box-message-chatpage width-max'>
                {Data.data.group.record.chats.map((e) => 
                    {
                        if(DataUser.id === Data.data.group.record.user1.id) 
                        {   
                            return <div key={e.id} className={`item-message-chatpage ${e.receiver_id === DataUser.id ? 'recive-message-chatpage  flex-aling-left' : 'send-message-chatpage flex-aling-right' } flex-box flex-column flex-right`}>
                                    <div className='flex-box'>
                                        <div className='text'>
                                            <span>{e.content}</span>
                                        </div>

                                        {e.receiver_id === DataUser.id && 
                                            <div className='logo'>
                                                <img src={Data.data.group.record.user2.profile_image} />
                                            </div>
                                        }
                                    </div>

                                    {e.is_read === 1 ? (
                                        <svg width="19" height="11" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.9997 1.90527L10.8101 9.09497L9.7207 8.00562" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12.2282 1.90527L5.03855 9.09497L1.77051 5.82693" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    ) : (
                                        <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.9997 1.5L4.81004 8.6897L1.54199 5.42165" stroke="#BFBFBF" strokWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )}
                                </div>
                        }

                        if(DataUser.id === Data.data.group.record.user2.id) 
                        {   
                            return <div key={e.id} className={`item-message-chatpage ${e.receiver_id === DataUser.id ? 'recive-message-chatpage  flex-aling-left' : 'send-message-chatpage flex-aling-right' } flex-box flex-column flex-right`}>
                                    <div className='flex-box'>
                                        <div className='text'>
                                            <span>{e.content}</span>
                                        </div>

                                        {e.receiver_id === DataUser.id && 
                                            <div className='logo'>
                                                <img src={Data.data.group.record.user1.profile_image} />
                                            </div>
                                        }
                                    </div>

                                    {e.is_read === 1 ? (
                                        <svg width="19" height="11" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.9997 1.90527L10.8101 9.09497L9.7207 8.00562" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12.2282 1.90527L5.03855 9.09497L1.77051 5.82693" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    ) : (
                                        <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.9997 1.5L4.81004 8.6897L1.54199 5.42165" stroke="#BFBFBF" strokWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )}
                                </div>
                        }
                    }
                )}
            </div>
        )

        ruilsChat = (
            <div className='box-ruils-chatpage'>
                <div className='header flex-box'>
                    <span>قوانین چت</span>
                </div>

                {DataRuils.map((e) => 
                    <div className='item flex-box flex-right' key={Math.random()}>
                        <span>{e.order}</span>
                        <span> . </span>

                        <div dangerouslySetInnerHTML={{ __html: e.content}}>

                        </div>
                    </div>
                )}
            </div>  
        )
    }

    useEffect(() => {
        if(document.getElementById("box-show-chat") != undefined)
        {
            containerRef.current.scrollTop = document.getElementById("box-show-chat").scrollHeight;
        }
    }, [DataChatItem])
    
    

    const SendMassage = () => {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`},
            body : `{"message" : "${MessageIN}"}`
        };

        fetch(`https://server.elfiro.com/api/v1/client/chat/list/${props.id}`, options)
            .then(response => response.json())
            .then(response => {
                document.getElementById("message-input-chatpage").value = "" ;
                
                const options = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`},
                };

                fetch(`https://server.elfiro.com/api/v1/client/chat/list/${props.id}`, options)
                    .then(response => response.json())
                    .then(response => setData(response))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
    
    return (
        <div className='box-main-chatpage width-max height-max flex-box flex-column'>
            {DataHeader}

            <div ref={containerRef} className='box-show-chatpage height-max width-max flex-box flex-column flex-right'>
                {ruilsChat}

                {DataChatItem}
            </div>

            <div id='footer-page-chat' className='width-max flex-box'>
                <div className='send cursor-pointer' onClick={SendMassage} accessKey='j'>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5708 29.493L13.7404 20.4534L21.1825 13.0113C21.8799 12.3139 21.8799 11.173 21.1826 10.4756C20.4853 9.77834 19.3443 9.77836 18.647 10.4757L11.2049 17.9178L2.17783 13.1C-0.49719 11.6674 -0.040812 7.68635 2.88792 6.88774L27.1541 0.396444C29.6516 -0.27551 31.9338 2.00662 31.2618 4.50417L24.7705 28.7703C23.9845 31.7117 20.0035 32.168 18.5708 29.493Z" fill="#7007FA"/>
                    </svg>
                </div>

                <div className='text width-max'>
                    <input id='message-input-chatpage' placeholder='پیامی وارد کنید ...' type='text' onChange={(e) => setMessageIN(e.target.value)} />
                </div>

                {/* <div className='file'>
                    <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5075 23.7215C9.63253 26.5314 5.01055 26.5204 2.15255 23.6824C-0.705453 20.8454 -0.71647 16.2544 2.11355 13.4004L2.11153 13.3985L12.5085 3.07445L13.8095 1.78343C15.9625 -0.354568 19.4535 -0.354568 21.6065 1.78343C23.7595 3.92244 23.7595 7.38844 21.6065 9.52745L10.1455 20.7905L10.1415 20.7865C8.72854 22.1395 6.47753 22.1294 5.08254 20.7504C3.68655 19.3714 3.67754 17.1474 5.04653 15.7534L5.04253 15.7485L6.31853 14.4895L12.6995 8.18645L13.9745 9.44743L6.31853 17.0094C5.61355 17.7045 5.61355 18.8335 6.31853 19.5294C7.02355 20.2265 8.16653 20.2265 8.87054 19.5294L20.3065 8.23546L20.3036 8.23244L20.3465 8.19646C21.7826 6.77043 21.7826 4.45845 20.3465 3.03343C18.9116 1.60844 16.5845 1.60844 15.1495 3.03343L15.1105 3.07643L15.1085 3.07545L13.8085 4.36543L3.41054 14.6894C1.25753 16.8274 1.25753 20.2944 3.41054 22.4324C5.56454 24.5704 9.05553 24.5704 11.2075 22.4324L20.3055 13.3985L21.6045 12.1084L22.9045 13.3985L21.6045 14.6894L12.5085 23.7234L12.5075 23.7215Z" fill="#7007FA"/>
                    </svg>
                </div> */}

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
                                    <button>ارسال تخلف</button>
                                    <span id='sucsend' className='sucsess-tiket-add'></span>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default ChatPage;