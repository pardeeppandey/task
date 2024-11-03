import React, { useState, useEffect } from 'react';
import './Reports.css';

export default function Reports() {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/reports'); // Adjust the URL as necessary
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="reports">
      <h2 className="reports__title">Reports</h2>
      <h3 className="reports__subtitle">Hours Worked Report</h3>
      <table className="reports__table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Total Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{report.name}</td>
              <td>{report.totalHoursWorked.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
