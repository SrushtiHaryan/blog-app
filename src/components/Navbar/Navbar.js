import React, {useEffect} from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'

const Navbar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, username, setLoggedInContext, setUsernameContext } = useUserContext();

  const handleLogout = () => {
    // Perform logout actions
    setLoggedInContext(false); // Set isLoggedIn to false or null
    setUsernameContext(''); // Clear username

    // Additional actions like clearing local storage, etc., if needed

    // Redirect to the login or home page after logout
    // history.push('/login'); // Redirect to your login page if needed
    console.log(isLoggedIn)
  };

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect after context updates
    //   navigate('/login'); // Redirect to your blog page
    }
  }, [isLoggedIn, navigate]);
    return (
        <header>
            <a href="/" className="logo">BlogWise.</a>

            <nav>
                {isLoggedIn ? (
                    <>
                        <span>{username}</span> {/* Display username */}
                        <Link to="/create">Create</Link>
                        <Link to="/login" onClick={handleLogout}>Logout</Link> {/* Change to logout */}
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}

            </nav>
        </header>
    )
}

export default Navbar