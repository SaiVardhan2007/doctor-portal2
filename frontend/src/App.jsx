import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import Doctors from './pages/admin/Doctors';
import AdminLayout from './components/AdminLayout';

import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>}/>
          <Route path="/doctor/dashboard" element={
            <ProtectedRoute>
              <DoctorDashboard />
            </ProtectedRoute>} />
          <Route path="/admin/doctors" element={
            <ProtectedRoute>
              <AdminLayout>
                <Doctors />
              </AdminLayout>
            </ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;