import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1 className="animate-fade-in-up">Contact Us</h1>
          <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>We're here to help you plan your next adventure.</p>
        </div>
      </div>
      
      <section className="section container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          <div>
            <h2 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem' }}>Get In Touch</h2>
            <p style={{ marginBottom: '2rem', color: '#555', fontSize: '1.1rem' }}>
              Have questions about our tours or need a custom itinerary? Fill out the form, and our travel experts will get back to you within 24 hours.
            </p>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Address:</strong> 123 New Busstand, Kayalpattinam, TamilNadu, India - 628204
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Phone:</strong> +91 9876543210
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Email:</strong> hello@safargo.tours
            </div>
          </div>
          
          <div style={{ background: 'var(--color-white)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow-md)' }}>
            {status === 'success' ? (
              <div style={{ color: 'green', textAlign: 'center', padding: '2rem' }}>
                <h3>Thank you!</h3>
                <p>Your message has been sent successfully. We'll be in touch soon.</p>
                <button onClick={() => setStatus(null)} className="btn btn-outline" style={{ marginTop: '1rem' }}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }} placeholder="Your Name" required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }} placeholder="Your Email" required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }} placeholder="Your Phone Number" required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit', minHeight: '150px' }} placeholder="How can we help you?" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
                {status === 'error' && <p style={{ color: 'red', marginTop: '0.5rem' }}>An error occurred. Please try again.</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
