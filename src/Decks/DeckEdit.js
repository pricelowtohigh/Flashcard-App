import React, { useEffect, useState } from "react";
import {
  NavLink,
  useParams,
  useHistory,
} from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";

function DeckEdit () {
    const history = useHistory()
    const {deckId} = useParams()
    const [deckData, setDeckData] = useState({});
    
    useEffect(() => {
        const abortController = new AbortController();
        async function getDeck () {
            const gotDeck = await readDeck( deckId, abortController.signal )
            setDeckData(gotDeck)
            
        }
        getDeck()
        return () => abortController.abort()
    }, [deckId])
    const handleNameChange = ({target}) => {     
        setDeckData({
            ...deckData,
            name: target.value,
        });
    };
    const handleDescriptionChange = ({target}) => {
        setDeckData({
            ...deckData,
            description: target.value,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateDeck(deckData)
        history.push("/")
    }
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><NavLink to={`/decks/${deckId}`}>{deckData.name}</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="name" onChange={handleNameChange} value={deckData.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" className="form-control" id="description" onChange={handleDescriptionChange} value={deckData.description}/>
                </div>
                <button type="submit" className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default DeckEdit