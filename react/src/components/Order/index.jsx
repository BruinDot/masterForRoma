import React from "react";
import "../index.css";

// import { useDispatch } from "react-redux";
// import { TovarSkelet } from "./Skelet";

import { useNavigate, Link, useParams, json } from "react-router-dom";
import  { useDispatch, useSelector} from 'react-redux';
import { fetchOrders } from "../../redux/slices/orders.js";
import {selectIsAuth, fetchAuthMe} from '../../redux/slices/auth.js';

import styles from"../FullTovar.module.css";


export const Order = ({
    _id,
    fio,
    phone,
    products,
    fullPrice
}) => {
    const dispatch = useDispatch();
    const {orders} = useSelector((state) => state.orders);
    const isTovarsLoading = orders.status === 'loading';
    React.useEffect(() => {
        dispatch(fetchOrders());
    }, [])
    console.log(orders);

    return ({

    })
}