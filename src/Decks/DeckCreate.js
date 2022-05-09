import React, { useState } from "react";
import {
  useHistory,
} from "react-router-dom";
import { createDeck } from "../utils/api";

function DeckCreate () {
    const history = useHistory()
    const initialFormState = {
        name: "",
        description: "",
    };
    const [deckData, setDeckData] = useState({ ...initialFormState });
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
        await createDeck(deckData)
        setDeckData({...initialFormState});
        history.push("/")
    }
    return (
        <div>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Deck Name" onChange={handleNameChange} value={deckData.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea type="textarea" className="form-control" id="description" placeholder="Brief description of the deck" onChange={handleDescriptionChange} value={deckData.description}/>
                </div>
                <button type="submit" className="btn btn-secondary" onClick={() => history.push("/")}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default DeckCreate