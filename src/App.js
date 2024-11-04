import React, { useState , useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import ManageEmployees from './components/ManageEmployees';
import Settings from './components/Settings';
import Reports from './components/Reports';
import SideBar from './components/SiderBar';
import ManageSchedules from './components/ManageSchedules';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('authToken');
    if (authStatus) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    localStorage.setItem('authToken', 'your-auth-token');
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="main">
        {isAuthenticated && <SideBar />}
        <div className="route">
          <Routes>
            {!isAuthenticated ? (
              <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            ) : (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/manageEmployees" element={<ManageEmployees />} />
                <Route path="/manageSchedules" element={<ManageSchedules />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/reports" element={<Reports />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
