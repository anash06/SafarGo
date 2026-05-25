import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="animate-fade-in-up">Discover The World's Most Beautiful Destinations</h1>
        <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Experience breathtaking landscapes, vibrant cultures, and unforgettable adventures with SafarGo. Your journey begins here.
        </p>
        <div className="hero-buttons animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link to="/destinations" className="btn btn-primary">
            Explore Tours <ArrowRight size={20} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
          </Link>
          <Link to="/contact" className="btn btn-outline">Book Now</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
