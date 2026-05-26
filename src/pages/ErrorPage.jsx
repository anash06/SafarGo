import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="page-wrapper error-page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1 className="animate-fade-in-up">Oops! Something went wrong</h1>
          <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            The page you are looking for could not be found.
          </p>
        </div>
      </div>

      <section className="section container">
        <div className="error-page-content">
          <p className="error-code">404</p>
          <h2 className="error-title">Page not found</h2>
          <p className="error-description">
            The route you tried to open doesn’t exist, or it may have been moved. Let’s get you back to discovering amazing places.
          </p>
          <div className="error-actions">
            <Link to="/" className="btn btn-primary">
              Return Home
            </Link>
            <Link to="/destinations" className="btn btn-outline error-outline-btn">
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
