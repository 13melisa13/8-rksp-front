import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import {logout} from "../logout.js";
import GameJamCard from "./GameJamCard.jsx";

const api = import.meta.env.VITE_API_URL;
const mode_app = import .meta.env.VITE_MODE_APP;

export default function Profile(){
    const [myJams, setMyJams] = useState([]);
    const [initToRefresh, setInitToRefresh] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(api + "agregator/my-gamejams", {
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
            setMyJams(data.gamejams)
            }).catch(err => {
            setMyJams([{
                name: "name",
                description: "desc",
                quantity: 2,
            }]);
                // logout();
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
            <h1>Ваши ГеймДжемы</h1>
                <Link to={path}>Самое время Найти Новый джем  &rarr;</Link>
            <div>
                {Array.isArray(myJams) && myJams.map((jam, index) =>
                    (<GameJamCard key={index}
                                  gamejam={{
                                      name: jam.name,
                                      desc: jam.description,
                                      my: myJams.find(myJam => myJam.name === jam.name)
                                          ? myJams.find(myJam => myJam.name === jam.name).quantity
                                          : 0,
                                      // quantity: jam.quantity,
                                  }}
                                  setInitToRefresh={setInitToRefresh}
                        />
                    )
                )}
                {Array.isArray(myJams) && myJams.length === 0 && <p>Вы еще не участвовали в геймджеме</p>}


            </div>

        </>
    )
}

