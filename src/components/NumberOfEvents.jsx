// src/components/NumberOfEvents.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';


const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const [number, setNumber] = useState(32); // default no of events;

    const handleInputChanged = (event) => {
        const value = Number(event.target.value);
        setNumber(value);
        if (setCurrentNOE) {
            setCurrentNOE(value); // updates only when provided
        }

        let errorText;
        if (isNaN(value) || value <= 0) {
            errorText = "This is not a valid input. Please use only numeric input greater or qual to 0."
        } else {
            errorText = ""
        }
        setErrorAlert(errorText);
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

NumberOfEvents.propTypes = {
  setCurrentNOE: PropTypes.func.isRequired,
  setErrorAlert: PropTypes.func.isRequired,
};