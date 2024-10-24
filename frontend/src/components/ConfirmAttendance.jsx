import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ConfirmAttendance = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  var idcode =undefined;
  idcode = searchParams.get('idcode');

  const confirmAttendance = async () => {
    const response = await fetch(`http://localhost:3001/users/confirm-attendance?idcode=${idcode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    if (response.ok) {
        setMessage('Attendance confirmed.');
        } else {
        setMessage('Error confirming attendance.');
        }
  };


  useEffect(() => {
    if (!idcode) {
      setMessage('Invalid QR code.');
      console.log(idcode);
    }
  }, [idcode]);

  return (
    <div>
      <h2>Confirm Attendance</h2>
      {message ? (
        <p>{message}</p>
      ) : (
        <button onClick={confirmAttendance}>Confirm Attendance {idcode}</button>
      )}
    </div>
  );
};

export default ConfirmAttendance;
