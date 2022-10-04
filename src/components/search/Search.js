import { useState } from "react";
import "./search.css";

function Search({ onsearch }) {
    const [textField, setTextField] = useState("");

    function onChangeTextField(e) {
        setTextField(e.target.value);
    }

    return (
        <div className="search">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onsearch(textField);
                }}
            >
                <input
                    type="text"
                    onChange={onChangeTextField}
                    placeholder="Insert a card name..."
                ></input>
                <button className="search-button">Search</button>
            </form>
        </div>
    );
}

export default Search;
