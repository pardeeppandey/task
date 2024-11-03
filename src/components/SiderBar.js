import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './SideBar.css';

export default function SideBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        
        localStorage.removeItem('authToken');
        // Redirect to login page
        window.location.href('http://localhost:3000')
    };

    return (
        <nav className="sidebar">
            <h2><NavLink to="/dashboard">Admin Panel</NavLink></h2>
            <ul>
                <li><NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
                <li><NavLink to="/manageEmployees" activeClassName="active">Manage Employees</NavLink></li>
                <li><NavLink to="/manageSchedules" activeClassName="active">Manage Schdules</NavLink></li>
                <li><NavLink to="/settings" activeClassName="active">Settings</NavLink></li>
                <li><NavLink to="/reports" activeClassName="active">Reports</NavLink></li>
                <li><NavLink to="/" activeClassName="active" onClick={handleLogout}>Logout</NavLink></li>
            </ul>
        </nav>
    );
}
