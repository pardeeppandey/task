import React, { useState, useEffect } from 'react'
import './Dashboard.css'
export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [offices, setOffices] = useState([]);
  const [departments, setDepartments] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
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

  // Get Departments from API
  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/departments');
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchOffices();
    fetchDepartments();
  }, []);

  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    fetch('https://employee-nine-theta.vercel.app/api/admin/pendingRequests')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setPendingRequests(data))
      .catch(error => console.error('Error fetching pending requests:', error));
  }, []);

  const handleRequestUpdate = (requestId, status) => {
    fetch(`https://employee-nine-theta.vercel.app/api/admin/updateRequest/${requestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setPendingRequests(pendingRequests.filter(request => request._id !== requestId));
      })
      .catch(error => console.error('Error updating request status:', error));
  };

  const renderRequest = (request) => (
    <div key={request._id} style={styles.requestContainer}>
      <p style={styles.text}><strong>Employee:</strong> {request.employeeId.name}</p>
      <p style={styles.text}><strong>Reason:</strong> {request.reason}</p>
      <p style={styles.text}><strong>Start Date:</strong> {new Date(request.startDate).toLocaleDateString()}</p>
      <p style={styles.text}><strong>End Date:</strong> {new Date(request.endDate).toLocaleDateString()}</p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => handleRequestUpdate(request._id, 'Approved')}>Approve</button>
        <button style={styles.button} onClick={() => handleRequestUpdate(request._id, 'Rejected')}>Reject</button>
      </div>
    </div>
  );


  return (
    <div>
      <h2>Dashboard</h2>
      <div className="dashboard-stats">
        <div className="stat-box">
          <h3>Total Employees</h3>
          <p>{employees.length}</p>
        </div>
        <div className="stat-box">
          <h3>Total Offices</h3>
          <p>{offices.length}</p>
        </div>
        <div className="stat-box">
          <h3>Total Departments</h3>
          <p>{departments.length}</p>
        </div>
      </div>
      <h2 style={styles.header}>Time Off Requests</h2>
      {pendingRequests.length > 0 ? (
        <div>
          {pendingRequests.map(request => renderRequest(request))}
        </div>
      ) : (
        <p style={styles.noRequests}>No pending requests</p>
      )}
    </div>
  )
}

const styles = {
  header: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  requestContainer: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  text: {
    fontSize: '16px',
    marginBottom: '5px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
  },
  noRequests: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
  },
};