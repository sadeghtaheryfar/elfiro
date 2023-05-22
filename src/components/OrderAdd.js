import React from 'react';
import { useEffect,useState,useRef } from 'react';
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
    const [DataCategory, SetDataCategory] = useState();
    const [datahedaerbol, Setdatahedaerbol] = useState(false);
    // const [galleryOr, setgalleryOr] = useState([]);
    const imageOrF = useRef();
    const galleryOr = [];


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

                fetch('https://server.elfiro.com/api/v1/basic/sidebar', options)
                    .then(response => response.json())
                    .then(result => SetDataCategory(result.data.sidebar.categories))
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
        Setdatahedaerbol(true);
    }

    const chengecategory = (e) => {
        var x = e--;
        setcategoryOr(x);
    }

    const chengegallety = (e) => {
        galleryOr.push(e);
    }

    const lastsend = () => {
        if(ruils)
        {
            onSend();
            document.getElementById("errruils").innerHTML = "";
        }else{
            document.getElementById("errruils").innerHTML = "این فیلد اجباری است";
        }
    }

    const [selectedImage, setSelectedImage] = useState();

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            document.getElementById("inputimagebox").classList.add("hide-item");
        }
    };

    const removeSelectedImage = () => {
        setSelectedImage();
        document.getElementById("inputimagebox").classList.remove("hide-item");
    };

    const onSend = async () => {
        const formData = new FormData();
        formData.append('category_id', categoryOr);
        formData.append('name', nameOr);
        formData.append('content', descriptionOr);
        formData.append('price', priceOr);
        formData.append('image', imageOr);
        // formData.append('gallery', galleryOr);

        fetch('https://server.elfiro.com/api/v1/client/orders', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `${usertoken}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if(res.status === "success")
                {
                    document.getElementById("sucsend").innerHTML = res.data.message.order;
                    document.getElementById("errname").innerHTML = "";
                    document.getElementById("errimage").innerHTML = "";
                    document.getElementById("errdescription").innerHTML = "";
                    document.getElementById("errprice").innerHTML = "";
                    document.getElementById("errsend").innerHTML = "";
                }else{
                    console.log('>>>>>>>>>>>', res)
                    if(res.data.message.name != undefined)
                    {
                        document.getElementById("errname").innerHTML = res.data.message.name;
                    }
                    if(res.data.message.image != undefined)
                    {
                        document.getElementById("errimage").innerHTML = res.data.message.image;
                    }
                    if(res.data.message.description != undefined)
                    {
                        document.getElementById("errdescription").innerHTML = res.data.message.description;
                    }
                    if(res.data.message.price != undefined)
                    {
                        document.getElementById("errprice").innerHTML = res.data.message.price;
                    }
                    if(res.data.message != undefined)
                    {
                        document.getElementById("errsend").innerHTML = res.data.message;
                    }
                }
            })
            .catch((error) => console.error(error))
    };

    var tagcategory;
    var datacetogryheader;

    if(DataCategory != undefined)
    {
        tagcategory = (
            <select id='category' onChange={(e) => chengecategory(e.target.value)}>
                {DataCategory.map((item)=> 
                    <option key={item.id} value={item.id}>{item.title}</option>
                )}
            </select>
        )
    }

    if(datahedaerbol)
    {
        DataCategory.map((item) => {
            if(item.id === categoryOr)
            {
                datacetogryheader = (
                    <span>{item.title}</span>
                )
            }
        })
    }
    
    const [inputValue, setInputValue] = useState('0');
    const [formattedValue, setFormattedValue] = useState('');

    useEffect(() => {
        const number = parseFloat(inputValue);
        if (!isNaN(number)) {
            const formattedNumber = number.toLocaleString();
            setFormattedValue(formattedNumber);
        }
    }, [inputValue]);

    const handleInputChange = (event) => {
        setpriceOr(event.target.value);
        setInputValue(event.target.value);
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
                            {tagcategory}
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

                            {datacetogryheader}
                        </div>

                        <div className='box-from-orderAd'>
                            <label htmlFor='name'>نام آگهی شما</label>
                            <br />
                            <span id='errname' className='errinputs'></span>
                            <input type='text' id='name' onChange={(e) => setnameOr(e.target.value)} />
                        </div>

                        <div>
                            <span id='errimage' className='err-tiket-add'></span>
                            <br></br>

                            <div id='inputimagebox' onClick={() => imageOrF.current?.click()} className='show-upload-btn flex-box flex-column margin-vetical-1'>
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
                                    <span>بارگزاری</span>
                                </div>
                            </div>

                            <input ref={imageOrF} type='file' hidden onChange={(e) => {
                                setimageOr(e.target.files[0]);
                                imageChange(e);
                            }} />

                            {selectedImage && (
                                <div id='showimagebox' className='show-upload-btn flex-box flex-column margin-vetical-1'>
                                    <div>
                                        <img src={URL.createObjectURL(selectedImage)} />
                                    </div>

                                    <div>
                                        <button onClick={removeSelectedImage}>حذف</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='box-from-orderAd'>
                            <label htmlFor='description'>توضیحات</label>
                            <br />
                            <span id='errdescription' className='err-tiket-add'></span>
                            <textarea type='text' id='description' onChange={(e) => setdescriptionOr(e.target.value)} />
                        </div>

                        <div className='box-from-orderAd'>
                            <label htmlFor='price'>قیمت</label>
                            <br />
                            <span id='errprice' className='err-tiket-add'></span>
                            <input type='number' id='price' onChange={(e) => handleInputChange(e)} />
                        </div>

                        
                        <div>
                            <p>{formattedValue} تومان</p>
                        </div>

                        <div className='box-from-orderAd'>
                            <span id='errruils' className='err-tiket-add'></span>
                            <br />
                            <Checkbox onChange={() => setRuils(!ruils)}>قوانین را مطالعه کردم و باآنها موافقم</Checkbox>
                        </div>

                        <div className='box-from-orderAd'>
                            <div className='flex-box'>
                                <button onClick={lastsend}>ثبت</button>
                            </div>

                            <div className='flex-box'>
                                <span id='errsend' className='err-tiket-add'></span>
                                <span id='sucsend' className='sucsess-tiket-add'></span>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
};

export default OrderAdd;