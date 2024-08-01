import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).name : '',
    registrationNumber: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).regNum : '',
    profilePicture: './user.jpg',
  });
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [volunteerEvents, setVolunteerEvents] = useState([]);
  const [rates, setRates] = useState([]);

  const fetchUserEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user2', {
        params: { username: userData.name, regNum: userData.registrationNumber },
      });
      console.log('User events:', response.data); // Log the response data
      // Filter events based on current user's registration number
      const filteredEvents = response.data.filter(event => event.regNum === userData.registrationNumber);
      setEvents(filteredEvents);
    } catch (error) {
      console.error('Error fetching user events:', error);
      setError(error);
    }
  };
  
  const fetchVolunteerEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/volunteerEvents', {
        params: { username: userData.name, regNum: userData.registrationNumber },
      });
      setVolunteerEvents(response.data);
    } catch (error) {
      console.error('Error fetching volunteer events:', error);
      setError(error);
    }
  };

  const fetchRates = async () => {
    try {
      const response = await axios.get('http://localhost:8000/feedback');
      // Filter rates based on current user's registration number
      const filteredRates = response.data.filter(rate => rate.regNum === userData.registrationNumber);
      setRates(filteredRates);
    } catch (error) {
      console.error('Error fetching user rates:', error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchUserEvents();
    fetchVolunteerEvents();
    fetchRates();
  }, [userData.registrationNumber]);

  const eventCount = events.length; // Count of registered events based on current user's registration number
  const volunteerCount = volunteerEvents.length;
  const rateCount = rates.length; // Count of rates based on current user's registration number

  return (
    <div>
      <div>
        <div className="user-profile">
          <div className="user-info">
            <img
              src={userData.profilePicture}
              alt={`${userData.name}'s Profile Picture`}
              className="profile-picture"
            />
            <div className="user-details">
              <h2>{userData.name}</h2>
              <p>Reg Number: {userData.registrationNumber}</p>
            </div>
          </div>

          <div className="stats">
            <div className="registered">
              <div className="num">
                <h2>{eventCount}</h2>
              </div>
              <h3>Registered Events</h3>
            </div>
            <div className="registered">
              <div className="num">
                <h2>{volunteerCount}</h2>
              </div>
              <h3>Volunteered</h3>
            </div>
            <div className="registered">
              <div className="num">
                <h2>{rateCount}</h2>
              </div>
              <h3>Rated Events</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
