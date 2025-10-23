import React, {useEffect, useState} from "react";
import {useNavigate, Navigate} from "react-router-dom";
import API_BASE_URL from "../config.js";

export default function Login({ onLogin, isLoggedIn }) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/", { replace: true });
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!name || !password) {
            setError("Please enter username or password");
            return;
        }
        (async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({ name: name, password: password}),
                });

                const data = await res.json();

                if (!res.ok) throw new Error(data.error || "Unable to login");

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                onLogin(data.user);
                navigate("/");

            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        })();}
    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    );

}