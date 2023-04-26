import React from 'react';
import { useEffect,useState } from 'react';
import Header from './Header';

const Transactions = () => {    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    var idorder = window.location.pathname;
    const [Data, setData] = useState();

    useEffect(() => {
        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
        const usertoken = localStorage.getItem("user-login");

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

        if(idorder != undefined)
        {
            fetch(`https://server.elfiro.com/api/v1${idorder}`, options)
                .then(response => response.json())
                .then(response => console.log('>>>>>>>>>>>', response))
                .catch(err => console.error(err));
        }
    }, [])
    
    return (
        <div>
            <Header style="1rem 2rem" />

            <section id='main-order'>

                <section id='detalist-order' className='flex-box flex-justify-space flex-aling-right'>

                </section>
            </section>
        </div>
    );
};

export default Transactions;