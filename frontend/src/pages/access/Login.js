import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import '../../styles/access/loginStyle.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Carica le credenziali salvate, se presenti
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/access/login', { email, password });
      const { token, refreshToken } = response.data;
      
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }
      
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('refreshToken', refreshToken);
      
      navigate('/account/user');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Errore durante il login');
      } else if (error.request) {
        setError('Nessuna risposta dal server. Controlla la tua connessione internet.');
      } else {
        setError('Errore nella richiesta. Per favore, riprova più tardi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Link to="/" className="login-header">
          <span className="logo">/</span>
          <h1>Slashslot</h1>
        </Link>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Accedi</h2>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Mostra password
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Ricordami
            </label>
          </div>
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? 'Caricamento...' : 'Accedi'}
          </button>
          <div className="links">
            <Link to="/access/register">Crea account</Link>
            <Link to="/access/passwordrecovery">Password dimenticata?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;