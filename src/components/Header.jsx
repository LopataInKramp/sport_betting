import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ isLoggedIn, handleLogout }) {
    const navigate = useNavigate();

    return (
        <header className="app-header">
            <h1 className="app-title" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                QuickBet Sports
            </h1>
            <div>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                ) : (
                    <button onClick={() => navigate("/login")} className="login-btn">Login</button>
                )}
            </div>
        </header>
    );

}