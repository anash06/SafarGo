import React from 'react';

const About = () => {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1 className="animate-fade-in-up">About Us</h1>
          <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Discover the story behind SafarGo.</p>
        </div>
      </div>
      
      <section className="section container">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', lineHeight: '1.8', fontSize: '1.1rem' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', fontSize: '2rem' }}>Our Mission</h2>
          <p style={{ marginBottom: '2rem' }}>
            At SafarGo, we believe that traveling is the best way to broaden the mind and enrich the soul. 
            Founded in 2015, we set out to create extraordinary experiences for passionate travelers who want more than just a typical vacation.
          </p>
          <p style={{ marginBottom: '2rem' }}>
            Our team of expert guides and travel planners meticulously craft every itinerary to ensure you experience the authentic culture, stunning landscapes, and hidden gems of every destination.
          </p>
          
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
            alt="Our Team" 
            style={{ width: '100%', borderRadius: '20px', marginTop: '2rem', boxShadow: 'var(--shadow-md)' }} 
          />
        </div>
      </section>
    </div>
  );
};

export default About;
