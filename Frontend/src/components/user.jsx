import React from 'react';
import ReactDOM from 'react-dom/client';
import NAVbar2 from './user-nav.jsx';
import Footer from './footer.jsx';
import Slide from './slides.jsx';
import Card from './card.jsx';
import Clubs from './clubs.jsx';

export const User = ()=>(
    <div>
        <NAVbar2 />
        
        <div className = "event-heading">
            <p>Ongoing Registrations</p>
            <hr/>
            <Slide />
            <p>Upcoming Events</p>
            <hr/>
            <Slide />
        </div>
        <Footer />
    </div>

);

export default User;