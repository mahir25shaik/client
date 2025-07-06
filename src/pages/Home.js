/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/pages/Home.js
import React from 'react';
import Footer from '../components/Footer';
import '../styles/components.css';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Our Restaurant</h1>
      <p>Explore delicious meals and order now!</p>
      <div className="hero-image">
        <img src="https://via.placeholder.com/1200x400" alt="Restaurant" />
      </div>
      <Footer />
    </div>
  );
}

export default Home;