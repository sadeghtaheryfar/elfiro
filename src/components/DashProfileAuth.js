import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { useState,useEffect,useRef } from 'react';


const DashProfileAuth = () => {
    const usertoken = localStorage.getItem("user-login");
    const [userdata, setuserdata] = useState()
    const [userdatas, setuserdatas] = useState()
    const [imageprofile, setimageprofile] = useState();

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
                        }
                    })
                    .catch(err => {
                        window.location = "/Login"
                    });

                fetch('https://server.elfiro.com/api/v1/client/profile', options)
                    .then(response => response.json())
                    .then(response => setuserdatas(response.data.details))
                    .catch(err => console.log(err));

                fetch('https://server.elfiro.com/api/v1/client/auth', options)
                    .then(response => response.json())
                    .then(response => {
                        if(response.status === "error")
                        {
                            window.location = "/Dashboard/Profile"
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

    var sidbardashboard;

    if(userdata != undefined)
    {
        sidbardashboard = (
            <div id='sidbar-dashboard'>
                <div className='show-sidbar-dashboard flex-box flex-column'>
                    <div className='logo-sidbar-dashboard'>
                        <img src={userdata.profile_image} />
                    </div>

                    <div className='name-sidbar-dashboard'>
                        <span>{userdata.name}</span>
                    </div>

                    <div className='ad-sidbar-dashboard flex-box'>
                        <Link to={"/Order/add"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                            <g id="Group_530" data-name="Group 530" transform="translate(-1473.118 -172.217)">
                                <path id="Path_1181" data-name="Path 1181" d="M1481.762,173.217v10" transform="translate(-2.644)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2"/>
                                <path id="Path_1182" data-name="Path 1182" d="M0,0V10" transform="translate(1484.118 178.217) rotate(90)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2"/>
                            </g>
                            </svg>

                            <span>ثبت آگهی</span>
                        </Link>
                    </div>

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

    var dataprofile;

    const imageprofiler = useRef();

    const chengeimage = (e) => {
        setimageprofile(e);
    }

    const onSend = async () => {
        const formData = new FormData();
        formData.append('image', imageprofile);

        fetch('https://server.elfiro.com/api/v1/client/profile', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: 'Bearer 138|g73u5vgzwQAivpWF8jIzUELOC3HioutEV1etSBxc',
            },
        })
            .then((res) => res.json())
            .then((res) => 
            {
                if(res.status === "success")
                {
                    // document.getElementById("sucsess-tiket-add").innerHTML = res.data.message.profile;
                    console.log(res);
                }else{
                    if(res.data.message.profile_image != undefined)
                    {
                        // document.getElementById("errimage").innerHTML = res.data.message.profile_image;
                    }
                    console.log(res);
                }
            })
            .catch((error) => console.error(error))
    };
    

    if(userdata != undefined && userdatas != undefined)
    {
        dataprofile = (
            <div className='box-profile-edit box-profile-auth flex-box flex-column'>
                <div>
                    <span>مشتری گرامی، به منظور احراز هویت لطفا طبق نمونه زیر، یک عکس به صورت سلفی همراه با کارت بانکی و کارت ملی شخص پرداخت کننده بعلاوه متن مشخص شده در تصویر آپلود نمایید.</span>
                </div>

                <div>
                    <img src='http://server.elfiro.com/storage/photos/6206baafe335e.png' />
                </div>

                <div className='flex-box width-max'>
                    <div className='box-upload-btn' onClick={() => imageprofiler.current?.click()}>
                        <div className='show-upload-btn flex-box flex-column'>
                            <div>
                                <svg width="66" height="52" viewBox="0 0 66 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M56.5093 44.9292C54.611 45.7545 52.8226 46.1947 51.007 46.1947C49.0811 46.2223 47.1552 46.2223 45.2019 46.2223H41.3502V39.5919H45.477C47.0452 39.6194 48.6409 39.6194 50.209 39.5919C54.2533 39.5644 57.4172 37.1708 58.4351 33.2916C59.0128 31.1457 58.6277 28.8072 57.3896 26.8538C56.1791 24.928 54.2258 23.6074 52.0523 23.2223C50.1815 22.8921 49.0811 21.8192 48.6133 19.9759C47.2928 14.446 43.9639 10.6219 38.7641 8.61349C33.4543 6.60507 28.3371 7.26541 23.605 10.6219C20.3586 12.9328 18.2678 16.1517 17.4149 20.1685C17.2223 20.9663 17.1672 21.8192 17.1122 22.6996L17.0573 23.4149C16.8646 25.6158 15.6816 26.7438 13.4807 26.8814C13.2881 26.9089 13.0955 26.9364 12.9304 26.9364C9.73907 27.3216 7.37305 30.1278 7.37305 33.2366C7.37305 36.373 9.73907 39.1792 12.6553 39.4818C13.5908 39.5919 14.5261 39.5919 15.4615 39.5919C17.4149 39.6194 19.2582 39.6194 21.1015 39.5919H24.733V46.1121L23.4399 46.1947C23.1374 46.2223 22.9998 46.2223 22.8622 46.2223H13.2881C7.01538 46.1672 1.51306 41.2151 0.770203 34.9423L0.660156 34.4472L0.715149 31.5308C0.797668 31.2282 0.880249 30.9256 0.935242 30.623C1.12787 29.8526 1.32043 29.1098 1.62305 28.3945C3.2738 24.3502 6.27258 21.7642 10.5094 20.6637C10.9771 16.3993 12.5728 12.5477 15.269 9.19119C18.7905 4.81686 23.3574 2.09317 28.8048 1.07522C35.215 -0.107822 41.1301 1.24026 46.4399 5.09195C50.5392 8.09073 53.3179 12.1074 54.7209 17.0321C60.2233 18.5728 64.5152 23.6624 65.2305 29.4124C66.0284 35.9053 62.4518 42.288 56.5093 44.9292Z" fill="#7007FA"/>
                                <path d="M44.184 33.5116L39.3419 38.3812L36.3982 35.4375V51.9996H29.7127V35.63L26.9341 38.5188L22.0645 33.7042L25.1733 30.5954C27.0166 28.752 28.8599 26.9088 30.7307 25.0655C31.9688 23.8274 33.8121 23.7724 35.1877 24.9279C35.3802 25.0655 35.5452 25.2305 35.7104 25.3956L42.9459 32.5762L44.184 33.5116Z" fill="#7007FA"/>
                                </svg>
                            </div>

                            <div>
                                <span>اپلود عکس آگهی</span>
                            </div>

                            <div>
                                <span>حداکثر حجم آپلود عکس 3 مگابایت</span>
                            </div>

                            <div>
                                <span>انتخاب فایل</span>
                            </div>
                        </div>
                    </div>

                    <input ref={imageprofiler} onChange={(e) => chengeimage(e.target.files[0])} type='file' hidden />
                </div>

                <div className='item-profile-edit width-max flex-box flex-right'>
                    <button onClick={onSend}>ثبت مشخصات</button>
                </div>

                <div className='flex-box flex-column'>
                    <span id='status-tiket-add'></span>
                    <span id='sucsess-tiket-add'></span>
                </div>
            </div>
        )
    }

    return (
        <>
            <Header style="1rem 2rem" />

            <section id='main-dashboard' className='flex-box flex-justify-space flex-aling-right'>
                {sidbardashboard}

                <section id='detalist-dashboard' className='detalist-dashboard-support-add width-max flex-box flex-column'>
                    <div className='header-detalist-order-dashboard flex-box flex-justify-space width-max'>
                        <div>
                            <span>احراز هویت</span>
                        </div>
                    </div>

                    {dataprofile}
                </section>
            </section>
        </>
    );
};

export default DashProfileAuth;