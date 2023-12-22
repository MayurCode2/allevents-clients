import React, { useEffect, useState } from "react";
import axios from "axios";
import EventFilter from "../components/EventFilter";
import Card from "../components/ Card";
import "./Home.css";
import Header from "../components/Header";

function Home() {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://alleventsmayur.000webhostapp.com/get-all-events.php")
      .then((response) => {
        setEvents(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("Error fetching events. Please try again later.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    filterEvents();
  }, [searchQuery, events]);

  const filterEvents = () => {
    const filtered =
      searchQuery.trim() !== ""
        ? events.filter((event) =>
            event.event_name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : events;
    setFilteredEvents(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container-box">
      <Header />
      <div className="fliter-con">
        <EventFilter
          events={events}
          setFilteredEvents={setFilteredEvents}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="grid-box">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, key) => <Card key={key} event={event} />)
        ) : (
          <div>No events found.</div>
        )}
      </div>
    </div>
  );
}

export default Home;
