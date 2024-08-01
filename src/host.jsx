
import React, { useState } from 'react';
import './Admin.css';
import Modal from './Modal';
import Events from './deleteevent';
import Button from 'react-bootstrap/Button';

function Host() {
  const [showModal, setShowModal] = useState(false);
  

  

  return (
    <div className='admin-host-event'>
      <br />
      <div className='display-flex flex-direction-column'>
        <div className='host-head-kode-mono'><h1>"Host Your Event With EveSpark - EMS"</h1></div>
        <div className='host-para-ojuju'><p>Thank you for choosing EveSpark - EMS to host your event! Please navigate to post your event on the events page to gain more attentions of participants towards your Event. </p></div>
        <br/>
        <Button variant='Primary' onClick={() => setShowModal(true)}>Post Event</Button>
        {showModal && 
          <Modal onclose={() => setShowModal(false)}/>
          
        }
      </div>
      <div>
        <br/>
        
        
        
        
        <Events />
        
      </div>
    </div>
  );
}

export default Host;