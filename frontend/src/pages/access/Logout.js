import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Chiamata all'API per invalidare il token
        await api.post('/access/logout');
      } catch (error) {
        console.error('Errore durante il logout:', error);
      } finally {
        // Rimuovi tutti i token e le credenziali salvate
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        
        // Reindirizza l'utente alla pagina di login
        navigate('/access/login');
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div>
      <p>Logout in corso...</p>
    </div>
  );
};

export default Logout;