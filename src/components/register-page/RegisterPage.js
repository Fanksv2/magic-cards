import Button from "../button/Button";
import "./register-page.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginApi from "../../control/LoginApi";
import Input from "../input/Input";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [IsValidInputs, setIsValidInputs] = useState(false);
    const [validFields, setValidFields] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        onChangeInputs();
    }, [name, email, password]);

    function checkValidInputs() {
        if (!validFields.name) {
            return false;
        }

        if (!validFields.email) {
            return false;
        }

        if (!validFields.password) {
            return false;
        }

        return true;
    }

    const onClickRegister = async () => {
        const res = await LoginApi.registerUser(name, email, password);

        if (res.status === LoginApi.OK) {
            alert("Cadastrado com sucesso");
            navigate("/");
        } else {
            alert("Use algum email predefinido. Ex: eve.holt@reqres.in");
        }
    };

    const onClickLogin = () => {
        navigate("/");
    };

    const onChangeName = (e) => {
        setName(e.target.value);
        setValidFields({ ...validFields, name: e.valid });
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setValidFields({ ...validFields, email: e.valid });
    };

    const onChangePassword = (e) => {
        setValidFields({ ...validFields, password: e.valid });
        setPassword(e.target.value);
    };

    const onChangeInputs = () => {
        const validInputs = checkValidInputs();
        setIsValidInputs(validInputs);
    };

    return (
        <div className="register-page">
            <div className="register-page-content">
                <h1>Register</h1>
                <p>Name</p>
                <Input
                    className="name"
                    onChange={onChangeName}
                    defaultValue=""
                    name="Name"
                    placeholder="Nickname..."
                ></Input>
                <p>Email</p>
                <Input
                    className="email"
                    onChange={onChangeEmail}
                    defaultValue=""
                    name="Email"
                    placeholder="Email..."
                ></Input>
                <p>Password</p>
                <Input
                    className="password"
                    onChange={onChangePassword}
                    defaultValue=""
                    name="Password"
                    placeholder="Password..."
                    type="password"
                ></Input>
                <Button
                    title="Register"
                    onclick={onClickRegister}
                    disabled={!IsValidInputs}
                />
                <p>Já tem cadastro?</p>
                <Button title="Login" onclick={onClickLogin} />
            </div>
        </div>
    );
}

export default RegisterPage;
