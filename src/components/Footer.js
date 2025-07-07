/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';
import '../styles/components.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/admin-login">Admin Login</Link>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
      <p className="footer-copy">&copy; 2025 Skill Connect. All rights reserved.</p>
    </footer>
  );
}

export default Footer;