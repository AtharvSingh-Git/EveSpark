import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import './Admin.css';

export default function Modal({ onclose }) {
    const [formData, setFormData] = useState({
        Title: '',
        Club: '',
        Starttime: '',
        Endtime: '',
        Date: '',
        Volunteersreq: '',
        fee: '',
        Description: '',
        Image: ''
    });

    const handleInputChange = (e) => {
        if (e.target.name === 'Image') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };
    

    const handlePost = async () => {
        try {
            const { Title, Club, Starttime, Endtime, Date, Volunteersreq, fee, Image, Description } = formData;
    
            const Data = new FormData();
            Data.append('Title', Title);
            Data.append('Club', Club);
            Data.append('Starttime', Starttime);
            Data.append('Endtime', Endtime);
            Data.append('Date', Date);
            Data.append('Volunteersreq', Volunteersreq);
            Data.append('fee', fee);
            Data.append('Image', Image);
            Data.append('Description', Description);
    
            const response = await fetch('http://localhost:8000/event', {
                method: 'POST',
                body: Data // Pass the FormData object as the request body
            });
    
            if (response.ok) {
                console.log('Event added successfully!');
                onclose();
            } else {
                console.error('Failed to add event');
            }
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };
    

    return (
        <div className='form-full'>
            <div className='admin-form' >
                <h1>Post Event</h1>
                <form className='core-admin-form' encType='multipart/form-data'>
                    <div>
                        <label>
                            <div className='spann-label-text'><span>Title</span></div>
                            <input type="text" name="Title" className='label-default-admin' onChange={handleInputChange} required='true' />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label>
                            <div className='spann-label-text'><span>Organizing Club</span></div>
                            <input type="text" name="Club" onChange={handleInputChange} required='true' className='label-default-admin' />
                        </label>
                    </div>

                    <br />
                    <div>
                        <label>
                            <div className='spann-label-text'><span>To</span></div>
                            <input type="time" name="Starttime" onChange={handleInputChange} required='true' className='label-default-admin' />
                        </label>

                        <label>
                            <div className='spann-label-text'><span>Till</span></div>
                            <input type="time" name="Endtime" onChange={handleInputChange} required='true' className='label-default-admin' />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label>
                            <div className='spann-label-text'><span>Date</span></div>
                            <input type="date" name="Date" onChange={handleInputChange} required='true' className='label-default-admin' />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label>
                            <div className='spann-label-text'><span>Volunteers Require</span></div>
                            <input type="number" name="Volunteersreq" onChange={handleInputChange} required='true' className='label-default-admin' />
                        </label>
                    </div>
                    <br></br>
                    <div>
                        <label>
                            <div className='spann-label-text'><span>Photo</span></div>
                            <input type="file" name="Image" onChange={handleInputChange} className='label-default-admin-des' />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label>
                            <div className='spann-label-text'><span>Fee</span></div>
                            <input type="currency" name="fee" onChange={handleInputChange} className='label-default-admin' />
                        </label>
                    </div>
                    
                    <br />
                    <div>
                        <label>
                            <div className='spann-label-text'><span>Description</span></div>
                            <input type="text" name="Description" onChange={handleInputChange} required='true' className='label-default-admin-des' />
                        </label>
                    </div>
                    <br />
                    
                    
                    <br />
                    <Button variant='primary' onClick={handlePost}> Post </Button>
                </form>
            </div>
            <div className='btn-close-form'><Button variant='primary' onClick={onclose}>Close</Button></div>
        </div>
    );
}