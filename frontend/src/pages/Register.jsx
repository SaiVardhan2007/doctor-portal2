import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Register.css';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword: _, ...registerData } = formData;
      const response = await authAPI.register(registerData);
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        setSuccess('Registration successful! Redirecting to dashboard...');
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', type: 'text', label: 'Full Name', placeholder: 'Enter your full name' },
    { name: 'email', type: 'email', label: 'Email Address', placeholder: 'Enter your email address' },
    { name: 'password', type: 'password', label: 'Password', placeholder: 'Enter your password' },
    { name: 'confirmPassword', type: 'password', label: 'Confirm Password', placeholder: 'Confirm your password' }
  ];

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <div className="register-header">
          <h2 className="register-title">Create Account</h2>
          <p className="register-subtitle">Join the Doctor Portal</p>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-fields">
            {fields.map(({ name, type, label, placeholder }) => (
              <div key={name} className="form-group">
                <label htmlFor={name} className="form-label">{label}</label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  required
                  className="register-input"
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" disabled={loading} className="register-button">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="login-link">
            <p>Already have an account? <Link to="/login">Sign in here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}