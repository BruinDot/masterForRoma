import {React, useState} from "react";
import axiosInstance from "../axios.js";
import styles from"../components/auth.module.css";
import { Header } from "../components/Header";
import { useNavigate, Link } from "react-router-dom";

export default function Auth() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fio: '',
        phone: '',
        email: '',
        password: '',
    });

    const [fio, setFio] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            // setLoading(true);
            e.preventDefault()
            const fields = {
                fio,
                phone,
                email,
                password,
            }

            await axiosInstance.post('/auth/register', fields)
            navigate('/')
        } catch (err) {
            console.warn(err);
            alert('Не удалось зарегистрироваться')
        }
      };

    return (<>
        <header>
            <nav>
                <Header/>
            </nav>
        </header>

        <main>
            <div className={`${styles.authContainer} ${styles.h1}`}>
                <div className={styles.h1}>
                    <h1>Регистрация</h1>
                </div>
                <div className={styles.authForm}>
                    <form onSubmit={handleSubmit}>
                        <label className={styles.label}>
                            <span className={styles.span}>ФИО*</span>
                            <input className={styles.input} type="text" name="fio" value={fio} onChange={(e) => setFio(e.target.value)}/>
                        </label>
                        <label className={styles.label}>
                            <span className={styles.span}>Номер телефона*</span>
                            <input className={styles.input} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        </label>
                        <label className={styles.label}>
                            <span className={styles.span}>Электронная почта*</span>
                            <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </label>
                        <label className={styles.label}>
                            <span className={styles.span}>Пароль*</span>
                            <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </label><br/>
                        <input className={styles.send} type="submit" value="Зарегистрироваться"/>
                    </form>
                    <Link to="/login">Уже зарегистрированы?</Link>
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