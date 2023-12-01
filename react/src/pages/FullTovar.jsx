import React from "react";

// import { useDispatch, useSelector } from "react-redux";

import axiosInstance from "../axios.js";
import {Tovar} from "../components/Tovar";
import { Header } from "../components/Header";
import {  useParams, Link } from "react-router-dom";
// import { fetchTovars } from "../redux/slices/tovars.js";

export default function FullTovar() {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const { id } = useParams();

    React.useEffect(() =>{
        axiosInstance
            .get(`/tovars/${id}`).then(res => {
                setData(res.data);
                setLoading(false)
            }).catch(err => {
                console.warn(err);
                alert('Ошибка при получении товара');
            });
    }, [])
    if (isLoading) {
        return <Tovar isLoading={isLoading} isFullTovar/>
    }

    return (<>
        <header>
            <nav>
                <Header/>
            </nav>
        </header>

        <main>
            <div className="container flex-between">
                <div className="container__element h1">
                    <h1>О товаре</h1>
                </div>

                {/* <div className="container__element">
                    
                </div> */}
            </div>
            <div className="container flex-wrap pl">
                <Tovar
                    id={data._id}
                    name={data.name}
                    price={data.price}
                    videocard={data.videocard}
                    processor={data.processor}
                    ram={data.ram}
                    motherboard={data.motherboard}
                    power_block={data.power_block}
                    pcCase={data.pcCase}
                    hdd={data.hdd}
                    ssd={data.ssd}
                    imageUrl={data.imageUrl}
                    isFullTovar={true}
                    obj={{'_id': data._id, 'name': data.name,
                    'price': data.price, 'videocard': data.videocard,
                    'processor': data.processor, 'ram': data.ram,
                    'motherboard': data.motherboard, 'power_block': data.power_block,
                    'pcCase': data.pcCase, 'hdd': data.hdd, 'ssd': data.ssd, 'imageUrl': data.imageUrl}}
                    // isEditable
                />
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