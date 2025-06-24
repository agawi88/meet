import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import Event from "./components/Event";
import React from "react";

function App() {

  return (
    <div className="App">
      <CitySearch />
      <EventList />
      <NumberOfEvents />
      <Event />
    </div>
  );
}

export default App;
