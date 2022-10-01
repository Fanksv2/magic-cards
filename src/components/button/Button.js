import "./button.css";

function Button({ title, onclick }) {
    return (
        <div>
            <button className="button" onClick={onclick}>
                {title}
            </button>
        </div>
    );
}

export default Button;
