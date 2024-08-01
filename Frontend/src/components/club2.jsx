import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import NAVbar2 from './user-nav.jsx';
import Footer from './footer.jsx';
import Card from './card.jsx';
import eventsData from './events.js';
import Popup from 'reactjs-popup'; 
import Feedback from './feedback.jsx';
const Fdbpage = () => {
  const [activeClubInfo, setActiveClubInfo] = useState(null);

  const handleExploreClick = (clubName) => {
    setActiveClubInfo(clubName);
  };

  return (
    <div>
      <NAVbar2 />
      <div className="clubs1">
        {eventsData.map((club) => (
          <Card
            className="ccard"
            key={club.clubName}
            imageUrl={club.imageUrl}  
            description={club.clubName}
            onExplore={() => handleExploreClick(club.clubName)}
          />
        ))}
      </div>
      {activeClubInfo && (
        
        <div className="club-info-1">
            <div className="club-info-2">        
            <h2>{activeClubInfo}</h2>
            <div class Name="club-desc">
                <p>{eventsData.find((c) => c.clubName === activeClubInfo)?.description}</p>
            </div>
            <h3>President</h3> 
            
            <p>{eventsData.find((c) => c.clubName === activeClubInfo)?.president}</p>
            
            <h3>Media-Leads</h3> 
            
            {eventsData.find((club) => club.clubName === activeClubInfo)?.mediaLead.map((event)=>(
                <p key={event}>{event}</p>
            ))
            }
            
            <h3>Coordinators</h3> 
            
            {eventsData.find((club) => club.clubName === activeClubInfo)?.coordinator.map((event)=>(
                <p key={event}>{event}</p>
            ))
            }
        
            <h3>Volunteers</h3> 
            
            {eventsData.find((club) => club.clubName === activeClubInfo)?.volunteer.map((event)=>(
                <p key={event}>{event}</p>
            ))
            }
            
            <h3>Email</h3> 
           
            <p>{eventsData.find((c) => c.clubName === activeClubInfo)?.email}</p>
            
            <h3>Contact No.</h3> 
            
            <p>{eventsData.find((c) => c.clubName === activeClubInfo)?.phone}</p>
            
            </div>
          <h3>Recent Events</h3>
          <ul>
            {eventsData.find((club) => club.clubName === activeClubInfo)?.eventsData.map(
              (event) => (

                <li key={event.title}>
                    <span>{event.date}</span> {event.title}
                    {event.venue && ` (${event.venue})`}
                    <Popup trigger={<button className="libtn">Rate</button>} position="center" closeOnDocumentClick>
                        <div className="Popup2">
                        <Feedback club = {activeClubInfo}/>
                        </div>
                    </Popup>
                </li>
                
              )
            )}
          </ul>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Fdbpage;
