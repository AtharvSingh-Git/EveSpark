import React, { useState, useEffect } from 'react';
import './EventList.css'; // Import the CSS file for styling
import axios from 'axios';
import Modal from './attendencelist';
function EventList() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [markedPresentUsers, setMarkedPresentUsers] = useState([]); // State to track which users are marked present

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user2');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleMarkPresent = async (regnum, name, event_name) => {
    try {
      console.log(regnum); // This logs the regnum value

      const data = new FormData();
      data.append("regnum", regnum); // Append regnum from user object
      data.append("name", name);
      data.append("event_name", event_name);

      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        body: data, // Send the FormData object in the request body
      });

      if (!response.ok) {
        throw new Error('Error marking user present!');
      }

      console.log('User marked as present:', await response.json());

      // Update the state to mark the user as present
      setMarkedPresentUsers(prevUsers => [...prevUsers, { regnum, event_name }]);

      // ... rest of the code for handling response
    } catch (error) {
      console.error('Error marking user present:', error);
      // Handle errors
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.regNum.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.reg_event.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="event-list-container">
      <h2>Event Registration List</h2>
      <br />
      <button variant='primary' onClick={()=> setShowModal(true)} style={{width:'200px'}}>View Attendance List</button>
      {showModal && 
        <Modal onclose={()=> setShowModal(false)}  />}
      <br />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, registration number, or event name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Student Name</th>
            <th>Registration No</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.reg_event}</td>
              <td>{user.name}</td>
              <td>{user.regNum}</td>
              <td>{user.payment}</td>
              <td>
                {/* Render button or tick based on whether the user is marked present */}
                {markedPresentUsers.some(u => u.regnum === user.regNum && u.event_name === user.reg_event) ? (
                  <span>&#10004;</span> // Render a tick icon
                ) : (
                  <button onClick={() => handleMarkPresent(user.regNum, user.name, user.reg_event)}>Mark As Present</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventList;
