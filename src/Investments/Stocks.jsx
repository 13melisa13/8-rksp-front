import {useEffect, useState} from "react";
import StockCard from "./StockCard.jsx";
import {logout} from "../logout.js";

const api = import.meta.env.VITE_API_URL;
export default function Stocks() {
     const [stocks, setStocks] = useState([]);
     const [myStocks, setMyStocks] = useState([]);
        const [initToRefresh, setInitToRefresh] = useState(true);
        useEffect(() => {
            const handleMyStocks = async () => {
                fetch(api + "investments/portfolio", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                    .then(res => {
                        if (res.ok)
                            return res.json()
                        else
                            throw new Error(res.status.toString());
                    }).then(data => {
                    setMyStocks(data.stocks);

                }).catch(err => {
                    logout();})
                setInitToRefresh(false);
            }
            if (localStorage.getItem("token") && initToRefresh) handleMyStocks();
        }, [initToRefresh]);
    useEffect(() => {
        const handleAllStocks = async () => {
            fetch(api + "investments/stocks", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(res => res.json())
                .then(data => {
                    setStocks(data);
                });
        }
        handleAllStocks();
    }, []);

    return (
        <div>
            <h1>Инвестиции</h1>
            <div>Они почти ваши</div>
                <div className="stocks">

                {Array.isArray(stocks) && stocks.map((stock, index) =>
                    (<StockCard key={index}
                                stock={ {name: stock.name,
                                    price: stock.price,
                                    quantityOfMy: myStocks.find(myStock => myStock.symbol === stock.symbol)
                                            ? myStocks.find(myStock => myStock.symbol === stock.symbol).quantity
                                            : 0,
                                    symbol: stock.symbol,
                                    }}
                                setInitToRefresh={setInitToRefresh}
                                />
                                )) }
                </div>


        </div>
       )
}