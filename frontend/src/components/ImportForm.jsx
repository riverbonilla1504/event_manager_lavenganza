import React, { useState } from 'react';

const ImportUsers = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/users/import', {
        method: 'POST',
        body: formData, // Aquí envías el formData sin especificar manualmente el Content-Type
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Users imported:', data);
      } else {
        console.error('Error importing users:', response.statusText);
      }
    } catch (error) {
      console.error('Error importing users:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Importar Usuarios</button>
    </form>
  );
};

export default ImportUsers;
