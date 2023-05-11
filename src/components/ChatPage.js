import React from 'react';

const ChatPage = (props) => {
    return (
        <div className='width-max height-max flex-box flex-column'>
            <div id='hedaer-page-chat' className='flex-box flex-justify-space width-max'>
                <div className='logo-hedaer-page-chat flex-box'>
                    <div className='width-max flex-box flex-right'>
                        <div className='image'>
                            <img src='http://server.elfiro.com/storage/profiles/w0Lyoli1rzPWRxkU95WFlIJgF6RVVxirQEwdMkL8.jpg' />

                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z" fill="#0094FF"/>
                                <path d="M6.45825 9.99993L8.81659 12.3583L13.5416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>

                        <div className='detalist'>
                            <div>
                                <span>sadegh</span>
                            </div>

                            <div>
                                <span>مدیر دوبلاژ : سخیر این دردسترس دسترس  دسترس دسترس</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='header-chatpage flex-box'>
                    <span>fortnite</span>
                </div>

                <div className='flex-box flex-left'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3Z" stroke="#292D32" strokeWidth="1.5"/>
                    <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" stroke="#292D32" strokeWidth="1.5"/>
                    <path d="M12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17Z" stroke="#292D32" strokeWidth="1.5"/>
                    </svg>
                </div>
            </div>

            <div className='box-show-chatpage height-max width-max flex-box flex-column flex-right'>
                <div className='box-ruils-chatpage'>
                    <div className='header flex-box'>
                        <span>قوانین چت</span>
                    </div>

                    <div className='item'>
                        <span>1. </span>

                        <span>test</span>
                    </div>

                    <div className='item'>
                        <span>2. </span>

                        <span>test</span>
                    </div>

                    <div className='item'>
                        <span>3. </span>

                        <span>test</span>
                    </div>
                </div>  

                <div className='box-message-chatpage width-max'>
                    <div className='item-message-chatpage send-message-chatpage flex-box flex-column flex-right flex-aling-right'>
                        <div className='text'>
                            <span>سلام وقت بخیر امان هست؟؟</span>
                        </div>

                        <div className='read'>
                            <svg width="19" height="11" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.9997 1.90527L10.8101 9.09497L9.7207 8.00562" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12.2282 1.90527L5.03855 9.09497L1.77051 5.82693" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>

                    <div className='item-message-chatpage recive-message-chatpage flex-box flex-column flex-right flex-aling-left'>
                        <div className='flex-box'>
                            <div className='text'>
                                <span>سلام وقت بخیر امان نیست</span>
                            </div>

                            <div className='logo'>
                                <img src='http://server.elfiro.com/storage/profiles/w0Lyoli1rzPWRxkU95WFlIJgF6RVVxirQEwdMkL8.jpg' />
                            </div>
                        </div>
                    </div>

                    <div className='item-message-chatpage send-message-chatpage flex-box flex-column flex-right flex-aling-right'>
                        <div className='text'>
                            <span>عددکیس کامپیوترهمین طورکه درعکس مشاهده میشه کم کاروخواب بوده لازمم نمی‌</span>
                        </div>

                        <div className='read'>
                            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9997 1.5L4.81004 8.6897L1.54199 5.42165" stroke="#BFBFBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div id='footer-page-chat' className='width-max flex-box'>
                <div className='send'>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5708 29.493L13.7404 20.4534L21.1825 13.0113C21.8799 12.3139 21.8799 11.173 21.1826 10.4756C20.4853 9.77834 19.3443 9.77836 18.647 10.4757L11.2049 17.9178L2.17783 13.1C-0.49719 11.6674 -0.040812 7.68635 2.88792 6.88774L27.1541 0.396444C29.6516 -0.27551 31.9338 2.00662 31.2618 4.50417L24.7705 28.7703C23.9845 31.7117 20.0035 32.168 18.5708 29.493Z" fill="#7007FA"/>
                    </svg>
                </div>

                <div className='text width-max'>
                    <input placeholder='پیامی وارد کنید ...' type='text' />
                </div>

                <div className='file'>
                    <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5075 23.7215C9.63253 26.5314 5.01055 26.5204 2.15255 23.6824C-0.705453 20.8454 -0.71647 16.2544 2.11355 13.4004L2.11153 13.3985L12.5085 3.07445L13.8095 1.78343C15.9625 -0.354568 19.4535 -0.354568 21.6065 1.78343C23.7595 3.92244 23.7595 7.38844 21.6065 9.52745L10.1455 20.7905L10.1415 20.7865C8.72854 22.1395 6.47753 22.1294 5.08254 20.7504C3.68655 19.3714 3.67754 17.1474 5.04653 15.7534L5.04253 15.7485L6.31853 14.4895L12.6995 8.18645L13.9745 9.44743L6.31853 17.0094C5.61355 17.7045 5.61355 18.8335 6.31853 19.5294C7.02355 20.2265 8.16653 20.2265 8.87054 19.5294L20.3065 8.23546L20.3036 8.23244L20.3465 8.19646C21.7826 6.77043 21.7826 4.45845 20.3465 3.03343C18.9116 1.60844 16.5845 1.60844 15.1495 3.03343L15.1105 3.07643L15.1085 3.07545L13.8085 4.36543L3.41054 14.6894C1.25753 16.8274 1.25753 20.2944 3.41054 22.4324C5.56454 24.5704 9.05553 24.5704 11.2075 22.4324L20.3055 13.3985L21.6045 12.1084L22.9045 13.3985L21.6045 14.6894L12.5085 23.7234L12.5075 23.7215Z" fill="#7007FA"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;