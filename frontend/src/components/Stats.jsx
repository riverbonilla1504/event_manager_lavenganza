import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader } from 'react-feather';
import '../styles/Stats.css';

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3001/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="loading"><Loader size={48} className="spin" /></div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="stats-container">
      <h2>Estadísticas del Evento</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total de Usuarios</h3>
          <p className="stat-number">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Usuarios Activos</h3>
          <p className="stat-number">{stats.activeUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Eventos Creados</h3>
          <p className="stat-number">{stats.eventsCreated}</p>
        </div>
        <div className="stat-card">
          <h3>Asistencia Promedio</h3>
          <p className="stat-number">{stats.averageAttendance}</p>
        </div>
      </div>
      <div className="chart-container">
        <h3>Asistencia por Evento</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.eventAttendance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="attendance" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Stats;