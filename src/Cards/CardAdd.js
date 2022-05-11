import React, { useEffect, useState } from "react";
import {
  NavLink,
  useParams,
  useHistory,
} from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function CardAdd () {
    const initialFormState = {                  // declares object for empty form
        front: "",
        back: "",
    };
    const history = useHistory()
    const { deckId } = useParams();
    const [deck, setDeck] = useState({})
    const [cardData, setCardData] = useState({ ...initialFormState });  // declaring state value for new card, initializing it as empty

    useEffect(() => {                                       // effect hook runs with 'deckId' dependency
        const abortController = new AbortController();
        async function getDeck () {                         // 'getDeck' api call in asynchronous function
            const gotDeck = await readDeck( deckId, abortController.signal ) // calls with deckId matching current url parameter
            setDeck(gotDeck)                                // set state of 'deck' to result of api call
        }
        getDeck()
        return () => abortController.abort()
    }, [deckId])
    
    const handleFront = ({target}) => {     // change handler corresponding with data for front of card
        setCardData({
            ...cardData,
            front: target.value,
        });
    };
    const handleBack = ({target}) => {      // change handler corresponding with data for back of card
        setCardData({
            ...cardData,
            back: target.value,
        });
    };
    const handleSubmit = async (event) => {     // asynchronous submit handler function
        event.preventDefault();
        await createCard(deckId, cardData)      // await result of 'createCard' api call
        setCardData({...initialFormState});     // reset form to blank 
        history.push(`/decks/${deckId}`)        // return to deck view
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
            
            <CardForm handleSubmit={handleSubmit} handleFrontChange={handleFront} handleBackChange={handleBack} front={cardData.front} back={cardData.back} deckId={deckId} />
        </div>
    )
}

export default CardAdd