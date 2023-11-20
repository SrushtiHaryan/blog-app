import React, {useState, useEffect} from 'react'
import './Home.css'
import axios from 'axios';

import Masonry from 'react-masonry-css'; // Import the Masonry component from react-masonry-css
import BlogCard from '../../components/BlogCard/BlogCard'

const Home = () => {
    

    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
       
        axios.get('http://localhost:8080/api/blogs')
            .then(response => {
                setBlogData(response.data);
            })
            .catch(error => {
                console.error('Error fetching blog data:', error);
            });
    }, []);

    
    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1,
    };

    return (
        
        <div className="blog">
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
            >
                {/* Map through blogData to render BlogCard components */}
                {blogData.map((blog) => (
                    <div key={blog.id}>
                    <BlogCard
                            title={blog.title}
                            content={blog.content}
                            highlight={blog.highlight}
                            imageUrl={blog.imageUrl}
                            author={blog.author}
                            id={blog.id}
                        />
                    </div>
                ))}
            </Masonry>
        </div>
    );
};

export default Home;