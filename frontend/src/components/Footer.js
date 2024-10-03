// src/components/Footer.js
import React from 'react';
import '../styles/components/footerStyle.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-columns">
                <div className="column">
                    <a href="#">Claude</a>
                    <a href="#">API</a>
                    <a href="#">Team</a>
                    <a href="#">Pricing</a>
                    <a href="#">Research</a>
                    <a href="#">Company</a>
                    <a href="#">Customers</a>
                    <a href="#">News</a>
                    <a href="#">Careers</a>
                </div>
                <div className="column">
                    <a href="#">Press Inquiries</a>
                    <a href="#">Support</a>
                    <a href="#">Status</a>
                    <a href="#">Availability</a>
                    <a href="#">Twitter</a>
                    <a href="#">LinkedIn</a>
                    <a href="#">YouTube</a>
                </div>
                <div className="column">
                    <a href="#">Terms of Service – Consumer</a>
                    <a href="#">Terms of Service – Commercial</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Usage Policy</a>
                    <a href="#">Responsible Disclosure Policy</a>
                    <a href="#">Compliance</a>
                    <a href="#">Privacy Choices</a>
                </div>
            </div>
            <p className="copyright">© 2024 Anthropic PBC</p>
        </footer>
    );
};

export default Footer;
