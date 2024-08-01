import React from 'react';

const Card = ({ imageUrl, description, onExplore }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt="Card" className="card-image" />
      <div className="card-content">
        <p className="card-description">{description}</p>
        <button onClick={onExplore} className="explore-button">
          Explore
        </button>
      </div>
    </div>
  );
};

export default Card;
