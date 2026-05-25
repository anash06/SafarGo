import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import './DestinationDetail.css';

const DestinationDetail = () => {
  const { id } = useParams();
  const [dest, setDest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/destinations/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Destination not found');
        return res.json();
      })
      .then(data => {
        setDest(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="detail-loading">
          <div className="loading-spinner"></div>
          <p>Loading destination...</p>
        </div>
      </div>
    );
  }

  if (error || !dest) {
    return (
      <div className="page-wrapper">
        <div className="detail-error">
          <h2>Destination Not Found</h2>
          <p>Sorry, we couldn't find the destination you're looking for.</p>
          <Link to="/destinations" className="btn btn-primary">← Back to Destinations</Link>
        </div>
      </div>
    );
  }

  // Parse highlights from description if available
  const highlights = dest.highlights || [
    'Expert local guides',
    'Premium accommodations',
    'All meals included',
    'Airport transfers'
  ];

  return (
    <div className="page-wrapper">
      {/* Hero Banner */}
      <div className="detail-hero" style={{ backgroundImage: `url(${dest.image})` }}>
        <div className="detail-hero-overlay">
          <div className="container detail-hero-container">
            <Link to="/destinations" className="detail-back-btn">
              <ArrowLeft size={20} />
              <span>Back to Destinations</span>
            </Link>
            <div className="detail-hero-content animate-fade-in-up">
              <div className="detail-badge">
                <Star size={16} fill="currentColor" />
                <span>{dest.rating} Rating</span>
              </div>
              <h1>{dest.title}</h1>
              <div className="detail-hero-meta">
                <span className="detail-meta-item">
                  <MapPin size={18} />
                  {dest.location}
                </span>
                <span className="detail-meta-item">
                  <Clock size={18} />
                  {dest.days} Days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="section container">
        <div className="detail-grid">
          {/* Main Content */}
          <div className="detail-main">
            <div className="detail-section">
              <h2>About This Tour</h2>
              <div className="detail-description">
                {(dest.description || 'No description available for this destination yet. Please check back later or contact us for more information.').split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h2>Tour Highlights</h2>
              <div className="detail-highlights">
                {highlights.map((item, i) => (
                  <div key={i} className="highlight-item">
                    <CheckCircle size={20} className="highlight-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="detail-sidebar">
            <div className="booking-card">
              <div className="booking-price">
                <span className="price-label">Starting from</span>
                <span className="price-value">₹{dest.price?.toLocaleString()}</span>
                <span className="price-per">per person</span>
              </div>
              <div className="booking-details">
                <div className="booking-detail-row">
                  <span>Duration</span>
                  <strong>{dest.days} Days</strong>
                </div>
                <div className="booking-detail-row">
                  <span>Location</span>
                  <strong>{dest.location}</strong>
                </div>
                <div className="booking-detail-row">
                  <span>Rating</span>
                  <strong className="booking-rating">
                    <Star size={14} fill="currentColor" />
                    {dest.rating}
                  </strong>
                </div>
              </div>
              <Link to="/contact" className="btn btn-primary booking-btn">
                Book Now
              </Link>
              <p className="booking-note">Free cancellation up to 48 hours before the tour</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetail;
