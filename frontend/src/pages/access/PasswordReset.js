import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/access/passwordStyle.css';

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Le password non corrispondono');
      setIsError(true);
      return;
    }

    try {
      const response = await api.post('/access/reset-password', { token, newPassword: password });
      setMessage(response.data.message);
      setIsError(false);
      setTimeout(() => navigate('/access/login'), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Errore durante il reset della password');
      setIsError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <span className="logo">/</span>
          <h1>Slashslot</h1>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Reset Password</h2>
          {message && <p className={isError ? "error-message" : "success-message"}>{message}</p>}
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nuova password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Conferma nuova password"
              required
            />
          </div>
          <button type="submit" className="login-button">Resetta Password</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;