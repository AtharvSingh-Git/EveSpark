import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './landingpage.jsx';
import User from './user.jsx';
import Login from './login.jsx';
function isLoggedIn () {
    return localStorage.getItem('userInfo');
}

function handleLogout () {
    console.log('LogOUT');
    localStorage.removeItem('userInfo');
    window.location.href = '/';
}

function NAVbar() {
    return (
        <div >
            <div className="nav">
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
                    <a href="/#About-div" >About Us</a>
                    <Link  to="/user" >User</Link>
                    <a href="" >Admin</a>
                    {isLoggedIn() ? (
                        <a className="logout" onClick={() => {
                            localStorage.removeItem('userInfo');
                            window.location.href = '/';
                        }}>Logout</a>
                    ) : (
                        <Link to="/login" >SignUp / Login</Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NAVbar;
