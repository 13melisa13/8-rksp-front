import React, {useEffect} from 'react';
import {useState } from 'react';
import {useNavigate} from "react-router-dom";

const api = import.meta.env.VITE_API_URL;
const mode_app = import .meta.env.VITE_MODE_APP;

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        password: "password",
        username: "user2",
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.username !== "" && form.password !== "") {
            fetch(api + `auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })
                .then((res) => res.json())
                .then((data) => {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", form.username);
                    navigate(localStorage.getItem("path") || '/');
                }).catch((err) => {
                setError(err.message);
            });
        }
    };
    useEffect(() => {
        if (localStorage.getItem("username") ) {
            navigate("/"+mode_app);
        }
    }, [navigate]);



    return (
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} />
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} />
            <button>Login</button>
            {error && <p>{error}</p>}
            </form>
        );

}
