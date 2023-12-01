import React from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

import axiosInstance from "../axios.js";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../components/Header";
import {selectIsAuth, fetchAuthMe} from '../redux/slices/auth.js';


import styles from "../components/AddTovar.module.css";
import cross from "./img/cross.svg";


export default function AddTovar() {
    const {id} = useParams();
    const [imageUrl, setImageUrl] = React.useState(null);
    const [isLoading, setLoading] = React.useState(false);
    const [showEl, setShowEl] = React.useState(true);
    const isAuth = useSelector(selectIsAuth);
    const isEditing = Boolean(id);
    // const dispatch = useDispatch();
    const inputFileRef = React.useRef(null);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    React.useEffect(() => {
		dispatch(fetchAuthMe())
	}, []);
    const userData = useSelector(state => state.auth.data);
    console.log("UserRole", userData);


    const handleFileChange = async(event) => {
        console.log(event.target.files);
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file)
            const {data} = await axiosInstance.post('/upload', formData);
            setImageUrl(data.url);
            setShowEl(false);
            console.log(data);
        } catch (err) {
            console.warn(err);
            alert('Не удалось загрузить картинку')
        }
    };
    
    // const [tovarsData, setTovarsData] = React.useState({
    //     name: '',
    //     cost: '',
    //     imageUrl: '',
    //     videocard: '',
    //     processor: '',
    //     ram: '',
    //     motherboard: '',
    //     power_block: '',
    //     hdd: '',
    //     ssd: '',
    //     pcCase: '',
    // });
    // const handleChange = (event) => {
    //     setTovarsData({ ...tovarsData, [event.target.name]: event.target.value });

    // };
    // console.log({tovarsData});

    
    const [name, setName] = React.useState('Альфа-ПК');
    const [price, setPrice] = React.useState(40000);
    const [videocard, setVideocard] = React.useState('Видеокарта');
    const [processor, setProcessor] = React.useState('Процессор');
    const [ram, setRam] = React.useState('4 ГБ');
    const [motherboard, setMotherboard] = React.useState('Материнка');
    const [power_block, setPowerBlock] = React.useState('Блок питания');
    const [hdd, setHdd] = React.useState('1 тб');
    const [ssd, setSsd] = React.useState('500 гб');
    const [pcCase, setPcCase] = React.useState('Корпус');

    console.log({
        name,
        price,
        imageUrl,
        videocard,
        processor,
        ram,
        motherboard,
        power_block,
        hdd,
        ssd,
        pcCase
    });

    const onSubmit = async () => {
        try {
            setLoading(true);

            const fields = {
                name,
                price,
                imageUrl,
                videocard,
                processor,
                ram,
                motherboard,
                power_block,
                hdd,
                ssd,
                pcCase,
            }
            if (isEditing) {
                await axiosInstance.patch(`/tovars/${id}`, fields)
            } else {
                await axiosInstance.post('/tovars', fields)
            }
        } catch (err) {
            console.warn(err);
            alert('Не удалось добавить товар')
        }

    };

    React.useEffect(() => {
        axiosInstance.get(`/tovars/${id}`).then(({ data }) => {
            setName(data.name);
            setPrice(data.price);
            setImageUrl(data.imageUrl);
            setVideocard(data.videocard);
            setProcessor(data.processor);
            setRam(data.ram);
            setMotherboard(data.motherboard);
            setPowerBlock(data.power_block);
            setHdd(data.hdd);
            setSsd(data.ssd);
            setPcCase(data.pcCase);
        }).catch((err) => {
            console.warn(err);
        })
    }, [])

    const onClickRemoveImage = () => {
        setImageUrl('');
        setShowEl(true)
    }
    if (!window.localStorage.getItem('token') && !isAuth && !userData) {
        navigate('/')
    }
    return (
        <>
        <header>
            <nav>
                <Header/>
            </nav>
        </header>
        
        <main>
            <div className="container flex-column">
            <div className="container__element h1">
                    <h1>Добавить товар</h1>
                </div>
            </div>
            <div className="container flex-wrap pl">
                {/* <div className={styles.modalOverlay}> */}
                <div className={styles.modal}>
                    <div className={styles.formHeader}>
                        <h2>Заполните форму</h2>
                        <Link to="/admin">
                            <img src={cross} alt="" width="20px" height="20px" className={styles.cross}/>
                        </Link>
                    </div>
                    
                    <div className={styles.modalContent}>
                        <form>
                            <label className={styles.imgLabel}>
                                {showEl && (
                                        <>
                                            <button className={styles.addButton} type="button" onClick={() => inputFileRef.current.click()}>Добавить картинку</button>
                                        
                                            <input 
                                                className={styles.inputImage} 
                                                ref={inputFileRef} 
                                                type="file" accept="image/jpeg, image/png"
                                                hidden
                                                onChange={handleFileChange}
                                            />
                                    </>)
                                }
                                {imageUrl && (
                                        <>
                                            <img src={`${imageUrl}`} alt="" className={styles.uploadedImg}/>
                                            <button type="button" onClick={() => onClickRemoveImage()} className={styles.send}>Удалить картинку</button>
                                    </>)
                                }
                                
                            </label>
                            <label className={styles.label}>
                                <span className={styles.span}>Название компьютера*</span>
                                <input className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                            </label>
                            <label className={styles.label}>
                                <span className={styles.span}>Цена*</span>
                                <input className={styles.input} type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                            </label>
                            <label className={styles.label}>
                                <span className={styles.span}>Видеокарта*</span>
                                <input className={styles.input} type="text" value={videocard} onChange={(e) => setVideocard(e.target.value)}/>
                            </label>
                            <label className={styles.label}>
                                <span className={styles.span}>Процессор*</span>
                                <input className={styles.input} type="text" value={processor} onChange={(e) => setProcessor(e.target.value)}/>
                            </label>
                            <label className={styles.label}>
                                <span className={styles.span}>Оперативная память*</span>
                                <input className={styles.input} type="text" value={ram} onChange={(e) => setRam(e.target.value)}/>
                            </label>
                            <label className={styles.label}>
                                <span className={styles.span}>Материнская плата*</span>
                                <input className={styles.input} type="text" value={motherboard} onChange={(e) => setMotherboard(e.target.value)}/>
                            </label>
                            <label className={styles.label}>
                                <span className={styles.span}>Блок питания*</span>
                                <input className={styles.input} type="text" value={power_block} onChange={(e) => setPowerBlock(e.target.value)}/>
                            </label>
                            <label className={styles.label}>
                                <span className={styles.span}>Корпус*</span>
                                <input className={styles.input} type="text" value={pcCase} onChange={(e) => setPcCase(e.target.value)}/>
                            </label>
                            <label className={styles.label}>
                                <span className={styles.span}>Жесткий диск</span>
                                <input className={styles.input} type="text" value={hdd} onChange={(e) => setHdd(e.target.value)}/>
                            </label>
                            <label className={styles.label}>
                                <span className={styles.span}>Твердотельный накопитель</span>
                                <input className={styles.input} type="text" value={ssd} onChange={(e) => setSsd(e.target.value)}/>
                            </label>
                            <p className={styles.hint}>
                                * - отмечены обязательные поля
                            </p>
                            <label><button className={styles.send} type="submit" onClick={onSubmit}>
                                {isEditing ? 'Сохранить' : 'Добавить товар'}
                            </button></label>
                            {/* <button className={styles.send} type="submit">Добавить товар</button> */}
                        </form>
                    </div>
                </div>
                {/* </div> */}
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