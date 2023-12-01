import React from "react";

import { Header } from "../components/Header";
import {selectIsAuth, fetchAuthMe} from '../redux/slices/auth.js';
import { useNavigate, Link, useParams, json } from "react-router-dom";
import styles from "../components/profile.module.css"
import axios from "../axios.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersAll } from "../redux/slices/orders.js";


export default function Orders() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [orders,  setOrders] = React.useState();
	React.useEffect(() => {
		dispatch(fetchOrdersAll()).then(res => setOrders(res.payload))
    }, [])

	return (<>
		<header>
			<nav>
				<Header/>
			</nav>
		</header>

		<main>
			<div className="container">
				<h1>Заказы</h1>
			</div>
			<div className="container">
				{orders?.map((obj, index) =>(
					<div className="order__block" style={{display:"flex", gap: 30, justifyContent: "center", border: "1px solid black", width:"max-content"}}>
						<div className="order__item">Имя -  {obj.fio}</div>
						<div className="order__item">Телефон - {obj.phone}</div>
						<div className="order__item">Кол-во товаров - {obj.products.length}</div>
						<div className="order__item">Общая цена - {obj.fullPrice.toLocaleString()} ₽</div>
					</div>
				))}
			</div>
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