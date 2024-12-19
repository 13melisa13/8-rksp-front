import React from 'react';
import {Link} from 'react-router-dom';

const api = import.meta.env.VITE_API_URL;

export default function GameJamCard({gamejam, setInitToRefresh}) {
    const {name, desc, quantity, my} = gamejam;
    const [isOpen, setIsOpen] = React.useState(false);
    const [quantityMemberInComand, setQuantity] = React.useState(1);
    const requestOnJam = async (e) =>{
        e.preventDefault();
        if (localStorage.getItem("token"))
            fetch(api + 'agregator/gamejams/request', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    name: name,
                    quantity: parseInt(quantityMemberInComand),
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
        <h5 className="card-title">Геймджем:{name}</h5>
            <p className="card-text">Описание:{desc}</p>
            {quantity && <h6 className="card-subtitle">Уже зарегистрировалось {quantity}</h6>}

        {my > 0 ? <h6 className="card-myStock">Ваша команда участвует в составе {my}</h6> :
        <button className="button"
                onClick={()=>{setIsOpen(true);}}>Участвовать</button>}
        {isOpen &&
            <form onSubmit={requestOnJam}>
            {localStorage.getItem("token") ? <>
            <button type="submit">Вы хотите зарегать {quantityMemberInComand} участников</button>
            <input type="number" value={quantityMemberInComand} onChange={(e)=>setQuantity(e.target.value)}/>
            </> : <>Для продолжения операции необходимо <Link to="/login">войти</Link> или <Link to="/register">зарегистрироваться</Link></>}
            </form>}
        </div>

        );
}
