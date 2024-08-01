import React from 'react';
import './Admin.css';
import Events from './components/Eventsmain';
function Show() {
    return (
      <div className='admin-host-event'>
        <br />
        <Events/>
        <br />
      </div>
    );
}
  
export default Show;