import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let { isLoggedIn, username, setLoggedInContext, setUsernameContext } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation and call handleLogin with email and password
    handleLogin(email, password);
  };

  const handleLogin = async (email, password) => {
    try {
      const loginData = { email, password };
      const response = await axios.post('http://localhost:8080/api/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.loggedIn) {
        // Redirect or perform actions upon successful login
        console.log(response.data)
        setLoggedInContext(response.data.loggedIn);
        setUsernameContext(response.data.username)
        console.log('Login successful');

        // Assuming these updates are synchronous, verify their values
        console.log('isLoggedIn:', response.data.loggedIn);
        console.log('username:', response.data.username);

        // Redirect after the context updates have taken place
        // window.location.href = response.data.redirect;
      } else {
        // Handle login failure
        console.error('Login failed:', response.data ? response.data.error : 'Unknown error');
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // Redirect after context updates
      navigate('/'); // Redirect to your blog page
    }
  }, [isLoggedIn, navigate]);
  

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn-login">Login</button>
    </form>
  );
};

export default Login;
