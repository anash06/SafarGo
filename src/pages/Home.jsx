import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import DestinationCard from '../components/DestinationCard';
import './Home.css';

const Home = () => {
  const [featuredDestinations, setFeaturedDestinations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/destinations')
      .then(res => res.json())
      .then(data => {
        setFeaturedDestinations(data.slice(0, 3));
      })
      .catch(err => console.error('Error fetching destinations:', err));
  }, []);

  return (
    <div className="home-page">
      <Hero />
      
      <section className="section container">
        <h2 className="section-title">Featured Destinations</h2>
        <div className="destinations-grid">
          {featuredDestinations.map((dest) => (
            <DestinationCard key={dest.id} {...dest} />
          ))}
        </div>
        <div className="text-center" style={{ marginTop: '3rem' }}>
          <a href="/destinations" className="btn btn-primary">View All Tours</a>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container about-preview">
          <div className="about-text">
            <h2>Why Choose SafarGo?</h2>
            <p>We believe travel is more than just visiting a place; it's about experiencing it. With carefully curated itineraries, expert guides, and a passion for adventure, we ensure every journey is unforgettable.</p>
            <ul className="features-list">
              <li>✨ Expertly Crafted Itineraries</li>
              <li>🌍 Small Group Sizes</li>
              <li>🤝 24/7 Premium Support</li>
              <li>🌿 Sustainable Travel Practices</li>
            </ul>
          </div>
          <div className="about-image-wrapper">
            <img src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop" alt="Travelers" className="about-image" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
