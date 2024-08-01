import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link, useParams } from "react-router-dom";
const About = () =>(
    <div className="About-div" id="About-div">
        <div className="about-header">
            <h1>Celebrate with EVENTspark</h1>
        </div>
        <div className="about-content">
            <div className = "about-img">
                <img className = "about-img-1" src="https://e0.pxfuel.com/wallpapers/58/756/desktop-wallpaper-wild-night-club-episode-background-episode-interactive-background-anime-scenery-club-party.jpg"></img>
            </div>
            <div className = "about-text">
            <p>Simplifies event registration, management, and organization.</p>
            <p>Provides meticulous event oversight.</p>
            <button ><Link className="about-btn"  to="/user">Get started</Link></button>
            </div>
            
        </div>      
    </div>
);

export default About;