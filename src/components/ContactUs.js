import React from 'react';
import Header from './Header';
import { useState,useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

const ContactUs = () => {
    const [DataCount, setDataCount] = useState();
    const [DataAbout, setDataAbout] = useState();

    useEffect(() => {
        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
        fetch(`https://server.elfiro.com/api/v1/contact-us`, options)
            .then(response => response.json())
            .then(response => setDataCount(response.data.contact))
            .catch(err => console.error(err));

        fetch(`https://server.elfiro.com/api/v1/about-us`, options)
            .then(response => response.json())
            .then(response => setDataAbout(response.data.about))
            .catch(err => console.error(err));
    }, [])

    const showAcardeon = (event) => {
        document.getElementsByClassName("item-faq")[event].classList.toggle("active");
    }

    return (
        <div>
            <Header style="1rem 2rem" />
            
            <section id='main-rules' className='flex-box'>
                <div className='show-main-rules'>
                    <div className='header-main-rules flex-box'>
                        <span>ارتباط با ما</span>
                    </div>

                    <div id='box-about' className='flex-box flex-aling-right'>
                        <div>
                            <Swiper className='slider-about' slidesPerView={"auto"} spaceBetween={20}>
                                {
                                    DataAbout?.about_images.map((item) => {
                                        return <SwiperSlide className='item-slider-about'>
                                            <img src={item} />
                                        </SwiperSlide>
                                    })
                                }
                            </Swiper>
                        </div>

                        <div dangerouslySetInnerHTML={{ __html: DataAbout?.about_text}}>
                            
                        </div>
                    </div>

                    <div className='box-item-faq'>
                        <div className='box-contact-us-item flex-box flex-justify-space'>
                            <div className='item-contact-us-item flex-box flex-column'>
                                <div className='header flex-box flex-column'>
                                    <svg width="31" height="37" viewBox="0 0 31 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.6139 36.0454C7.146 36.0454 0.774414 23.5214 0.774414 15.402C0.774414 7.21791 7.43162 0.5625 15.6139 0.5625C23.7962 0.5625 30.4534 7.21791 30.4534 15.402C30.4534 23.5214 24.0818 36.0454 15.6139 36.0454ZM15.6139 4.36174C9.52614 4.36174 4.57545 9.31423 4.57545 15.402C4.57545 21.7377 9.92134 32.2444 15.6139 32.2444C21.3065 32.2444 26.6524 21.7377 26.6524 15.402C26.6524 9.31423 21.7017 4.36174 15.6139 4.36174Z" fill="white"/>
                                    <path d="M15.614 23.6219C12.0375 23.6219 9.12744 20.7137 9.12744 17.1372C9.12744 13.5607 12.0375 10.6506 15.614 10.6506C19.1905 10.6506 22.1006 13.5607 22.1006 17.1372C22.1006 20.7137 19.1905 23.6219 15.614 23.6219ZM15.614 14.4499C14.132 14.4499 12.9285 15.6552 12.9285 17.1372C12.9285 18.6174 14.132 19.8227 15.614 19.8227C17.096 19.8227 18.2995 18.6174 18.2995 17.1372C18.2995 15.6552 17.096 14.4499 15.614 14.4499Z" fill="white"/>
                                    </svg>

                                    <span>آدرس</span>
                                </div>

                                <div className='contact'>
                                    <span>{DataCount?.tel}</span>
                                </div>
                            </div>

                            <div className='item-contact-us-item flex-box flex-column'>
                                <div className='header flex-box flex-column'>
                                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M26.9165 32.4584H11.0832C6.33317 32.4584 3.1665 30.0834 3.1665 24.5417V13.4584C3.1665 7.91675 6.33317 5.54175 11.0832 5.54175H26.9165C31.6665 5.54175 34.8332 7.91675 34.8332 13.4584V24.5417C34.8332 30.0834 31.6665 32.4584 26.9165 32.4584Z" stroke="white" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M26.9168 14.25L21.961 18.2083C20.3302 19.5067 17.6543 19.5067 16.0235 18.2083L11.0835 14.25" stroke="white" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <span>ایمیل</span>
                                </div>

                                <div className='contact'>
                                    <span>{DataCount?.email}</span>
                                </div>
                            </div>

                            <div className='item-contact-us-item flex-box flex-column'>
                                <div className='header flex-box flex-column'>
                                    <svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M27.8186 22.3793L24.4709 19.0316C23.0362 17.5389 20.8623 17.5244 19.3841 19.0171L17.79 20.5967L17.7465 20.5677C17.5581 20.4663 17.3697 20.3793 17.2103 20.2779C15.4727 19.1765 13.8771 17.7273 12.3554 15.8578C11.7612 15.1042 11.3264 14.452 11.0076 13.8288C11.3264 13.51 11.6308 13.2057 11.9351 12.8868L12.5872 12.2347C14.1234 10.6985 14.1234 8.62612 12.5872 7.07545L10.9206 5.40884C10.7322 5.22044 10.5438 5.03204 10.3699 4.84365C9.99313 4.45235 9.60184 4.06106 9.21055 3.69876C7.76133 2.27852 5.65995 2.24953 4.13826 3.71325L2.06732 5.80013C1.16735 6.69865 0.660123 7.78557 0.544185 9.0464C0.399262 10.9594 0.949968 12.7129 1.37024 13.8578C2.3847 16.6114 3.90639 19.1475 6.15269 21.8286C8.87723 25.1038 12.167 27.6689 15.9205 29.495C17.3842 30.1761 19.3406 31.0022 21.5724 31.1326C21.7029 31.1471 21.8333 31.1471 21.9637 31.1471C23.5579 31.1471 24.9057 30.5674 25.9636 29.4225L26.065 29.3066C26.3418 28.9877 26.6447 28.6834 27.0215 28.3211C27.2969 28.0602 27.5722 27.7994 27.8331 27.5095C28.5577 26.7559 28.949 25.8719 28.949 24.9444C28.949 24.0024 28.5577 23.1184 27.8186 22.3793ZM21.9637 28.1762H21.7319C20.0218 28.0602 18.4291 27.3791 17.2248 26.8139C13.8481 25.1763 10.9061 22.872 8.44246 19.9446C6.42804 17.4954 5.06577 15.2346 4.16725 12.8289C3.64553 11.4086 3.44264 10.3217 3.52959 9.29277C3.57452 8.74206 3.77596 8.2928 4.16725 7.90151L6.23964 5.84361C6.415 5.6697 6.57296 5.58275 6.70339 5.58275C6.86281 5.58275 7.03672 5.72767 7.16715 5.8581C7.52945 6.19142 7.87727 6.53924 8.23957 6.91604L10.4859 9.17683C10.6743 9.36523 10.7757 9.53914 10.7757 9.65507C10.7757 9.77101 10.6743 9.94492 10.4859 10.1333L9.94966 10.655C9.45692 11.1768 8.97868 11.655 8.47145 12.1043L8.34102 12.2347C7.8193 12.7999 7.67438 13.4665 7.94973 14.3361C8.41348 15.423 9.03665 16.4664 10.0381 17.7128C11.7612 19.8576 13.5872 21.5097 15.6016 22.7851C15.877 22.959 16.1523 23.1039 16.4132 23.2343C16.6175 23.3358 16.8045 23.4227 16.9639 23.5242L17.0943 23.5966C17.8914 24.0024 18.7334 23.8575 19.3841 23.2053L21.471 21.1184C21.8188 20.7706 22.0797 20.8431 22.3405 21.1184L25.7027 24.4807C25.9926 24.7705 26.0506 24.9734 25.8622 25.2487H25.6448L25.5723 25.5821C25.4129 25.7415 25.268 25.8864 25.1086 26.0313L24.9781 26.1762C24.5578 26.5675 24.1376 26.9733 23.7753 27.4226C23.2825 27.9443 22.7188 28.1762 21.9637 28.1762Z" fill="white"/>
                                    <path d="M25.4562 14.4663C25.5141 14.8721 25.4257 15.2634 25.1953 15.5822C24.9634 15.9156 24.6156 16.1329 24.2243 16.1909L23.9765 16.2054C23.2389 16.2054 22.6302 15.6837 22.4998 14.9736C22.2534 13.5098 21.5722 12.1766 20.5143 11.1331C19.4419 10.0607 18.1216 9.37955 16.6724 9.13318C16.2826 9.06072 15.9348 8.85783 15.7029 8.52451C15.471 8.20568 15.3841 7.79989 15.4565 7.4086C15.6014 6.61153 16.384 6.06082 17.1666 6.19125C19.239 6.53907 21.123 7.52454 22.6302 9.01724C24.1229 10.5099 25.0939 12.3939 25.4562 14.4663Z" fill="white"/>
                                    <path d="M30.6735 14.2346C30.7474 14.6259 30.6445 15.0172 30.4126 15.3505C30.1807 15.6693 29.8329 15.8867 29.4416 15.9447L29.2097 15.9592C28.4706 15.9592 27.8634 15.4374 27.733 14.7128C27.2823 12.0173 25.9939 9.55359 24.036 7.59714C22.0796 5.62619 19.6014 4.35087 16.9058 3.90161C16.0943 3.75669 15.558 3.00309 15.6885 2.17703C15.8348 1.36547 16.587 0.814762 17.4145 0.959685C20.7173 1.52488 23.7476 3.09005 26.1374 5.49576C28.5431 7.88698 30.1083 10.9159 30.6735 14.2346Z" fill="white"/>
                                    </svg>

                                    <span>تلفن تماس</span>
                                </div>

                                <div className='contact'>
                                    <span>{DataCount?.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;