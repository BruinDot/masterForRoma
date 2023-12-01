import React from "react";
import axiosInstance from "../axios.js";
import { useDispatch, useSelector } from "react-redux";

import "../components/index.css";
import "../components/normalize.css";

import {Tovar} from "../components/Tovar";
import { Header } from "../components/Header";
import { Header1 } from "../components/Header1";
import filterIco from "./img/filter_icon.svg";
import { useNavigate, Link } from "react-router-dom";
import { fetchTovars, fetchSortTovars } from "../redux/slices/tovars.js";
import { fetchCategories } from "../redux/slices/categories.js";


export default function Catalog() {
    const navigate = useNavigate();
    const [categories, setCategories] = React.useState();
    const dispatch = useDispatch();
    let {tovars} = useSelector((state) => state.tovars);
    // let categories = useSelector((state) => state.categories);
    // const [sorted, setSorted] = React.useState(tovars)
    const isTovarsLoading = tovars.status === 'loading';
    React.useEffect(() =>{
        axiosInstance
            .get(`/categories`).then(res => {
                setCategories(res.data);
            }).catch(err => {
                console.warn(err);
                alert('Ошибка при получении товара');
            });
    }, [])
    console.log(categories);

    const [sortType, setSortType] = React.useState('byTovars');
    const handleSortChange = (event) => {
        setSortType(event.target.value);
        console.log(sortType);
    };

    React.useEffect(() => {
        tovars = dispatch(fetchSortTovars(sortType));
    }, [sortType])

    const more = (id) =>{
        navigate(`/tovars/${id}`)
    }
    return (<>
        <header>
            <nav>
                <Header/>
                <Header1/>
            </nav>
        </header>

        <main>
            <div className="container flex-between">
                <div className="container__element h1">
                    <h1>Каталог</h1>
                </div>
                <div className="container__element flex">
                    <div className="sort">
                            <div className="sort">
                                    <label htmlFor="sort_vrnts">Сортировка:</label>
                                    <select name="sort_vrnts" id="sort_vrnts" value={sortType} onChange={handleSortChange}>
                                        <option value="byTovars" name="byTovars">По умолчанию</option>
                                        <option value="byPriceUp" name="byPriceUp">По возрастанию цены</option>
                                        <option value="byPriceDown" name="byPriceDown">По убыванию цены</option>
                                    </select>
                            </div>
                    </div>
                    <div className="filters">
                        <img src={filterIco} alt="" className="filter"/>
                    </div>
                </div>
            </div>
            <div className="container flex-start pl">
                <div className="catCon">
                    <h3 className="h3">Категории:</h3>
                    <div className="catEl"><Link to="/categories/65686206a37a3af645829bed">Удилища</Link></div>
                    <div className="catEl"><Link to="/categories/65686206a37a3af645829bed">Катушки</Link></div>
                    <div className="catEl"><Link to="/categories/65686206a37a3af645829bed">Крючки</Link></div>
                    <div className="catEl"><Link to="/categories/65686206a37a3af645829bed">Грузила</Link></div>
                </div>
                <div className="tovCon flex-wrap">
                    
                {(isTovarsLoading ? [...Array(8)] : tovars.items).map((obj, index) => 
                    isTovarsLoading ? 
                    (
                        <Tovar key={index} isLoading={true}/>
                    ) : (
                        <Tovar
                            key={index}
                            _id={obj._id}
                            name={obj.name}
                            price={obj.price}
                            videocard={obj.videocard}
                            processor={obj.processor}
                            ram={obj.ram}
                            motherboard={obj.motherboard}
                            power_block={obj.power_block}
                            pcCase={obj.pcCase}
                            hdd={obj.hhd}
                            ssd={obj.ssd}
                            imageUrl={obj.imageUrl}
                            obj={obj}
                            isFullTovar={false}
                            isEditable={false}
                        />
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