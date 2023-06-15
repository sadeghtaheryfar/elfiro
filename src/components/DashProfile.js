import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { useState,useEffect,useRef } from 'react';

const DashProfile = () => {
    const usertoken = localStorage.getItem("user-login");
    const userName = localStorage.getItem("user-name");
    const userImage = localStorage.getItem("user-profile");
    const [userdata, setuserdata] = useState()
    const [userdatas, setuserdatas] = useState()
    const [imageprofile, setimageprofile] = useState();
    const [descriptionprofile, setdescriptionprofile] = useState();
    const [emailprofile, setemailprofile] = useState();
    const [usernameprofile, setusernameprofile] = useState();
    const [nameprofile, setnameprofile] = useState();
    const [passprofile, setpassprofile] = useState();
    const [province, setprovince] = useState("Tehran");
    const [city, setcity] = useState("Tehran");

    useEffect(() => {
        window.addEventListener('resize', setWindow);
        if(window.innerWidth < 1024)
        {
            window.location = "/Dashboard";
        }
    }, [])
    
    const setWindow = () => {
        if(window.innerWidth < 1024)
        {
            window.location = "/Dashboard";
        }
    }

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
                            setuserdata(response.data.user_data.user);
                            setdescriptionprofile(response.data.user_data.user.description);
                            setemailprofile(response.data.user_data.user.email);
                            setusernameprofile(response.data.user_data.user.user_name);
                            setnameprofile(response.data.user_data.user.name);
                            // setcity(response.data.user_data.user.city);
                            // setprovince(response.data.user_data.user.province);
                            localStorage.setItem('user-name', response.data.user_data.user.name);
                            localStorage.setItem('user-profile', response.data.user_data.user.profile_image);
                        }
                    })
                    .catch(err => {
                        window.location = "/Login"
                    });

                fetch('https://server.elfiro.com/api/v1/client/profile', options)
                    .then(response => response.json())
                    .then(response => setuserdatas(response.data.details))
                    .catch(err => console.log(err));
            }else{
                window.location = "/Login";
            }
        }else{
            window.location = "/Login";
        }
    }, [])

    var sidbardashboard;

    if(userName != undefined)
    {
        sidbardashboard = (
            <div id='sidbar-dashboard'>
                <div className='show-sidbar-dashboard flex-box flex-column'>
                    <div className='logo-sidbar-dashboard'>
                        <img src={userImage} />
                    </div>

                    <div className='name-sidbar-dashboard'>
                        <span>{userName}</span>
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
                                <Link className='item-menu-sidbar-dashboard flex-box flex-right' to={"/Dashboard/Order"}>
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
                                <Link className='item-menu-sidbar-dashboard flex-box flex-right' to={"/Dashboard/Cards"}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 8.50488H22" stroke="#808191" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 16.5049H8" stroke="#808191" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10.5 16.5049H14.5" stroke="#808191" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6.44 3.50488H17.55C21.11 3.50488 22 4.38488 22 7.89488V16.1049C22 19.6149 21.11 20.4949 17.56 20.4949H6.44C2.89 20.5049 2 19.6249 2 16.1149V7.89488C2 4.38488 2.89 3.50488 6.44 3.50488Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <span>کارت ها</span>
                                </Link>
                            </li>
                            
                            <li>
                                <Link className='item-menu-sidbar-dashboard active-item-menu-sidbar-dashboard flex-box flex-right'  to={"/Dashboard/Profile"}>
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

    console.log(userdata);

    var dataprofile;

    const imageprofiler = useRef();

    const chengeimage = (e) => {
        setimageprofile(e);
    }

    var dataprovince;

    if(userdatas != undefined && userdatas.provinces != undefined && userdatas.cities != undefined)
    {
        const formattedProvinces = Object.keys(userdatas.provinces).map((item) => ({
            value : item,
            label : userdatas.provinces[item],
        }))

        const formattedCitis = Object.keys(userdatas.cities[province])?.map((item) => ({
            value : item,
            label : userdatas.cities[province][item],
        }))

        if(formattedProvinces != undefined)
        {
            dataprovince = (
                <div className='flex-box width-max'>
                    <div className='item-profile-edit flex-box flex-column'>
                        <div className='err-tiket-add'>
                            <span id='errprovince' className='err-tiket-add'></span>
                        </div>
                        
                        <label htmlFor="province">استان</label>

                        <select defaultValue={province} onChange={(e) => setprovince(e.target.value)}>
                            {formattedProvinces.map((item) => (
                                <option key={item?.value} value={item?.value}>
                                    {item?.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='margin-horizontal-1'></div>

                    <div className='item-profile-edit flex-box flex-column'>
                        <div className='err-tiket-add'>
                            <span id='errcity' className='err-tiket-add'></span>
                        </div>
                        
                        <label htmlFor="city">شهر</label>

                        <select defaultValue={city} onChange={(e) => setcity(e.target.value)}>
                            {formattedCitis.map((item) => (
                                <option key={item?.value} value={item?.value}>
                                    {item?.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )
        }
    }

    const onSend = async () => {
        const formData = new FormData();
        formData.append('name', nameprofile);
        formData.append('user_name', usernameprofile);
        formData.append('email', emailprofile);
        formData.append('description', descriptionprofile);
        formData.append('province', province);
        formData.append('city', city);
        if(imageprofile != undefined)
        {
            formData.append('profile_image', imageprofile);
        } 
        
        if(passprofile != undefined)
        {
            formData.append('password', passprofile);
        }

        fetch('https://server.elfiro.com/api/v1/client/profile', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `${usertoken}`,
            },
        })
            .then((res) => res.json())
            .then((res) => 
            {
                if(res.status === "success")
                {
                    document.getElementById("sucsess-tiket-add").innerHTML = res.data.message.profile;
                    document.getElementById("errname").innerHTML = "";
                    document.getElementById("errusername").innerHTML = "";
                    document.getElementById("errpassword").innerHTML = "";
                    document.getElementById("errdescription").innerHTML = "";
                    document.getElementById("errimage").innerHTML = "";
                    document.getElementById("errprovince").innerHTML = "";
                    document.getElementById("errcity").innerHTML = "";
                }else{
                    if(res.data.message.name != undefined)
                    {
                        document.getElementById("errname").innerHTML = res.data.message.name;
                    }
                    
                    if(res.data.message.user_name != undefined)
                    {
                        document.getElementById("errusername").innerHTML = res.data.message.user_name;
                    }
                    
                    if(res.data.message.email != undefined)
                    {
                        document.getElementById("erremail").innerHTML = res.data.message.email;
                    }
                    
                    if(res.data.message.password != undefined)
                    {
                        document.getElementById("errpassword").innerHTML = res.data.message.password;
                    }
                    
                    if(res.data.message.description != undefined)
                    {
                        document.getElementById("errdescription").innerHTML = res.data.message.description;
                    }
                    
                    if(res.data.message.profile_image != undefined)
                    {
                        document.getElementById("errimage").innerHTML = res.data.message.profile_image;
                    }
                    
                    if(res.data.message.province != undefined)
                    {
                        document.getElementById("errprovince").innerHTML = res.data.message.province;
                    }
                    
                    if(res.data.message.city != undefined)
                    {
                        document.getElementById("errcity").innerHTML = res.data.message.city;
                    }
                }
            })
            .catch((error) => console.error(error))
    };
    

    if(userdata != undefined && userdatas != undefined)
    {
        dataprofile = (
            <div className='box-profile-edit flex-box flex-column'>
                <div className='flex-box width-max'>
                    <div className='err-tiket-add'>
                        <span id='errpimage' className='err-tiket-add'></span>
                    </div>

                    <button className='btn-upload-profile' onClick={() => imageprofiler.current?.click()}>
                        <img src={userdata.profile_image} />

                        <div className='flex-box'>
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.48802 2.02441H6.10501C3.28502 2.02441 0.999023 4.31042 0.999023 7.13144V14.4074C0.999023 17.2274 3.28502 19.5144 6.10501 19.5144H13.382C16.202 19.5144 18.488 17.2274 18.488 14.4074V10.5564" stroke="#161615" strokeWidth="2"/>
                                <path d="M6.61106 9.93359L5.96805 13.9376C5.93006 14.1776 6.12905 14.3896 6.37105 14.3656L10.629 13.9516L18.8461 5.73459C19.1531 5.42758 19.1531 4.92957 18.8461 4.62259L15.9401 1.71658C15.633 1.40958 15.135 1.40958 14.8281 1.71658L6.61106 9.93359Z" stroke="#161615" strokeWidth="2"/>
                                <line x1="13.4508" y1="2.76457" x2="17.4242" y2="6.73798" stroke="#161615" strokeWidth="2"/>
                            </svg>


                            <span>برای آپلود کن</span>
                        </div>
                    </button>

                    <input ref={imageprofiler} onChange={(e) => chengeimage(e.target.files[0])} type='file' hidden />
                </div>

                <div className='item-profile-edit flex-box flex-column width-max'>
                    <div className='err-tiket-add'>
                        <span id='errdescription' className='err-tiket-add'></span>
                    </div>

                    <label htmlFor="biography">بیوگرافی</label>

                    <textarea id='biography' defaultValue={userdata.description} onChange={(e) => setdescriptionprofile(e)}></textarea>
                </div>

                <div className='flex-box width-max'>
                    <div className='item-profile-edit flex-box flex-column'>
                        <div className='err-tiket-add'>
                            <span id='errname' className='err-tiket-add'></span>
                        </div>
                    
                        <label htmlFor="name">نام</label>

                        <input defaultValue={userdata.name} type='text' id='name' onChange={(e) => setnameprofile(e)} />
                    </div>

                    <div className='margin-horizontal-1'></div>

                    <div className='item-profile-edit flex-box flex-column'>
                        <div className='err-tiket-add'>
                            <span id='errusername' className='err-tiket-add'></span>
                        </div>
                        
                        <label htmlFor="username">نام  کاربری</label>

                        <input defaultValue={userdata.user_name} type='text' id='username' onChange={(e) => setusernameprofile(e)} />
                    </div>
                </div>

                <div className='flex-box width-max'>
                    <div className='item-profile-edit flex-box flex-column'>
                        <div className='err-tiket-add'>
                            <span id='errpassword' className='err-tiket-add'></span>
                        </div>

                        <label htmlFor="password">رمز عبور</label>

                        <input type='text' id='password' onChange={(e) => setpassprofile(e.target.value)} />
                    </div>

                    <div className='margin-horizontal-1'></div>

                    <div className='item-profile-edit flex-box flex-column'>
                        <div className='err-tiket-add'>
                            <span id='erremail' className='err-tiket-add'></span>
                        </div>
                        
                        <label htmlFor="email">ایمیل</label>

                        <input defaultValue={userdata.email} type='text' id='email' onChange={(e) => setemailprofile(e)}/>
                    </div>
                </div>

                {dataprovince}

                <div className='item-profile-edit width-max flex-box flex-right'>
                    <button onClick={onSend}>ثبت تغییرات</button>
                </div>

                <div className='flex-box flex-column'>
                    <span id='status-tiket-add'></span>
                    <span id='sucsess-tiket-add'></span>
                </div>
            </div>
        )
    }

    var dataauthenticated;

    if(userdata != undefined)
    {
        if(userdata.status === "confirmed")
        {
            dataauthenticated = (
                <Link className='authenticated-profile-dashboard flex-box'>
                    <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.90198 4.6073C1.35397 4.85129 1.00098 5.39429 1.00098 5.99329V11.7103C1.00098 15.7993 8.40598 19.1143 8.40598 19.1143C8.40598 19.1143 15.81 15.7993 15.81 11.7103V5.81928C15.81 5.21127 15.447 4.66129 14.888 4.42328L9.34497 2.06128C8.78598 1.82428 8.15396 1.82828 7.59998 2.07529L1.90198 4.6073Z" stroke="#0DD400" strokeWidth="2"/>
                    <path d="M12.4054 7.79492L8.32028 11.9651L5.76709 10.263" stroke="#0DD400" strokeWidth="2"/>
                    </svg>

                    <span>احراز هویت شده</span>
                </Link>
            )
        }

        if(userdata.status === "new" || userdata.status === "not_confirmed")
        {
            dataauthenticated = (
                <Link to={"/Dashboard/Profile/Authentication"} className='not-authenticated-profile-dashboard flex-box'>
                    <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.901 4.1068C1.353 4.34981 1 4.89281 1 5.49278V11.2088C1 15.2988 8.40399 18.6138 8.40399 18.6138C8.40399 18.6138 15.808 15.2988 15.808 11.2088V5.3178C15.808 4.70979 15.445 4.16081 14.886 3.92281L9.34299 1.56081C8.785 1.3228 8.15298 1.32781 7.59799 1.57381L1.901 4.1068Z" stroke="#7007FA" strokeٌidth="2"/>
                    <path d="M11.3905 6.26193C11.3905 4.67356 10.1033 3.38574 8.5149 3.38574C6.92651 3.38574 5.63867 4.67356 5.63867 6.26193C5.63867 7.85029 6.92651 9.13747 8.5149 9.13747C10.1033 9.13747 11.3905 7.85029 11.3905 6.26193Z" fill="#7007FA"/>
                    <path d="M12.7853 13.2186C12.7853 14.1415 10.8236 14.8893 8.40308 14.8893C5.98381 14.8893 4.02148 14.1415 4.02148 13.2186C4.02148 12.2957 5.98381 11.5479 8.40308 11.5479C10.8236 11.5479 12.7853 12.2957 12.7853 13.2186Z" fill="#7007FA"/>
                    </svg>

                    <span>احراز هویت</span>
                </Link>
            )
        }
    }

    return (
        <>
            <Header style="1rem 2rem" />

            <section id='main-dashboard' className='flex-box flex-justify-space flex-aling-right'>
                {sidbardashboard}

                <section id='detalist-dashboard' className='width-max flex-box flex-column'>
                    <div className='header-detalist-order-dashboard flex-box flex-justify-space width-max'>
                        <div>
                            <span>پروفایل</span>
                        </div>

                        {dataauthenticated}
                    </div>

                    {dataprofile}
                </section>
            </section>
        </>
    );
};

export default DashProfile;