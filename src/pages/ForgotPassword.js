/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/pages/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import '../styles/components.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://server-res-five.vercel.app/api/forgot-password', { email, newPassword });
      if (res.data.success) {
        setMessage('Password updated successfully!');
      } else {
        setMessage('Email not found!');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error updating password.');
    }
  };

  return (
    <div className="form-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <button type="submit">Update Password</button>
      </form>
      <p>{message}</p>
      <Footer />
    </div>
  );
}

export default ForgotPassword;