import React, { useEffect, useState } from "react";
import {
  NavLink,
  useParams,
  useHistory,
} from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";
import "bootstrap-icons/font/bootstrap-icons.css";

function DeckView () {
    const {deckId} = useParams();
    const [deck,setDeck] = useState({});
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal)
            .then(setDeck)
        
        return () => abortController.abort()
    },[deckId])
    const deleteFunction = (event) => {
        if (window.confirm("Delete this deck?")) {
        deleteDeck(event.target.value)
        history.push("/")
        }
    }
    if (!deck) {
        return (
            <h3>Loading...</h3>
        )
    }
    return (
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
            </ol>
        </nav>
        <div className="card">
            <div className="card-body">
                <h5>{deck.name}</h5>
                <p>{deck.description}</p>
                <NavLink to={`/decks/${deckId}/edit`} type="button" className="btn btn-secondary">Edit</NavLink>
                <NavLink to={`/decks/${deckId}/study`} type="button" className="btn btn-primary">Study</NavLink>
                <NavLink to={`/decks/${deckId}/cards/new`} type="button" className="btn btn-primary">Add Cards</NavLink>
                <button type="button" className="btn btn-danger bi bi-trash" value={deckId} onClick={deleteFunction}></button>
            </div>
        </div>
    </div>
    )
}

export default DeckView