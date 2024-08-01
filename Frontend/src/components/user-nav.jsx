import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './landingpage.jsx';
import User from './user.jsx';
//import Admin from './Admin';
//import SignUpLogin from './SignUpLogin';
function NAVbar() {
    return (
        <div >
            <div className="nav nav2">
                <input type="checkbox" id="nav-check"/>
                <div className="nav-btn">
                    <label htmlFor="nav-check">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </label>
                </div>
                
                <div className="nav-links">
                    <Link  to="/" >Home</Link>
                    <Link  to="/user" >Events</Link>
                    <Link  to="/clubs" >Clubs</Link>
                    <Link  to="/leaderboard" >LeaderBoard</Link>
                    <Link  to="/profile">Profile</Link>
                </div>
            </div>
        </div>
    );
}

export default NAVbar;
