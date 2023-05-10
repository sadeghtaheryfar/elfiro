import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';

const DashOrderAccepted = () => {
    const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
    const usertoken = localStorage.getItem("user-login");
    const [userdata, setuserdata] = useState()
    useEffect(() => {
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
                            window.location = "/Login";
                        }else{
                            setuserdata(response);
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

    var sidbardashboard;

    if(userdata != undefined)
    {
        sidbardashboard = (
            <div id='sidbar-dashboard'>
                <div className='show-sidbar-dashboard flex-box flex-column'>
                    <div className='logo-sidbar-dashboard'>
                        <img src={userdata.data.user_data.user.profile_image} />
                    </div>

                    <div className='name-sidbar-dashboard'>
                        <span>{userdata.data.user_data.user.name}</span>
                    </div>

                    <Link to={"/Order/add"} className='ad-sidbar-dashboard flex-box'>
                        <div className='flex-box'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                            <g id="Group_530" data-name="Group 530" transform="translate(-1473.118 -172.217)">
                                <path id="Path_1181" data-name="Path 1181" d="M1481.762,173.217v10" transform="translate(-2.644)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2"/>
                                <path id="Path_1182" data-name="Path 1182" d="M0,0V10" transform="translate(1484.118 178.217) rotate(90)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2"/>
                            </g>
                            </svg>

                            <span>ثبت آگهی</span>
                        </div>
                    </Link>

                    <div className='menu-sidbar-dashboard'>
                        <ul>
                            <li>
                                <Link className='item-menu-sidbar-dashboard flex-box flex-right' to={"/dashboard"}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <span>داشبورد</span>
                                </Link>
                            </li>
                            
                            <li>
                                <Link className='item-menu-sidbar-dashboard active-item-menu-sidbar-dashboard flex-box flex-right' to={"/Dashboard/Order"}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M7 13H13" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M7 17H11" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>

                                    <span>آگهی ها</span>
                                </Link>
                            </li>
                            
                            <li>
                                <Link className='item-menu-sidbar-dashboard flex-box flex-right' to={"/Dashboard/Transaction"}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5.56006H22" stroke="#808191" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14.22 2H19.78C21.56 2 22 2.44 22 4.2V8.31C22 10.07 21.56 10.51 19.78 10.51H14.22C12.44 10.51 12 10.07 12 8.31V4.2C12 2.44 12.44 2 14.22 2Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 17.0601H12" stroke="#808191" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M4.22 13.5H9.78C11.56 13.5 12 13.94 12 15.7V19.81C12 21.57 11.56 22.01 9.78 22.01H4.22C2.44 22.01 2 21.57 2 19.81V15.7C2 13.94 2.44 13.5 4.22 13.5Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 9C2 5.13 5.13 2 9 2L7.95001 3.75" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <span>معاملات</span>
                                </Link>
                            </li>
                            
                            <li>
                                <Link className='item-menu-sidbar-dashboard flex-box flex-right' to={"/Dashboard/Account"}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7 12H14" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <span>حسابداری</span>
                                </Link>
                            </li>
                            
                            <li>
                                <Link className='item-menu-sidbar-dashboard flex-box flex-right'  to={"/Dashboard/Profile"}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z" stroke="#808191" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z" stroke="#808191" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <span>پروفایل</span>
                                </Link>
                            </li>
                            
                            <li>
                                <Link className='item-menu-sidbar-dashboard flex-box flex-right'  to={"/Dashboard/support"}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5H7" stroke="#808191" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" stroke="#808191" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 16.5H8" stroke="#808191" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 12.5H5" stroke="#808191" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <span>پشتیبانی</span>
                                </Link>
                            </li>
                            
                            <li>
                                <Link onClick={() => {localStorage.removeItem("user-login");window.location = "/";}} className='item-menu-sidbar-dashboard last-item-menu-sidbar-dashboard flex-box flex-right'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 12H14.88" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12.65 8.6499L16 11.9999L12.65 15.3499" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <span>خروج از حساب</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Header style="1rem 2rem" />

            <section id='main-dashboard' className='flex-box flex-justify-space flex-aling-right'>
                {sidbardashboard}

                <section id='detalist-dashboard' className='width-max flex-box flex-column'>
                    <div className='header-detalist-order-dashboard width-max'>
                        <div>
                            <span>آگهی ها</span>
                        </div>

                        <div className='nav-detalist-order-dashboard flex-box flex-right'>
                            <Link to={"/Dashboard/Order"}>
                                <span>همه آگهی ها</span>
                            </Link>

                            <Link className='active' to={"/Dashboard/Order/Accepted"}>
                                <span>تایید شده</span>
                            </Link>

                            <Link to={"/Dashboard/Order/Coming"}>
                                <span>در انتظار تایید</span>
                            </Link>

                            <Link to={"/Dashboard/Order/Failed"}>
                                <span>رد شده</span>
                            </Link>

                            <Link to={"/Dashboard/Order/Sold"}>
                                <span>فروخته شده</span>
                            </Link>
                        </div>
                    </div>

                    <div className='flex-box flex-aling-right flex-wrap flex-right width-max'>
                        <div className='box-item-order-dashboard'>
                            <div className='show-item-order-dashboard flex-box flex-column'>
                                <div className='img-item-order-dashboard'>
                                    <img src='http://server.elfiro.com/storage/orders/1663731840-1619816463993.jpg' />
                                </div>

                                <div className='title-item-order-dashboard'>
                                    <span>اکانت فورتنایت از سیزن دو اکانت فورتنایت از سیزن دو  </span>
                                </div>

                                <div className='btn-item-order-dashboard flex-box flex-justify-space width-max'>
                                    <Link className='flex-box'>ویرایش</Link>

                                    <button className='flex-box'>
                                        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.34586 8.53706L0.682638 4.87383C0.462558 4.65375 0.462558 4.29692 0.682638 4.07682L1.47963 3.2798C1.69971 3.0597 2.05657 3.0597 2.27665 3.2798L4.74437 5.7475L10.03 0.461935C10.25 0.241855 10.6069 0.241855 10.827 0.461935L11.624 1.25895C11.844 1.47903 11.844 1.83586 11.624 2.05597L5.14288 8.53708C4.92278 8.75716 4.56594 8.75716 4.34586 8.53706Z" fill="#0DD400"/>
                                        </svg>

                                        <span>فروخته شد</span>
                                    </button>

                                    <button className='flex-box'>حذف</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
};

export default DashOrderAccepted;