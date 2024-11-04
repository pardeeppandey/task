import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './SideBar.css';

export default function SideBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data and navigate to login page
    localStorage.removeItem('authToken');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="sidebar">
      <h2><NavLink to="/dashboard">Admin Panel</NavLink></h2>
      <ul>
        <li><NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink></li>
        <li><NavLink to="/manageEmployees" className={({ isActive }) => (isActive ? 'active' : '')}>Manage Employees</NavLink></li>
        <li><NavLink to="/manageSchedules" className={({ isActive }) => (isActive ? 'active' : '')}>Manage Schedules</NavLink></li>
        <li><NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>Settings</NavLink></li>
        <li><NavLink to="/reports" className={({ isActive }) => (isActive ? 'active' : '')}>Reports</NavLink></li>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} onClick={handleLogout}>Logout</NavLink></li>
      </ul>
    </nav>
  );
}
