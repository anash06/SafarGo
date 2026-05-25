import React, { useState, useEffect } from 'react';
import DestinationCard from '../components/DestinationCard';
import './Destinations.css';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/destinations')
      .then(res => res.json())
      .then(data => {
        setDestinations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching destinations:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1 className="animate-fade-in-up">Explore All Destinations</h1>
          <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Find your perfect getaway from our curated list of world-class tours.</p>
        </div>
      </div>
      
      <section className="section container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>Loading destinations...</div>
        ) : (
          <div className="destinations-grid">
            {destinations.map((dest) => (
              <DestinationCard key={dest.id} {...dest} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Destinations;
