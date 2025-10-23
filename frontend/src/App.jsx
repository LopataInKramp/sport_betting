import React, { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import './App.css'


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [betslip, setBetslip] = useState([]);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);



    const handleLogout = () => {
        setIsLoggedIn(false);
        setBetslip([]);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    }


    const handleLogin = () => setIsLoggedIn(true);

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home isLoggedIn={isLoggedIn} betslip={betslip} setBetslip={setBetslip}  />} />
                <Route path="/login" element={<Login onLogin={handleLogin} isLoggedIn={! !user} />} />
                {/* <Route path="/user" element={<User userData={userData} setUserData={setUserData} />} /> */}
                <Route path="*" element={<Navigate to={"/"}/>} />
            </Routes>
        </Router>

    )

}

export default App