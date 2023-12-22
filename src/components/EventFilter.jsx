// EventFilter.js
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./EventFilter.css"

const EventFilter = ({ events, setFilteredEvents, setSearchQuery }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const uniqueCities = [...new Set(events.map(event => event.location))];
  const uniqueCategories = [...new Set(events.map(event => event.category))];

  useEffect(() => {
    filterEvents();
  }, [selectedCity, selectedCategory, selectedDate, events]);

  const filterEvents = () => {
    const filtered = events.filter((event) => {
      const cityMatch = !selectedCity || event.location.toLowerCase() === selectedCity.toLowerCase();
      const categoryMatch = !selectedCategory || event.category.toLowerCase() === selectedCategory.toLowerCase();

      const eventDate = event.start_time && new Date(event.start_time);

      const dateMatch = !selectedDate || (!eventDate && false) || (eventDate && eventDate >= selectedDate);

      return cityMatch && categoryMatch && dateMatch;
    });

    setFilteredEvents(filtered);
  };

  const clearFilters = () => {
    setSelectedCity('');
    setSelectedCategory('');
    setSelectedDate(null);
    setSearchQuery('');
  };

  return (
    <div className="event-filter">
      <div className="filter-content">
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="Search events"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-options">
          <div className="filter-section">
            <label htmlFor="city">
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">All City</option>
                {uniqueCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city} ({events.filter(event => event.location.toLowerCase() === city.toLowerCase()).length})
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="category">
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All events</option>
                {uniqueCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category} ({events.filter(event => event.category.toLowerCase() === category.toLowerCase()).length})
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="date-picker">
            <label htmlFor="date">
              <DatePicker
                id="date"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select a date"
              />
            </label>
            <button className="clear-filters-button" onClick={clearFilters}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
