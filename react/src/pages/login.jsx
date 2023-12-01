import React, {useState} from "react";
import axiosInstance from "../axios.js";
import styles from"../components/login.module.css";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {selectIsAuth, fetchAuth} from '../redux/slices/auth.js';
import  { useDispatch, useSelector} from 'react-redux';
import { Header } from "../components/Header";


export default function Login({setIsLoggedIn}) {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate();

    const { 
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid},
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'all'
    });
    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));
        console.log(data.payload.Role);
        const role = data.payload.Role;
        const token = data.payload.token;
        
        if (!data.payload) {
            return alert('Не удалось авторизоваться')
        }
        if (role === 'admin') {
            navigate("/admin")
        } else if (role === 'user') {
            navigate("/")
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', token)
        } else {
            alert('Не удалось авторизоваться')
        }
    }
    // console.log(errors, isValid);

    // if (isAuth) {
    //     return <Navigate to="/"/>
    // }
    // const onSubmit = (data) => {
    //     // Выполнение POST-запроса на сервер
    //     axiosInstance.post('/auth/login', data)
    //       .then((res) => {
    //         console.log(res.data);
    //         // Действия после успешной отправки данных
    //         const role = res.data.Role;
    //         const token = res.data.token;
    //         setIsLoggedIn(true);
    //         if (role === 'admin'){
    //             // console.log(setIsLoggedIn); 
    //             // navigate("/admin");
    //             // return [setIsLoggedIn(true), token];
    //         }
    //         else {
    //             // navigate("/");
    //             // return setIsLoggedIn = true;
    //         }
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //         // Действия при ошибке отправки данных
    //       });
    //   };
      console.log('isAuth', isAuth);
    //   const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    return (<>
        <header>
            <nav>
                <Header/>
            </nav>
        </header>

        <main>
            <div className={`${styles.authContainer} ${styles.h1}`}>
                <div className={styles.h1}>
                    <h1>Вход</h1>
                </div>
                <div className={styles.authForm}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                        <label className={styles.label}>
                            {errors.email &&
                                <span className={styles.span}>{errors.email?.message}</span>
                            }
                            <input className={styles.input} type="email" placeholder="E-mail" {...register("email", {required: "Укажите почту"})}/>
                        </label>
                        <label className={styles.label}>
                            {errors.password &&
                                <span className={styles.span}>{errors.password?.message}</span>
                            }
                            <input className={styles.input} type="password" placeholder="Пароль" {...register("password", {required: "Укажите пароль"})}/>
                        </label>
                        <button className={styles.send} type="submit">Войти</button>
                    </form>
                    <Link to="../auth" className={styles.authLink}>Зарегистрироваться</Link>
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