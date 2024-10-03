import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/access/passwordStyle.css';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/access/reset-password-request', { email });
      setMessage(response.data.message);
      setIsError(false);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Errore durante la richiesta di recupero password');
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
          <h2>Recupero Password</h2>
          {message && <p className={isError ? "error-message" : "success-message"}>{message}</p>}
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Inserisci la tua email"
              autoComplete="email"
            />
          </div>
          <button type="submit" className="login-button">Invia Link di Recupero</button>
          <div className="links">
            <Link to="/access/login">Torna al Login</Link>
            <Link to="/access/register">Crea account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordRecovery;