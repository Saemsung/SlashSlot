// src/components/Logo.js
import React, { useEffect, useState } from 'react';
import '../styles/logoStyle.css';

const Logo = () => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0 && isOpen) {
                setIsOpen(false);
            } else if (window.scrollY === 0 && !isOpen) {
                setIsOpen(true);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isOpen]);

    return (
        <div id="logo-container" className={isOpen ? "" : "closed"}>
            <span id="slash">/</span>
            <span id="slash-text">SLASH</span>
            <span id="moving-s">S</span>
            <span id="lot-text">LOT</span>
        </div>
    );
};

export default Logo;
