import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './analytics.css';

function ClubProfile() {
  const [clubData, setClubData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/clubs');
      setClubData(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const extractFilename = (fullPath) => {
    if (typeof fullPath === 'string') {
      const parts = fullPath.split(/[\\/]/);
      const filename = parts.pop();
      return filename;
    } else {
      return null;
    }
  };
  

  return (
    <div>
      <br />
      <br />
      {clubData &&
        clubData
          .filter((ClubData) => ClubData && ClubData.Club && ClubData.Club.toLowerCase() === 'ai club')
          .map((ClubData) => (
            <div key={ClubData.id} className="club-profile">
              <header className="club-header">
                <h1>{ClubData.ClubName}</h1>
                <img src={`http://localhost:8000/uploads/${extractFilename(ClubData.photo)}`} alt={ClubData.Club} />
                <p>{ClubData.quote}</p>
              </header>
              <section className="club-info">
                <h2>About Us</h2>
                <p>{ClubData.Description}</p>
              </section>
  
              <footer className="club-footer">
                <p>
                  <strong>Club President name :</strong> {ClubData.ClubPresident}
                </p>
                <p>
                  <strong>Event Team Lead :</strong> {ClubData.eventLead}
                </p>
                <p>
                  <strong>Club Email :</strong> {ClubData.clubEmail}
                </p>
              </footer>
            </div>
          ))}
    </div>
  );
  
}

export default ClubProfile;
