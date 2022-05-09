import React, { useEffect, useState } from "react";
import {
  useParams,
  useHistory,
} from "react-router-dom";

function CardStudy ({deck}) {
    const [side, setSide] = useState(true);
    const [cardNum, setCardNum] = useState(0);
    const [currentCard, setCurrentCard] = useState(deck.cards[0])
    const { deckId } = useParams()
    const history = useHistory();
    const cardList = deck.cards
    
    useEffect (() => {
        const abortController = new AbortController();
        
        setCurrentCard(cardList[cardNum])

        return () => abortController.abort()
    }, [cardList, cardNum])
    const handleNext = () => {
        handleFlip()
        return setCardNum((currentCardNum) => currentCardNum + 1)
    }
    const handleFlip = () => {
        return setSide(!side) 
    }
    const handleLast = () => {
        if (window.confirm("Restart Cards?")) {
            setCardNum(0)
        } else {
            history.push(`/decks/${deckId}`)
        }
    }
    if (cardList.length < 3) {
        return (
            <div>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {cardList.length} cards in this deck.</p>
                <button className="btn btn-primary" onClick={() => history.push(`/decks/${deckId}/cards/new`)}>Add Cards</button>
            </div>
        )
    }
    if (cardNum <= cardList.length - 2) {
        return (
            <div className="card">
                <div className="card-body">
                    <h3>Card {cardNum + 1} of {cardList.length}</h3>
                    {side ? <p>{currentCard.front}</p> : <p>{currentCard.back}</p>}
                    <button type="button" className="btn btn-secondary" onClick={handleFlip}>Flip</button>
                    {!side ? <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>:<></>}
                </div>
            </div>
        )
    } else if (cardNum === cardList.length-1) {
        return (
            <div className="card">
                <div className="card-body">
                    <h3>Card {cardNum + 1} of {cardList.length}</h3>
                    {side ? <p>{currentCard.front}</p> : <p>{currentCard.back}</p>}
                    <button type="button" className="btn btn-secondary" onClick={handleFlip}>Flip</button>
                    {!side ? <button type="button" className="btn btn-primary" onClick={handleLast}>Next</button>:<></>}
                </div>
            </div>
        )
    }
}

export default CardStudy