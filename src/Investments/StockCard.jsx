import React from 'react';
import {Link} from 'react-router-dom';
const api = import.meta.env.VITE_API_URL;
export default function StockCard({stock, setInitToRefresh, inPortfolio=false}) {
    const {name, price, symbol, quantityOfMy, totalValue} = stock;
    const [isOpen, setIsOpen] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);
    const buyThis = async (e) =>{
        e.preventDefault();
        if (localStorage.getItem("token"))
            fetch(api + 'investments/stocks/buy', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    symbol: symbol,
                    quantity: parseInt(quantity),
                })
            }).then(res => {
                if(res.ok){
                    setInitToRefresh(true);
                    return res.json();
                }

            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="card">
        <h5 className="card-title">Компания:{name}</h5>
        <h6 className="card-subtitle">{symbol}</h6>
        <h6 className="card-price">Цена: {price}руб.</h6>
        {totalValue > 0 && <h6 className="card-totalValue">Всего: {totalValue}руб.</h6>}
        {quantityOfMy > 0 && <h6 className="card-myStock">У вас уже есть {quantityOfMy} штук</h6>}
        <button className="button"
                onClick={()=>{setIsOpen(true);}}>{inPortfolio ? "Купить еще" : "Добавить в портфель"}</button>
        {isOpen &&
            <form onSubmit={buyThis}>
            {localStorage.getItem("token") ? <>

            <button type="submit">Купить за {price * quantity}</button>
            <input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
            </> : <>Для продолжения операции необходимо <Link to="/login">войти</Link> или <Link to="/register">зарегистрироваться</Link></>}
            </form>}
        </div>

        );
}
