import React, { useEffect, useState } from "react";
import {
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { deleteCard, readCard, readDeck } from "../utils/api";

function CardList ({ setCard }) {
    const history = useHistory();
    const {url} = useRouteMatch();
    const {deckId} = useParams();
    const [cards, setCards] = useState([])
    const deleteFunction = (event) => {
        if (window.confirm("Delete this card?")) {
        deleteCard(event.target.value)
        history.push(`/decks/${deckId}`)
        }
    }
    useEffect(() => {
        async function getCards() {
            const deck = await readDeck(deckId)
            setCards(deck.cards)
        }
        getCards()
    }, [deckId])
    const handleClick = async ({target}) => {
        const id = target.value
        const cardClicked = await readCard(id)
        setCard(cardClicked)
        history.push(`${url}/cards/${target.value}/edit`)
    }
    const cardStyle = {
        justifyContent: "space-around",
        marginRight: "10px",
    }

    const cardList = cards.map((card, index) => {
        return (
            <div className="card" key={index} value={card.id}>
                <div className="card-body" value={card.id}>
                    <p>{card.front}</p>
                    <p>{card.back}</p>
                    <div style={cardStyle}>
                    <button type="button" className="btn btn-secondary" style={cardStyle} key={index} value={card.id} onClick={handleClick}>Edit</button>
                    <button type="button" className="btn btn-danger bi bi-trash" value={card.id} onClick={deleteFunction}></button>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div>
            {cardList}
        </div>
    )
}

export default CardList