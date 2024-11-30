import React, { useState } from 'react';
import axios from 'axios';
import './ResetPassword.css';

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const token = match.params.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/reset-password/${token}`, { password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error resetting password.');
    }
  };

  return (
    <div className="reset-password">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;