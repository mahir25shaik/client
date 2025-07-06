/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/pages/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/components.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hardcoded admin credentials
    const admin1 = { email: 'admin1@restaurant.com', password: 'skill@connect12' };
    const admin2 = { email: 'admin2@restaurant.com', password: 'skill@connect12' };
    
    if ((email === admin1.email && password === admin1.password) || 
        (email === admin2.email && password === admin2.password)) {
      navigate('/admin-dashboard');
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="form-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <Footer />
    </div>
  );
}

export default AdminLogin;