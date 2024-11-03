import React, { useState, useEffect } from 'react';
import './Settings.css';

export default function Settings() {
  const [newOffice, setNewOffice] = useState('');
  const [newDepartment, setNewDepartment] = useState('');
  const [offices, setOffices] = useState([]);
  const [departments, setDepartments] = useState([]);

  const handleAddOffice = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/offices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newOffice }),
      });
      if (response.ok) {
        setNewOffice(''); // Clear input
        fetchOffices();   // Fetch updated list
      }
    } catch (error) {
      console.error('Error adding office:', error);
    }
  };

  const handleAddDepartment = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newDepartment }),
      });
      if (response.ok) {
        setNewDepartment(''); // Clear input
        fetchDepartments();   // Fetch updated list
      }
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  const fetchOffices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/offices');
      const data = await response.json();
      setOffices(data);
    } catch (error) {
      console.error('Error fetching offices:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/departments');
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleOfficeSubmit = (event) => {
    event.preventDefault();
    handleAddOffice();
  };

  const handleDepartmentSubmit = (event) => {
    event.preventDefault();
    handleAddDepartment();
  };

  useEffect(() => {
    fetchOffices();
    fetchDepartments();
  }, []);

  return (
    <div className="settings">
      <h2 className="settings__title">Settings</h2>

      <div className="settings__section">
        <form onSubmit={handleOfficeSubmit} className="settings__form">
          <label>Office Name:</label>
          <br />
          <input
            type="text"
            value={newOffice}
            onChange={(e) => setNewOffice(e.target.value)}
            required
            className="settings__input"
          />
          <br />
          <button type="submit" className="settings__button">Add Office</button>
        </form>
      </div>

      <div className="settings__section">
        <form onSubmit={handleDepartmentSubmit} className="settings__form">
          <label>Department Name:</label>
          <br />
          <input
            type="text"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            required
            className="settings__input"
          />
          <br />
          <button type="submit" className="settings__button">Add Department</button>
        </form>
      </div>

      <h3 className="settings__subtitle">Office List</h3>
      <ul className="settings__list">
        {offices.map((office, index) => (
          <li key={index} className="settings__list-item">{office.name}</li>
        ))}
      </ul>

      <h3 className="settings__subtitle">Department List</h3>
      <ul className="settings__list">
        {departments.map((department, index) => (
          <li key={index} className="settings__list-item">{department.name}</li>
        ))}
      </ul>
    </div>
  );
}
