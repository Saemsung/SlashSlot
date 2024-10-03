import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, CreditCard, Gift, Settings, HelpCircle, LogOut } from 'lucide-react';
import '../styles/components/lateralbarStyle.css';
import { logout } from '../services/auth';

const LateralBar = () => {
  const [isLogoOpen, setIsLogoOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsLogoOpen(scrollPosition <= 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/access/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

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
            <Link to="/account/profile">
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
            <Link to="/account/help">
              <HelpCircle size={20} />
              <span>Aiuto</span>
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LateralBar;
