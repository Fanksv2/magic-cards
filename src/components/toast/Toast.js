import { useEffect, useState } from "react";
import "./toast.css";
import Button from "../button/Button";

function Toast({ text, visible, setVisible }) {
    useEffect(() => {
        setTimeout(function () {
            setVisible(false);
        }, 5000);
    }, [visible]);

    return (
        <div className="toast">
            <div className="toast-content">
                <p>{text}</p>
                <Button title="OK" onclick={() => setVisible(false)} />
            </div>
        </div>
    );
}

export default Toast;
