import React from 'react'
import './Card.css'
import { useState } from 'react';


function  Card({event}) {
    const [imageError, setImageError] = useState(false);


    const fallbackImage =
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZlc3RpdmFsJTIwZXZlbnRzfGVufDB8fDB8fHww';

  const image_url = imageError ? fallbackImage : event.banner_image || fallbackImage;

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    
      
<div class="event card">
	
	<div class="event-title title-block">
		<h2 class="title">
				{event.event_name}
		</h2>
		<p class="venue">
			{event.description}
		</p>
		<address class="address">
			Category:{event.category}
		</address>
	</div>
	<div class="image-wrapper">
		<img class="featured-image" src={image_url} alt={event.event_name} />
		<div class="overlay"></div>
	</div>

	<div class="event-date date">
			{event.start_time}
	</div>
	<div class="event-time time">
			{event.location}
	</div>
	<div class="event-details">
		<a class="link details" href="#">DETAILS</a>
	</div>
	<div class="event-tickets">
		<a class="link" href="#">TICKETS</a>
	</div>
</div>
   
)}

export default  Card