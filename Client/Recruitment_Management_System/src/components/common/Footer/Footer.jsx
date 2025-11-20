import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>RMS</h3>
          <p>Recruitment Management System</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/auth">Login</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>support@rms.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 RMS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;