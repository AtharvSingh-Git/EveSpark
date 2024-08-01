import React, {  useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import registeration from './Images/1127745.png';
import attendees from './Images/attendees.png';
import Payment from './Images/3496311.png';
import logo from './Images/logoai.png';
import Rating from './Images/1688413.png';
import like from './Images/vecteezy_like-or-correct-symbol-confirmed-or-approved-button-check_18842672.png';
import axios from 'axios';
import Modal from './bot';
import './graph.css';
import Pie from './ringPiechart';
import Button from 'react-bootstrap/Button';
import Chart from 'chart.js/auto'; // Import Chart.js

const Dashboard = ({ onclose, data, dataFee }) => {
  // Dummy data for counter cards
   
  
  
  const Batch22=60;
  const Batch23=120;
  const Batch21=30;
  const [showModal,setShowModal] = useState(false);
  const [User,setUser] = useState([]);
  const [Attend,setAttend] = useState([]);
  useEffect(() => {
    // Clean up any existing charts when the component unmounts
    return () => {
      if (Array.isArray(Chart.instances)) {
        Chart.instances.forEach(instance => {
          instance.destroy();
        });
      }
    };
  }, []);


  const chartData = {
    labels: ['21 Batch', '22 Batch', '23 Batch'],
    datasets: [{
      label: 'Number of Students',
      data: [Batch21, Batch22, Batch23],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    }],
  };
  useEffect(() => {
    fetchData();
}, []);

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8000/user2');
        setUser(response.data);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
};
useEffect(() => {
  fetchData2();
}, []);
const fetchData2 = async () => {
  try {
      const response = await axios.get('http://localhost:8000/register');
      setAttend(response.data);
  } catch (error) {
      console.error('Error fetching events:', error);
  }
};
const filteredAttend = Attend.filter(attend => attend.event_name.toLowerCase() === data);
const filteredUsers = User.filter(user => user.reg_event.toLowerCase() === data);
const totalRegistrations = filteredUsers.length;
const totalPayment = filteredUsers.length*dataFee;
const attendeeCount = filteredAttend.length; 
  return (
    <div className="dashboard-container">
      <div className='sub-container'>
        <div className='dashboard-header'>
          <div>
            <img src={logo} alt="club-logo" className='club-logo'/>
            <h1>{data} ANALYSIS REPORT</h1>
          </div>
          <div className='btn-REPORT'>
            <Button variant='primary' onClick={() => setShowModal(true)} className='btn-report-1'>Suggestion Box</Button>
            {showModal && <Modal onclose={() => setShowModal(false)}></Modal>}
            <Button variant='primary' onClick={onclose}>Close</Button>
          </div>
        </div>
        <div >
          {/* Counter cards */}
          
            <div  className='counter-cards-container'>
              <div className='counter-card' >
                <img src={registeration} alt="registeration" className='card-img'/>
                <div className='card-details'>
                  <h1 className='card-counts'>{totalRegistrations}</h1>
                  <p><h1 className='card-heading'>REGISTRATIONS</h1></p>
                </div>
              </div>
              <div className='counter-card'>
                <img src={attendees} alt="attendees" className='card-img'/>
                <div className='card-details'>
                  <h1 className='card-counts'>{attendeeCount}</h1>
                  <p><h1 className='card-heading'>ATTENDEES</h1></p>
                </div>
              </div>
              <div className='counter-card'>
                <img src={Payment} alt="payment" className='card-img' />
                <div className='card-details'>
                  <h1 className='card-counts'>₹{totalPayment}</h1>
                  <p><h1 className='card-heading'>PAYMENT COLLECTED</h1></p>
                </div>
              </div>
            </div>
          
        </div>
        <div className='counter-cards-container'>
          {/* Counter cards */}
          <div className='counter-card-2'>
            <div className='counter-subcard'>
              <img src={Rating} alt="payment" className='card-img-1' />
              <div className='card-details-1'>
                <h1 className='card-counts'>50</h1>
                <p><h1 className='card-heading'>5🌟 RATINGS</h1></p>
              </div>
            </div>
            <div className='counter-subcard'>
              <img src={like} alt="payment" className='card-img-1' />
              <div className='card-details-1'>
                <h1 className='card-counts'>100</h1>
                <p><h1 className='card-heading'>Social Impressions</h1></p>
              </div>
            </div>
          </div>
          
          <div className='counter-card'>
            <Bar data={chartData} />
          </div>
        </div>
        <br />
        <br />
        
        <div className='counter-card-3'>
          <h1>BRANCH WISE DISTRIBUTION</h1>
          <br />
          <Pie ></Pie>
        </div>
        <br />
        <br />
        
      </div>
    </div>
  );
};

export default Dashboard;
