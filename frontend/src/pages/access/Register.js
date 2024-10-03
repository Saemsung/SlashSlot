import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/access/registerStyle.css';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    dataNascita: '',
    paese: '',
    email: '',
    password: '',
    confermaPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confermaPassword) {
      setError('Le password non corrispondono');
      return;
    }
    try {
      await api.post('/access/register', formData);
      navigate('/access/login', { state: { email: formData.email } });
    } catch (error) {
      setError(error.response?.data?.message || 'Errore durante la registrazione');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <span className="logo">/</span>
          <h1>Slashslot</h1>
        </div>
        <form onSubmit={step === 1 ? handleStep1Submit : handleStep2Submit} className="register-form">
          <h2>Registrazione</h2>
          {error && <p className="error-message">{error}</p>}
          {step === 1 ? (
            <>
              <div className="form-group">
                <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required placeholder="Nome" autoComplete="given-name" />
              </div>
              <div className="form-group">
                <input type="text" id="cognome" name="cognome" value={formData.cognome} onChange={handleChange} required placeholder="Cognome" autoComplete="family-name" />
              </div>
              <div className="form-group">
                <input type="date" id="dataNascita" name="dataNascita" value={formData.dataNascita} onChange={handleChange} required autoComplete="bday" />
              </div>
              <div className="form-group">
                <input type="text" id="paese" name="paese" value={formData.paese} onChange={handleChange} required placeholder="Paese" autoComplete="country-name" />
              </div>
              <button type="submit" className="register-button">Avanti</button>
            </>
          ) : (
            <>
              <div className="form-group">
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" autoComplete="email" />
              </div>
              <div className="form-group">
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Password" autoComplete="new-password" />
              </div>
              <div className="form-group">
                <input type="password" id="confermaPassword" name="confermaPassword" value={formData.confermaPassword} onChange={handleChange} required placeholder="Conferma Password" autoComplete="new-password" />
              </div>
              <button type="submit" className="register-button">Registrati</button>
            </>
          )}
          <div className="links">
            <Link to="/access/login">Hai già un account? Accedi</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;