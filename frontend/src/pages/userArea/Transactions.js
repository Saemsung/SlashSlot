import React from 'react';
import Lateralbar from '../../components/Lateralbar';

const Transactions = () => {
  // Placeholder data for visited casinos
  const visitedCasinos = [
    { id: 1, name: 'Casino Royale', date: '2023-06-15', amount: '€500' },
    { id: 2, name: 'Bellagio', date: '2023-06-02', amount: '€750' },
    { id: 3, name: 'Venetian', date: '2023-05-20', amount: '€1000' },
  ];

  return (
    <div className="transactions-page">
      <Lateralbar />
      <div className="transactions-content">
        <h1>Cronologia Transazioni</h1>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Casino</th>
              <th>Importo</th>
            </tr>
          </thead>
          <tbody>
            {visitedCasinos.map(casino => (
              <tr key={casino.id}>
                <td>{casino.date}</td>
                <td>{casino.name}</td>
                <td>{casino.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;