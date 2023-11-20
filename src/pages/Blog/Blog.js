import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams to get the blog ID from the URL
import './Blog.css';
import BlogModal from '../../components/BlogModal/BlogModal';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';

const Blog = () => {
    const { id } = useParams(); // Get the blog ID from the URL
    const [editing, setEditing] = useState(false);
    const [blogContent, setBlogContent] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [blog, setBlog] = useState(null);
    const { username } = useUserContext();
    const navigate = useNavigate();
    


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/blog/${id}`);
                console.log(response.data);
                setBlog(response.data); 
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        fetchBlog();
    }, [id]);


    const handleEdit = () => {
        setEditing(true);
       
    };

    const handleCloseModal = () => {
        setEditing(false);
    };
    

    const handleSaveModal = async (updatedBlog) => {

        try {
            // Make a request to update the blog data in the database
            const response = await axios.put(`http://localhost:8080/api/blog/${id}`, updatedBlog);
            console.log('Updated blog:', response.data);

            
            setEditing(false); 
            navigate(0);
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };
    const handleDelete = () => {
        setDeleting(true);
    };

    const handleCloseDeleteModal = () => {
        setDeleting(false);
    };

    const handleDeleteConfirmation = async () => {
        try {
            
            await axios.delete(`http://localhost:8080/api/blog/${id}`);
            console.log(`Blog with ID ${id} deleted`);
    
            setDeleting(false); 
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    if (!blog) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="individual-blog">
            <img src={blog.imageUrl} alt="Blog" className="blog-image" />
            <h1>{blog.title}</h1>
            <p>Author: {blog.author.username}</p>
           


            {(blog.author.username === username) && (
                <div className="options">
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}

            <div className="highlighted-blog">
                <h2 className="highlight-heading">{blog.highlight}</h2>
            </div>
            <div className="blog-content">{blog.content}</div>
            <BlogModal
                isOpen={editing}
                handleClose={handleCloseModal}
                handleSave={handleSaveModal}
                blog={blog}
            />

            <DeleteModal
                isOpen={deleting}
                handleClose={handleCloseDeleteModal}
                handleDelete={handleDeleteConfirmation}
            />
        </div>


    );
};

export default Blog;