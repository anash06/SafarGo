import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock } from 'lucide-react';
import './DestinationCard.css';

const DestinationCard = ({ id, title, location, image, price, rating, days }) => {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  return (
    <div className="dest-card">
      <div className="dest-img-wrapper">
        <img src={image} alt={title} className="dest-img" />
        <div className="dest-price">₹{price}</div>
      </div>
      <div className="dest-info">
        <div className="dest-header">
          <h3 className="dest-title">{title}</h3>
          <div className="dest-rating">
            <Star size={16} className="star-icon" fill="currentColor" />
            <span>{rating}</span>
          </div>
        </div>
        <div className="dest-location">
          <MapPin size={16} />
          <span>{location}</span>
        </div>
        <div className="dest-footer">
          <div className="dest-duration">
            <Clock size={16} />
            <span>{days} Days</span>
          </div>
          <Link to={`/destination/${slug}`} className="btn btn-primary btn-sm">Details</Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
