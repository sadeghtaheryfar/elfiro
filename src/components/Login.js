import React from 'react';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [DataLogin, SetDataLogin] = useState("");
    const [PassLogin, SetPassLogin] = useState("");
    const usertoken = localStorage.getItem("user-login");
    const [otp, setOtp] = useState("");
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);
    const [img, setimg] = useState(30);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        fetch('https://server.elfiro.com/api/v1/basic/loginImage',options)
            .then(response => response.json())
            .then(response => setimg(response.data))
            .catch(err => {});

        
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
                        if(response.status === "success")
                        {
                            window.location = "/dashboard"
                        }
                    })
                    .catch(err => {});
            }
        }
    }, [])
    

    useEffect(() => {
        const interval = setInterval(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        }

        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(interval);
                } else {
                setSeconds(59);
                setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    const resendOTP = () => {
        setMinutes(1);
        setSeconds(30);
        sendcode();
    };

    const setcode = () => {
        SetDataLogin(document.getElementById("number-phone-login").value);
    }

    const setpass = () => {
        SetPassLogin(document.getElementById("pass-login").value);
    }

    const sendcode = () => {
        setMinutes(1);
        setSeconds(30);

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: `{"phone":"${DataLogin}"}`
        };

        fetch('https://server.elfiro.com/api/v1/auth/send-verification-code', options)
            .then(response => response.json())
            .then(response => {
            if(response.status === "success")
            {
                document.getElementById("form-login-header").classList.add("hide-item");
                document.getElementById("form-pass-header").classList.remove("hide-item");
            }else{
                if(response.data.message.user)
                {
                    document.getElementById("error-phone-login").innerHTML = response.data.message.user;
                }

                if(response.data.message.phone)
                {
                    document.getElementById("error-phone-login").innerHTML = response.data.message.phone;
                }
            }
        })
        .catch(err => console.error(err));
    }

    const sendpass = () => {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: `{"phone": "${DataLogin}","password": "${PassLogin}"}`,
        };

        fetch('https://server.elfiro.com/api/v1/auth/login', options)
        .then(response => response.json())
        .then(response => {
            if(response.status === "success")
            {
                localStorage.setItem('user-login', response.data.login.user.token);
                localStorage.setItem('user-name', response.data.login.user.name);
                localStorage.setItem('user-profile', response.data.login.user.profile_image);
                window.location = "/";
            }else{
                if(response.data.message.user)
                {
                    document.getElementById("error-phone-pass").innerHTML = response.data.message.user;
                }

                if(response.data.message.phone)
                {
                    document.getElementById("error-phone-pass").innerHTML = response.data.message.phone;
                }
            }
        })
    }
    
    return (
        <div className='flex-box flex-column-mobile'>
            <section id='right-login' className='flex-box'>
                <div className='show-right-login'>
                    <div id='form-login-header' className='form-login-header'>
                        <div className='message-login-header flex-box flex-right'>
                            <span> ورود به </span>

                            <span className='color-blue margin-horizontal-1'> فارس گیمر </span>
                        </div>

                        <div>
                            <label htmlFor="number-phone-login">شماره</label>
                            <br />
                            <input id='number-phone-login' type={"number"} onChange={setcode} />
                            <br></br>
                            <span id='error-phone-login'></span>
                        </div>

                        <div>
                            <input type={"button"} value={"تایید"} onClick={sendcode} />
                        </div>
                    </div>

                    <div id='form-pass-header' className='form-pass-header hide-item'>
                        <div>
                            <span>کد ارسالی به شماره </span>

                            <span className='color-blue'>{DataLogin}</span>

                            <span> را وارد کنید </span>
                        </div>

                        <div>
                            <label htmlFor="number-phone-login">کد ارسالی</label>
                            <br />
                            <input id='pass-login' type={"number"} onChange={setpass} />
                            <br></br>
                            <span id='error-phone-pass'></span>
                            <div className='recent-code-login flex-box flex-justify-space'>
                                <a href='/login'>تصحیح شماره</a>

                                <div className="countdown-text">
                                    <button
                                        id='disable-defult'
                                        disabled={seconds > 0 || minutes > 0}
                                        onClick={resendOTP}
                                    >
                                        <p>
                                            ارسال مجدد کد: ({minutes < 10 ? `0${minutes}` : minutes}:
                                            {seconds < 10 ? `0${seconds}` : seconds})
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <input type={"button"} value={"تایید"} onClick={sendpass} />
                        </div>
                    </div>

                    <div className='more-login-header'>
                        <span>حساب کاربری ندارید؟</span>

                        <Link to='/Register' className='color-blue'>ثبت نام</Link>
                    </div>
                </div>
            </section>

            <section id='left-login'><img src={img?.loginImage} /></section>
        </div>
    );
};

export default Login;