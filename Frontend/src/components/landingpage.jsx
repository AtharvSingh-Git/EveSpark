import React from 'react';
import ReactDOM from 'react-dom/client';
import NavText from './nav-text.jsx';
import About from './about.jsx'
import Footer from './footer.jsx'
function Landing(){
    return(
        <div>
            < NavText />
            < About />
            < Footer />
        </div>
    );
}

export default Landing;