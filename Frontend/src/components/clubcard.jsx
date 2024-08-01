import React from 'react';
import Popup from 'reactjs-popup';
import eventsData from './events.js';

const ClubCard = ({ imageUrl, description, clubname}) => {
  return (
    <div className="card">
      <img src={imageUrl} alt="Card" className="card-image" />
      <div className="card-content">
        <p className="card-description">{description}</p>
        
        <Popup trigger={<button className="explore-button">Explore</button>} position="center" closeOnDocumentClick>
            <div className="Popup3">
              <img src={imageUrl}></img>
              <h2>Events</h2>
              <p>{description}</p>
              <div className='evntdetail'>
                <ul>
                  {eventsData.find((club) => club.clubName === clubname)?.eventsData.map((event) =>
                  (
                    <li key={event.title}><span>{event.date} </span>{event.title} {event.venue && ` (${event.venue})`}</li> 
                  )
                )}
                </ul>
              </div>
            </div>
        </Popup>
      </div>
    </div>
  );
};

export default ClubCard;