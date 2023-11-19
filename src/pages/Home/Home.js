import React, {useState, useEffect} from 'react'
import './Home.css'
import axios from 'axios';

import Masonry from 'react-masonry-css'; // Import the Masonry component from react-masonry-css
import BlogCard from '../../components/BlogCard/BlogCard'

const Home = () => {
    // Sample data for blog cards (you can replace this with your actual data)
    // const blogData = [
    //     {
    //         id: 1,
    //         title: 'India Price Comparison Research',
    //         content:
    //             'A dedicated comparison research team in Wise compared Wise to four India bank accounts. They found that we’re on average 3x cheaper to send ₹9,000 abroad',
    //         imageUrl:
    //             'https://wise.com/imaginary-v2/f1aa072b2e417238ccaf8a6f2caa9c0f.jpg',
    //     },

    //     {
    //         id: 2,
    //         title: 'India Price Comparison Research',
    //         content:
    //             'A dedicated comparison research team in Wise compared Wise to four India bank accounts. They found that we’re on average 3x cheaper to send ₹9,000 abroad. A dedicated comparison research team in Wise compared Wise to four India bank accounts. They found that we’re on average 3x cheaper to send ₹9,000 abroad',
    //         imageUrl:
    //             'https://wise.com/imaginary-v2/f1aa072b2e417238ccaf8a6f2caa9c0f.jpg',
    //     },
    //     {
    //         id: 3,
    //         title: 'India Price Comparison Research',
    //         content:
    //             'A dedicated comparison research team in Wise compared Wise to four India bank accounts. They found that we’re on average 3x cheaper to send ₹9,000 abroad',
    //         imageUrl:
    //             'https://wise.com/imaginary-v2/f1aa072b2e417238ccaf8a6f2caa9c0f.jpg',
    //     },
    //     {
    //         id: 4,
    //         title: 'India Price Comparison Research',
    //         content:
    //             'A dedicated comparison research team in Wise compared Wise to four India bank accounts. They found that we’re on average 3x cheaper to send ₹9,000 abroad',
    //         imageUrl:
    //             'https://wise.com/imaginary-v2/f1aa072b2e417238ccaf8a6f2caa9c0f.jpg',
    //     },

    //     {
    //         id: 5,
    //         title: 'India Price Comparison Research',
    //         content:
    //             'A dedicated comparison research team in Wise compared Wise to four India bank accounts. They found that we’re on average 3x cheaper to send ₹9,000 abroad',
    //         imageUrl:
    //             'https://wise.com/imaginary-v2/f1aa072b2e417238ccaf8a6f2caa9c0f.jpg',
    //     },
    //     {
    //         id: 6,
    //         title: 'India Price Comparison Research',
    //         content:
    //             'A dedicated comparison research team in Wise compared Wise to four India bank accounts. They found that we’re on average 3x cheaper to send ₹9,000 abroad',
    //         imageUrl:
    //             'https://wise.com/imaginary-v2/f1aa072b2e417238ccaf8a6f2caa9c0f.jpg',
    //     }

    //     // Add more blog data as needed
    // ];

    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        // Perform GET request to fetch blog data from the server
        axios.get('http://localhost:8080/api/blogs')
            .then(response => {
                // Assuming the data returned is an array of blogs
                setBlogData(response.data);
            })
            .catch(error => {
                console.error('Error fetching blog data:', error);
            });
    }, []);

    // Define the breakpoint for the Masonry layout
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