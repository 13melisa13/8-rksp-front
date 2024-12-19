import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const api = import.meta.env.VITE_API_URL;
const mode_app = import .meta.env.VITE_MODE_APP;

export default function Register() {
    const [form, setForm] = useState({
        username: "user2",
        password: "password",
        email: "user@gmail.com",
        tg: "alxq0"
        })
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        fetch(api + 'auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            setErrors(["Пользователь с таким username или email уже существует"]);
            throw new Error(res.statusText);
        }).then(data => {
            const token = data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("username", form.username);
            navigate(localStorage.getItem("path") || '/');
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        if (localStorage.getItem("username") ) {
            navigate("/"+mode_app);
        }
    }, [navigate]);
    return (
        <form onSubmit={(e) => {handleSubmit(e)}}>
            <h1>Register</h1>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Username" name="username" value={form.username} onChange={handleChange}/>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange}/>
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="Email" name="email" value={form.email} onChange={handleChange}/>
            <label htmlFor="tg">Telegram</label>
            <input type="text" placeholder="Telegram" name="tg" value={form.tg} onChange={handleChange}/>
            <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
            <button type="submit" >Register</button>
        </form>
    )
}
