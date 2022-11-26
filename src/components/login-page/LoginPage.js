import Button from "../button/Button";
import "./loginpage.css";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import LoginApi from "../../control/LoginApi";
import Input from "../input/Input";
import Toast from "../toast/Toast";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toastVisible, setToastVisible] = useState(false);

    const { userData, setUserData, refreshData } = useContext(UserContext);
    const [validFields, setValidFields] = useState({});

    const navigate = useNavigate();

    useEffect(() => {}, [email, password]);

    const onClickLogin = async () => {
        const res = await LoginApi.loginUser(email, password);
        if (res.status === LoginApi.OK) {
            window.localStorage.setItem("token", res.token);
            setUserData({ token: res.token, admin: res.admin, name: res.name });
        } else {
            setToastVisible(true);
        }

        console.log(res);
    };

    function checkValidInputs() {
        if (!validFields.email) {
            return false;
        }

        if (!validFields.password) {
            return false;
        }

        return true;
    }

    //eve.holt@reqres.in
    // window.localStorage.getItem("register-data")

    const onClickRegister = () => {
        navigate("/register");
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setValidFields({ ...validFields, email: e.valid });
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setValidFields({ ...validFields, password: e.valid });
    };

    return (
        <div className="login-page">
            <div className="login-page-content">
                <h1>Login</h1>
                <p>Email</p>
                <Input
                    className="email"
                    onChange={onChangeEmail}
                    name="Email"
                ></Input>
                <p>Password</p>
                <Input
                    className="password"
                    onChange={onChangePassword}
                    name="Password"
                ></Input>
                <Button
                    title="Login"
                    onclick={onClickLogin}
                    disabled={!checkValidInputs()}
                />
                <p>Não tem cadastro?</p>
                <Button title="Register" onclick={onClickRegister} />
            </div>

            {toastVisible ? (
                <Toast
                    text="Invalid credentials, try again"
                    visible={toastVisible}
                    setVisible={setToastVisible}
                />
            ) : null}
        </div>
    );
}

export default LoginPage;
