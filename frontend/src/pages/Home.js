// src/pages/Home.js
import React, { useRef, useEffect } from 'react';
import '../styles/home/homeStyle.css';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import Home2 from './Home2';

const Home = () => {
    const secondSectionRef = useRef(null);
    const thirdSectionRef = useRef(null);

    const titleWordsFirstLine = ['Entra', 'nel', 'mondo'];
    const titleWordsSecondLine = ['dei', 'Casino', 'Online'];
    
    
    useEffect(() => {
        // Animation for title words
        const titleWordElements = document.querySelectorAll('.title-word');
        titleWordElements.forEach((word, index) => {
            setTimeout(() => {
                word.classList.add('visible');
            }, index * 200); // Stagger the animation for each word
        });

        // Ensure the description and button animation happens after title words
        const totalAnimationDuration = titleWordElements.length * 200 + 200; // Adding extra 200ms to ensure smoothness
        const description = document.querySelector('.description');
        const ctaButtons = document.querySelectorAll('.cta-button');

        setTimeout(() => {
            if (description) {
                description.classList.add('visible');
            }
            ctaButtons.forEach((button) => {
                button.classList.add('visible');
            });
        }, totalAnimationDuration);
    }, []);

    const handleScrollToSecond = () => {
        if (secondSectionRef.current) {
            const yOffset = -80; // Adjust this value to fine-tune scroll position
            const y = secondSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    };

    const handleScrollToThird = () => {
        thirdSectionRef.current.scrollIntoView({ 
            behavior: 'smooth'
        });
    };

   
return (
    <div className="home-container">
        <Topbar />
        <div className="main-content first-section">
            <h1 className="main-title">
                <div className="title-line first-line">
                    {titleWordsFirstLine.map((word, index) => (
                        <span key={index} className="title-word">
                            {word}
                        </span>
                    ))}
                </div>
                <div className="title-line second-line">
                    {titleWordsSecondLine.map((word, index) => (
                        <span key={index} className="title-word">
                            {word}
                        </span>
                    ))}
                </div>
            </h1>

            <p className="description">
                In Slashslot offriamo una guida completa ai migliori casinò online. Siamo basati a Malta e collaboriamo con Matching Vision per fornirvi un'esperienza di gioco sicura e divertente. Scoprite le ultime novità e trovate il casinò che fa per voi!
            </p>
            <button className="cta-button" onClick={handleScrollToSecond}>Scopri di più</button>
        </div>
        <Home2 ref={secondSectionRef} />
        <div ref={thirdSectionRef} className="third-section">
            <h2>Sezione 3 (In costruzione)</h2>
            <p>Questa sezione sarà sviluppata in futuro.</p>
        </div>
        <button className="cta-button" onClick={handleScrollToThird}>Vai alla Sezione 3</button>
        <Footer />
    </div>
);
};

export default Home;
 