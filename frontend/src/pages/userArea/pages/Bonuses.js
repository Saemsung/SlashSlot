import React from 'react';
import Lateralbar from '../../../components/Lateralbar';

const Bonuses = () => {
  // Placeholder data for acquired bonuses
  const acquiredBonuses = [
    { id: 1, name: 'Bonus di Benvenuto', amount: '€100', expiryDate: '2023-07-31' },
    { id: 2, name: 'Giri Gratuiti', amount: '50 Free Spins', expiryDate: '2023-07-15' },
    { id: 3, name: 'Cashback', amount: '10% fino a €50', expiryDate: '2023-08-31' },
  ];

  return (
    <div className="bonuses-page">
      <Lateralbar />
      <div className="bonuses-content">
        <h1>I Tuoi Bonus</h1>
        <ul className="bonus-list">
          {acquiredBonuses.map(bonus => (
            <li key={bonus.id} className="bonus-item">
              <h3>{bonus.name}</h3>
              <p>Valore: {bonus.amount}</p>
              <p>Scade il: {bonus.expiryDate}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Bonuses;