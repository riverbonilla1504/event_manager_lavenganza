import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { ChevronDown, LogOut, Users, Upload, BarChart } from 'react-feather';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      navigate('/dashboard/stats');
    }
  }, [location, navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div className="logo">Event Manager</div>
        <ul>
          <li>
            <Link to="/dashboard/users" className={`menu-item ${isActive('/dashboard/users') ? 'active' : ''}`}>
              <Users size={18} />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/import" className={`menu-item ${isActive('/dashboard/import') ? 'active' : ''}`}>
              <Upload size={18} />
              <span>Import Users</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/stats" className={`menu-item ${isActive('/dashboard/stats') ? 'active' : ''}`}>
              <BarChart size={18} />
              <span>Stats</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <div className="user-menu">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="user-menu-button">
              Admin <ChevronDown size={16} />
            </button>
            {isMenuOpen && (
              <div className="dropdown-menu">
                <button onClick={handleSignOut} className="sign-out-button">
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;