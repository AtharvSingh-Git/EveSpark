import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import NAVbar2 from './user-nav.jsx';
import Footer from './footer.jsx';
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';

const Feedback = (props) => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const handleRatingClick = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    
    const regNum = JSON.parse(localStorage.getItem('userInfo')).regNum;
  
    const formData = new FormData();
    formData.append('regNum', regNum); 
    formData.append('club_name', props.club);
    formData.append('rating', rating);
    formData.append('feedback', feedbackText);
    axios.post('http://localhost:8000/feedback', formData)
      .then(res => console.log("Feedback Received"))
      .catch(err => console.log(err));
  
    // Reset state and show success message
    Swal.fire({
      title: 'Feedback Saved!',
      text: 'Your response has been saved successfully.',
      icon: 'success',
    });
    setRating(0);
    setFeedbackText('');
  };

  return (
    <div>
      <div className="feedback" encType="multipart/form-data">
        <form onSubmit={handleSubmit}>
          <h2 className="feedbacktext1">Leave a Feedback</h2>
          <h4 className="feedbacktext2">Rate!</h4>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              const filled = index < rating;
              return (
                <label key={index}>
                  <input
                    name='rating'
                    type="radio"
                    value={index + 1}
                    checked={filled}
                    onChange={() => handleRatingClick(index + 1)}
                  />
                  <FaStar className={filled ? 'filled' : 'empty'} />
                </label>
              );
            })}
          </div>
          <textarea
            name='feedback'
            value={feedbackText}
            onChange={handleFeedbackChange}
            placeholder="Write your feedback here..."
            rows={5}
          />
          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
