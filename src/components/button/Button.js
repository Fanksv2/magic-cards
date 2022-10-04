import "./button.css";

function Button({ className, title, onclick, disabled }) {
    return (
        <div className={className}>
            <button className="button" onClick={onclick} disabled={disabled}>
                {title}
            </button>
        </div>
    );
}

export default Button;
