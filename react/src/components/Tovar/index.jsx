import React from "react";
import "../index.css";

// import { useDispatch } from "react-redux";
import { TovarSkelet } from "./Skelet";

import { useNavigate, Link, useParams, json } from "react-router-dom";
import  { useDispatch, useSelector} from 'react-redux';
import { fetchRemoveTovar } from "../../redux/slices/tovars";
import {selectIsAuth, fetchAuthMe} from '../../redux/slices/auth.js';

import styles from"../FullTovar.module.css";


export const Tovar = ({
    _id,
    key,
    name,
    price,
    type,
    category,
    imageUrl,
    isFullTovar,
    isLoading,
	obj,
    isEditable,
}) => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    // const isAuth = useSelector(selectIsAuth);
    let isAuth = false;
    const [cartItems, setCartItems] = React.useState(true);

    const [cart, setCart] = React.useState(true);
    
    const cartKey = localStorage.getItem('cart')
    const cartParse = JSON.parse(cartKey);

    const getCartTovars = () => {
        if (cartParse !== null) {
            return JSON.parse(cartKey)
        }
        return [];
    }

    const addToCart = (product) => {
        console.log('work');
		let count = 1;

		let tovars = getCartTovars();
		let newItemCart = true;

		if(tovars.length === 0){
			tovars = [{'count': count, 'product' : product}]
       		localStorage.setItem('cart', JSON.stringify(tovars))
			setCartItems(tovars)
		}

		else{

			for(let i = 0; i < tovars.length; i++){
				if(tovars[i].product._id === product._id){
					tovars[i].count = tovars[i].count + count
					localStorage.setItem('cart', JSON.stringify(tovars))
					setCartItems(tovars)
					newItemCart = false
					return
				}
			}

			if (newItemCart) {
				tovars[tovars.length]={'count': count, 'product' : product}
				localStorage.setItem('cart', JSON.stringify(tovars))
				setCartItems(tovars)
			}
		}
    };
    
    // const onSetCart = () => {
    //     setCartItems(false);
    // console.log('cart:', cartItems);

    // }
    // console.log('cart:', cartItems);
	const [storage, setStorage] = React.useState();

    const setValueDown = (product) => {

		setCartItems(false)

		let count = -1;

		let tovars = getCartTovars();

		if(tovars.length === 0){
			return
		}
		
		else{
			for(let i = 0; i < tovars.length; i++){
				if(tovars[i].product._id === product._id){
					if(tovars[i].count === 1){
						tovars.splice(i, 1);
						
					}
					else{
						tovars[i].count = tovars[i].count + count
					}
					localStorage.setItem('cart', JSON.stringify(tovars))
					return
				}
			}
		}


        // let tovars = getCartTovars();
        // let count = tovars.count + 1
        // tovars = [{'count': count, 'product' : product}]
		// setStorage(tovars)
        // window.localStorage.setItem('cart', JSON.stringify(tovars))
		
    };
    
    // let isAdmin = false;
	// const [userData, setUserData] = React.useState()
	// const [isAdmin, setIsAdmin] = React.useState(false)
    // if (userData && userData.Role && !isAdmin) {
    //     if (userData.Role === 'admin') {
    //         setIsAdmin(true)
    //     } else {
    //         setIsAdmin(false)
    //     }
    // }
    
    if (isLoading) {
        return <TovarSkelet/>;
    }
    const onClickRemove = (_id) => {
        if (window.confirm('Вы действительно хотите удалить товар?')) {
            dispatch(fetchRemoveTovar(_id))
        }
    }
    const checkF = (obj) => {
        console.log(obj);
    }
    // console.log(userData.Role);
    if (window.localStorage.getItem('token')) {
        isAuth = true
    }
    // console.log(window.localStorage.getItem('cart'));
    console.log(obj);
    return (
        <>
            { !isFullTovar ? ((isEditable) ? 
                    (<div className="tovar-card">
                        <div> <img src={imageUrl} alt="" className="pcImg" width="100%"/> </div>
                        <div className="tovar-card_content h2">
                            <div className="title"> <h2>
                                    {isFullTovar ? name : <Link to={`/tovars/${_id}`}>{name}</Link>}
                                </h2> </div>
                            <div className="price"> {price > 999 ? price.toLocaleString() : price} руб</div>
                            <div className="more">
                                <a onClick={() => onClickRemove(_id)}>
                                    Удалить
                                </a>
                                <Link to={`/tovars/${_id}/edit`} className={styles.buyButton}>Обновить</Link>
                            </div>
                        </div>
                    </div>
                    ) : !isEditable && (<div className="tovar-card">
                            <div> <img src={imageUrl} alt="" className="pcImg" width="100%"/> </div>
                            <div className="tovar-card_content h2">
                                <div className="title"> <h2>
                                        {isFullTovar ? name : <Link to={`/tovars/${_id}`}>{name}</Link>}
                                    </h2> </div>
                                <div className="price"> {price > 999 ? price.toLocaleString() : price} руб</div>
                                <div className="more">
                                    <Link to={`/tovars/${_id}`}>
                                        Подробнее
                                    </Link>
                                    {/* {!(window.localStorage.getItem('cart')) ? (  */}
                                        <Link onClick={() => addToCart(obj)} className={styles.buyButton}>Купить</Link>
                                    {/* ) : ( */}
                                    {/* )} */}
                                </div>
                            </div>
                        </div>)
                ) : ( 
                    <div className={styles.tovarCard}>
                        <div> <img src={imageUrl} alt="" className="pcImg" width="100%"/> </div>
                        <div className="h2">
                            <div className="title"><b> <h2>
                                    {isFullTovar ? name : <Link to={`/tovars/${_id}`}>{name}</Link>}
                                </h2></b> </div>
                            <p className="price">Цена: {price > 999 ? price.toLocaleString() : price} руб</p>
                            <div className="more">
                                <Link onClick={() => addToCart(obj)} className={styles.buyButton}>Купить</Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
};
