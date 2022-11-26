import { useState } from "react";
import { useEffect } from "react";
import LoginApi from "../../control/LoginApi";
import Toast from "../toast/Toast";
import "./admin-page.css";

const BASE_URL = "http://localhost:3030/admin";

function AdminPage() {
    const [name, setName] = useState("");
    const [image, setImage] = useState();
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    function onNameChange(e) {
        setName(e.target.value);
    }

    function onImageChange(e) {
        setImage(e.target.files[0]);
    }

    async function onClickSave(e) {
        const params = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                auth: window.localStorage.getItem("token"),
            },
            body: JSON.stringify({
                name,
                image,
            }),
        };

        let status;
        const data = await fetch(BASE_URL, params).then(async (res) => {
            status = res.status;
            return await res.json();
        });

        if (status === LoginApi.OK) {
            setToastMessage("Saved Successfully");
        } else {
            setToastMessage("Invalid Credentials");
        }

        setToastVisible(true);
    }

    return (
        <div className="admin-page">
            <div className="admin-page-content">
                <h1>Create new card</h1>
                <p>Name:</p>
                <input type="text" onChange={onNameChange}></input>
                <p>Image:</p>
                <input type="file" accept="image/*" onChange={onImageChange} />
                <button onClick={onClickSave}>Salvar</button>
            </div>

            {toastVisible ? (
                <Toast
                    text={toastMessage}
                    visible={toastVisible}
                    setVisible={setToastVisible}
                />
            ) : null}
        </div>
    );
}

export default AdminPage;
