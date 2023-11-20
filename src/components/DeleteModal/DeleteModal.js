import React from 'react';
import './DeleteModal.css'; 

const DeleteModal = ({ isOpen, handleClose, handleDelete }) => {
  return (
    <div className={`delete-modal ${isOpen ? 'open' : ''}`}>
      <div className="delete-modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this blog post?</p>
        <div className="modal-buttons">
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
