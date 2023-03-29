import React from 'react';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [DataPhone, SetDataPhone] = useState("");
    const [DataName, SetDataName] = useState("");
    const [DataEmail, SetDataEmail] = useState("");
    const [DataUserName, SetDataUserName] = useState("");

    const setPhone = () => {
        SetDataPhone(document.getElementById("number-phone-register").value);
    }

    const setName = () => {
        SetDataName(document.getElementById("text-name-register").value);
    }

    const setEmail = () => {
        SetDataEmail(document.getElementById("text-email-register").value);
    }

    const setUserName = () => {
        SetDataUserName(document.getElementById("text-userName-register").value);
    }

    const sendRegister = () => {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: `{"phone":"${DataPhone}","name":"${DataName}","email":"${DataEmail}","user_name":"${DataUserName}"}`
        };

        fetch('https://server.elfiro.com/api/v1/auth/register', options)
            .then(response => response.json())
            .then(response => {
                if(response.status === "success")
                {
                    document.getElementById("form-register-header").classList.add("hide-item");
                    document.getElementById("message-suc-register").innerHTML = response.data.message;
                }else{
                    if(response.data.message.phone)
                    {
                        document.getElementById("error-phone-register").innerHTML = response.data.message.phone;
                    }

                    if(response.data.message.name)
                    {
                        document.getElementById("error-name-register").innerHTML = response.data.message.name;
                    }

                    if(response.data.message.email)
                    {
                        document.getElementById("error-email-register").innerHTML = response.data.message.email;
                    }

                    if(response.data.message.user_name)
                    {
                        document.getElementById("error-userName-register").innerHTML = response.data.message.user_name;
                    }
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <div className='flex-box flex-column-mobile'>
            <section id='right-login' className='flex-box'>
                <div className='show-right-login'>
                    <div className='message-login-header flex-box flex-right'>
                        <span>  ثبت نام در </span>

                        <span className='color-blue margin-horizontal-1'> فارس گیمر </span>
                    </div>

                    <div id='form-register-header' className='form-register-header'>
                        <div className='input-style-register'>
                            <label htmlFor="number-phone-register">شماره *</label>
                            <br />
                            <input id='number-phone-register' type={"number"} onChange={setPhone}/>
                            <br></br>
                            <span id='error-phone-register' className='error-form-register'></span>
                        </div>

                        <div className='input-style-register'>
                            <label htmlFor="text-name-register">نام و نام خانوادگی</label>
                            <br />
                            <input id='text-name-register' onChange={setName} />
                            <br></br>
                            <span id='error-name-register' className='error-form-register'></span>
                        </div>

                        <div className='input-style-register'>
                            <label htmlFor="text-email-register">ایمیل *</label>
                            <br />
                            <input id='text-email-register' onChange={setEmail} />
                            <br></br>
                            <span id='error-email-register' className='error-form-register'></span>
                        </div>

                        <div className='input-style-register'>
                            <label htmlFor="text-userName-register">نام کاربری *</label>
                            <br />
                            <input id='text-userName-register' onChange={setUserName} />
                            <br></br>
                            <span id='error-userName-register' className='error-form-register'></span>
                        </div>

                        <div className="btn-style-register">
                            <input type={"button"} value={"تایید"} onClick={sendRegister} />
                        </div>
                    </div>

                    <div>
                        <span id='message-suc-register' className='color-green'></span>
                    </div>

                    <div className='more-login-header'>
                        <span>حساب کاربری دارید ؟</span>

                        <Link to='/Login' className='color-blue'>ورود</Link>
                    </div>
                </div>
            </section>

            <section id='left-login'>

            </section>
        </div>
    );
};

export default Register;