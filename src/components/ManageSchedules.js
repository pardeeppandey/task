import React, { useState, useEffect, useRef } from 'react';
import './ManageSchedules.css';

export default function ManageSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    employee: '',
    start: '',
    end: '',
  });

  const startInputRef = useRef(null);
  const endInputRef = useRef(null);

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/admin/add-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSchedule),
      });

      if (response.ok) {
        setNewSchedule({ employee: '', start: '', end: '' });
        fetchSchedules();
      } else {
        console.error('Error adding schedule:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchSchedules = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/get-schedules');
      const data = await response.json();
      setSchedules(data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  useEffect(() => {
    fetchSchedules();
    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="manage-schedules">
      <h2 className="manage-schedules__title">Manage Schedules</h2>
      <form className="manage-schedules__form" onSubmit={handleAddSchedule}>
        <label className="manage-schedules__label">Employee:</label>
        <select
          className="manage-schedules__select"
          name="employee"
          value={newSchedule.employee}
          onChange={handleInputChange}
          required
        >
          <option value="">Select an employee</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.name}
            </option>
          ))}
        </select>

        <label className="manage-schedules__label">Shift Start:</label>
        <input
          className="manage-schedules__input"
          type="time"
          name="start"
          value={newSchedule.start}
          onFocus={() => startInputRef.current.showPicker && startInputRef.current.showPicker()}
          onChange={handleInputChange}
          ref={startInputRef}
          required
        />

        <label className="manage-schedules__label">Shift End:</label>
        <input
          className="manage-schedules__input"
          type="time"
          name="end"
          value={newSchedule.end}
          onFocus={() => endInputRef.current.showPicker && endInputRef.current.showPicker()}
          onChange={handleInputChange}
          ref={endInputRef}
          required
        />

        <button className="manage-schedules__button" type="submit">Set Schedule</button>
      </form>

      <h3 className="manage-schedules__subtitle">Employee Schedules</h3>
      <table className="manage-schedules__table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Shift Start</th>
            <th>Shift End</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={index}>
              <td>{schedule.employee.name}</td>
              <td>{schedule.start}</td>
              <td>{schedule.end}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
