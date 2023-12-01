import React from "react";
import { logout, selectIsAuth} from '../../redux/slices/auth.js';
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Header.module.css";
import {fetchAuthMe} from '../../redux/slices/auth.js';
import {fetchSearchTovars} from '../../redux/slices/tovars.js';
import { fetchTovars, fetchSortTovars } from "../../redux/slices/tovars.js";


import logo from "./img/rod.svg";
import searchButton from "./img/searchButton.svg";
import profile from "./img/profile.svg";
import cart from "./img/cart.svg";
import logoutImg from "./img/logout.svg";

export const Header1 = () => {
    const [query, setQuery] = React.useState('');
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    let token = false;
    const navigate = useNavigate();
	// const userData = useSelector(state => state.auth.data);

	React.useEffect(()=>{
		dispatch(fetchAuthMe()).then(res => setUserData(res.payload))
	},[])
	React.useEffect(()=>{
		if (query) {
            dispatch(fetchSearchTovars(query))
        } else {
            dispatch(fetchSortTovars('byTovars'));
        }
	},[query])
    
    // let isAdmin = false;
	const [userData, setUserData] = React.useState()
	const [isAdmin, setIsAdmin] = React.useState(false)
    
    React.useEffect(()=>{
		if (userData && userData.Role && !isAdmin) {
            if (userData.Role === 'admin') {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        }
	},[])
	console.log('isAdmin', isAdmin);
    const onClickLogout = () => {
        if (window.confirm('Вы действительно хотите выйти?')) {
            dispatch(logout());
            window.localStorage.removeItem('token')
			navigate('/')
        }
    }
    let cartEmpty = true
    let cartItems
	if(JSON.parse (localStorage.getItem ('cart')) !== null){
		cartItems = JSON.parse (localStorage.getItem ('cart'))
		cartEmpty = false
	}
	else{
		cartItems = [{"count":1,"product":{"_id":"6377987a6359d93c2c7e31ca","name":"Клубничная башня","price":"1598","category":{"_id":"637871432dc9c0dfd59e467d","name":"cakes","createdAt":"2022-11-19T06:01:39.632Z","updatedAt":"2022-11-19T06:01:39.632Z","__v":0},"imageUrl":"/uploads/cakes/town.png","composition":"Пшеничная мука, яйца, сахар, сливочное масло, молоко, соль","createdAt":"2022-11-18T14:36:42.642Z","updatedAt":"2022-11-18T14:36:42.642Z","__v":0}}]
	}
    if (window.localStorage.getItem('token')) {
        token = true
    } else {
		token = false
		
	}
    // const mainPath = window.location.pathname === "/";
    // console.log('mainPath', mainPath);
    // if (!window.localStorage.getItem('token') && !isAuth) {
    //     // if (!mainPath) {
    //         navigate("/")
    //     // }
    // }
    console.log(cartItems.length);
    console.log('isAuth', isAuth);
    console.log(query);
    return (
        <div className={styles.root}>
                {token ? (
                    <>
                        <div className="container flex-between">
                            <div className="container__element">
                                <div className="logo">
                                    <img src={logo} alt="logo" />
                                </div>
                            </div>
                            {isAdmin ? (
                                <div className="container__element">
                                <div className="nav_items">
                                    <ul className="hr">
                                        <li><Link to="/admin">Панель администратора</Link></li>
                                        <li><Link to="/orders">Заказы</Link></li>
                                    </ul>
                                </div>
                            </div>
                            ) : (
                                <div className="container__element">
                                    {/* <div className="nav_items">
                                        <ul className="hr">
                                            <li><Link to="/">Главная</Link></li>
                                            <li><Link to="/tovars">Каталог</Link></li>
                                            <li><Link to="/history">История заказов</Link></li>
                                            <li><Link to="/profile">Профиль</Link></li>
                                            <li><Link to="/about">О компании</Link></li>
                                        </ul>
                                    </div> */}
                                </div>
                            )}
                            <div className="container__element">
                                <div className="nav-search_items">
                                    {/* <div className="search-bar">
                                        <img src={searchButton} alt="" />
                                    </div> */}
                                    <form>
                                        <input 
                                            className="searchInp" 
                                            type="text" 
                                            placeholder="Искать здесь..." 
                                            onChange={(event) => setQuery(event.target.value)}
                                            />
                                        <button className="searchBut" type="submit"><img src={searchButton} alt="" className="srcImg" /></button>
                                    </form>
                                </div>
                            </div>
                            <div className="container__element">
                                <button onClick={onClickLogout} className="flex">
                                    Выйти
                                    <img src={logoutImg} alt="" className="profile" width="35px" height="35px"/>
                                </button>
                            </div>
							<div className="container__element">
                            {!isAdmin &&
                                (window.localStorage.getItem('cart') ? (
                                    <>
                                        <Link to="/cart"><img src={cart} alt="" className="cart" /></Link>
                                        <span>{cartItems.length}</span>
                                    </>
                                ) : (
                                    <Link to="/cart"><img src={cart} alt="" className="cart" /></Link>
                                ))
                            }
							</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="container flex-between">
                            <div className="container__element">
                                <div className="logo">
                                    <img src={logo} alt="logo" />
                                </div>
                            </div>
                            <div className="container__element">
                                {/* <div className="nav_items">
                                    <ul className="hr">
                                        <li><Link to="/">Главная</Link></li>
                                        <li><Link to="/tovars">Каталог</Link></li>
                                        <li><Link to="/about">О компании</Link></li>
                                    </ul>
                                </div> */}
                            </div>
                            <div className="container__element">
                                <div className="nav-search_items">
                                    {/* <div className="search-bar">
                                        <img src={searchButton} alt="" />
                                    </div> */}
                                    <form>
                                        <input 
                                            className="searchInp" 
                                            type="text" 
                                            placeholder="Искать здесь..." 
                                            onChange={(event) => setQuery(event.target.value)}
                                            />
                                        <button className="searchBut" type="submit"><img src={searchButton} alt="" className="srcImg" /></button>
                                    </form>
                                </div>
                            </div>
                            <div className="container__element">
                                {/* <div className="contacts">
                                    <ul>
                                        <li>+7 800 555 35 35</li>
                                        <li>+7 800 555 35 35</li>
                                    </ul>
                                </div> */}
                            </div>
                            <div className="container__element">
                                <Link to="/auth">
                                <img src={profile} alt="" className="profile" width="35px" height="35px"/>
                                </Link>
                            </div>
                            <div className="container__element">
                                {window.localStorage.getItem('cart') ? (
                                    <>
                                        <Link to="/cart"><img src={cart} alt="" className="cart" /></Link>
                                        <span>{cartItems.length}</span>
                                    </>
                                ) : (
                                    <Link to="/cart"><img src={cart} alt="" className="cart" /></Link>
                                )}
                            </div>
                        </div>
                    </>
                )}
        </div>
    )
}