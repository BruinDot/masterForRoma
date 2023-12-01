import React from "react";
import styles from "../components/cart.module.css"
import cross from "./img/cross.svg"
import axiosInstance from "../axios.js";

import { Header } from "../components/Header";
// import {Tovar} from "../components/Tovar";
import { useNavigate, Link, useParams, json } from "react-router-dom";


export default function Cart() {
	// const [cartItems, setCartItems] = React.useState(true);
    

	// const cartKey = localStorage.getItem('cart')
    // const cartParse = JSON.parse(cartKey);

    // const getCartTovars = () => {
    //     if (cartParse !== null) {
    //         return JSON.parse(cartKey)
    //     }
    //     return [];
    // }
    let cartEmpty = true
	let cartItems
	if(JSON.parse (localStorage.getItem ('cart')) !== null){
		cartItems = JSON.parse (localStorage.getItem ('cart'))
		cartEmpty = false
	}
	else{
		cartItems = [{"count": 1, "cost": 1, "product": {"price": 0,},}]
	}
	const navigate = useNavigate(); 
	let startValue = ['-1']
	if(startValue[0] === '-1'){
		for (let i = 0; i < cartItems.length; i++ ){
			startValue[i] = cartItems[i].count;
		}
	}
    let startPrice = ['-1']
	if(startPrice[0] === '-1'){
		for (let i = 0; i < cartItems.length; i++ ){
			startPrice[i] = parseInt(cartItems[i].product.price) * cartItems[i].count
		}
		var startFullPrice = 0 
		for (let i = 0; i < cartItems.length; i++ ){
			startFullPrice += startPrice[i];
		}
		
	}
    const [value, setValue] = React.useState(startValue)
	const [price, setPrice] = React.useState(startPrice)
	const [fullPrice, setFullPrice] = React.useState(startFullPrice)
    const [deletedItems, setDeletedItems] = React.useState([])
	
	const deleteItemCart = (index) => {
		if(cartItems.length === 1){
			window.localStorage.removeItem('cart')
		}
		else{
			cartItems = JSON.parse (localStorage.getItem ('cart'))
			cartItems.splice(index,1);
			value.splice(index,1);
			price.splice(index,1);
			setFullPriceFunc();
			window.localStorage.setItem('cart', JSON.stringify(cartItems))
		}
		if(deletedItems[0] === undefined){
			let deletedItem = []
			deletedItem[deletedItems.length] = index
			setDeletedItems([...deletedItem])
		}
		else{
			let deletedItem = deletedItems
			deletedItem[deletedItems.length] = index
			setDeletedItems([...deletedItem])
		}
	}
    const checkActiveItem = (index) =>{
		let deletedItemsArr = deletedItems
		for (let i = 0; i < deletedItemsArr.length; i++){
			if(index === deletedItemsArr[i]){
                console.log('working');
				return false
			}
		}
		return true
	}
    console.log('deletedItems', deletedItems);
	const addToCart = (product) => {

		// setCartItems((prev) => prev + 1)

		let count = 1;
		let countT = value;
		let priceT = price;
		let tovars = cartItems;
		// let newItemCart = true;

		// if(tovars.length === 0){
		// 	tovars = [{'count': count, 'product' : product}]
       	// 	localStorage.setItem('cart', JSON.stringify(tovars))
		// }

		// else{

			for(let i = 0; i < tovars.length; i++){
				if(tovars[i].product._id === product._id){
                    countT[i] = countT[i] + 1;
					tovars[i].count = tovars[i].count + count
                    priceT[i] = parseInt(priceT[i]) + parseInt(cartItems[i].product.price)
					localStorage.setItem('cart', JSON.stringify(tovars))
                    setPrice([...priceT])
			        setFullPriceFunc()
					// newItemCart = false
                    setValue([...countT])
                    console.log(countT);
					return
				}
			}
            

			// if (newItemCart) {
			// 	tovars[tovars.length]={'count': count, 'product' : product}
			// 	localStorage.setItem('cart', JSON.stringify(tovars))
			// }
		// }
    };
    const setFullPriceFunc = async () =>{
		let fullprice = 0
		for (let i = 0; i < cartItems.length; i++ ){
			fullprice += parseInt(price[i]);
		}
		setFullPrice(fullprice)
	}
    console.log(value);
    
    // const onSetCart = () => {
    //     setCartItems(false);
    // console.log('cart:', cartItems);

    // }
    // console.log('cart:', cartItems);
	const [user, setUser] = React.useState()
	const [storage, setStorage] = React.useState();

    const setValueDown = (product) => {


		// setCartItems(false)

		let count = -1;
		let countT = value;
		let priceT = price;
		let tovars = cartItems;

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
                        countT[i] = countT[i] - 1;
                        setValue([...countT])
                        priceT[i] = parseInt(priceT[i]) - parseInt(cartItems[i].product.price)
                        setPrice([...priceT])
			            setFullPriceFunc()
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
	
    // const {tovars} = useSelector((state) => state.tovars);
	const [tovars, setTovars] = React.useState([]);
	
    const [fio, setFio] = React.useState('')
    const [phone, setPhone] = React.useState('')
	React.useEffect(() => {
		setTovars(JSON.parse(window.localStorage.getItem('cart')))
		axiosInstance.get('/auth/me').then( res =>
			{
                setUser(res.data)
            }
		).catch((err) => {
            if (err) {
                setUser(false)
            }
        })
	}, []);
    React.useEffect(() => {
        if (user) {
            setFio(user.fio)
            setPhone(user.phone)
        }
    })
	// console.log(tovars)
	console.log(tovars)
	console.log("user", user)
    // const isTovarsLoading = tovars.status === 'loading';

    // React.useEffect(() => {
    //     dispatch(fetchCartTovars())
    // }, [])
    // console.log(tovars);
    const clearCart = () => {
        localStorage.removeItem('cart')
        cartEmpty = true
    }
    const [windowOpen, setWindowOpen] = React.useState(false)
    // let windowOpen = false
    console.log(windowOpen);
    const onWindowOpen = () => {
        setWindowOpen(true)
    }
    const onWindowClose = () => {
        setWindowOpen(false)
    }
    console.log(cartItems);
    const sendOrder = async () =>{
		let products = cartItems
		let fields
			fields = {
				fio, phone, fullPrice, products, userId: user._id
			}
		
		await axiosInstance.post('/orders', fields).then(
			window.localStorage.removeItem('cart'),
			user ? navigate('/history') : alert('Заявка успешно отправлена!')
		)
	}
    return (
        <>
            <header>
                <nav>
                    <Header/>
                </nav>
            </header>

            <main>
                {/* <div className={`${styles.container} ${styles.flexBetween}`}> */}
                    {!window.localStorage.getItem('cart') && cartEmpty ? (<>
                        <div className={`${styles.container} ${styles.flexBetween}`}>
                            <div className=""><h1>Корзина</h1></div>
                            <div className=""><p>
                                Добавьте что-нибудь! 
                            </p></div>
                        </div>
                    </>) : !cartEmpty && (
                            <>
                                <div className={`${styles.container} ${styles.flexBetween}`}>
                                    <div className=""><h1>Корзина</h1></div>
                                    <div className=""><a onClick={() => (clearCart())}>Очистить всё</a></div>
                                </div>
                                {windowOpen &&
                                    <div className={styles.container}>
                                        <div className={`${styles.modalWindow}`}>
                                            <div className={styles.flexBetween}>
                                                <h2>Оформление заказа</h2>
                                                <Link onClick={() => onWindowClose()}><img src={cross} width="20px" height="20px"/></Link>
                                            </div>
                                            <div className={styles.flexColumn}>
                                                <form onSubmit={sendOrder} className={styles.formContainer}>
                                                    <label className={styles.label}>
                                                        <input className={styles.input} type="text" placeholder="ФИО" value={user.fio} onChange ={(e) => setFio(e.target.value)}/>
                                                    </label>
                                                    <label className={styles.label}>
                                                        <input className={styles.input} type="tel" placeholder="Номер телефона" value={user.phone} onChange ={(e) => setPhone(e.target.value)}/>
                                                    </label>
                                                    {/* <button className={styles.send} type="submit">Заказать</button> */}
													<div className={styles.send} onClick={() => sendOrder()}>Заказать</div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className={`${styles.container} ${styles.flexColumn}`}>
                                    {Array.isArray(tovars) && tovars.map((obj, index) => (
                                            checkActiveItem(index) && (
                                            <div className={`${styles.item} ${styles.flex}`}>
                                                <div className={styles.pc}><img src={obj.product.imageUrl} alt="" className={styles.pcImg} width="100%"/></div>
                                                <div className={styles.data}>
                                                    <h2 className={styles.h2}>{obj.product.name}</h2>
                                                    <div className={styles.flexBetween}>
                                                    <div className={styles.objData}>
                                                        {obj.product.processor && (
                                                            <span>{obj.product.processor}, </span>
                                                        )}
                                                        {obj.product.videocard && (
                                                            <span>{obj.product.videocard}, </span>
                                                        )}
                                                        {obj.product.ram && (
                                                            <span>{obj.product.ram}, </span>
                                                        )}
                                                        {obj.product.ssd && (
                                                            <span>{obj.product.ssd}, </span>
                                                        )}
                                                        {obj.product.hdd && (
                                                            <span>{obj.product.hdd} </span>
                                                        )}
                                                    </div>
                                                    <Link className={styles.delete} onClick={() => deleteItemCart(index)}><img src={cross} width="30px" height="30px"/></Link>
                                                    </div>
                                                    
                                                    <div className={styles.flexBetweenEnd}>
                                                        <div className={styles.addButton}>
                                                            <Link onClick={() => addToCart(obj.product)}>+</Link>
                                                            <a className={styles.value}>{value[index]}</a>
                                                            {/* {value && (<a>{value[index]}</a>)} */}
                                                            <Link onClick={() => setValueDown(obj.product)}>-</Link>
                                                        </div>
                                                        {price && typeof price[index] === 'number' && (
                                                        <div className={styles.totalPrice}>{price[index].toLocaleString()} ₽</div>
                                                        )}
                                                    </div>
                                                    <p className={styles.price}>{obj ? obj.product.price.toLocaleString() : 0} ₽ /<br/> шт</p>
                                                </div>
                                            </div>
                                            )
                                    ))}
                                    <Link className={styles.oformOrder} onClick={() => onWindowOpen()}>Оформить заказ</Link>
                                </div>
                            </>
                        )
                    }
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
        </>
    )
}