import React, {useState} from 'react';
import './BlogModal.css'; // Define modal styles in Modal.css

const BlogModal = ({ isOpen, handleClose, handleSave, blog }) => {

  
  const { imageUrl, title, content, highlight } = blog;
  const [updatedBlog, setUpdatedBlog] = useState({ ...blog });

  const handleInputChange = (field, value) => {
    setUpdatedBlog({ ...updatedBlog, [field]: value });
  };

  const handleSaveClick = () => {
    handleSave(updatedBlog);
    handleClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          value={updatedBlog.imageUrl}
          onChange={(e) =>  handleInputChange('imageUrl', e.target.value)}
        />
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={updatedBlog.title}
          onChange={(e) => handleInputChange('title', e.target.value )}
        />
        <label htmlFor="title">Highlight:</label>
        <input
          type="text"
          id="highlight"
          value={updatedBlog.highlight}
          onChange={(e) => handleInputChange('highlight', e.target.value )}
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={updatedBlog.content}
          onChange={(e) => handleInputChange('content', e.target.value )}
          className="modal-textarea"
        ></textarea>
        <div className="modal-buttons">
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
