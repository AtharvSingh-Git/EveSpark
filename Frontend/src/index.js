import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App'; // Import the App component
import reportWebVitals from './reportWebVitals';
import Landing from './components/landingpage.jsx'; // Assuming correct file path and extension
import User from './components/user.jsx'; // Assuming correct file path and extension
import Profile from './components/profile.jsx';
import LeaderBoard from './components/leaderboard.jsx';
import Clubs from './components/club2.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import Volunteer from './components/volunteer.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Render the App component at the root */}
      <Routes>
        <Route path="/" element={<Landing />} /> 
        <Route path="/user" element={<User />} /> 
        <Route path="/leaderboard" element={<LeaderBoard />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/clubs" element={<Clubs />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/sign-up" element={<Signup />}/>
        <Route path="/volunteer" element={<Volunteer />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
