import { useState } from "react";
import Card from "../card/Card";
import Search from "../search/Search";
import "./search-page.css";

const BASE_URL = "http://localhost:3030/cards";
const BASE_URL_IMAGES = "http://localhost:3030/";

function SearchPage() {
    const [cards, setCards] = useState([]);

    function filterCards(cards) {
        const filteredCards = cards.map((card) => {
            const imageUrl = BASE_URL_IMAGES + card._id + ".png";

            return { ...card, imageUrl };
        });

        return filteredCards.slice(0, 10);
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
                                url={element.imageUrl}
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
