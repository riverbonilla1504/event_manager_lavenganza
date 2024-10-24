import React, { useState } from 'react';

const SendConfirmationCode = ({ userId }) => {
  const [code, setCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/send-confirmation-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        alert('Código de confirmación enviado con éxito.');
      } else {
        throw new Error('Error al enviar el código de confirmación.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el código de confirmación.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Código de Confirmación:
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </label>
      <button type="submit">Enviar Código</button>
    </form>
  );
};

export default SendConfirmationCode;
