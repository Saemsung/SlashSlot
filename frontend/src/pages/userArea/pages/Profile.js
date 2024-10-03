import React from 'react';
import Lateralbar from '../../../components/Lateralbar';

const Profile = () => {
  // Placeholder data for favorite casinos
  const favoriteCasinos = [
    { id: 1, name: 'Casino Royale', lastVisited: '2023-05-15' },
    { id: 2, name: 'Bellagio', lastVisited: '2023-06-02' },
    { id: 3, name: 'Venetian', lastVisited: '2023-06-10' },
  ];

  return (
    <div className="profile-page">
      <Lateralbar />
      <div className="profile-content">
        <h1>Il Tuo Profilo</h1>
        <section className="favorite-casinos">
          <h2>I Tuoi Casino Preferiti</h2>
          <ul>
            {favoriteCasinos.map(casino => (
              <li key={casino.id}>
                <span>{casino.name}</span>
                <span>Ultima visita: {casino.lastVisited}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Profile;