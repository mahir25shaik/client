/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Footer from '../components/Footer';
import '../styles/components.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState({ totalUsers: 0, statusCount: {}, cityCount: {}, stateCount: {}, countryCount: {}, qualificationByYearStatus: {}, branchByQualYearStatus: {} });
  const [messageStats, setMessageStats] = useState({ totalMessages: 0, categoryCount: {}, messages: [] });
  const [messages, setMessages] = useState({ employed: '', graduated: '', pursuing: '' });
  const [filter, setFilter] = useState({ city: '', state: '', country: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchUserStats();
    fetchMessageStats();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://skill-connect-server.glitch.me//api/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserStats = async () => {
    try {
      const res = await axios.get('https://skill-connect-server.glitch.me//api/user-stats');
      if (res.data.success) {
        setUserStats(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessageStats = async () => {
    try {
      const res = await axios.get('https://skill-connect-server.glitch.me//api/message-stats');
      if (res.data.success) {
        setMessageStats(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMessageSend = async (category) => {
    try {
      await axios.post('https://skill-connect-server.glitch.me//api/send-message', {
        category,
        message: messages[category]
      });
      alert(`Message sent to ${category} users`);
      setMessages({ ...messages, [category]: '' });
      fetchMessageStats(); // Refresh message stats after sending
    } catch (err) {
      console.error(err);
      alert('Failed to send message');
    }
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Prepare chart data
  const statusData = [
    { name: 'Employed', value: userStats.statusCount.employed || 0 },
    { name: 'Graduated', value: userStats.statusCount.graduated || 0 },
    { name: 'Pursuing', value: userStats.statusCount.pursuing || 0 },
  ];

  const messageData = [
    { name: 'Employed', value: messageStats.categoryCount.employed || 0 },
    { name: 'Graduated', value: messageStats.categoryCount.graduated || 0 },
    { name: 'Pursuing', value: messageStats.categoryCount.pursuing || 0 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // Filter users based on selected criteria
  const filteredUsers = users.filter(user => 
    (filter.city === '' || user.city === filter.city) &&
    (filter.state === '' || user.state === filter.state) &&
    (filter.country === '' || user.country === filter.country)
  );

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      <h2>Admin Dashboard</h2>

      {/* Data Visualization Section */}
      <div className="charts-section">
        <h3>User Statistics (Total Users: {userStats.totalUsers})</h3>
        <div className="filter-section">
          <select name="city" value={filter.city} onChange={handleFilterChange}>
            <option value="">Filter by City</option>
            {Object.keys(userStats.cityCount).map(city => (
              <option key={city} value={city}>{city} ({userStats.cityCount[city]})</option>
            ))}
          </select>
          <select name="state" value={filter.state} onChange={handleFilterChange}>
            <option value="">Filter by State</option>
            {Object.keys(userStats.stateCount).map(state => (
              <option key={state} value={state}>{state} ({userStats.stateCount[state]})</option>
            ))}
          </select>
          <select name="country" value={filter.country} onChange={handleFilterChange}>
            <option value="">Filter by Country</option>
            {Object.keys(userStats.countryCount).map(country => (
              <option key={country} value={country}>{country} ({userStats.countryCount[country]})</option>
            ))}
          </select>
        </div>

        <div className="chart-row">
          <div className="chart-container">
            <h4>Status Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h4>Messages Sent (Last 2 Days: {messageStats.totalMessages})</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={messageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Charts for Qualification and Branch */}
        <div className="chart-row">
          <div className="chart-container">
            <h4>Qualification by Passout Year & Status</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={Object.entries(userStats.qualificationByYearStatus).map(([key, value]) => ({ name: key, count: value }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={45} textAnchor="end" interval={0} height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h4>Branch by Qualification, Year & Status</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={Object.entries(userStats.branchByQualYearStatus).map(([key, value]) => ({ name: key, count: value }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={45} textAnchor="end" interval={0} height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ff7300" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Message Sending Section */}
      <div className="message-section">
        <h3>Send Messages to Users</h3>
        <div className="message-boxes">
          <div className="message-box">
            <h4>Employed Users</h4>
            <textarea
              value={messages.employed}
              onChange={(e) => setMessages({ ...messages, employed: e.target.value })}
              placeholder="Message for employed users"
              rows={6}
            />
            <button onClick={() => handleMessageSend('employed')}>Send</button>
          </div>
          <div className="message-box">
            <h4>Graduated Users</h4>
            <textarea
              value={messages.graduated}
              onChange={(e) => setMessages({ ...messages, graduated: e.target.value })}
              placeholder="Message for graduated users"
              rows={6}
            />
            <button onClick={() => handleMessageSend('graduated')}>Send</button>
          </div>
          <div className="message-box">
            <h4>Pursuing Users</h4>
            <textarea
              value={messages.pursuing}
              onChange={(e) => setMessages({ ...messages, pursuing: e.target.value })}
              placeholder="Message for pursuing users"
              rows={6}
            />
            <button onClick={() => handleMessageSend('pursuing')}>Send</button>
          </div>
        </div>
      </div>

      {/* Message History Section */}
      <div className="message-history-section">
        <h3>Sent Messages History (Last 2 Days)</h3>
        <div className="message-history-container">
          <div className="message-history">
            <h4>Employed</h4>
            {messageStats.messages.filter(m => m.category === 'employed').length > 0 ? (
              messageStats.messages
                .filter(m => m.category === 'employed')
                .map((msg, index) => (
                  <div key={index} className="message-history-item">
                    <p style={{ whiteSpace: 'pre-line' }}>{msg.message}</p>
                    <p><small>Sent on: {new Date(msg.timestamp).toLocaleString()}</small></p>
                  </div>
                ))
            ) : (
              <p>No messages sent to Employed users.</p>
            )}
          </div>
          <div className="message-history">
            <h4>Graduated</h4>
            {messageStats.messages.filter(m => m.category === 'graduated').length > 0 ? (
              messageStats.messages
                .filter(m => m.category === 'graduated')
                .map((msg, index) => (
                  <div key={index} className="message-history-item">
                    <p style={{ whiteSpace: 'pre-line' }}>{msg.message}</p>
                    <p><small>Sent on: {new Date(msg.timestamp).toLocaleString()}</small></p>
                  </div>
                ))
            ) : (
              <p>No messages sent to Graduated users.</p>
            )}
          </div>
          <div className="message-history">
            <h4>Pursuing</h4>
            {messageStats.messages.filter(m => m.category === 'pursuing').length > 0 ? (
              messageStats.messages
                .filter(m => m.category === 'pursuing')
                .map((msg, index) => (
                  <div key={index} className="message-history-item">
                    <p style={{ whiteSpace: 'pre-line' }}>{msg.message}</p>
                    <p><small>Sent on: {new Date(msg.timestamp).toLocaleString()}</small></p>
                  </div>
                ))
            ) : (
              <p>No messages sent to Pursuing users.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AdminDashboard;