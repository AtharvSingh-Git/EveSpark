import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './event2.css';
import {Link} from "react-router-dom";


function EventsList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/events');
           
            
            setEvents(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setError('Error fetching events. Please try again later.');
            setLoading(false);
        }
    };

    const extractFilename = (fullPath) => {
        if (fullPath) {
            const parts = fullPath.split(/[\\/]/);
            const filename = parts.pop();
            return filename;
        } else {
            return null;
        }
    };

    const formatDate = (date) => {
        
        return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const formatTime = (time) => {
        
        return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="events-container">
            {events.map(event => (
                <div key={event.id} className="event-item">
                    <div className="event-header">
                        <h1 className="event-title">{event.Title}</h1>
                        <h4 className="event-club">By {event.Club}</h4>
                    </div>
                    <hr className="event-divider" />
                    <div className="event-content">
                        <div className="event-image-container">
                            <img src={`http://localhost:8000/uploads/${extractFilename(event.Image)}`} alt={event.Title} className="event-image" />
                        </div>
                        <div className="event-details">
                            <p className="event-description">{event.Description}</p>
                            <br />
                            <div className="event-meta">
                                <span className="event-date">Date: {formatDate(event.Date)}</span>
                                <span className="event-timings">Timings: {formatTime(event.Starttime)} to {formatTime(event.Endtime)}</span>
                                <span className="event-volunteers">Total {event.Volunteersreq} volunteers are required</span>
                                <span className="event-fee">{event.fee} rupees registration fee</span>
                            </div>
                            <br />
                            <div className='btn-reg' >
                                <Link to='./registerationlist.jsx' className='btn btn-primary' style={{width:'100%'}}>View Registrations</Link>
                                
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            ))};
            <br />
            <br />
            <br />
        </div>
    );
}

export default EventsList;
