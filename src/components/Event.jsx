// src/components/Event.jsx
import React, {useState} from "react";

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);
 if (!event) return null;

 const {
    summary = "No title",
    created,
    location = "No location",
    start = {},
    end = {},
    description = "No description",
    organizer = {},
    htmlLink = "#"
} = event;
    return (
        <div className="event">
            <h2>{summary}</h2>
            <p>{location}</p>
            <p>{created ? new Date(created).toString() : "No date"}</p>
            <button onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? "Hide details" : "Show details"}
            </button>
            {showDetails && (
                <div data-testid="event-details">
                    <p><strong>Start:</strong>{start?.dateTime ? new Date(start.dateTime).toString() : 'N/A'}</p>
                    <p><strong>End:</strong>{end?.dateTime ? new Date(end.dateTime).toString() : 'N/A'}</p>
                    <p><strong>Description: </strong>{description || 'N/A'}</p>
                    <p><strong>Organizer: </strong>{organizer?.email || 'N/A'}</p>
                    <p><a href={htmlLink} target="_blank" rel="">Event Website </a></p>
                </div>
            )}
        </div>
    );
};

export default Event;