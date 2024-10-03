// src/pages/Home2.js
import React, { forwardRef, useEffect } from 'react';
import '../styles/home/homeStyle2.css';

const casinoData = [
  { id: 1, name: 'NomeCasinoMomentaneo', rating: 5, reviews: 100, tags: ['tag', 'presenti', 'del', 'casino'] },
  { id: 2, name: 'NomeCasinoMomentaneo', rating: 4, reviews: 200, tags: ['tag', 'presenti', 'del', 'casino'] },
  { id: 3, name: 'NomeCasinoMomentaneo', rating: 3.5, reviews: 300, tags: ['tag', 'presenti', 'del', 'casino'] },
];

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <span key={index} className={index < rating ? 'star filled' : 'star'}>★</span>
      ))}
    </div>
  );
};

const Home2 = forwardRef((props, ref) => {
  useEffect(() => {
    const sectionTitle = document.querySelector('.section-title');
    setTimeout(() => {
      sectionTitle.classList.add('visible');
    }, 500);

    const casinoCells = document.querySelectorAll('.casino-cell');
    casinoCells.forEach((cell, index) => {
      setTimeout(() => {
        cell.classList.add('visible');
      }, 1000 + index * 200);
    });
  }, []);

  return (
    <div ref={ref} className="second-section">
      <h2 className="section-title">I migliori del momento</h2>
      <div className="casino-grid">
        {casinoData.map((casino) => (
          <div key={casino.id} className="casino-cell">
            <h3 className="casino-name">{casino.name}</h3>
            <div className="rating-container">
              <StarRating rating={casino.rating} />
              <span className="review-count">({casino.reviews})</span>
            </div>
            <div className="photo-zone">ZONA FOTO</div>
            <div className="tags-container">
              {casino.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Home2;