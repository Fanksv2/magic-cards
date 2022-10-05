import Button from "../button/Button";
import "./loginpage.css";
import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import LoginApi from "../../control/LoginApi";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { userData, setUserData } = useContext(UserContext);

    const navigate = useNavigate();

    const onClickLogin = async () => {
        const res = await LoginApi.loginUser(email, password);
        if (res.status === LoginApi.OK) {
            window.localStorage.setItem("token", res.token);
            setUserData({ token: res.token });
        } else {
            alert("Error. Review your credentials and try again");
        }

        console.log(res);
    };

    //eve.holt@reqres.in
    // window.localStorage.getItem("register-data")

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
