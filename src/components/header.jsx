import React from 'react';
import {Link} from "react-router-dom";
import './App.css';

function ClubProfile() {
  return (
    <div className="nav-admin">
      <div className='eve-heading'><h1>EVESPARK - EMS </h1></div>
      <div className="subnav-admin">
        <Link className='route-page'  to="/src/profile.jsx" >Home</Link>
        <Link className='route-page'  to="/src/Events.jsx" >Events</Link>
        <Link className='route-page'  to="/src/host.jsx" >Host</Link>
        <Link className='route-page'  to="/src/analysis.jsx" >Analytics</Link>
        <Link className='route-page'  to="/src/editprofile.jsx" >Profile</Link>
        
        
      </div>
    </div>
  );
}

export default ClubProfile;
