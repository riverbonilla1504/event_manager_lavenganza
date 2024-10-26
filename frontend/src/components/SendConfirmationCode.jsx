import React, { useState } from 'react';

const SendConfirmationCode = ({ userId }) => {
  const [code, setCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const apiUrl = process.env.URL_BACKEND || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/users/${userId}/send-confirmation-code`, {
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
        Confirm Code
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </label>
      <button type="submit">Send Code</button>
    </form>
  );
};

export default SendConfirmationCode;
