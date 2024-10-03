import React, { useState, useEffect } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/components/topbarStyle.css';

const Topbar = () => {
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
        <header className="topbar">
            <Link to="/" className="logo-link">
                <div id="logo-container" className={isLogoOpen ? "open" : "closed"}>
                    <span id="slash">/</span>
                    <span id="slash-text">SLASH</span>
                    <span id="moving-s">S</span>
                    <span id="lot-text">LOT</span>
                </div>
            </Link>
            <nav className="nav-menu">
                {['Casino', 'Giochi', 'Licenze', 'FAQ'].map((item) => (
                    <div key={item} className="menu-item">
                        <a href="#">{item} <ChevronDown size={16} /></a>
                        <div className="dropdown">
                            {['Opzione 1', 'Opzione 2', 'Opzione 3'].map((subItem, index) => (
                                <a key={index} href="#">{subItem}</a>
                            ))}
                        </div>
                    </div>
                ))}
                <Link to="/account/user" className="account-icon"><User size={24} /></Link>
            </nav>
        </header>
    );
};

export default Topbar;