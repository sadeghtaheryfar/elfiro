import React from 'react';
import { useEffect,useState } from 'react';
import Header from './Header';
import { Checkbox } from 'antd';

const OrderAdd = () => {
    const usertoken = localStorage.getItem("user-login");
    const [categoryOr, setcategoryOr] = useState(1);
    const [nameOr, setnameOr] = useState();
    const [descriptionOr, setdescriptionOr] = useState();
    const [priceOr, setpriceOr] = useState(0);
    const [imageOr, setimageOr] = useState();
    const [ruils,setRuils] = useState(false);
    // const [galleryOr, setgalleryOr] = useState([]);

    const chengecategory = (e) => {
        console.log(typeof(categoryOr))
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
                            window.location = "/Login"
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
    }, []);

    const nextlevel = () => {
        document.getElementById("section-one-orderAd").classList.add("hide-item");
        document.getElementById("section-two-orderAd").classList.remove("hide-item");
    }

    var errrulis;

    const lastsend = () => {
        if(ruils)
        {
            onSend();
        }else{
            var test = "test";
            console.log('>>>>>>>>>>>', errrulis)
        }
    }
    // console.log('>>>>>>>>>>>', ruils);

    const onSend = async () => {
        const formData = new FormData();
        formData.append('category_id', categoryOr);
        formData.append('name', nameOr);
        formData.append('content', descriptionOr);
        formData.append('price', priceOr);
        formData.append('image', imageOr);
        // formData.append('gallery', galleryOr);

        console.log(typeof(priceOr))

        fetch('https://server.elfiro.com/api/v1/client/orders', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `${usertoken}`,
            },
        })
            .then((res) => res.json())
            .then((res) => console.log(res))
            .catch((error) => console.error(error))
    };

    return (
        <>
            <Header style="1rem 2rem" />

            <section id='main-OrderAd' className='flex-box'>
                <section id='section-OrderAd'>
                    <div className='header-OrderAd'>
                        <span>ثبت آگهی</span>
                    </div>
                    
                    <div id='section-one-orderAd'>
                        <div className='box-from-orderAd'>
                            <label htmlFor='category'>انتخاب  دسته بندی</label>
                            <br />
                            <select id='category' onChange={(e) => chengecategory(e.target.value)}>
                                <option value={1}>epic</option>
                                <option>steam</option>
                            </select>
                        </div>

                        <div className='box-from-orderAd flex-box'>
                            <button onClick={nextlevel}>ادامه</button>
                        </div>
                    </div>

                    <div id='section-two-orderAd' className='hide-item'>
                        <div className='box-category-orderAd flex-box flex-right'>
                            <span>آگهی شما</span>

                            <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1.5L1 7.5L7 13.5" stroke="#7007FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                            <span>وارزون</span>
                        </div>

                        <div className='box-from-orderAd'>
                            <label htmlFor='name'>نام آگهی شما</label>
                            <br />
                            <input type='text' id='name' onChange={(e) => setnameOr(e)} />
                        </div>

                        <div>
                            <input type='file' onChange={(e) => setimageOr(e.target.files[0])} />
                        </div>

                        <div>

                        </div>

                        <div className='box-from-orderAd'>
                            <label htmlFor='description'>توضیحات</label>
                            <br />
                            <textarea type='text' id='description' onChange={(e) => setdescriptionOr(e)} />
                        </div>

                        <div className='box-from-orderAd'>
                            <label htmlFor='price'>قیمت</label>
                            <br />
                            <input type='number' id='price' onChange={(e) => setpriceOr(e.target.value)} />
                        </div>

                        <div className='box-from-orderAd'>
                            <Checkbox onChange={() => setRuils(!ruils)}>قوانین را مطالعه کردم و باآنها موافقم</Checkbox>
                        </div>

                        <div className='box-from-orderAd flex-box'>
                            <button onClick={lastsend}>ثبت</button>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
};

export default OrderAdd;