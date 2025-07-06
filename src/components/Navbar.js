/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/components.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    // Simple logout logic (clear session or token if implemented)
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo">Restaurant App</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {location.pathname === '/user-dashboard' ? (
          <>
            <Link to="/user-dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : location.pathname === '/admin-dashboard' ? (
          <>
            <Link to="/admin-dashboard">Admin Dashboard</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/admin-login">Admin Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;