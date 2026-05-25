import React from 'react';
import { Compass, Globe, MessageCircle, Camera, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="logo footer-logo">
            <Compass size={32} className="logo-icon" />
            <span>SafarGo</span>
          </div>
          <p>Your premier destination for extraordinary travel experiences and unforgettable adventures around the globe.</p>
          <div className="social-links">
            <a href="#" className="social-icon"><Globe size={20} /></a>
            <a href="#" className="social-icon"><MessageCircle size={20} /></a>
            <a href="#" className="social-icon"><Camera size={20} /></a>
          </div>
        </div>
        
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/destinations">Destinations</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>123 New Busstand, Kayalpattinam</p>
          <p>TamilNadu, India - 628204</p>
          <p>Email: hello@safargo.tours</p>
          <p>Phone: +91 9876543210</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SafarGo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
