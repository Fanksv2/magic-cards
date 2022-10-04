import Button from "../button/Button";
import "./loginpage.css";
import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { userData, setUserData } = useContext(UserContext);

    const navigate = useNavigate();

    function validateLogin(dataSaved) {
        if (dataSaved.email !== email) {
            return false;
        }

        if (dataSaved.password !== password) {
            return false;
        }

        return true;
    }

    const onClickLogin = () => {
        const dataSaved = JSON.parse(
            window.localStorage.getItem("register-data")
        );
        const valid = validateLogin(dataSaved);
        if (valid) {
            window.localStorage.setItem("isAuthenticated", true);
            setUserData({ isAuthenticated: true });
        }
    };

    const onClickRegister = () => {
        navigate("/register");
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="login-page">
            <div className="login-page-content">
                <h1>Login</h1>
                <p>Email</p>
                <input className="email" onChange={onChangeEmail}></input>
                <p>Password</p>
                <input className="password" onChange={onChangePassword}></input>
                <Button title="Login" onclick={onClickLogin} />
                <p>Não tem cadastro?</p>
                <Button title="Register" onclick={onClickRegister} />
            </div>
        </div>
    );
}

export default LoginPage;
