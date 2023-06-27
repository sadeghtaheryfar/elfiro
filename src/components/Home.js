import React from 'react';
import Header from './Header';
import Sidebar from './Sidbar';
import { useState,useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Modal from 'react-bootstrap/Modal';
import SliderRange from './SliderRange';
import { Link } from 'react-router-dom';

const Home = () => {
    const [DataCategory, SetDataCategory] = useState();
    const [DataPrudect, SetDataPrudect] = useState();
    const [DataPrudectSe, SetDataPrudectSe] = useState();
    const [DataSearch, SetDataSearch] = useState();
    const [show, setShow] = useState(false);
    var page = 1;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleScroll() {
        if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) > (document.body.offsetHeight - 300)) {
            page++;
            const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
            fetch(`https://server.elfiro.com/api/v1/home?page=${page}`, options)
                .then(response => response.json())
                .then(result => {
                    SetDataPrudect((prevData) => [...prevData, ...result.data.orders.records]);
                })
        }
    }


    useEffect(() => {
        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
        fetch('https://server.elfiro.com/api/v1/home/categories', options)
            .then(response => response.json())
            .then(result => SetDataCategory(result.data.most_used_categories.record))
    },[])

    useEffect(() => {
        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
        fetch(`https://server.elfiro.com/api/v1/home?page=${page}`, options)
            .then(response => response.json())
            .then(result => {
                SetDataPrudect(result.data.orders.records);
                window.addEventListener('scroll', handleScroll);
            })
    },[])

    var ConDataCategory;
    var ConDataCategoryMobile;
    var ConDataPrudect;
    var SeaDataPrudect;


    if(DataCategory != undefined)
    {
        ConDataCategory = (
            <div className='box-most-categories-home flex-box flex-wrap flex-right'>
                {DataCategory.map((item)=> 
                    <div className='show-item-most-categories-home' key={item.id}>
                        <Link to='/login' className='item-most-categories-home flex-box flex-column'>
                            <div>
                                <img src={item.slider}></img>
                            </div>

                            <div>
                                <span>{item.title}</span>
                            </div>

                            <div>
                                <span>تعداد آگهی : </span>

                                <span>{item.orders_count}</span>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        );

        ConDataCategoryMobile = (
            <Swiper className="mySwiper mySwiper-category-home-mo" slidesPerView={"auto"} spaceBetween={20}>
                {DataCategory.map((item)=> 
                    <SwiperSlide className='slider-category-home flex-box' key={item.id}>
                        <div>
                            <img src={item.slider} />
                        </div>

                        <div>
                            <span>{item.title}</span>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
        );
    }

    if(DataPrudect != undefined)
    {
        ConDataPrudect = (
            <div id='prudect-home' className='flex-box flex-right flex-wrap'>
                {DataPrudect.map((item,index)=> 
                    <div className='item-prudect-home' key={item.id}>
                        <Link to={`orders/${item.id}`}>
                            <div className='show-item-prudect-home'>
                                <div className='top-item-prudect-home flex-box flex-justify-space'>
                                    <div className='flex-box flex-right'>
                                        <div>
                                            <img src={item.user.user_profile}></img>

                                            {item.status_label === "تایید شده" && 
                                                <div>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z" fill="#0094FF"/>
                                                        <path d="M6.45825 9.99993L8.81659 12.3583L13.5416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            }
                                        </div>

                                        <div className='flex-box flex-column flex-aling-right'>
                                            <span>{item.user.user_name}</span>

                                            <div>
                                                <span>{item.created_at}</span>

                                                <span> در </span>

                                                <span>{item.city}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="img-item-prudect-home">
                                    <img src={item.image} />

                                    <div>
                                        <span>{item.category.title}</span>
                                    </div>
                                </div>

                                <div className="name-item-prudect-home">
                                    <span>{item.name}</span>
                                </div>

                                <div className='price-item-prudect-home flex-box flex-justify-space'>
                                    <div className='flex-box'>
                                        <span>{item.platforms}</span>
                                    </div>

                                    <div className='flex-box flex-aling-left flex-column'>
                                        <span>تومان</span>

                                        <span>{item.price}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        );
    }

    if(DataPrudectSe != undefined)
    {
        SeaDataPrudect = (
            <div id='prudect-search' className='flex-box flex-right flex-wrap'>
                {DataPrudectSe.map((item,index)=> 
                    <div className='item-prudect-home' key={item.id}>
                        <Link to={`orders/${item.id}`}>
                            <div className='show-item-prudect-home'>
                                <div className='top-item-prudect-home flex-box flex-justify-space'>
                                    <div className='flex-box flex-right'>
                                        <div>
                                            <img src={item.user.user_profile}></img>

                                            {item.status_label === "تایید شده" && 
                                                <div>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z" fill="#0094FF"/>
                                                        <path d="M6.45825 9.99993L8.81659 12.3583L13.5416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            }
                                        </div>

                                        <div className='flex-box flex-column flex-aling-right'>
                                            <span>{item.user.user_name}</span>

                                            <div>
                                                <span>{item.created_at}</span>

                                                <span> در </span>

                                                <span>{item.city}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="img-item-prudect-home">
                                    <img src={item.image} />

                                    <div>
                                        <span>{item.category.title}</span>
                                    </div>
                                </div>

                                <div className="name-item-prudect-home">
                                    <span>{item.name}</span>
                                </div>

                                <div className='price-item-prudect-home flex-box flex-justify-space'>
                                    <div className='flex-box'>
                                        <span>{item.platforms}</span>
                                    </div>

                                    <div className='flex-box flex-aling-left flex-column'>
                                        <span>تومان</span>

                                        <span>{item.price}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        );
    }

    const detalistheadermenuh = document.getElementsByClassName("detalist-header-menuh");
    const svgboxheadermenuh = document.getElementsByClassName("svg-box-header-menuh");

    const chengedrapdownsidbarh = (event,index) =>{
        detalistheadermenuh[index].classList.toggle("hide-item");
        svgboxheadermenuh[index].classList.toggle("rotate-filter-menu-item");
    }

    const startSearch = (item) => {
        document.getElementById("most-categories-home").classList.add("hide-item");
        document.getElementById("prudect-home").classList.add("hide-item");
        document.getElementById("show-search-box").classList.remove("hide-item");
        document.getElementById("show-search-text").innerHTML = DataSearch;

        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
        fetch(`https://server.elfiro.com/api/v1/home?q=${DataSearch}`, options)
            .then(response => response.json())
            .then(result => SetDataPrudectSe(result.data.orders.records))
    }

    return (
        <div>
            <Sidebar/>
            <Header />

            <section className='padding-main-sidbar'>
                <div className='box-search-home width-max flex-box flex-right'>
                    <div className='show-box-search-home flex-box width-50'>
                        <div>
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.50601" cy="9.798" r="8.298" stroke="#808191" strokeWidth="2"/>
                                <line x1="16.085" y1="14.7499" x2="20" y2="18.6649" stroke="#808191" strokeWidth="2"/>
                            </svg>
                        </div>

                        <div>
                            <input type={"search"} placeholder={"جستجو در همه اکانت ها"} onChange={(e) => SetDataSearch(e.target.value)} />
                        </div>
                        
                        <div>
                            <input type={"submit"} value={"submit"} onClick={startSearch} />
                        </div>
                    </div>

                    <div id='show-search-box' className='width-50 margin-horizontal-1 hide-item'>
                        <span>سرچ برای </span>

                        <span id='show-search-text'></span>
                    </div>
                </div>

                <div id='most-categories-home' className='most-categories-home'>
                    <div>
                        <span>بیشترین معامله</span>
                    </div>

                    {ConDataCategory}

                    {ConDataCategoryMobile}
                </div>

                <div>
                    {ConDataPrudect}
                    {SeaDataPrudect}
                </div>
            </section>

            {/* <!-- Modal --> */}
            <Modal className='modal-filter-home' show={show} onHide={handleClose}>
                <Modal.Header  className='modal-header-filter-mo width-max flex-box flex-justify-space' closeButton>
                    <Modal.Title>فیلتر ها</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='box-filter-menu-sidbar width-max'>
                        <div className='item-filter-menu-sidbar'>
                            <div className='box-header-menu width-max flex-box flex-right' onClick={event => chengedrapdownsidbarh(event, 0)}>
                                <svg className='svg-box-header-menuh' width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L7 7L13 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                                <span>بتل پس</span>
                            </div>

                            <div className='detalist-header-menuh width-max flex-box hide-item flex-justify-space'>
                                <span>کالاهای موجود</span>

                                <div>
                                    <label className="toggle" htmlFor="myToggleh">
                                        <input className="toggle__input" name="" type="checkbox" id="myToggleh"/>
                                        <div className="toggle__fill"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='item-filter-menu-sidbar'>
                            <div className='box-header-menu width-max flex-box flex-right' onClick={event => chengedrapdownsidbarh(event, 1)}>
                                <svg className='svg-box-header-menuh' width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L7 7L13 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                                <span>محدوده قیمت</span>
                            </div>

                            <div className='detalist-header-menuh width-max flex-box hide-item'>
                                <SliderRange />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Home;