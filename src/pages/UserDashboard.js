/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/pages/UserDashboard.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfileDropdown from '../components/UserProfileDropdown';
import Footer from '../components/Footer';
import '../styles/components.css';

function UserDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user || {};
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [user]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/messages', {
        params: { category: user.status }
      });
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleWhatsAppRedirect = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <button onClick={() => navigate('/')} className="logout-btn">Logout</button>
        <button onClick={handleWhatsAppRedirect} className="whatsapp-btn">WhatsApp</button>
        <UserProfileDropdown user={user} />
      </div>
      <h2>Welcome to Restaurant App</h2>
      <div className="messages">
        <h3>Messages from Admin</h3>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="message">
              <p style={{ whiteSpace: 'pre-line' }}>{msg.message}</p>
              <p><small>{new Date(msg.timestamp).toLocaleString()}</small></p>
              <p><small>Note: This message will be deleted after 2 days.</small></p>
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default UserDashboard;