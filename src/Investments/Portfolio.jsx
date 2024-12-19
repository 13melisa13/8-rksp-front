import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import StockCard from "./StockCard.jsx";
import {logout} from "../logout.js";
const api = import.meta.env.VITE_API_URL;
const mode_app = import .meta.env.VITE_MODE_APP;
export default function Portfolio(){
    const [stocks, setStocks] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(api + "investments/portfolio", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
                    }})
            .then(res => {
                if (res.ok)
                    return res.json()
                else
                    throw new Error(res.status.toString());
            }).then(data => {
                setStocks(data.stocks);
                setTotal(data.total);
            }).catch(err => {
                logout();
        });
    }, []);
     useEffect(() => {

            if (!localStorage.getItem("username") ) {
                navigate(-1);
            }
        }, [navigate]);
     // console.log(stocks)
    const path = "/" + mode_app;
    return(
        <>
            <h1>Ваши инвестиции</h1>
                <Link to={path}>Самое время пополнить портфель &rarr;</Link>
            <div>
            {Array.isArray(stocks) && stocks.length > 0 && stocks.map(((item, index) =>
                    <StockCard stock={{
                        symbol: item.symbol,
                        quantityOfMy: item.quantity,
                        price: item.currentPrice ,
                        totalValue: item.totalValue,


                    }} key={index}
                inPortfolio={true}
                />
            ))}
            {Array.isArray(stocks) && stocks.length === 0 && <p>Нет инвестиций</p>}
            <p>Всего: {total || 0}</p>
            </div>

        </>
    )}

