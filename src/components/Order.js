import React from 'react';
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useEffect,useState } from 'react';
import Header from './Header';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Helmet } from "react-helmet";
import Modal from 'react-bootstrap/Modal';
import { Pagination } from "swiper";
import "swiper/css/pagination";
import { Link } from 'react-router-dom';


const Order = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    var idorder = window.location.pathname;
    const [Data, setData] = useState();
    const [LawStartTr, setLawStartTr] = useState();
    const [LawStartTrAp, setLawStartTrAp] = useState(true);
    const [LawNumber, setLawNumber] = useState();
    const [LawNumberAp, setLawNumberAp] = useState(true);
    const [Datauser, setDatauser] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showB, setShowB] = useState(false);
    const handleCloseB = () => setShowB(false);
    const handleShowB = () => setShowB(true);
    const [showC, setShowC] = useState(false);
    const handleCloseC = () => setShowC(false);
    const handleShowC = () => setShowC(true);
    const [showD, setShowD] = useState(false);
    const handleCloseD = () => setShowD(false);
    const handleShowD = () => setShowD(true);
    const [showE, setShowE] = useState(false);
    const handleCloseE = () => setShowE(false);
    const handleShowE = () => setShowE(true);
    const [showF, setShowF] = useState(false);
    const handleCloseF = () => setShowF(false);
    const handleShowF = () => setShowF(true);
    const usertoken = localStorage.getItem("user-login");

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
        }
    },[])

    useEffect(() => {
        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
        if(idorder != undefined)
        {
            fetch(`https://server.elfiro.com/api/v1${idorder}`, options)
                .then(response => response.json())
                .then(response => {
                    if(response.status === "error")
                    {
                        window.location = "/Not-Fond";
                    }else{
                        setData(response.data.order.record);
                    }
                    })
                .catch(err => console.error(err));

            fetch(`https://server.elfiro.com/api/v1/transaction-laws`, options)
                .then(response => response.json())
                .then(response => setLawStartTr(response.data.laws.transaction_laws))
                .catch(err => console.error(err));

            fetch(`https://server.elfiro.com/api/v1/phone-laws`, options)
                .then(response => response.json())
                .then(response => setLawNumber(response.data.laws.phone_laws))
                .catch(err => console.error(err));
        }
    }, [])

    var headerOrder;

    if(Data != undefined)
    {
        headerOrder = (
            <div id='header-order' className='flex-box flex-right'>
                <a href='/'>الفیرو</a>

                <svg xmlns="http://www.w3.org/2000/svg" width="8.414" height="14.828" viewBox="0 0 8.414 14.828">
                        <path id="source_icons_nav-arrow-down" d="M6,9l6,6,6-6" transform="translate(16 -4.586) rotate(90)" fill="none" stroke="#808191" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                </svg>


                <span>{Data.name}</span>
            </div>
        )
    }

    var detalistOrder;

    const [callnumber, Setcallnumber] = useState();

    const showcallnumber = () => {
        handleCloseE();
        Setcallnumber(Data.user.phone);
        document.getElementById("btn-call-number-order").classList.add("hide-item");
        document.getElementById("show-call-number-order").classList.remove("hide-item");
    }

    const [number, Setnumber] = useState(3);

    const starttran = () => {
        const usertoken = localStorage.getItem("user-login");
        if(usertoken != undefined)
        {
            setShowC(true);
            handleCloseF();
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`},
                body: '{"confirmLaw":true}'
            };

            fetch(`https://server.elfiro.com/api/v1/orders/start-transaction/${Data.id}`, options)
                .then(response => response.json())
                .then(response =>  {
                    if(response.status === "success")
                    {
                        document.getElementById("show-start-tran").innerHTML = response.data.message.transaction;
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
                    }else{
                        if(response.data.message.user != undefined)
                        {
                            document.getElementById("show-start-tran").innerHTML = response.data.message.user[0];
                        }

                        if(response.data.message.transaction != undefined)
                        {
                            document.getElementById("show-start-tran").innerHTML = response.data.message.transaction[0];
                        }
                    }

                })
                .catch(err => console.log('>>>>>>>>>>>', err))
        }else{
            window.location = "/login"
        }
    }

    useEffect(() => {
        if(number === 0)
        {
            window.location = "/Dashboard/Transaction";
        }
    }, [number])

    const StartChatOnile = () => {
        const usertoken = localStorage.getItem("user-login");
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`},
            body : `{"confirmLaw":true,"user_target":${Data.user.id}}`
        };

        if(usertoken != undefined)
        {
            fetch(`https://server.elfiro.com/api/v1/client/chat/new`, options)
                .then(response => response.json())
                .then(response => {
                    if(response.status === "success")
                    {
                        window.location = "/chats";
                    }
                })
                .catch(err => console.log('>>>>>>>>>>>', err))
        }else{
            window.location = "/login";
        }
    }

    const [InOffendSub, setInOffendSub] = useState();
    const [InOffendDes, setInOffendDes] = useState();
    const SendOffend = () => {
        const usertoken = localStorage.getItem("user-login");
        
        if(Datauser != undefined)
        {
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`},
                body : `{"phone":"${Datauser.phone}","subject":"${InOffendSub}","content":"${InOffendDes}"}`
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
        }else{
            window.location = "/login";
        }
    }

    if(Data != undefined)
    {
        detalistOrder = (
            <div>
                <div className='header-detalist-order'>
                    <div className='flex-box flex-justify-space'>
                        <div className='flex-box flex-right'>
                            <div className='logo-detalist-header-order'>
                                <img src={Data.user.user_profile} />

                                {Data.status_label === "تایید شده" && 
                                    <div>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z" fill="#0094FF"/>
                                            <path d="M6.45825 9.99993L8.81659 12.3583L13.5416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                }
                            </div>

                            <Link to={'/users/' + Data.user.user_name} className='name-detalist-header-order flex-box flex-column flex-aling-right'>
                                <span>{Data.user.user_name}</span>

                                {Data.status_label === "تایید شده" && 
                                    <span>فروشنده احراز هویت شده</span>
                                }

                                {Data.status_label === "تایید نشده" && 
                                    <span>فروشنده احراز هویت نشده</span>
                                }
                            </Link>
                        </div>

                        <div className='flex-box'>
                            <div className='count-detalist-header-order flex-box'>
                                <span>{Data.view_count}</span>

                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.3866 7.99995C10.3866 9.31995 9.31995 10.3866 7.99995 10.3866C6.67995 10.3866 5.61328 9.31995 5.61328 7.99995C5.61328 6.67995 6.67995 5.61328 7.99995 5.61328C9.31995 5.61328 10.3866 6.67995 10.3866 7.99995Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8.00002 13.5133C10.3534 13.5133 12.5467 12.1266 14.0734 9.72665C14.6734 8.78665 14.6734 7.20665 14.0734 6.26665C12.5467 3.86665 10.3534 2.47998 8.00002 2.47998C5.64668 2.47998 3.45335 3.86665 1.92668 6.26665C1.32668 7.20665 1.32668 8.78665 1.92668 9.72665C3.45335 12.1266 5.64668 13.5133 8.00002 13.5133Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>

                            <div className='flex-box plat-detalist-header-order'>
                                <div className='flex-box'>
                                    <img src={Data.platforms} />
                                </div>

                                <div className='flex-box'>
                                    <svg width="15" height="21" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.117 3.48515V18.8752C13.117 19.3342 12.699 19.6161 12.374 19.3762L7.563 15.8142C7.407 15.6982 7.21001 15.6982 7.05299 15.8142L2.242 19.3762C1.918 19.6161 1.5 19.3342 1.5 18.8752V3.48515C1.5 2.41316 2.228 1.53516 3.118 1.53516H11.499C12.389 1.53516 13.117 2.41316 13.117 3.48515Z" stroke="#7007FA" strokeWidth="2"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex-box flex-justify-space'>
                        <div className='acname-detalist-header-order'>
                            <div>
                                <span>{Data.name}</span>
                            </div>

                            <div className='flex-box flex-right'>
                                <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.73756 19.753C4.02356 19.753 0.476562 12.781 0.476562 8.26102C0.476562 3.70502 4.18256 0 8.73756 0C13.2936 0 16.9996 3.70502 16.9996 8.26102C16.9996 12.781 13.4516 19.753 8.73756 19.753ZM8.73756 2.11499C5.34956 2.11499 2.59256 4.87201 2.59256 8.26102C2.59256 11.788 5.56856 17.638 8.73756 17.638C11.9066 17.638 14.8826 11.788 14.8826 8.26102C14.8826 4.87201 12.1266 2.11499 8.73756 2.11499Z" fill="#808191"/>
                                    <path d="M8.73795 12.8392C6.74695 12.8392 5.12695 11.2202 5.12695 9.22919C5.12695 7.23718 6.74695 5.61719 8.73795 5.61719C10.73 5.61719 12.35 7.23718 12.35 9.22919C12.35 11.2202 10.73 12.8392 8.73795 12.8392ZM8.73795 7.73318C7.91395 7.73318 7.24295 8.4032 7.24295 9.22919C7.24295 10.0532 7.91395 10.7242 8.73795 10.7242C9.56295 10.7242 10.233 10.0532 10.233 9.22919C10.233 8.4032 9.56295 7.73318 8.73795 7.73318Z" fill="#808191"/>
                                </svg>

                                <span>{Data.created_at}</span>
                            </div>
                        </div>

                        <div className='price-detalist-header-order flex-box'>
                            <span>{Data.price}</span>
                        </div>
                    </div>
                </div>

                <div className='header-contact-order flex-box flex-left'>
                    <button className='flex-box' onClick={StartChatOnile}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z" stroke="#7007FA" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15.9965 11H16.0054" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.9955 11H12.0045" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M7.99451 11H8.00349" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>

                        <span>چت آنلاین</span>
                    </button>

                    <button id='btn-call-number-order' onClick={handleShowE}>شماره تماس</button>

                    <div id='show-call-number-order' className='flex-box hide-item'>
                        <a href={"tel:" + callnumber}>{callnumber}</a>
                    </div>

                    <button onClick={handleShowF}>معامله آنلاین</button>
                </div>

                <div className='header-message-order'>
                    <div>
                        <h1>توضیحات</h1>
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: Data.content}}>

                    </div>
                </div>
            </div>
        )
    }

    const handelnumberordermo = () =>{
        navigator.clipboard.writeText(Data.user.phone);
    }

    var GaleryOrder;
    var SliderOrder;
    var Datamobile;
    var PageDetalist;

    if(Data != undefined)
    {
        GaleryOrder = (
            <div>
                <div className='box-item-main-order'>
                    <div className='item-item-main-order flex-box'>
                        <img src={Data.image} />
                    </div>

                    {/* {
                        Data.gallery.map((item,index) =>
                            <div className='item-item-main-order flex-box'  key={Math.random()}>
                                <img src={item} />
                            </div>
                        )
                    } */}

                    <div className='item-item-main-order flex-box cursor-pointer' onClick={handleShow}>
                        <svg width="67" height="9" viewBox="0 0 67 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4.5" cy="4.5" r="4.5" fill="#FABA07"/>
                        <circle cx="33.5" cy="4.5" r="4.5" fill="#FABA07"/>
                        <circle cx="62.5" cy="4.5" r="4.5" fill="#FABA07"/>
                        </svg>
                    </div>
                </div>

                {/* <!-- Modal --> */}
                <Modal className='modal-slider-order' show={show} onHide={handleClose}>
                    <Modal.Header  className='modal-header-filter-mo width-max flex-box flex-justify-space' closeButton>
                        <Modal.Title>گالری</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Swiper
                                spaceBetween={10}
                                navigation={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper2 slider-main-modal-order"
                            >
                                <SwiperSlide className='slide-main-order flex-box'>
                                    <img src={Data.image} />
                                </SwiperSlide>

                                {/* {
                                    Data.gallery.map((item) =>
                                        <SwiperSlide className='slide-main-order' key={Math.random()}>
                                            <img src={item} />
                                        </SwiperSlide>
                                    )
                                } */}
                            </Swiper>

                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper slider-item-modal-order"
                            >
                                <SwiperSlide className='slide-main-order flex-box'>
                                    <img src={Data.image} />
                                </SwiperSlide>
                                
                                {/* {
                                    Data.gallery.map((item) =>
                                        <SwiperSlide className='slide-main-order flex-box' key={Math.random()}>
                                            <img src={item} />
                                        </SwiperSlide>
                                    )
                                } */}
                            </Swiper>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )

        
        SliderOrder = (
            <div>
                <div className='box-slider-main-order'>
                    <Swiper className='slider-main-order flex-box' navigation={true} modules={[Navigation]}>
                        <SwiperSlide className='slide-main-order flex-box'>
                            <img src={Data.image} />
                        </SwiperSlide>

                        {/* {
                            Data.gallery.map((item) =>
                                <SwiperSlide className='slide-main-order flex-box' key={Math.random()}>
                                    <img src={item} />
                                </SwiperSlide>
                            )
                        } */}
                    </Swiper>
                </div>

                <div className='btn-slider-main-order'>
                    <button className='flex-box' onClick={handleShowD}>
                        <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.9917 18.752H4.57664C3.13066 18.752 1.83568 18.004 1.11266 16.752C0.389694 15.5 0.389694 14.004 1.11168 12.752L7.31969 2C8.04265 0.748016 9.33769 0 10.7826 0H10.7837C12.2297 0 13.5246 0.747009 14.2486 2L20.4557 12.752C21.1787 14.004 21.1797 15.499 20.4557 16.751C19.7327 18.004 18.4377 18.752 16.9917 18.752ZM10.7837 2C10.0607 2 9.41368 2.37402 9.05266 3L2.84465 13.752C2.48265 14.378 2.48265 15.126 2.84465 15.752C3.20567 16.378 3.85368 16.752 4.57664 16.752H16.9917C17.7157 16.752 18.3627 16.378 18.7237 15.752C19.0857 15.126 19.0857 14.378 18.7237 13.752L12.5157 3C12.1546 2.37302 11.5066 2 10.7837 2Z" fill="black"/>
                            <rect x="9.67773" y="5.76562" width="2" height="5.2124" fill="black"/>
                            <rect x="9.67773" y="11.9355" width="2" height="2.06396" fill="black"/>
                        </svg>


                        <span>گزارش تخلف</span>
                    </button>
                </div>
            </div>
        )

        Datamobile = (
            <div id='detalist-order-mo' className='hide-item-mobile'>
                <div className='header-detalist-order-mo flex-box flex-justify-space'>
                    <div className='flex-box flex-right'>
                        <div className='icon-header-detalist-order-mo'>
                            <img src={Data.user.user_profile} />

                            {Data.status_label === "تایید شده" && 
                                <div>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.33339 13.5557C12.3889 13.5557 14.8889 11.0557 14.8889 8.00014C14.8889 4.94458 12.3889 2.44458 9.33339 2.44458C6.27783 2.44458 3.77783 4.94458 3.77783 8.00014C3.77783 11.0557 6.27783 13.5557 9.33339 13.5557Z" fill="#0094FF"/>
                                        <path d="M6.97217 7.99996L8.54439 9.57218L11.6944 6.42773" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            }
                        </div>

                        <div className='name-header-detalist-order-mo flex-box flex-column flex-aling-right'>
                            <span>{Data.user.user_name}</span>

                            {Data.status_label === "تایید شده" && 
                                <span>فروشنده احراز هویت شده</span>
                            }

                            {Data.status_label === "تایید نشده" && 
                                <span>فروشنده احراز هویت نشده</span>
                            }
                        </div>
                    </div>

                    <div className='left-header-detalist-order-mo flex-box'>
                        <div className='flex-box'>
                            <span>{Data.view_count}</span>

                            <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.393 3.94649C10.5352 4.11293 10.5346 4.3578 10.393 4.52431L8.60654 6.61891C7.07681 8.41353 4.30923 8.41353 2.77951 6.61891L0.997894 4.52376C0.856262 4.35728 0.856262 4.11293 0.997345 3.94704L2.77951 1.84596C4.30923 0.0513458 7.07681 0.0513458 8.60654 1.84596L10.393 3.94649Z" stroke="#808191"/>
                                <path d="M7.25986 4.06418C7.25986 4.92802 6.55958 5.6283 5.69574 5.6283C4.8319 5.6283 4.13162 4.92802 4.13162 4.06418C4.13162 3.20034 4.8319 2.50006 5.69574 2.50006C6.55958 2.50006 7.25986 3.20034 7.25986 4.06418Z" stroke="#808191"/>
                            </svg>
                        </div>
                        
                        <div className='flex-box'>
                            <img src={Data.platforms} />
                        </div>

                        <div className='flex-box'>
                            <svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.71207 1.55405V9.87297C7.71207 10.1211 7.48613 10.2735 7.31046 10.1438L4.7099 8.21838C4.62558 8.15567 4.5191 8.15567 4.43423 8.21838L1.83369 10.1438C1.65855 10.2735 1.43262 10.1211 1.43262 9.87297V1.55405C1.43262 0.974594 1.82613 0.5 2.30721 0.5H6.83746C7.31856 0.5 7.71207 0.974594 7.71207 1.55405Z" stroke="#7007FA"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div>
                    <Swiper pagination={true} modules={[Pagination]} className="mySwiper-header-detalist-order-mo">
                        <SwiperSlide className='flex-box'>
                            <img src={Data.image} />
                        </SwiperSlide>
                        
                        {/* {
                            Data.gallery.map((item) =>
                                <SwiperSlide className='flex-box' key={Math.random()}>
                                    <img src={item} />`
                                </SwiperSlide>
                            )
                        } */}
                    </Swiper>
                </div>

                <div className='box-detalist-order-mo'>
                    <div className='name-detalist-order-mo'>
                        <span>{Data.name}</span>

                        <div className='flex-box flex-right'>
                            <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.73854 19.753C4.02454 19.753 0.477539 12.781 0.477539 8.26102C0.477539 3.70502 4.18354 0 8.73854 0C13.2945 0 17.0005 3.70502 17.0005 8.26102C17.0005 12.781 13.4525 19.753 8.73854 19.753ZM8.73854 2.11499C5.35054 2.11499 2.59354 4.87201 2.59354 8.26102C2.59354 11.788 5.56954 17.638 8.73854 17.638C11.9075 17.638 14.8835 11.788 14.8835 8.26102C14.8835 4.87201 12.1275 2.11499 8.73854 2.11499Z" fill="#808191"/>
                                <path d="M8.73795 12.8392C6.74695 12.8392 5.12695 11.2202 5.12695 9.22919C5.12695 7.23718 6.74695 5.61719 8.73795 5.61719C10.73 5.61719 12.35 7.23718 12.35 9.22919C12.35 11.2202 10.73 12.8392 8.73795 12.8392ZM8.73795 7.73318C7.91395 7.73318 7.24295 8.4032 7.24295 9.22919C7.24295 10.0532 7.91395 10.7242 8.73795 10.7242C9.56295 10.7242 10.233 10.0532 10.233 9.22919C10.233 8.4032 9.56295 7.73318 8.73795 7.73318Z" fill="#808191"/>
                            </svg>

                            <span>{Data.created_at}</span>
                        </div>
                    </div>

                    <div className='price-detalist-order-mo flex-box flex-justify-space'>
                        <span>قیمت</span>

                        <div>
                            <span>{Data.price}</span>
                            
                            <span>تومان</span>
                        </div>
                    </div>

                    <div className='menu-detalist-order-mo flex-box'>
                        <div className='flex-box flex-justify-space'>
                            <button onClick={handleShowE}>اطلاعات تماس</button>
                        
                            <button onClick={handleShowF}>معامله آنلاین</button>
                        </div>
                    </div>

                    <div className='chat-detalist-order-mo flex-box' onClick={StartChatOnile}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z" stroke="#7007FA" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15.9965 11H16.0054" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.9955 11H12.0045" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M7.99451 11H8.00349" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>

                        <span>چت آنلاین</span>
                    </div>

                    <div className='contact-detalist-order-mo'>
                        <span>توضیحات</span>

                        <div  dangerouslySetInnerHTML={{ __html: Data.content}}>

                        </div>
                    </div>

                    <div className='violation-detalist-order-mo flex-box' onClick={handleShowD}>
                        <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.9966 18.877H4.58153C3.13554 18.877 1.84056 18.129 1.11754 16.877C0.394577 15.625 0.394577 14.129 1.11656 12.877L7.32457 2.125C8.04753 0.873016 9.34258 0.125 10.7875 0.125H10.7886C12.2345 0.125 13.5295 0.872009 14.2535 2.125L20.4606 12.877C21.1836 14.129 21.1846 15.624 20.4606 16.876C19.7375 18.129 18.4426 18.877 16.9966 18.877ZM10.7886 2.125C10.0655 2.125 9.41856 2.49902 9.05754 3.125L2.84953 13.877C2.48753 14.503 2.48753 15.251 2.84953 15.877C3.21056 16.503 3.85857 16.877 4.58153 16.877H16.9966C17.7206 16.877 18.3675 16.503 18.7286 15.877C19.0906 15.251 19.0906 14.503 18.7286 13.877L12.5206 3.125C12.1595 2.49802 11.5115 2.125 10.7886 2.125Z" fill="black"/>
                        <rect x="9.68262" y="5.89062" width="2" height="5.2124" fill="black"/>
                        <rect x="9.68262" y="12.0605" width="2" height="2.06396" fill="black"/>
                        </svg>

                        <span>گزارش تخلف</span>
                    </div>

                    {/* <!-- Modal --> */}
                    <Modal className='modal-detalist-tran' show={showC} onHide={handleCloseC} centered>
                        <Modal.Body>
                            <div className='flex-box flex-column'>
                                <div className='message'>
                                    <span id='show-start-tran'></span>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>

                    {/* <!-- Modal --> */}
                    <Modal className='modal-number-detalist-order-mo' show={showB} onHide={handleCloseB} centered>
                        <Modal.Body>
                            <div>
                                <div className='detalist-modal-number-order-mo flex-box flex-justify-space'>
                                    <div>
                                        <span>شماره همراه</span>
                                    </div>

                                    <div className='flex-box'>
                                        <a href={"tel:" + Data.user.phone} id='text-number-order-mo'>{Data.user.phone}</a>
                                    </div>

                                    <div>
                                        <button className='flex-box' onClick={handelnumberordermo}>
                                            <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.8867 3.11932C11.4574 1.30804 9.82056 0 7.92216 0H4.64189C2.38795 0 0.556641 1.8313 0.556641 4.07855V9.47186C0.556641 11.2093 1.63664 12.7253 3.23318 13.3022C3.6625 15.1067 5.29929 16.4215 7.19769 16.4215H10.478C12.7319 16.4215 14.5632 14.5902 14.5632 12.3362V6.94287C14.5632 5.20551 13.4765 3.68274 11.8867 3.11932ZM3.11243 6.94287V11.7526C2.36783 11.2562 1.89826 10.411 1.89826 9.47186V4.07855C1.89826 2.56921 3.12585 1.34161 4.64189 1.34161H7.92216C8.98875 1.34161 9.93461 1.95874 10.3773 2.86438H7.19769C4.94376 2.86438 3.11243 4.69568 3.11243 6.94287ZM13.2216 12.3362C13.2216 13.8523 11.994 15.0798 10.478 15.0798H7.19769C5.90972 15.0798 4.80289 14.181 4.52114 12.9131C4.50102 12.8326 4.48761 12.7454 4.47419 12.6583C4.45406 12.5509 4.45406 12.4435 4.45406 12.3362V6.94287C4.45406 5.43353 5.68166 4.20599 7.19769 4.20599H10.478C10.7127 4.20599 10.9274 4.23285 11.1421 4.29321C12.3697 4.58838 13.2216 5.68176 13.2216 6.94287V12.3362Z" fill="#7007FA"/>
                                            </svg>

                                            <span>کپی</span>
                                        </button>
                                    </div>
                                </div>

                                <div className='exit-modal-number-order-mo'>
                                    <button onClick={handleCloseB}>بستن</button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )

        PageDetalist = (
            <Helmet>
                <title>{Data.name}</title>
                <meta name="description" content={Data.seoDescription} />
                <meta name="keywords" content={Data.seoKeywords} />
            </Helmet>
        )
    }

    var modalLawsTR;
    var modalLawsNum;

    if(LawNumber != undefined && LawStartTr != undefined)
    {
        modalLawsTR = (
            <Modal className='modal-send-offend-order-mo' show={showE} onHide={handleCloseE} centered>
                <Modal.Body>
                    <Modal.Header  className='modal-header-send-offend-order-mo width-max flex-box flex-justify-space' closeButton>
                        <Modal.Title>قوانین</Modal.Title>
                    </Modal.Header>

                    <div className='flex-box flex-column'>
                        <div className='box-send-offend-modal width-max'>
                            <div className='box-item-rules-order'>
                                {
                                    Object.keys(LawStartTr).map(key => {
                                        var item = LawStartTr[key];
                                        return (
                                            <div key={key} className='item-rules flex-box flex-aling-right'>
                                                <div className='count flex-box'>
                                                    <span>{Number(key) + 1}</span>
                                                </div>

                                                <div className='message width-max text-right' dangerouslySetInnerHTML={{ __html: item.content}}>

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div>
                                <div className='box-approval-rules-laws-nu flex-box flex-right'>
                                    <input id='approval-rules-laws-nu' type='checkbox' onChange={(e) => setLawStartTrAp(!LawStartTrAp)} />

                                    <label htmlFor='approval-rules-laws-nu'>قوانین را خوانده ام و با آن موافقم</label>
                                </div>

                                <div className='flex-box margin-vetical-1'>
                                    <button className='hide-item-pc' id='btn-approval-rules-laws-nu' disabled={LawStartTrAp} onClick={showcallnumber}>مشاهده شماره تماس</button>

                                    <button className='hide-item-mobile' id='btn-approval-rules-laws-nu' disabled={LawStartTrAp} onClick={function myfunc(){
                                        handleCloseE(); 
                                        handleShowB();
                                    }}>مشاهده شماره تماس</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )

        modalLawsNum = (
            <Modal className='modal-send-offend-order-mo' show={showF} onHide={handleCloseF} centered>
                <Modal.Body>
                    <Modal.Header  className='modal-header-send-offend-order-mo width-max flex-box flex-justify-space' closeButton>
                        <Modal.Title>قوانین</Modal.Title>
                    </Modal.Header>

                    <div className='flex-box flex-column'>
                        <div className='box-send-offend-modal width-max'>
                            <div className='box-item-rules-order'>
                                {
                                    Object.keys(LawNumber).map(key => {
                                        var item = LawNumber[key];
                                        return (
                                            <div key={key} className='item-rules flex-box flex-aling-right'>
                                                <div className='count flex-box'>
                                                    <span>{Number(key) + 1}</span>
                                                </div>

                                                <div className='message width-max text-right' dangerouslySetInnerHTML={{ __html: item.content}}>

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div>
                                <div className='box-approval-rules-laws-nu flex-box flex-right'>
                                    <input id='approval-rules-laws-nu' type='checkbox' onChange={(e) => setLawNumberAp(!LawNumberAp)} />

                                    <label htmlFor='approval-rules-laws-nu'>قوانین را خوانده ام و با آن موافقم</label>
                                </div>

                                <div>
                                    <button id='btn-approval-rules-laws-nu' disabled={LawNumberAp} onClick={starttran}>درخواست معامله</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
    
    return (
        <div>
            {PageDetalist}
            {modalLawsNum}

            <Header style="1rem 2rem" />

            <section id='main-order'>
                {headerOrder}

                <section id='detalist-order' className='flex-box flex-justify-space flex-aling-right'>
                    {GaleryOrder}

                    {SliderOrder}

                    {detalistOrder}
                </section>

                {Datamobile}
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
                                <span id='sucsend' className='sucsess-tiket-add'></span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {modalLawsTR}
        </div>
    );
};

export default Order;