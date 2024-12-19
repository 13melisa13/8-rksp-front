

import {Navigate} from "react-router-dom";

const mode_app = import.meta.env.VITE_MODE_APP;
export default function Index() {
    console.log(mode_app)

    return (<>
            <Navigate to={"/"+mode_app}/>
        {/*    */}
        {/*<h1>Index</h1>*/}
        {/*<p>This is index page</p>*/}
        {/*<Link onClick={()=>localStorage.setItem("path","/gamejams")}*/}
        {/*    to="/gamejams"> Game Jam</Link>*/}
        {/*<Link onClick={()=>localStorage.setItem("path","/investments")}*/}
        {/*    to="/investments"> Invest</Link>*/}
        </>
        )
}