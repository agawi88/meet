// src/components/NumberOfEvents.jsx
import React, { useState } from 'react';


const NumberOfEvents = ({ allEvents }) => {
    const [number, setNumber] = useState(32);

    return (
        <div id="events-number">
            <input
                type="number"
                className="number"
                placeholder="Choose number of events"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
            />      
        </div>
    )
};


export default NumberOfEvents;