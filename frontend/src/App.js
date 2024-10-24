import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ImportUsers from './components/ImportForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route path="/dashboard/import" 
        element={
          <PrivateRoute>
          <ImportUsers />
          </PrivateRoute>
        } 
        />
      </Routes>
    </Router>
  );
};

export default App;
