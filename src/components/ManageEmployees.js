import React, { useState, useEffect } from 'react';
import './ManageEmployees.css';

export default function ManageEmployees() {
  const [employees, setEmployees] = useState([]);
  const [offices, setOffices] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    Name: '',
    Role: '',
    Office: '',
    Department: '',
    Username: '',
    Password: ''
  });

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Create the employee first
      const employeeResponse = await fetch('http://localhost:5000/api/admin/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newEmployee.Name,
          role: newEmployee.Role,
          office: newEmployee.Office,
          department: newEmployee.Department
        }),
      });

      if (employeeResponse.ok) {
        const createdEmployee = await employeeResponse.json();  // Get the created employee details, including _id

        // Step 2: Use the employee _id to create the login entry
        const loginResponse = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: newEmployee.Username,
            password: newEmployee.Password,
            role: "employee",
            employeeId: createdEmployee._id  // Pass the employee _id to link employee and user
          }),
        });

        if (loginResponse.ok) {
          // Step 3: Reset the input fields and fetch the employee list after successful submission
          setNewEmployee({
            Name: '',
            Role: '',
            Office: '',
            Department: '',
            Username: '',
            Password: ''
          });
          fetchEmployees(); // Refresh the employee list
        } else {
          console.error('Error adding login details:', loginResponse.status);
        }
      } else {
        console.error('Error adding employee:', employeeResponse.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Update newEmployee state correctly
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch offices from API
  const fetchOffices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/offices');
      const data = await response.json();
      setOffices(data);
    } catch (error) {
      console.error('Error fetching offices:', error);
    }
  };

  // Fetch departments from API
  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/departments');
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
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

  useEffect(() => {
    fetchEmployees();
    fetchOffices();
    fetchDepartments();
  }, []);

  return (
    <div className="manage-employees">
      <h2>Manage Employees</h2>
      <form className="employee-form" onSubmit={handleAddEmployee}>
        <label>Employee Name</label>
        <input
          type="text"
          placeholder="Employee Name"
          name="Name"
          value={newEmployee.Name}
          onChange={handleInputChange}
          required
        />

        <label>Role</label>
        <input
          type="text"
          placeholder="Role"
          name="Role"
          value={newEmployee.Role}
          onChange={handleInputChange}
          required
        />

        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          name="Username"
          value={newEmployee.Username}
          onChange={handleInputChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          name="Password"
          value={newEmployee.Password}
          onChange={handleInputChange}
          required
        />

        <label>Office</label>
        <select
          name="Office"
          value={newEmployee.Office}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Office</option>
          {offices.map((office, index) => (
            <option key={index} value={office.name}>
              {office.name}
            </option>
          ))}
        </select>

        <label>Department</label>
        <select
          name="Department"
          value={newEmployee.Department}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Department</option>
          {departments.map((department, index) => (
            <option key={index} value={department.name}>
              {department.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Employee</button>
      </form>

      <h3>Employee List</h3>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Office</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>{employee.office}</td>
              <td>{employee.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
