import React, { useState } from 'react';
import axios from 'axios';

import './Register.css';


 
const Register = ({ handleRegister }) => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const registrationData = {
      "email":email,
     "password":password,
      "username":username,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/register', registrationData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data)

      if (response.data.registered) {
        // Registration successful
        window.location.href = response.data.redirect;
        
      } else {
        
        console.error('Registration failed:', response.data.error);
      }
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className="register-form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="register-form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="register-form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          className="register-form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="register-form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="register-form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn-register" onClick={handleSubmit}>Register</button>
    </form>
  );
};

export default Register;
