import React, { useEffect, useState } from "react";
import {
  NavLink,
  useParams,
} from "react-router-dom";
import CardStudy from "../Cards/CardStudy";
import { readDeck } from "../utils/api";

function DeckStudy () {
    const {deckId} = useParams();
    const [deck,setDeck] = useState(""); 
    
    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal)
            .then(setDeck)
        
        return () => abortController.abort()
    },[deckId])

    if (deck) {
        return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><NavLink to={`/decks/${deckId}`}>{deck.name}</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h1>{deck.name}: Study</h1>
            <CardStudy deck={deck}/>
        </div>
    )
        } else {
            return <h3>Loading...</h3>
        }
    }
export default DeckStudy