import React from "react";
import { useNavigate, Link } from "react-router-dom";

import axiosInstance from "../axios.js";
import { useDispatch, useSelector } from "react-redux";

import "../components/index.css";
import {Tovar} from "../components/Tovar";
import styles from "../components/admin.module.css";
import "../components/normalize.css";
import { fetchTovars } from "../redux/slices/tovars.js";
// import { fetchOrders } from "../redux/slices/orders.js";
import { selectIsAuth } from '../redux/slices/auth.js';
import { Header } from "../components/Header";
import { Header1 } from "../components/Header1";

export default function Admin() {
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {tovars} = useSelector((state) => state.tovars);
    // const {orders} = useSelector((state) => state.tovars);
    const inputFileRef = React.useRef(null);

    const isTovarsLoading = tovars.status === 'loading';
    // const isOrdersLoading = orders.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchTovars());
    }, [])
    // React.useEffect(() => {
    //     dispatch(fetchOrders());
    // }, [])
    console.log(tovars);
    // console.log(orders);

    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        if (showModal) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
    }, [showModal]);
    if (!window.localStorage.getItem('token')) {
        navigate("/")
    }
    // const [isOrders, setIsOrders] = React.useState(false)
    // const toOders = () => {
    //     setIsOrders(true)
    // }
    return (<>
        <header>
            <nav>
                <Header/>
                <Header1/>
            </nav>
        </header>
        
        <main>
            <div className="container flex-column">
            <div className="container__element h1">
                    <h1>Панель администратора</h1>
                </div>
                <div className="container__element">
                    <Link to="addTovar">
                        Добавить    
                    </Link>    
                </div>
                {/* <div className="container__element">
                    <Link onClick={() => toOders()}>
                        Заказы    
                    </Link>    
                </div> */}
            </div>
            {/* {isOrders ? 
                ( */}
                <div className="container flex-wrap pl">
                {(isTovarsLoading ? [...Array(5)] : tovars.items).map((obj, index) => 
                isTovarsLoading ? 
                (
                    <Tovar key={index} isLoading={true}/>
                ) : (
                    <Tovar
                        _id={obj._id}
                        name={obj.name}
                        price={obj.price}
                        videocard={obj.videocard}
                        processor={obj.processor}
                        ram={obj.ram}
                        motherboard={obj.motherboard}
                        power_block={obj.power_block}
                        pcCase={obj.pcCase}
                        hdd={obj.hhd}
                        ssd={obj.ssd}
                        imageUrl={obj.imageUrl}
                        isFullTovar={false}
                        isEditable={true}
                    />
                ))}
                </div>
                {/* ) : (
                    <div className="container flex-wrap pl">
                    {(isOrdersLoading ? [...Array(5)] : tovars.items).map((obj, index) => 
                    isOrdersLoading ? 
                    (
                        <Order key={index} isLoading={true}/>
                    ) : (
                        <Order
                            _id={obj._id}
                            name={obj.name}
                            cost={obj.cost}
                            videocard={obj.videocard}
                            processor={obj.processor}
                            ram={obj.ram}
                            motherboard={obj.motherboard}
                            power_block={obj.power_block}
                            pcCase={obj.pcCase}
                            hdd={obj.hhd}
                            ssd={obj.ssd}
                            imageUrl={obj.imageUrl}
                            isFullTovar={false}
                            isEditable={true}
                        />
                    ))}
                </div>
                )
            } */}
        </main>

        <footer>
            <div className="container center">
                    <div className="container_element">
                        <ul>
                            <li><a href="/about">О компании</a></li>
                            <li><a href="/contacts">Контакты</a></li><br />
                            <p>&copy; PCMarket - 2023</p>
                        </ul>
                    </div>
            </div>
        </footer>                
    </>)
}