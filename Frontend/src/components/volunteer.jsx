import React, { useState } from 'react';
import Footer from './footer.jsx';
import NAVbar2 from './user-nav.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';

function VolunteerForm() {
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [clubName, setClubName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = {
      name: name,
      regNum: registrationNumber,
      clubName: clubName
    };
    axios.post('http://localhost:8000/volunteer', formData)
      .then(res => {
        console.log("Registration successful!");
        Swal.fire({
          title: 'Success!',
          text: 'You have been successfully registered for volunteering!',
          icon: 'success',
        });
        setName('');
        setRegistrationNumber('');
        setClubName('');
      })
      .catch(err => console.log(err));
  };  

  return (
    <div className="vol-bg">
      <NAVbar2 />
      <form className="vol-form" onSubmit={handleSubmit}>
        <h2>VIT CLUB</h2>
        <br />
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          style={{ width: '300px', height: '30px' }}
        />
        <br />
        <br />
        <label htmlFor="registrationNumber">Registration Number</label>
        <input
          type="text"
          id="registrationNumber"
          value={registrationNumber}
          onChange={(event) => setRegistrationNumber(event.target.value)}
          required
          style={{ width: '300px', height: '30px' }}
        />
        <br />
        <br />
        <label htmlFor="clubName">Club Name</label>
        <input
          type="text"
          id="clubName"
          value={clubName}
          onChange={(event) => setClubName(event.target.value)}
          required
          style={{ width: '300px', height: '30px' }}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <Footer />
    </div>
  );
}

export default VolunteerForm;
