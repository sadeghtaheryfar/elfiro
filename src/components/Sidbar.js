import React from 'react';
import { useState,useEffect } from 'react';
import LogoUser from './../imags/logo-user.png';
import { Link } from 'react-router-dom';
import SliderRange from './SliderRange';


const Sidbar = () => {
    const [DataSidbar, SetDataSidbar] = useState();
    const [DataUser, SetDataUser] = useState();
    const usertoken = localStorage.getItem("user-login");

    useEffect(() => {
        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
        fetch('https://server.elfiro.com/api/v1/basic/sidebar', options)
            .then(response => response.json())
            .then(result => SetDataSidbar(result.data.sidebar))
    },[])

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

    var CategorySidbar;
    var contactlinks;
    

    if(DataSidbar != undefined)
    {
        CategorySidbar = (
            <div>
                {DataSidbar.categories.map((item)=> 
                    <div className='item-category-sidbar flex-box' key={item.id}>
                        <div>
                            <img src={item.logo}></img>
                        </div>

                        <div>
                            <span>{item.title}</span>
                        </div>
                    </div>
                )}
            </div>
        );

        contactlinks = (
            <div className='flex-box box-contact-sidbar flex-wrap flex-right'>
                {DataSidbar.contact_links.map((item)=> 
                    <div className='item-contact-sidbar' key={Math.random()}>
                        <div className='show-item-contact-sidbar flex-box'>
                            <a className='flex-box' href={item.link} target="_blank">
                                <img src={item.img} />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const detalistheadermenu = document.getElementsByClassName("detalist-header-menu");
    const svgboxheadermenu = document.getElementsByClassName("svg-box-header-menu");

    const chengedrapdownsidbar = (event,index) =>{
        detalistheadermenu[index].classList.toggle("hide-item");
        svgboxheadermenu[index].classList.toggle("rotate-filter-menu-item");
    }

    var UserLogoSidebar;

    if(DataUser == undefined)
    {
        UserLogoSidebar = (
            <div>
                <div className='box-user-logo-sidbar'>
                    <img src={LogoUser} />
                </div>

                <div className='box-login-sidbar'>
                    <Link className='flex-box' to={"/login"}>
                        <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.3821 5.38874C11.3821 3.35121 9.73096 1.69922 7.69343 1.69922C5.65589 1.69922 4.00391 3.35121 4.00391 5.38874C4.00391 7.42627 5.65589 9.07744 7.69343 9.07744C9.73096 9.07744 11.3821 7.42627 11.3821 5.38874Z" stroke="#808191" strokeWidth="2"/>
                            <path d="M13.1736 14.3131C13.1736 15.497 10.6572 16.4563 7.5522 16.4563C4.44884 16.4563 1.93164 15.497 1.93164 14.3131C1.93164 13.1292 4.44884 12.1699 7.5522 12.1699C10.6572 12.1699 13.1736 13.1292 13.1736 14.3131Z" stroke="#808191" strokeWidth="2"/>
                        </svg>

                        <span>ورود/ثبت نام</span>
                    </Link>
                </div>
            </div>
        );
    }else{
        var iconuser;
        if(DataUser.data.user_data.user.profile_image === "http://server.elfiro.com/")
        {
            iconuser = <img src={LogoUser} />;
        }else{
            iconuser = <img src={DataUser.data.user_data.user.profile_image} />;
        }
        UserLogoSidebar = (
            <div>
                <div className='box-user-logo-sidbar'>
                    {iconuser}
                </div>

                <div className='box-login-sidbar'>
                    <Link className='flex-box' to={"/dashboard"}>
                        <span style={{"margin" : "0px"}}>{DataUser.data.user_data.user.user_name}</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className='show-box-sidbar'>
                <div className='box-sidbar flex-box flex-column flex-right'>
                    {UserLogoSidebar}

                    <div className='header-category-sidbar flex-box'>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.8157 9.22769H14.3981C12.7962 9.22769 11.4941 7.92352 11.4941 6.32263V2.90503C11.4941 1.3031 12.7962 0 14.3981 0H17.8157C19.4177 0 20.7208 1.3031 20.7208 2.90503V6.32263C20.7208 7.92352 19.4177 9.22769 17.8157 9.22769ZM14.3981 2.07501C13.9406 2.07501 13.5692 2.44748 13.5692 2.90503V6.32263C13.5692 6.78018 13.9406 7.15265 14.3981 7.15265H17.8157C18.2733 7.15265 18.6458 6.78018 18.6458 6.32263V2.90503C18.6458 2.44748 18.2733 2.07501 17.8157 2.07501H14.3981Z" fill="#7007FA"/>
                            <path d="M6.60196 9.22769H3.18436C1.58243 9.22769 0.279297 7.92352 0.279297 6.32263V2.90503C0.279297 1.3031 1.58243 0 3.18436 0H6.60196C8.20389 0 9.50601 1.3031 9.50601 2.90503V6.32263C9.50601 7.92352 8.20389 9.22769 6.60196 9.22769ZM3.18436 2.07501C2.72681 2.07501 2.35434 2.44748 2.35434 2.90503V6.32263C2.35434 6.78018 2.72681 7.15265 3.18436 7.15265H6.60196C7.05951 7.15265 7.43097 6.78018 7.43097 6.32263V2.90503C7.43097 2.44748 7.05951 2.07501 6.60196 2.07501H3.18436Z" fill="#7007FA"/>
                            <path d="M17.8157 19.9552H14.3981C12.7962 19.9552 11.4941 18.6521 11.4941 17.0501V13.6326C11.4941 12.0306 12.7962 10.7285 14.3981 10.7285H17.8157C19.4177 10.7285 20.7208 12.0306 20.7208 13.6326V17.0501C20.7208 18.6521 19.4177 19.9552 17.8157 19.9552ZM14.3981 12.8036C13.9406 12.8036 13.5692 13.175 13.5692 13.6326V17.0501C13.5692 17.5077 13.9406 17.8801 14.3981 17.8801H17.8157C18.2733 17.8801 18.6458 17.5077 18.6458 17.0501V13.6326C18.6458 13.175 18.2733 12.8036 17.8157 12.8036H14.3981Z" fill="#7007FA"/>
                            <path d="M6.60196 19.9552H3.18436C1.58243 19.9552 0.279297 18.6521 0.279297 17.0501V13.6326C0.279297 12.0306 1.58243 10.7285 3.18436 10.7285H6.60196C8.20389 10.7285 9.50601 12.0306 9.50601 13.6326V17.0501C9.50601 18.6521 8.20389 19.9552 6.60196 19.9552ZM3.18436 12.8036C2.72681 12.8036 2.35434 13.175 2.35434 13.6326V17.0501C2.35434 17.5077 2.72681 17.8801 3.18436 17.8801H6.60196C7.05951 17.8801 7.43097 17.5077 7.43097 17.0501V13.6326C7.43097 13.175 7.05951 12.8036 6.60196 12.8036H3.18436Z" fill="#7007FA"/>
                        </svg>

                        <span>دسته بندی  محصولات</span>
                    </div>

                    <div className='box-item-category-sidbar'>
                        {CategorySidbar}
                    </div>

                    <div className='box-filter-menu-sidbar width-max'>
                        <div className='item-filter-menu-sidbar'>
                            <div className='box-header-menu width-max flex-box flex-right' onClick={event => chengedrapdownsidbar(event, 0)}>
                                <svg className='svg-box-header-menu' width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L7 7L13 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                                <span>بتل پس</span>
                            </div>

                            <div className='detalist-header-menu width-max flex-box hide-item flex-justify-space'>
                                <span>کالاهای موجود</span>

                                <div>
                                    <label className="toggle" htmlFor="myToggle">
                                        <input className="toggle__input" name="" type="checkbox" id="myToggle"/>
                                        <div className="toggle__fill"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='item-filter-menu-sidbar'>
                            <div className='box-header-menu width-max flex-box flex-right' onClick={event => chengedrapdownsidbar(event, 1)}>
                                <svg className='svg-box-header-menu' width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L7 7L13 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                                <span>محدوده قیمت</span>
                            </div>

                            <div className='detalist-header-menu width-max flex-box hide-item'>
                                <SliderRange />
                            </div>
                        </div>
                    </div>

                    <div className='box-ul-sidbar'>
                        <ul className="flex-box flex-wrap">
                            <li>
                                <Link>پشتیبانی</Link>
                            </li>

                            <li>
                                <Link>قوانین</Link>
                            </li>

                            <li>
                                <Link>ارتباط با ما</Link>
                            </li>

                            <li>
                                <Link>سوالات متداول</Link>
                            </li>

                            <li>
                                <Link>درباره ما</Link>
                            </li>
                        </ul>
                    </div>

                    {contactlinks}

                    <div className='margin-sidbar'></div>
                </div>
            </div>

            <div className='box-navbar-mobile'>
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

                    <a className='item-navbar-mobile flex-box flex-column'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12H16" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16V8" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        <span>ثبت آگهی</span>
                    </a>

                    <a className='item-navbar-mobile flex-box flex-column'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z" stroke="#808191" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.9965 11H16.0054" stroke="#808191" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.9955 11H12.0045" stroke="#808191" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.99451 11H8.00349" stroke="#808191" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        <span>چت</span>
                    </a>

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

export default Sidbar;