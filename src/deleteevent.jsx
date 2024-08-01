import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './event.css';

function EventsList() {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`http://localhost:8000/event/${eventId}`);
            // Remove the deleted event from the state
            setEvents(events.filter(event => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredEvents = events.filter(event => {
        return event.Title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const extractFilename = (fullPath) => {
        if (fullPath) {
            const parts = fullPath.split(/[\\/]/);
            const filename = parts.pop();
            return filename;
        } else {
            return null; // Or handle the case where fullPath is null in another way
        }
    };

    return (
        <div className="delete-events-container">
            <h1>Prieview Event</h1>
            <input
                type="text"
                placeholder="Search events"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="search-input"
            />
            <div className="delete-events-grid">
                {filteredEvents.map(event => (
                    <div key={event.id} className="delete-event-card">
                        <div className="delete-event-header">
                            <h1>{event.Title}</h1>
                            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                        </div>
                        <img src={`http://localhost:3007/uploads/${extractFilename(event.Image)}`} alt={event.Title} className="delete-event-image" />
                        <div className="delete-event-details">
                            <p><strong>Organized by:</strong> {event.Club}</p>
                            <p><strong>Date:</strong> {event.Date}</p>
                            <p><strong>Timings:</strong> {event.Starttime} to {event.Endtime}</p>
                            <p><strong>Volunteers Required:</strong> {event.Volunteersreq}</p>
                            <p><strong>Registration Fee:</strong> {event.fee} rupees</p>
                            <div className='delete-Paragraph-des'><p>{event.Description}</p></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventsList;
