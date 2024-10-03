import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User as UserIcon, Upload } from 'lucide-react';
import '../../styles/userArea/userStyle.css';
import Lateralbar from '../../components/Lateralbar';

const User = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userIcon, setUserIcon] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/account/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
        setError(null);
      } catch (error) {
        console.error('Errore nel recupero dei dati utente:', error);
        setError('Impossibile recuperare i dati utente. Riprova più tardi.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleIconUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
    
      reader.onloadend = () => {
        setUserIcon(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalInfoSubmit = (event) => {
    event.preventDefault();
    // Handle additional info submission
    console.log('Additional info submitted');
  };

  if (isLoading) {
    return <div className="loading">Caricamento...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-page">
      <Lateralbar/>
      <div className="user-content">
        <div className="user-container">
          <h1>Area Utente</h1>
          {userData && (
            <div className="user-info">
              <div className="user-header">
                <div className="user-icon">
                  {userIcon ? (
                    <img src={userIcon} alt="User Icon" />
                  ) : (
                    <UserIcon size={64} />
                  )}
                </div>
                <div className="user-welcome">
                  <h2>Benvenuto, {userData.nome} {userData.cognome}!</h2>
                  <p>Email: {userData.email}</p>
                </div>
              </div>
              <div className="icon-upload">
                <label htmlFor="icon-upload" className="upload-button">
                  <Upload size={20} />
                  Carica Icona
                </label>
                <input
                  id="icon-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleIconUpload}
                  style={{ display: 'none' }}
                />
              </div>
              <form onSubmit={handleAdditionalInfoSubmit} className="additional-info">
                <h3>Personalizza il tuo account</h3>
                <div className="form-group">
                  <label htmlFor="birthdate">Data di nascita:</label>
                  <input type="date" id="birthdate" name="birthdate" defaultValue={userData.dataNascita ? new Date(userData.dataNascita).toISOString().split('T')[0] : ''} />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Paese:</label>
                  <input type="text" id="country" name="country" defaultValue={userData.paese || ''} />
                </div>
                <button type="submit" className="submit-button">Salva Modifiche</button>
              </form>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;