import React from 'react';
import LogoUser from './../imags/logo-user.png';
import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

const Header = (props) => {
    const [DataHeader, SetDataHeader] = useState();
    const [DataHeaderAL, SetDataHeaderAL] = useState();
    const [Logo, SetLogo] = useState();
    const [Tel, SetTel] = useState();
    const [DataUser, SetDataUser] = useState();
    const [notifPr, SetnotifPr] = useState();
    const usertoken = localStorage.getItem("user-login");
    const [styleH, setstyleH] = useState(props);
    const [notifmod, setnotifmod] = useState(false);
    const notifmodClose = () => setnotifmod(false);
    const notifmodShow = () => setnotifmod(true);

    useEffect(() => {
        if(usertoken != undefined)
        {
            const options = {
                method: 'GET',
                headers: {'Content-Type': 'application/json', Authorization: `${usertoken}`}
            };

            fetch('https://server.elfiro.com/api/v1/basic/user', options)
                .then(response => response.json())
                .then(response => {
                    if(response.status === "success")
                    {
                        SetDataUser(response);
                    }
                })
                .catch(err => console.error(err));
        }
    },[])

    useEffect(() => {
        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
        fetch('https://server.elfiro.com/api/v1/basic/base', options)
            .then(response => response.json())
            .then(result => {
                SetDataHeader(result.data.base);
                SetDataHeaderAL(result.data.base.notification);
            })

        fetch('https://server.elfiro.com/api/v1/notifications/public', options)
            .then(response => response.json())
            .then(response => SetnotifPr(response))
            .catch(err => console.error(err));
    },[])
    
    useEffect(() => {
        if(DataHeader != undefined)
        {
            SetLogo(DataHeader.logo);
            SetTel(DataHeader.tel);
        }
    }, [DataHeader])

    const menuhoverheader = () => {
        document.getElementById("hover-user-header").classList.toggle("hide-item");
        document.getElementById("box-hover-user-header").classList.toggle("hide-item");
        document.getElementById("exit-user-header").classList.toggle("hide-item");
    }

    const notifhoverheaders = () => {
        document.getElementById("hover-notif-header").classList.toggle("hide-item");
        document.getElementById("box-hover-notif-header").classList.toggle("hide-item");
        document.getElementById("exit-notif-header").classList.toggle("hide-item");
    }

    var DataIconLogin;

    const logout = () =>{
        localStorage.removeItem("user-login");
        window.location = "/";
    }

    if(DataUser == undefined)
    {
        DataIconLogin = (
            <div className='flex-box'>
                <Link to='/login' className='flex-box'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z" fill="#7007FA"/>
                    <path d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z" fill="#7007FA"/>
                    </svg>
                </Link>
            </div>
        )
    }else{
        DataIconLogin = (
            <div className='flex-box'>
                <a className='flex-box' onClick={menuhoverheader}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z" fill="#7007FA"/>
                    <path d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z" fill="#7007FA"/>
                    </svg>
                </a>

                <div id="box-hover-user-header" className='box-hover-user-header hide-item'>
                    <div className='show-hover-user-header'>
                        <ul className='li-hover-user-header'>
                            <li>
                                <a className='item-hover-user-header item-hover-user-header-one flex-box'>
                                    <div>
                                        <img src={DataUser.data.user_data.user.profile_image} />
                                    </div>

                                    <div className='width-max'>
                                        <div>
                                            <span>سلام </span>

                                            <span className='color-blue'>{DataUser.data.user_data.user.name}</span>
                                        </div>

                                        <span>خوش اومدی</span>
                                    </div>
                                </a>
                            </li>
                            
                            <li>
                                <Link to='/dashboard' className='item-hover-user-header flex-box wdth-max flex-justify-space'>
                                    <div className='flex-box width-max'>
                                        <span>مشاهده پروفایل</span>
                                    </div>

                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008" stroke="#3D42DF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </Link>
                            </li>

                            <li>
                                <Link to={"/Dashboard/Profile/Authentication"} className='item-hover-user-header flex-box width-max'>
                                    <span>احراز هویت</span>
                                </Link>
                            </li>

                            <li>
                                <Link to={"/Dashboard/Order"} className='item-hover-user-header flex-box width-max'>
                                    <span>آگهی های من</span>
                                </Link>
                            </li>

                            <li>
                                <a className='item-hover-user-header-last item-hover-user-header flex-box'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M2 12H14.88" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12.65 8.6499L16 11.9999L12.65 15.3499" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>


                                    <div className='flex-box width-max' onClick={logout}>
                                        <span>خروج از حساب</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div id="hover-user-header" className='hover-user-header hide-item'></div>
                <div id='exit-user-header' className='hide-item' onClick={menuhoverheader}></div>
            </div>
        )
    }

    var datanotif;
    var datanotifm;

    if(notifPr != undefined)
    {
        if(notifPr.data.length > 0)
        {
            datanotif = (
                <div className='show-hover-notif-header'>
                    <div id='box-show-notif-public' className='public'>
                        {notifPr.data.map((item)=> 
                            <div className='item-hover-notif-header' key={Math.random()}>
                                <div dangerouslySetInnerHTML={{ __html: item.content}}>

                                </div>

                                <div className='flex-box flex-left'>
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div id='box-show-notif-private' className='private hide-item'>
                        {DataUser != undefined && 
                            DataUser.data.user_data.notifications.map((item)=> 
                                <div className='item-hover-notif-header' key={Math.random()}>
                                    <div dangerouslySetInnerHTML={{ __html: item.content}}>

                                    </div>

                                    <div className='flex-box flex-left'>
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            )

            datanotifm = (
                <div className='show-hover-notif-header'>
                    <div id='box-show-notif-public-m' className='public'>
                        {notifPr.data.map((item)=> 
                            <div className='item-hover-notif-header' key={Math.random()}>
                                <div dangerouslySetInnerHTML={{ __html: item.content}}>

                                </div>

                                <div className='flex-box flex-left'>
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div id='box-show-notif-private-m' className='private hide-item'>
                        {DataUser != undefined && 
                            DataUser.data.user_data.notifications.map((item)=> 
                                <div className='item-hover-notif-header' key={Math.random()}>
                                    <div dangerouslySetInnerHTML={{ __html: item.content}}>

                                    </div>

                                    <div className='flex-box flex-left'>
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            )
        }
    }


    const cheangeBoxNotif = (item) => {
        if(item === "privet")
        {
            document.getElementById("private-nav-notif-modal").classList.add("active");
            document.getElementById("public-nav-notif-modal").classList.remove("active");
            document.getElementById("box-show-notif-public").classList.add("hide-item");
            document.getElementById("box-show-notif-private").classList.remove("hide-item");
        }else{
            document.getElementById("private-nav-notif-modal").classList.remove("active");
            document.getElementById("public-nav-notif-modal").classList.add("active");
            document.getElementById("box-show-notif-public").classList.remove("hide-item");
            document.getElementById("box-show-notif-private").classList.add("hide-item");
        }
    }


    const cheangeBoxNotifMo = (item) => {
        if(item === "privet")
        {
            document.getElementById("private-nav-notif-modal-m").classList.add("active");
            document.getElementById("public-nav-notif-modal-m").classList.remove("active");
            document.getElementById("box-show-notif-public-m").classList.add("hide-item");
            document.getElementById("box-show-notif-private-m").classList.remove("hide-item");
        }else{
            document.getElementById("private-nav-notif-modal-m").classList.remove("active");
            document.getElementById("public-nav-notif-modal-m").classList.add("active");
            document.getElementById("box-show-notif-public-m").classList.remove("hide-item");
            document.getElementById("box-show-notif-private-m").classList.add("hide-item");
        }
    }

    var styleNotifBox = " hide-item";

    if(DataHeaderAL != undefined && DataHeaderAL != "" && document.getElementById("tp-alert") != undefined)
    {
        document.getElementById("root").style.paddingTop = document.getElementById("tp-alert")?.offsetHeight + "px";
        styleNotifBox = "";
    }else{
        document.getElementById("root").style.paddingTop = 0 + "px";
        styleNotifBox = " hide-item";
    }

    return (
        <>
            <div className='show-box-header'>
                <div className='box-header' style={{padding: styleH.style}}>
                    <div id='tp-alert' className={`alert tp-alert` + styleNotifBox}>
                        <p className="tp-alert__message">{DataHeader?.notification}</p>
                        <button className="tp-alert__action" onClick={(e) => {
                            document.getElementById("tp-alert").remove();
                            document.getElementById("root").style.paddingTop = 0 + "px";
                        }}>بستن اعلان</button>
                    </div>

                    <div className='flex-box flex-justify-space'>
                        <Link to='/' id='logo-header'>
                            <img src={Logo}></img>
                        </Link>

                        <div className='flex-box'>
                            <div className='flex-box box-icons-header'>
                                <div className='flex-box'>
                                    <Link to={"/bookmarks"} className='flex-box'>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.25 9.05005C11.03 9.70005 12.97 9.70005 14.75 9.05005" stroke="#7007FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z" stroke="#7007FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z" stroke="#7007FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </Link>

                                    <span></span>
                                </div>
                                
                                <div className='flex-box'>
                                    <Link to={"/chats"} className='flex-box'>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z" stroke="#7007FA" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15.9965 11H16.0054" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M11.9955 11H12.0045" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M7.99451 11H8.00349" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </Link>
                                </div>
                                
                                <div className='flex-box'>
                                    <a className='flex-box' onClick={notifhoverheaders}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.02 2.90991C8.70997 2.90991 6.01997 5.59991 6.01997 8.90991V11.7999C6.01997 12.4099 5.75997 13.3399 5.44997 13.8599L4.29997 15.7699C3.58997 16.9499 4.07997 18.2599 5.37997 18.6999C9.68997 20.1399 14.34 20.1399 18.65 18.6999C19.86 18.2999 20.39 16.8699 19.73 15.7699L18.58 13.8599C18.28 13.3399 18.02 12.4099 18.02 11.7999V8.90991C18.02 5.60991 15.32 2.90991 12.02 2.90991Z" stroke="#7007FA" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
                                        <path d="M13.87 3.19994C13.56 3.10994 13.24 3.03994 12.91 2.99994C11.95 2.87994 11.03 2.94994 10.17 3.19994C10.46 2.45994 11.18 1.93994 12.02 1.93994C12.86 1.93994 13.58 2.45994 13.87 3.19994Z" stroke="#7007FA" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke="#7007FA" strokeWidth="1.5" strokeMiterlimit="10"/>
                                        </svg>
                                    </a>
                                    
                                    <a className='flex-box' onClick={notifmodShow}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.02 2.90991C8.70997 2.90991 6.01997 5.59991 6.01997 8.90991V11.7999C6.01997 12.4099 5.75997 13.3399 5.44997 13.8599L4.29997 15.7699C3.58997 16.9499 4.07997 18.2599 5.37997 18.6999C9.68997 20.1399 14.34 20.1399 18.65 18.6999C19.86 18.2999 20.39 16.8699 19.73 15.7699L18.58 13.8599C18.28 13.3399 18.02 12.4099 18.02 11.7999V8.90991C18.02 5.60991 15.32 2.90991 12.02 2.90991Z" stroke="#7007FA" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
                                        <path d="M13.87 3.19994C13.56 3.10994 13.24 3.03994 12.91 2.99994C11.95 2.87994 11.03 2.94994 10.17 3.19994C10.46 2.45994 11.18 1.93994 12.02 1.93994C12.86 1.93994 13.58 2.45994 13.87 3.19994Z" stroke="#7007FA" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke="#7007FA" strokeWidth="1.5" strokeMiterlimit="10"/>
                                        </svg>
                                    </a>

                                    <span></span>

                                    <div id='box-hover-notif-header' className='box-hover-notif-header hide-item'>
                                        <div className='navbar flex-box'>
                                            <div id='public-nav-notif-modal' className='active flex-box' onClick={(e) => cheangeBoxNotif("public")}>
                                                <span>اطلاعیه عمومی</span>
                                            </div>

                                            <div id='private-nav-notif-modal' className='flex-box' onClick={(e) => cheangeBoxNotif("privet")}>
                                                <span>اطلاعیه شخصی</span>
                                            </div>
                                        </div>
                                        
                                        {datanotif}
                                    </div>

                                    <div id='hover-notif-header' className='hover-notif-header hide-item'></div>

                                    <div id='exit-notif-header' className='hide-item' onClick={notifhoverheaders}></div>
                                </div>
                                
                                {DataIconLogin}
                            </div>

                            <div className='box-number-header flex-box flex-left'>
                                <a href={'tel:' + Tel}>{Tel}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* moals ............... */}
            <Modal className='modal-filter-home' show={notifmod} onHide={notifmodClose}>
                <Modal.Header  className='modal-header-filter-mo width-max flex-box flex-justify-space' closeButton>
                    <Modal.Title>اعلان ها</Modal.Title>
                </Modal.Header>
                <Modal.Body className='box-hover-notif-header-m'>
                    <div className='navbar flex-box'>
                        <div id='public-nav-notif-modal-m' className='active flex-box' onClick={(e) => cheangeBoxNotifMo("public")}>
                            <span>اطلاعیه عمومی</span>
                        </div>

                        <div id='private-nav-notif-modal-m' className='flex-box' onClick={(e) => cheangeBoxNotifMo("privet")}>
                            <span>اطلاعیه شخصی</span>
                        </div>
                    </div>
                    {datanotifm}
                </Modal.Body>
            </Modal>

            <div className='box-navbar-mobile' style={{display: styleH.hide}}>
                <div className='show-navbar-mobile flex-box width-max'>
                    <Link to={"/Dashboard/Order"} className='item-navbar-mobile flex-box flex-column'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 13H13" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 17H11" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        <span>آگهی</span>
                    </Link>

                    <a className='item-navbar-mobile flex-box flex-column'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        <span>دسته بندی</span>
                    </a>

                    <Link to={"/Order/add"} className='item-navbar-mobile flex-box flex-column'>
                        <div className='icon-add-order-mobile flex-box'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12H16" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 16V8" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>

                        <span>ثبت آگهی</span>
                    </Link>

                    <Link to={"/chats"} className='item-navbar-mobile flex-box flex-column'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z" stroke="#808191" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.9965 11H16.0054" stroke="#808191" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.9955 11H12.0045" stroke="#808191" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.99451 11H8.00349" stroke="#808191" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        <span>چت</span>
                    </Link>

                    <Link to='/dashboard' className='item-navbar-mobile flex-box flex-column'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z" stroke="#808191" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z" stroke="#808191" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        <span>پروفایل</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Header;