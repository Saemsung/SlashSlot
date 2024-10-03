import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, CreditCard, Gift, Settings, HelpCircle, LogOut } from 'lucide-react';
import '../styles/components/lateralbarStyle.css';

const LateralBar = () => {
  const [isLogoOpen, setIsLogoOpen] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsLogoOpen(scrollPosition <= 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="lateral-bar">
      <nav>
        <ul>
          <li>
            <Link to="/" className="logo-link">
              <div id="logo-container" className={isLogoOpen ? 'open' : 'closed'}>
                <span id="slash">/</span>
                <span id="slash-text">SLASH</span>
                <span id="moving-s">S</span>
                <span id="lot-text">LOT</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/account/user">
              <User size={20} />
              <span>Profilo</span>
            </Link>
          </li>
          <li>
            <Link to="/account/transactions">
              <CreditCard size={20} />
              <span>Transazioni</span>
            </Link>
          </li>
          <li>
            <Link to="/account/bonuses">
              <Gift size={20} />
              <span>Bonus</span>
            </Link>
          </li>
          <li>
            <Link to="/account/settings">
              <Settings size={20} />
              <span>Impostazioni</span>
            </Link>
          </li>
          <li>
            <Link to="/account/profilo">
              <HelpCircle size={20} />
              <span>Aiuto</span>
            </Link>
          </li>
          <li>
            <Link to="/access/logout">
              <LogOut size={20} />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LateralBar;
