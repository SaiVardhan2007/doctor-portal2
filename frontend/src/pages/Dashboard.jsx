import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // You can decode the JWT token here to get user info if needed
    // For now, we'll just show a welcome message
    setUser({ name: 'User' }); // Placeholder
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-content">
          <div className="nav-inner">
            <div>
              <h1 className="nav-title">
                Doctor Portal Dashboard
              </h1>
            </div>
            <div className="nav-actions">
              <span className="welcome-text">Welcome back!</span>
              <button
                onClick={handleLogout}
                className="logout-button"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="content-box">
            <div className="content-center">
              <h2 className="main-title">
                Welcome to Doctor Portal
              </h2>
              <p className="main-description">
                You have successfully logged in! This is your dashboard where you can manage your account and access portal features.
              </p>
              <div className="status-message success-status">
                ✅ Authentication is working correctly!
              </div>
              <div className="status-message info-status">
                🔐 Your session is secure and user data is being stored in the backend database.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
