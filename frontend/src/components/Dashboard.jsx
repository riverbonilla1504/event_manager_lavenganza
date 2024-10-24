import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3001/users');
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      }
      return [...prev, userId];
    });
  };

  const sendConfirmationCodes = async () => {
    for (const userId of selectedUsers) {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}/send-confirmation-code`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error(`Error sending code to user ${userId}:`, errorData);
        }
      } catch (error) {
        console.error('Error sending confirmation code:', error);
      }
    }
  
    // Reiniciar la selección después de enviar
    setSelectedUsers([]);
  };
  

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <ul>
          <li><Link to="/dashboard/import">Importar Usuarios</Link></li>
        </ul>
      </nav>
      <div className="content">
        <h2>Usuarios</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
              />
              {user.username}
            </li>
          ))}
        </ul>
        <button onClick={sendConfirmationCodes} disabled={selectedUsers.length === 0}>
          Enviar Códigos QR
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
