import React from 'react'
import './BlogCard.css'
import { Link } from 'react-router-dom';

const BlogCard = (props) => {

    const { title, highlight, imageUrl, id } = props;

    return (
        <Link to={`/blog/${id}`} className='blog-link'>
            <div className='post'>
                <div className='blog-card-image'>
                    <img src={imageUrl} alt='Blog' />
                </div>
                <div className='texts'>
                    <h2>{title}</h2>
                    <p>{highlight}</p>
                </div>
            </div>
        </Link>
    );
}

export default BlogCard