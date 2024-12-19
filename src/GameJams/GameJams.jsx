import {useEffect, useState} from "react";
import {logout} from "../logout.js";
import GameJamCard from "./GameJamCard.jsx";

const api = import.meta.env.VITE_API_URL;
export default function GameJams(){
     const [jams, setJams] = useState([]);
     const [myJams, setMyJams] = useState([]);

        const [initToRefresh, setInitToRefresh] = useState(true);
        useEffect(() => {
            const handleMyStocks = async () => {
                fetch(api + "agregator/my-gamejams", {
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
                    setMyJams(data.gamejams)

                }).catch(err => {
                    setMyJams([{
                        name: "name",
                        description: "desc",
                        quantity: 2,
                    }])
//                     logout();
                    })
                setInitToRefresh(false);
            }
            if (localStorage.getItem("token") && initToRefresh) handleMyStocks();
        }, [initToRefresh]);
    useEffect(() => {
        const handleAllStocks = async () => {
            fetch(api + "agregator/gamejams", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(res => {
                             if (res.ok)
                                 return res.json()
                             else
                                 throw new Error(res.status.toString());
                         }).then(data => {
                         setJams(data)

                                 }).catch(err => {
                                     setJams([{
                                         name: "name",
                                         description: "desc",
                                         quantity: 4,
                                     },
                                 {
                                     name: "ne",
                                     description: "dc",
                                   quantity: 48,
                               },
                           {
                               name: "rfhughrne",
                               description: "dcnfrhughrne",
                               quantity: 8,
                               }
                                 ])})
        }
        handleAllStocks();
    }, []);

    return (
        <div>
            <h1>Все предстоящие джемы</h1>
            <div>Участвуйте, Разрабатывайте, Побеждайте</div>
                <div className="jams">

                {Array.isArray(jams) && jams.map((jam, index) =>
                    (<GameJamCard key={index}
                                gamejam={ {name: jam.name,
                                    desc: jam.description,
                                    my: myJams.find(myJam => myJam.name === jam.name)
                                            ? myJams.find(myJam => myJam.name === jam.name).quantity
                                            : 0,
                                    quantity: jam.quantity,
                                    }}
                                setInitToRefresh={setInitToRefresh}
                                />
                                )) }
                </div>


        </div>
       )
}