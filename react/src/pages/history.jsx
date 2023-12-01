import React from "react";
import styles from "../components/history.module.css"
import cross from "./img/cross.svg"
import axiosInstance from "../axios.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux/slices/orders.js";

import { Header } from "../components/Header";
// import {Tovar} from "../components/Tovar";
import { useNavigate, Link, useParams, json } from "react-router-dom";

export default function History() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
    const {tovars} = useSelector((state) => state.tovars);
    const isTovarsLoading = tovars.status === 'loading';
    React.useEffect(() => {
		dispatch(fetchOrders()).then(res => setOrders(res.payload))
    }, [])
    console.log(tovars);

	const [orders,  setOrders] = React.useState();

	console.log(orders);

	if (!window.localStorage.getItem('token') || orders == null) {
		navigate('../')
	}
	return(<>
		<header>
            <nav>
                <Header/>
            </nav>
        </header>

		<main>
			<div className={`${styles.container} ${styles.flexBetween}`}>
				<h1>История заказов</h1>
			</div>
			<div className="container">
				<div className="order__container">
					{orders?.map((obj, index) =>(
						<div className={styles.orderBlock} style={{border: "1px solid black",}}>
							<div className={styles.orderItem}>Имя -  {obj.fio}</div>
							<div className={styles.orderItem}>Телефон - {obj.phone}</div>
							<div className={styles.orderItem}>Кол-во товаров - {obj.products.length}</div>
							<div className={styles.orderItem}>Общая цена - {obj.fullPrice.toLocaleString()} ₽</div>
						</div>
					))}
				</div>
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