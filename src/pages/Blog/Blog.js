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
    // Find the blog post using its ID
    //   const blog = blogs.find(blog => blog.id === parseInt(id));

    //   if (!blog) {
    //     return <div>Blog not found</div>;
    //   }

    // Check if the current user is the author of the blog post
    //   const isAuthor = blog.author === currentUser;

    // Function to handle deletion of the blog post


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/blog/${id}`);
                console.log(response.data);
                setBlog(response.data); // Assuming the response contains blog data
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        fetchBlog();
    }, [id]);


    const handleEdit = () => {
        setEditing(true);
        // setBlogContent(blog.content);
    };

    const handleCloseModal = () => {
        setEditing(false);
    };
    

    const handleSaveModal = async (updatedBlog) => {

        try {
            // Make a request to update the blog data in the database
            const response = await axios.put(`http://localhost:8080/api/blog/${id}`, updatedBlog);
            console.log('Updated blog:', response.data);

            // Handle other actions if needed
            setEditing(false); // Close the modal after saving
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
            // Make a DELETE request to delete the blog with its ID
            await axios.delete(`http://localhost:8080/api/blog/${id}`);
            console.log(`Blog with ID ${id} deleted`);
    
            // Handle other actions if needed
            setDeleting(false); // Close the modal or handle any UI changes
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    if (!blog) {
        return <div>Loading...</div>; // You can also show an error message here
    }

    return (
        <div className="individual-blog">
            <img src={blog.imageUrl} alt="Blog" className="blog-image" />
            <h1>{blog.title}</h1>
            <p>Author: {blog.author.username}</p>
            {/* {isAuthor && ( */}


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