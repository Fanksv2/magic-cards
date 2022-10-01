import Button from "../button/Button";
import "./register-page.css";
import React, { useState } from "react";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onClickRegister = () => {
        let data = {
            name,
            email,
            password,
        };
        window.localStorage.setItem("register-data", JSON.stringify(data));
    };

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="register-page">
            <div className="register-page-content">
                <h1>Register</h1>
                <p>Name</p>
                <input className="name" onChange={onChangeName}></input>
                <p>Email</p>
                <input className="email" onChange={onChangeEmail}></input>
                <p>Password</p>
                <input className="password" onChange={onChangePassword}></input>
                <Button title="Register" onclick={onClickRegister} />
            </div>
        </div>
    );
}

export default RegisterPage;
