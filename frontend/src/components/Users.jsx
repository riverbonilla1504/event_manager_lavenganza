import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, ChevronLeft, ChevronRight, Mail } from 'react-feather';
import '../styles/Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rangeStart, setRangeStart] = useState(0);
  const [rangeEnd, setRangeEnd] = useState(100);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const sendConfirmationCodes = async () => {
    for (const userId of selectedUsers) {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}/send-confirmation-code`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter(user =>
    ((user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    user.id >= rangeStart && user.id <= rangeEnd
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (userId) => {
    console.log('Editar usuario:', userId);
  };

  const handleDelete = (userId) => {
    console.log('Eliminar usuario:', userId);
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedUsers(currentUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const sendQRCodes = async () => {
    for (const userId of selectedUsers) {
        try {
          const response = await fetch(`http://localhost:3001/users/${userId}/send-confirmation-code`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
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

  if (loading) {
    return <div className="loading">Cargando usuarios...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="users-container">
      <h2>Gestión de Usuarios</h2>
      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="range-selector">
        <label>
          Rango de IDs:
          <input
            type="number"
            value={rangeStart}
            onChange={(e) => setRangeStart(Number(e.target.value))}
            min={0}
          />
          -
          <input
            type="number"
            value={rangeEnd}
            onChange={(e) => setRangeEnd(Number(e.target.value))}
            min={rangeStart}
          />
        </label>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedUsers.length === currentUsers.length}
              />
            </th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user.id)} className="edit-btn">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(user.id)} className="delete-btn">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          <ChevronLeft size={20} />
        </button>
        <span>{currentPage} de {Math.ceil(filteredUsers.length / usersPerPage)}</span>
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
          className="pagination-btn"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <button 
        onClick={sendQRCodes} 
        disabled={selectedUsers.length === 0}
        className="send-qr-btn"
      >
        <Mail size={16} />
        Enviar Códigos QR ({selectedUsers.length})
      </button>
    </div>
  );
};

export default Users;