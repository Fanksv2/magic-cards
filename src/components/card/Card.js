import "./card.css";

function Card({ name, url }) {
    return (
        <div className="card">
            <h1>{name}</h1>
            <img src={url} />
        </div>
    );
}

export default Card;
