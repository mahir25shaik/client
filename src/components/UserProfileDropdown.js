/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/components/UserProfileDropdown.js
import React, { useState } from 'react';
import '../styles/components.css';

function UserProfileDropdown({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-profile">
      <button onClick={toggleDropdown} className="profile-btn">
        {user.fullName || 'User'}
      </button>
      {isOpen && (
        <div className="dropdown">
          <p>Email: {user.email}</p>
          <p>City: {user.city}</p>
          <p>Status: {user.status}</p>
          <p>Qualification: {user.qualification}</p>
          <p>Passout Year: {user.passoutYear}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfileDropdown;