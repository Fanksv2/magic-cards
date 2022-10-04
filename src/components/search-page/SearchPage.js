import { useState } from "react";
import Card from "../card/Card";
import Search from "../search/Search";
import "./search-page.css";

function SearchPage() {
    const [cards, setCards] = useState([]);

    function filterCards(cards) {
        const filteredCards = cards.filter((card) => {
            if (!card.imageUrl) {
                return false;
            }

            return true;
        });

        return filteredCards.slice(0, 10);
    }

    async function onSearch(text) {
        const data = await fetch(
            `https://api.magicthegathering.io/v1/cards/?name=${text}`
        ).then((res) => res.json());

        const filteredCards = filterCards(data.cards);

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
                                key={element.id}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
