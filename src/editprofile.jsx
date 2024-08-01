import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './prof.css';

export default function Modal({ initialFormData }) {
    const [formData, setFormData] = useState({
        ClubName: '',
        quote: '',
        Description: '',
        ClubPresident: '', 
        eventLead: '',
        clubEmail: '',
        photo: ''
    });

    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const { ClubName, quote, Description, ClubPresident, eventLead, clubEmail, photo } = formData;
    
            const data = new FormData();
            data.append('ClubName', ClubName);
            data.append('quote', quote);
            data.append('Description', Description);
            data.append('ClubPresident', ClubPresident);
            data.append('eventLead', eventLead);
            data.append('clubEmail', clubEmail);
            data.append('photo', photo);
            const response = await fetch('http://localhost:8000/club', {
                method: 'POST',
                body: data
            });

            if (response.ok) {
                console.log('Club created successfully!');
                setFormData({
                    ClubName: '',
                    quote: '',
                    Description: '',
                    ClubPresident: '',
                    eventLead: '',
                    clubEmail: '',
                    photo: null
                });
            } else {
                const errorData = await response.json(); // Parse the error response from the server
                console.error('Failed to create club:', errorData.error); // Log the error message
                // Handle the error data and provide feedback to the user
                // For example, you can update state to display an error message to the user
            }
            
        } catch (error) {
            console.error('Error creating club:', error);
        }
    };
    

    return (
        <div className='prof-form-full'>
            <div className='prof-form'>
                <h1>Post Event</h1>
                <form className='core-prof-form' encType='multipart/form-data'>
                    <div className='prof-form-group'>
                        <label htmlFor='Club'>Club Name</label>
                        <input type="text" name="ClubName" id='ClubName' className='form-control' onChange={handleChange} required />
                    </div>
                    <div className='prof-form-group'>
                        <label htmlFor='quote'>Quotes</label>
                        <input type="text" name="quote" id='quote' onChange={handleChange} className='form-control' required />
                    </div>
                    <div className='prof-form-group'>
                        <label htmlFor='Description'>Description</label>
                        <input type="text" name="Description" id='Description' onChange={handleChange} className='form-control' required />
                    </div>
                    <div className='prof-form-group'>
                        <label htmlFor='ClubPresident'>Club President Name</label>
                        <input type="text" name="ClubPresident" id='ClubPresident' onChange={handleChange} className='form-control' required />
                    </div>
                    <div className='prof-form-group'>
                        <label htmlFor='eventLead'>Event Lead Name</label>
                        <input type="text" name="eventLead" id='eventLead' onChange={handleChange} className='form-control' required />
                    </div>
                    <div className='prof-form-group'>
                        <label htmlFor='clubEmail'>Club Email</label>
                        <input type="text" name="clubEmail" id='clubEmail' onChange={handleChange} className='form-control' required />
                    </div>
                    <div className='prof-form-group'>
                        <label htmlFor='photo'>Photo</label>
                        <input type="file" name="photo" id='photo' onChange={handleChange} className='form-control-file' />
                    </div>
                    <Button variant='primary' onClick={handleSubmit}> Post </Button>
                </form>
            </div>
        </div>
    );
}
