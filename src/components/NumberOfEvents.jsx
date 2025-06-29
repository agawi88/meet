// src/components/NumberOfEvents.jsx
import React, { useState } from 'react';


const NumberOfEvents = ({ setCurrentNOE }) => {
    const [number, setNumber] = useState(32); // default no of events;

    const handleInputChanged = (event) => {
        const value = Number(event.target.value);
        setNumber(value);
        if (setCurrentNOE) {
            setCurrentNOE(value); // updates only when provided
        }
    };
    return (
        <div id="events-number">
            <input
                type="number"
                className="number"
                placeholder="Choose number of events"
                value={number}
                onChange={handleInputChanged}
            />      
        </div>
    )
};


export default NumberOfEvents;