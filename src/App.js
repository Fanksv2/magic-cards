import "./App.css";
import RegisterPage from "./components/register-page/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./components/search-page/SearchPage";
import Header from "./components/header/Header";
import React, { useState } from "react";
import UserContext from "./context/UserContext";
import LoginPage from "./components/login-page/LoginPage";
import CachedData from "./control/CachedData";

function isAuthenticated() {
    let isAuth = window.localStorage.getItem("isAuthenticated") === "true";
    return isAuth;
}

function App() {
    const [userData, setUserData] = useState({
        isAuthenticated: isAuthenticated(),
        name: CachedData.getName(),
    });

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <UserContext.Consumer>
                        {({ userData }) => {
                            return userData.isAuthenticated ? (
                                <SearchPage />
                            ) : (
                                <Routes>
                                    <Route
                                        element={<LoginPage />}
                                        path="/"
                                        exact
                                    />
                                    <Route
                                        element={<RegisterPage />}
                                        path="/register"
                                        exact
                                    />
                                </Routes>
                            );
                        }}
                    </UserContext.Consumer>
                </div>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
