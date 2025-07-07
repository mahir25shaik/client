/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import '../styles/home.css';

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="home">
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Welcome to Our skill Connect</h1>
        <p>Explore More job Opportunity in skill Connect. This Skill Connect Web page connects with Working Professional & Students to Interacts in Software Industry.</p>
        <motion.button
          className="get-started-btn"
          onClick={handleGetStarted}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Getting Started
        </motion.button>
      </motion.div>
      <div className="hero-image">
        <motion.img
          src="https://tse2.mm.bing.net/th/id/OIP.5MDyyRnQK7V1L35UpWQ-ygHaEK?pid=Api&P=0&h=180"
          alt="Restaurant"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Home;