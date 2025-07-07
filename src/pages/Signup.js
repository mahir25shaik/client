/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import '../styles/components.css';

function Signup() {
  const [formData, setFormData] = useState({
    email: '', fullName: '', password: '', dob: '', city: '', state: '',
    country: '', phone: '', status: '', qualification: '', branch: '', passoutYear: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending signup data:', formData);
      const res = await axios.post('https://server-res-five.vercel.app/api/signup', formData);
      if (res.data.success) {
        alert('Signup successful!');
        navigate('/login');
      } else {
        console.error('Signup failed response:', res.data);
        alert('Signup failed: ' + (res.data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Signup error:', err);
      const errorMessage = err.response?.data?.message || err.message;
      alert('Signup failed: ' + errorMessage);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
        <input type="text" name="fullName" onChange={handleChange} placeholder="Full Name" required />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
        <input type="date" name="dob" onChange={handleChange} required />
        <input type="text" name="city" onChange={handleChange} placeholder="City" required />
        <input type="text" name="state" onChange={handleChange} placeholder="State" required />
        <input type="text" name="country" onChange={handleChange} placeholder="Country" required />
        <input type="tel" name="phone" onChange={handleChange} placeholder="Phone No" required />
        <select name="status" onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="employed">Employed</option>
          <option value="graduated">Graduated</option>
          <option value="pursuing">Pursuing</option>
        </select>
        <input type="text" name="qualification" onChange={handleChange} placeholder="Qualification" required />
        <input type="text" name="branch" onChange={handleChange} placeholder="Branch" required />
        <input type="text" name="passoutYear" onChange={handleChange} placeholder="Passout Year" required />
        <button type="submit">Signup</button>
      </form>
      <Footer />
    </div>
  );
}

export default Signup;