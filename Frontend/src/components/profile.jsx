import React, { useState, useEffect } from 'react';
import Footer from './footer.jsx';
import NAVbar2 from './user-nav.jsx';
import User from './profile1.jsx';
import axios from 'axios';

export const Profile = () => {
  return (
    <div>
      <NAVbar2 />
      <div>
          <User/> 
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
