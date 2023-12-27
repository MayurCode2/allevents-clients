// AddEvents.js
import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "./AddEvents.css";
import Header from "../components/Header";

const AddEvents = () => {
  const [formData, setFormData] = useState({
    event_name: "",
    start_time: null,
    end_time: null,
    location: "",
    description: "",
    category: "",
    banner_image: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear validation error for the changed field
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleDateChange = (date, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: date,
    });
    // Clear validation error for the changed date field
    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    // Validate event_name
    if (!formData.event_name.trim()) {
      newErrors.event_name = "Event Name is required";
      formIsValid = false;
    }

    // Validate start_time
    if (!formData.start_time) {
      newErrors.start_time = "Start Time is required";
      formIsValid = false;
    }

    // Validate other fields as needed

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      setErrorMessage("Please fill in all fields correctly.");
      setSuccessMessage("");
      return;
    }

    const formattedFormData = {
      ...formData,
      start_time: formData.start_time
        ? format(formData.start_time, "dd/MM/yyyy") // Format start_time as "20/02/2023"
        : null,
      end_time: formData.end_time
        ? format(formData.end_time, "dd/MM/yyyy") // Format end_time as "20/02/2023"
        : null,
    };

    // Make a POST request to the API endpoint
    axios
      .post(
        "http://localhost/events-api/add-event.php",
        formattedFormData
      )
      .then((response) => {
        console.log("Event added successfully:", response.data);
        setSuccessMessage("Event added successfully!");
        setErrorMessage("");
        setFormData({
          event_name: "",
          start_time: null,
          end_time: null,
          location: "",
          description: "",
          category: "",
          banner_image: "",
        });
        // Optionally, you can redirect the user or perform other actions after successful submission.
      })
      .catch((error) => {
        console.error("Error adding event:", error);
        setSuccessMessage("");
        setErrorMessage("Error adding event. Please try again.");
      });
  };

  console.log(formData);

  return (
    <div className="add-event-container">
      <Header />
      <div className="section-con">
        <h2>Add Event</h2>
        <form onSubmit={handleSubmit} className="add-event-form">
          <div className={`form-group ${errors.event_name && "error"}`}>
            <label>Event Name:</label>
            <input
              type="text"
              name="event_name"
              value={formData.event_name}
              onChange={handleChange}
              required
            />
            {errors.event_name && (
              <span className="error-text">{errors.event_name}</span>
            )}
          </div>

          <div className={`form-group ${errors.start_time && "error"}`}>
            <label>Start Time:</label>
            <DatePicker
              selected={formData.start_time}
              onChange={(date) => handleDateChange(date, "start_time")}
              dateFormat="dd/MM/yyyy" // Set the date format here
              className="date-picker"
              required
            />
            {errors.start_time && (
              <span className="error-text">{errors.start_time}</span>
            )}
          </div>
          <div className={`form-group ${errors.end_time && "error"}`}>
            <label>End Time:</label>
            <DatePicker
              selected={formData.end_time}
              onChange={(date) => handleDateChange(date, "end_time")}
              dateFormat="dd/MM/yyyy"
              className="date-picker"
              required
            />
            {errors.end_time && (
              <span className="error-text">{errors.end_time}</span>
            )}
          </div>

          <div className={`form-group ${errors.location && "error"}`}>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            {errors.location && (
              <span className="error-text">{errors.location}</span>
            )}
          </div>

          <div className={`form-group ${errors.description && "error"}`}>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            {errors.description && (
              <span className="error-text">{errors.description}</span>
            )}
          </div>

          <div className={`form-group ${errors.category && "error"}`}>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
            {errors.category && (
              <span className="error-text">{errors.category}</span>
            )}
          </div>

          <div className={`form-group ${errors.banner_image && "error"}`}>
            <label>Banner Image URL:</label>
            <input
              type="text"
              name="banner_image"
              value={formData.banner_image}
              onChange={handleChange}
              required
            />
            {errors.banner_image && (
              <span className="error-text">{errors.banner_image}</span>
            )}
          </div>

          <div className="form-group">
            <button type="submit" className="submit-button">
              Add Event
            </button>
          </div>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddEvents;
