import React from 'react';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <div>Welcome to the Dashboard</div>;
};

export default Dashboard;
