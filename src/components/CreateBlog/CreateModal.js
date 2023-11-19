import React, { useState } from 'react';
import './CreateModal.css'; // Define modal styles in CreateModal.css
import { useUserContext } from '../../context/UserContext';
import axios from "axios"
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const CreateModal = () => {
    const { username} = useUserContext();
  const initialBlog = {
    
    title: '',
    content: '',
    imageUrl: '',
    highlight: '',
    author: username, // Set author as the username
  };

  const [blog, setBlog] = useState(initialBlog);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSave = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleCreatePost = async () => {
    try {
      const response = await axios.post('https://blog-app-server-px46.onrender.com/api/posts', blog);
      
      if (response.status === 201) {
        // Handle successful creation (e.g., show success message, reset form)
        console.log('Blog post created:', response.data);
        handleClose(); // Close the modal after posting
        setBlog(initialBlog); // Reset the form fields
      } else {
        // Handle other cases (e.g., show error message)
        console.error('Failed to create blog post');
      }
    } catch (error) {
      // Handle error cases (e.g., network error, server error)
      console.error('Error creating blog post:', error);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false); // Close the modal
    navigate('/'); // Redirect to the blog page
  };

  return (
    <div className={`modal ${isModalOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={blog.imageUrl}
          onChange={handleSave}
        />
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={blog.title}
          onChange={handleSave}
        />
         <label htmlFor="highlight">Highlight:</label>
                <textarea
                    id="highlight"
                    name="highlight"
                    value={blog.highlight}
                    onChange={handleSave}
                    className="modal-textarea"
                ></textarea>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={blog.content}
          onChange={handleSave}
          className="modal-textarea"
        ></textarea>
        <div className="modal-buttons">
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleCreatePost}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
