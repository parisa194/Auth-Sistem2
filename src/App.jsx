import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import "./App.css";

// Allow Vite env or fallback for running locally.
// Normalize the value so callers can provide either a full base with /api/v1
// or just the host. This prevents mistakes like missing /api/v1 or extra slashes.
const RAW_API = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
let API_URL = RAW_API.replace(/\/+$/, ""); // remove trailing slashes
if (!API_URL.endsWith("/api/v1")) {
    API_URL = API_URL + "/api/v1";
}

export const App = () => {
    const [view, setView] = useState("login"); // 'login' | 'register' | 'home'
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    const handleLogin = (userData, jwt) => {
        setUser(userData);
        setToken(jwt);
        setView("home");
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        setView("login");
    };



    return (
        <div className="app-container">
            <div>
                {view === "login" && (
                    <Login
                        API_URL={API_URL}
                        onSwitchToRegister={() => setView("register")}
                        onLogin={handleLogin}
                    />
                )}

                {view === "register" && (
                    <Register
                        API_URL={API_URL}
                        onSwitchToLogin={() => setView("login")}
                        onRegistered={(userData) => {
                            setView("login");
                        }}
                    />
                )}

                {view === "home" && (
                    <Home
                        user={user}
                        onLogout={handleLogout}
                    />
                )}
            </div>
        </div>
    );
};
