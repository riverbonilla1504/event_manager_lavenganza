import React, { useState } from 'react';
import { Upload } from 'react-feather';
import '../styles/ImportForm.css';

const ImportUsers = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage('Por favor, selecciona un archivo primero.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = process.env.URL_BACKEND || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/users/import`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Usuarios importados exitosamente: ${data.importedCount}`);
      } else {
        setMessage('Error al importar usuarios: ' + response.statusText);
      }
    } catch (error) {
      setMessage('Error al importar usuarios: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="import-users">
      <h2>Import Users</h2>
      <form onSubmit={handleSubmit}>
        <div className="file-input-wrapper">
          <input 
            type="file" 
            onChange={handleFileChange} 
            id="file-upload" 
            className="file-input"
          />
          <label htmlFor="file-upload" className="file-label">
            <Upload size={20} />
            <span>{file ? file.name : 'Seleccionar archivo'}</span>
          </label>
        </div>
        <button type="submit" className="submit-button" disabled={isUploading}>
          {isUploading ? 'Importando...' : 'Importar Usuarios'}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ImportUsers;