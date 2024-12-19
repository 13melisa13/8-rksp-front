import {Outlet} from "react-router-dom";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {logout} from "./logout.js";
import {useLocation} from "react-router-dom";
import clsx from "clsx";
import styles from './layout.module.scss'

const mode_app = import.meta.env.VITE_MODE_APP;

export default function Layout() {
    const [username, setUsername] =useState(null);
    const location = useLocation();
    const isActiveLink = (path) => {
        return location.pathname === path;
    }

    useEffect(() => {
         setUsername(localStorage.getItem("username"));
    }, [location]);
    const path = "/"+mode_app;
    return (
        <>
        <header className="header">
            <Link to={path}
                  className={clsx(styles.link, isActiveLink(path) && styles.active)} >Главная</Link>
        {username ?
            <>

            <Link to={path+"/profile"} className={clsx(styles.link, isActiveLink(path) && styles.active)}>Профиль</Link>

            <Link onClick={logout} to={'/login'} className={clsx(styles.link,)}>Выход</Link>
            </>
            :
            <>
                <Link className={clsx(styles.link, isActiveLink(path) && styles.active)} to="/login">Login</Link>
                <Link className={clsx(styles.link, isActiveLink(path) && styles.active)} to="/register">Register</Link>
            </>
            }


        </header>
        <main className={"main"}><Outlet /></main>

        </>
        )
}