/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/components.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">Skill Connect </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </div>
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        {location.pathname === '/user-dashboard' ? (
          <>
            <Link to="/user-dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : location.pathname === '/admin-dashboard' ? (
          <>
            <Link to="/admin-dashboard" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Signup</Link>
            <Link to="/admin-login" onClick={() => setIsMenuOpen(false)}>Admin Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;