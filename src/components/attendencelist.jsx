import React, { useState, useEffect } from 'react';
import './EventList.css'; // Import the CSS file for styling
import axios from 'axios';

function EventList({onclose}) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/register');
      setUsers(response.data);
      setFilteredUsers(response.data); // Initialize filtered data with all users
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Function to handle changes in the search input
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    filterUsers(event.target.value);
  };

  // Function to filter users based on search query
  const filterUsers = (query) => {
    const filteredData = users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.regnum.toLowerCase().includes(query.toLowerCase()) ||
      user.event_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };
  const handleDelete = async (registerId) => {
    try {
        await axios.delete(`http://localhost:8000/register/${registerId}`);
        // Remove the deleted event from the state
        setUsers(users.filter(user => user.id !== registerId));
    } catch (error) {
        console.error('Error deleting event:', error);
    }
};
  return (
    <div className="event-list-container">
      <h2>Attendance List</h2>
      <button variant='primary' onClick={onclose} style={{width:'200px'}}>CLOSE LIST</button>
      <br />
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchQuery} 
          onChange={handleSearchInputChange} 
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Student Name</th>
            <th>Registration No</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}> {/* Assuming user has an id property */}
              <td>{user.event_name}</td>
              <td>{user.name}</td>
              <td>{user.regnum}</td>
              
              <td>
                <button onClick={() => handleDelete(user.id)} style={{backgroundColor:"red"}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventList;
