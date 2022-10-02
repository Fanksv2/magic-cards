import "./App.css";
import RegisterPage from "./components/register-page/RegisterPage";
import { BrowserRouter } from "react-router-dom";
import SearchPage from "./components/search-page/SearchPage";
import Header from "./components/header/Header";
import React, { useState } from "react";
import UserContext from "./context/UserContext";

function isAuthenticated() {
    let isAuth = window.localStorage.getItem("isAuthenticated") === "true";
    return isAuth;
}

function App() {
    const [userData, setUserData] = useState({
        isAuthenticated: isAuthenticated(),
        name: JSON.parse(window.localStorage.getItem("register-data")).name,
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
                                <RegisterPage />
                            );
                        }}
                    </UserContext.Consumer>
                </div>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
