import { Fragment, useState } from "react";
import checkIcon from "../../icons/check.png";
import "./input.css";

function Input({
    className,
    onChange,
    defaultValue,
    name,
    placeholder,
    type = "text",
}) {
    const [isValid, setValid] = useState(defaultValue);
    const [typedOneTime, setTypedOneTime] = useState(false);

    const onChangeInput = (e) => {
        const valid = checkValid(e.target.value);
        setValid(valid);
        onChange({ ...e, valid });
        setTypedOneTime(true);
    };

    function checkValid(text) {
        if (!text) {
            return false;
        }

        if (text.length < 3) {
            return false;
        }

        return true;
    }

    return (
        <div className="input">
            <input
                className={className}
                onChange={onChangeInput}
                defaultValue={defaultValue}
                placeholder={placeholder}
                type={type}
            />
            <div className="message">
                {isValid ? (
                    <img src={checkIcon} />
                ) : typedOneTime ? (
                    <p className="error-message">
                        {name + " field needs to have 3 or more characters"}
                    </p>
                ) : null}
            </div>
        </div>
    );
}

export default Input;
