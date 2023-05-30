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
        iconuser = <img src={DataUser.data.user_data.user.profile_image} />;
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
                                <Link to={"/Dashboard/support"}>پشتیبانی</Link>
                            </li>

                            <li>
                                <Link to={"/Rules"}>قوانین</Link>
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
        </>
    );
};

export default Sidbar;