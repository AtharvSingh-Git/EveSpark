import React from 'react';

function Modal({ message, onClose, className }) {
  return (
    <div className={`modal-backdrop ${className}`}>
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;