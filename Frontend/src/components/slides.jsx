import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import Popup from 'reactjs-popup';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

function InfiniteScrollSlider() {
  const [scrollAmount, setScrollAmount] = useState(20);
  const [photos, setPhotos] = useState([]); // Placeholder for event images
  const marqueeRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [events, setEvents] = useState([]);
  const [values, setValues] = useState({
    name: '',
    regNum: '',
    payment: '',
    reg_event: '',
  });
  const [readMoreIndices, setReadMoreIndices] = useState([]);

  // Fetch event data from http://localhost:7000/events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:7000/events');
        const eventData = response.data; // Assuming successful response
        console.log('Fetched data:', eventData); // Log fetched data here
        setEvents(eventData);
        // Extract relevant information from event data
        const eventImages = eventData.map(event => event.Image);
        setPhotos(eventImages);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  // Handle mouse enter event on the marquee
  const handleMouseEnter = () => {
    setScrollAmount(0);
    if (marqueeRef.current) marqueeRef.current.stop(); // Ensure marqueeRef.current exists before calling stop()
  };

  // Handle mouse leave event on the marquee
  const handleMouseLeave = () => {
    setScrollAmount(20);
    if (marqueeRef.current) marqueeRef.current.start(); // Ensure marqueeRef.current exists before calling start()
  };

  const handleClick = (photo) => {
    setSelectedImage(photo);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(); 
    formData.append('name', values.name);
    formData.append('regNum', values.regNum);
    formData.append('payment', values.payment);
    formData.append('reg_event', 'Your chosen event'); 

    axios.post('http://localhost:8000/user2', formData)
    .then(response => {
      if (response.data.message === 'Registration successful!') {
        Swal.fire({
          icon: 'success',
          title: 'Registered Successfully!',
          text: 'Your registration has been submitted.',
        });
        setValues({ name: '', regNum: '', payment: '', reg_event: '' });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: response.data.message || 'An error occurred.',
        });
      }
    })
    .catch(error => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred during registration.',
      });
    });
  };

  const handleReadMore = (index) => {
    setReadMoreIndices(prevState => {
      if (prevState.includes(index)) {
        return prevState.filter(item => item !== index);
      } else {
        return [...prevState, index];
      }
    });
  };

  return (
    <marquee
      behavior="scroll"
      scrollamount={scrollAmount}
      direction="left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={marqueeRef}
    >
      <div className="div2">
        <Popup trigger={
          <div className="photo-wrapper" id="photoWrapper">
            {photos.map((photo, index) => (
              <div key={index} className="photo" onClick={() => handleClick(photo)}>
                <img src={`http://localhost:7000/uploads/${photo ? photo.substring(photo.lastIndexOf("\\") + 1) : ''}`} alt={`Image ${index}`} />
              </div>
            ))}
          </div>
        } position="center" closeOnDocumentClick>
          <div className="Popup1 ">
          <img className="popupimg" src={`http://localhost:7000/uploads/${selectedImage ? selectedImage.substring(selectedImage.lastIndexOf("\\") + 1) : ''}`} alt="Selected Image"/>

            <div className="poptext">
              <hr />
              {events.map((event, index) => (
                event.Image === selectedImage && 
                <div key={index} className="eventdt">
                  <h1>{event.Title}</h1>
                  <hr />
                  <p>
                    {readMoreIndices.includes(index) ? event.Description : event.Description.substring(0, 150)}
                    {event.Description.length > 150 && (
                      <Link onClick={() => handleReadMore(index)}>
                        {readMoreIndices.includes(index) ? '  Read Less' : '  Read More'}
                      </Link>
                    )}
                  </p>
                  <h4>Entry Fee: Rs {event.fee}</h4>
                  <h4>Venue: College Auditorium</h4> 
                  <h4>Date : {event.Date.substring(0, 10)}</h4>
                  <h4>Time : {event.Starttime} - {event.Endtime}</h4>
                  <hr />
                </div>
              ))}
              <div className="form1">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <label htmlFor="name">Name</label><br />
                  <input type="text" id="name" value={values.name} name="name" placeholder="Enter your name" required onChange={handleChange} />  <br />
                  <label htmlFor="registrationNumber">Registration Number</label><br />
                  <input type="text" id="regNum" value={values.regNum} name="regNum" placeholder="Enter your reg number" required onChange={handleChange} />  <br />
                  <label htmlFor="paymentproof">Payment Proof</label><br />
                  <input className="inputimg" type="file" id="payment" name="payment" placeholder="Attach Payment screenshot" required onChange={(e) => setValues({ ...values, payment: e.target.files[0] })} />  <br />

                  <button type="submit">Register</button> 
                  <button className="vol-btn" type="submit"><Link  to="/volunteer" className="vol-btn">Volunteer</Link></button>
                </form>
                <div>
                  <h3 className="qrhead">PAYMENT LINK</h3>
                  <img className="popimg" src="./qr_code_barcode.jpg" alt="QR Code" />
                </div>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </marquee>
  );
}

export default InfiniteScrollSlider;
