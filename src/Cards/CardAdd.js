import React, { useEffect, useState } from "react";
import {
  NavLink,
  useParams,
  useHistory,
} from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

function CardAdd () {
    const initialFormState = {
        front: "",
        back: "",
    };
    const history = useHistory()
    const { deckId } = useParams();
    const [deck, setDeck] = useState({})
    const [cardData, setCardData] = useState({ ...initialFormState });

    useEffect(() => {
        const abortController = new AbortController();
        async function getDeck () {
            const gotDeck = await readDeck( deckId, abortController.signal )
            setDeck(gotDeck)
        }
        getDeck()
        return () => abortController.abort()
    }, [deckId])
    
    const handleFront = ({target}) => {     
        setCardData({
            ...cardData,
            front: target.value,
        });
    };
    const handleBack = ({target}) => {
        setCardData({
            ...cardData,
            back: target.value,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        await createCard(deckId, cardData)
        setCardData({...initialFormState});
        history.push(`/decks/${deckId}`)
    }
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><NavLink to={`/decks/${deckId}`}>{deck.name}</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h1>{deck.name}: Create Card</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="front" className="form-label">Front</label>
                    <textarea type="text" className="form-control" id="front" placeholder="Front side of card" onChange={handleFront} value={cardData.front}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="back" className="form-label">Back</label>
                    <textarea type="text" className="form-control" id="back" placeholder="Back side of card" onChange={handleBack} value={cardData.back}></textarea>
                </div>
                <button type="submit" className="btn btn-secondary" onClick={() => history.push("/")}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CardAdd