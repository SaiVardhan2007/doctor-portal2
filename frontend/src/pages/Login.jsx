import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="login-header">
          <h2 className="login-title">
            Doctor Portal Login
          </h2>
          <p className="login-subtitle">
            Sign in to your account
          </p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-fields">
            <input
              id="email"
              name="email"
              type="email"
              required
              className="form-input"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              id="password"
              name="password"
              type="password"
              required
              className="form-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="register-link">
            <p>
              Don't have an account?{' '}
              <Link to="/register">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
