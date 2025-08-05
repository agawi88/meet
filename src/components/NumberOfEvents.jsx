// src/components/NumberOfEvents.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';


const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const [number, setNumber] = useState(32); // default no of events;

    const handleInputChanged = (event) => {
        const rawValue = event.target.value; 
        const numberValue = Number(rawValue);
        setNumber(numberValue);
        if (setCurrentNOE) {
            setCurrentNOE(numberValue); // updates only when provided
        }

        let errorText;
        if ( rawValue.trim() === "" || isNaN(numberValue) || numberValue <= 0) {
            errorText = "This is not a valid input. Please use only numeric input greter than or equal to 1."
        } else {
            errorText = ""
        }
        setErrorAlert(errorText);
    };

    return (
        <div id="events-number">
            <p>Number of events</p>
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

NumberOfEvents.propTypes = {
  setCurrentNOE: PropTypes.func,
  setErrorAlert: PropTypes.func.isRequired,
};