import "./App.css";
import RegisterPage from "./components/register-page/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./components/search-page/SearchPage";
import Header from "./components/header/Header";
import React, { useEffect, useState } from "react";
import UserContext from "./context/UserContext";
import LoginPage from "./components/login-page/LoginPage";
import CachedData from "./control/CachedData";
import AdminPage from "./components/admin-page/AdminPage";
import LoginApi from "./control/LoginApi";

const BASE_URL = `${process.env.REACT_APP_URL_BACKEND}/auth/user`;

function isAuthenticated() {
    let isAuth = window.localStorage.getItem("token");
    return isAuth;
}

function App() {
    const [userData, setUserData] = useState({ token: isAuthenticated() });

    async function getData() {
        const params = {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                auth: window.localStorage.getItem("token"),
            },
        };

        let status;
        const data = await fetch(BASE_URL, params).then(async (res) => {
            status = res.status;
            return await res.json();
        });

        if (status === LoginApi.OK) {
            setUserData({ ...userData, ...data });
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <UserContext.Provider
            value={{ userData, setUserData, refreshData: getData }}
        >
            <BrowserRouter basename={window.location.pathname || ""}>
                <div className="App">
                    <Header />
                    <UserContext.Consumer>
                        {({ userData }) => {
                            return !!userData.token ? (
                                <Routes>
                                    <Route
                                        element={<SearchPage />}
                                        path="/"
                                        exact
                                    />
                                    <Route
                                        element={<AdminPage />}
                                        path="/admin"
                                        exact
                                    />
                                </Routes>
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
