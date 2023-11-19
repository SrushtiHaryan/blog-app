import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the blog ID from the URL
import './Blog.css';
import BlogModal from '../../components/BlogModal/BlogModal';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import axios from 'axios';
const Blog = () => {
    const { id } = useParams(); // Get the blog ID from the URL
    const [editing, setEditing] = useState(false);
    const [blogContent, setBlogContent] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [blog, setBlog] = useState(null);

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

    const handleSaveModal = (newContent) => {
        // Handle saving the updated content (e.g., update state or API call)
        console.log('New content:', newContent);
        setEditing(false);
    };

    const handleDelete = () => {
        setDeleting(true);
    };

    const handleCloseDeleteModal = () => {
        setDeleting(false);
    };

    const handleDeleteConfirmation = () => {
        // Handle blog deletion (e.g., call delete API, update state)
        console.log(`Deleting blog with ID: ${id}`);
        setDeleting(false);
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

            <div className="options">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>

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