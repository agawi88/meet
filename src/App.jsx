import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import React, { useState, useEffect} from "react";

import './App.css';

function App() {
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {

    const fetchData = async () => {
      const allEvents = await getEvents();
      const filteredEvents = currentCity === "See all cities" ?
        allEvents :
        allEvents.filter(event => event.location === currentCity)
      setEvents(filteredEvents.slice(0, currentNOE));
      setAllLocations(extractLocations(allEvents));
    };


    fetchData();
  }, [currentCity, currentNOE]);


  return (
    <div className="App">
      <CitySearch
        allLocations={allLocations} 
        setCurrentCity={setCurrentCity} />
      <EventList events={events} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} />
    </div>
  );
}

export default App;
