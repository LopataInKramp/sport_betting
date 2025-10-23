import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ isLoggedIn, handleLogout }) {
    const navigate = useNavigate();


    const onLogut = () => {
        handleLogout();
        navigate('/');
    }

    return (
        <header className="app-header">
            <h1 className="app-title" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                SportBets
            </h1>
            <div>
                {isLoggedIn ? (
                    <>
                        <button onClick={() => navigate("/user")}>Account</button>
                        <button onClick={onLogut} className="logout-btn">Logout</button>
                    </>
                ) : (
                    <button onClick={() => navigate("/login")} className="login-btn">Login</button>
                )}
            </div>
        </header>
    );

}