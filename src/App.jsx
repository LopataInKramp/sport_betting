import React, { useState } from 'react'
import  {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import './App.css'



function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [betslip, setBetslip] = useState([]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setBetslip([])
    }


    const handleLogin = () => setIsLoggedIn(true);

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home isLoggedIn={isLoggedIn} betslip={betslip} setBetslip={setBetslip}  />} />
                <Route path="/login" element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />} />
                <Route path="*" element={<Navigate to={"/"}/>} />
            </Routes>
        </Router>

    )

}

export default App
