import React, { useState, useEffect } from 'react';
import image from './Image/logoai.png';
import axios from 'axios';
import BarGraph from './components/bargrph';
import Modal from './components/graphsana';
import Button from 'react-bootstrap/Button';
import './analytics.css';

import AreaChart from './components/areachart';
import { Bar, Line } from 'react-chartjs-2';
function ClubProfile() {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEventTitle, setSelectedEventTitle] = useState(null);
  const [selectedEventFee,setSelectedEventFee] = useState(null);
  const Instagram = 1000;
  const Facebook = 750;
  const Twitter = 1500;
  const Reddit = 500;
  const GitHub = 600;
  const Linkedin = 450;
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden '; 
    } else {
      document.body.style.overflow = ''; 
    }
  }, [showModal]);
  const partnershipData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
      label: 'Number of Partnerships',
      data: [10, 15, 20, 13, 30, 35, 40, 45, 50, 55, 10, 5], // Sample data for the number of partnerships
      borderColor: 'rgba(75, 184, 182, 1)',
      borderWidth: 2,
      fill: false
    }]
  };
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  const chartData = {
    labels: ['Instagram', 'Facebook', 'Twitter', 'Reddit', 'Github','Linkedin'],
    datasets: [{
      label: 'Number of Students',
      data: [Instagram,Facebook,Twitter,Reddit,GitHub,Linkedin],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(255, 204, 86, 0.2)',
        'rgba(255, 203, 86, 0.2)',
        'rgba(255, 209, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(255, 204, 86, 0.2)',
        'rgba(255, 203, 86, 0.2)',
        'rgba(255, 209, 86, 0.2)',
      ],
      borderWidth: 1,
    }],
  };
  const filteredEvents = events.filter(event => event.Club.toLowerCase() === 'ai club'&& event.Date);

  const handleShowModal = (eventTitle,eventFee) => {
    setSelectedEventTitle(eventTitle);
    setSelectedEventFee(eventFee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const engagementData = [
    { branch: 'CSE', engagement: 100 },
    { branch: 'ECE', engagement: 60 },
    { branch: 'AI', engagement: 90 },
    { branch: 'Cloud Computing', engagement: 30 },
    { branch: 'EEE', engagement: 40 },
    { branch: 'Data Science', engagement: 80 },
    { branch: 'Ecomerce', engagement: 10 },
    { branch: 'Cyber Security', engagement: 20 },
    { branch: 'Mechanical', engagement: 30 },
  ];

  const revenueData = [
    { month: 'January', revenue: 1000 },
    { month: 'February', revenue: 1500 },
    { month: 'March', revenue: 2000 },
    { month: 'April', revenue: 200 },
    { month: 'May', revenue: 1700 },
    { month: 'June', revenue: 2000 },
    { month: 'July', revenue: 1400 },
    { month: 'August', revenue: 800 },
    { month: 'September', revenue: 500 },
    { month: 'October', revenue: 100 },
    { month: 'November', revenue: 50 },
    { month: 'December', revenue: 750 },
    
  ];


  return (
    <div>
      <br />
      <br />
      <div className="club-profile">
        <header className="club-header">
          <h1>AI Club</h1>
          <img src={image} alt="Club Logo" className="club-logo" />
        </header>
      </div>
      <br />
      <br />
      <div className="club-analysis">
        <div className='graph-anal'>
          <h2>Engagement of Each Branch</h2>
          <BarGraph data={engagementData} />
        </div>
        <div className='graph-anal'>
          <h2>Year Revenue Generation</h2>
          
          <AreaChart data={revenueData} />
        </div>
        <div className='graph-anal'>
          <h2>Socially Active Analysis</h2>
          <Bar data={chartData} />
        </div>
        <div className='graph-anal'>
          <h2>Partnership Growth Over Time</h2>
          <p> Highlight the club's networking efforts and expansion of its external support network.</p>
          <Line data={partnershipData} />
        </div>

        
      </div>
      <br />
      <br />
      <div className='club-event-lists'>
        <div className="club-events">
          <h2>Our Events</h2>
          <div>
            {filteredEvents.map(event => (
              <div className='event-list' key={event.id}>
                <p>{event.Date}</p>
                <div><h2>{event.Title}</h2></div>
                <Button variant='Primary' onClick={() => handleShowModal(event.Title.toLowerCase() , event.fee)} style={{width:'100px'}}>Show Report</Button>
              </div>
              
            ))}
            
            
          </div>
          <br />
          <br />
        </div>
      </div>
      {showModal && 
        <Modal onclose={handleCloseModal} data={selectedEventTitle} dataFee={selectedEventFee} />}
    </div>
  );
}

export default ClubProfile;
