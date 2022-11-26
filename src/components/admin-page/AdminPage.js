import { useState } from "react";
import { useEffect } from "react";
import "./admin-page.css";

const BASE_URL = "http://localhost:3030/";

function AdminPage() {
    const [name, setName] = useState("");
    const [image, setImage] = useState();

    function onNameChange(e) {
        setName(e.target.value);
    }

    function onImageChange(e) {
        setImage(e.target.files[0]);
    }

    function onClickSave(e) {}

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
        </div>
    );
}

export default AdminPage;
