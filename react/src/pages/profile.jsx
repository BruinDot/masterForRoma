import React from "react";

import { Header } from "../components/Header";
import  { useDispatch, useSelector} from 'react-redux';
import {selectIsAuth, fetchAuthMe} from '../redux/slices/auth.js';
import { useNavigate, Link, useParams, json } from "react-router-dom";
import styles from "../components/profile.module.css"
import axios from "../axios.js";


export default function Profile() {
    const navigate = useNavigate()
    const [userData, setUserData] = React.useState()
    const [fio, setFio] = React.useState()
    const [phone, setPhone] = React.useState()
    const [email, setEmail] = React.useState()
    // const dispatch = useDispatch();
    React.useEffect(() => {
		axios.get("/auth/me").then((res) => {
            let getUserData = res.data
            setUserData(getUserData)
        })
	}, []);
    // const userData = useSelector(state => state.auth.data);
	const handleSubmit = async () => {
        try {
            // setLoading(true);

            const fields = {
                fio,
                phone,
                email,
            }

            await axios.patch(`/auth/edit/${userData._id}`, fields)
        } catch (err) {
            console.warn(err);
            alert('Не удалось зарегистрироваться')
        }
		window.location.reload()
    };

    console.log(userData);
    if (!window.localStorage.getItem('token')) {
        navigate('/')
    }
    return (<>
        <header>
            <nav>
                <Header/>
            </nav>
        </header>

        <main>
            <div className="container">
                <h1>Профиль</h1>
            </div>
            <div className={`${styles.container} ${styles.center}`}>
                {userData && (<>
                    <div className="">
						<span className={styles.text}><b>ФИО:</b></span> 
						<input type="text" defaultValue={userData.fio} onChange={(e) => setFio(e.target.value)}/>
					</div>
                    <div className="">
						<span className={styles.text}><b>Телефон:</b></span>
						<input type="text" defaultValue={userData.phone} 
							style={{backgroundColor: "#C7C7C7", padding: "5px 5px", borderRadius: 8}} onChange={(e) => setPhone(e.target.value)}/>
					</div>
                    <div className="">
						<span className={styles.text}><b>Электронная почта:</b></span>
						<input type="text" defaultValue={userData.email}onChange={(e) => setEmail(e.target.value)}/>
					</div>
					<button onClick={() => handleSubmit()} className={styles.save}>Сохранить</button>
                </>)}
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