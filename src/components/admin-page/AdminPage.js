import { useState } from "react";
import { useEffect } from "react";
import LoginApi from "../../control/LoginApi";
import Toast from "../toast/Toast";
import "./admin-page.css";

const BASE_URL = `${process.env.REACT_APP_URL_BACKEND}/admin`;

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
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);

        const params = {
            method: "POST",
            headers: {
                auth: window.localStorage.getItem("token"),
            },
            body: formData,
        };

        let status;
        const data = await fetch(BASE_URL, params).then(async (res) => {
            status = res.status;
            return await res.text();
        });

        if (status === LoginApi.OK) {
            setToastMessage("Saved Successfully");
        } else {
            setToastMessage("Some fields are empty or invalid credentials");
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
