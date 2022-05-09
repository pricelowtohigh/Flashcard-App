import React, { useEffect, useState } from "react";
import {
  NavLink,
  useParams,
  useHistory,
} from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";

function CardEdit ( { card,  setCard } ) { 
    const history = useHistory()
    const { deckId, cardId } = useParams()
    const [deckData, setDeckData] = useState({});
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    useEffect(() => {
        const abortController = new AbortController();
        async function getDeck () {
            const gotDeck = await readDeck( deckId, abortController.signal )
            setDeckData(gotDeck)
            
        }
        getDeck()
        return () => abortController.abort()
    }, [deckId])
    useEffect(() => {
        async function getCard() {
            const cardInfo = await readCard(cardId);
            setCard(cardInfo);
            setFront(cardInfo.front);
            setBack(cardInfo.back);
        }
        getCard();
    }, [cardId]);

    const handleFrontChange = (event) => {
        setFront(event.target.value);
        setCard({
            ...card,
            front: event.target.value,
        });
    }
    const handleBackChange = (event) => {
        setBack(event.target.value);
        setCard({
            ...card,
            back: event.target.value,
        });
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateCard(card)
        history.push(`/decks/${deckId}`)
    }
    
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><NavLink to={`/decks/${deckId}`}>{deckData.name}</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                </ol>
            </nav>
            <h1>Edit Card</h1>
            <form name="addCard" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="front" className="form-label">Front</label>
                    <textarea type="text" className="form-control" rows="3" id="front" onChange={handleFrontChange}  value={front}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="back" className="form-label">Back</label>
                    <textarea type="text" className="form-control" rows="3" id="back" onChange={handleBackChange}  value={back}></textarea>
                </div>
                <button type="button" className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CardEdit