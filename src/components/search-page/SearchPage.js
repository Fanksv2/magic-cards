import { useState } from "react";
import Card from "../card/Card";
import Search from "../search/Search";
import "./search-page.css";

const BASE_URL = `${process.env.REACT_APP_URL_BACKEND}/cards`;

function SearchPage() {
    const [cards, setCards] = useState([]);

    function filterCards(cards) {
        return cards.slice(0, 10);
    }

    async function onSearch(text) {
        const params = {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                auth: window.localStorage.getItem("token"),
            },
        };

        const data = await fetch(`${BASE_URL}/?name=${text}`, params).then(
            (res) => res.json()
        );

        const filteredCards = filterCards(data);

        setCards(filteredCards);
    }

    return (
        <div className="search-page">
            <div className="search-page-content">
                <Search onsearch={onSearch} />
                <div className="cards">
                    {cards.map((element) => {
                        return (
                            <Card
                                name={element.name}
                                url={element.url}
                                key={element._id}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
