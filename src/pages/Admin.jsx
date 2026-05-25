import React, { useState } from 'react';
import AdminDestinations from '../components/AdminDestinations';
import AdminContacts from '../components/AdminContacts';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('destinations');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'password') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ username: '', password: '' });
  };

  if (!isAuthenticated) {
    return (
      <div className="page-wrapper admin-login-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 56px)' }}>
        <div style={{ background: 'var(--color-white)', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: 'var(--shadow-md)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Admin Login</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Username</label>
              <input 
                type="text" 
                value={credentials.username} 
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }}
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
              <input 
                type="password" 
                value={credentials.password} 
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }}
                required 
              />
            </div>
            {loginError && <p style={{ color: 'red', margin: '0' }}>{loginError}</p>}
            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper admin-page">
      <div className="page-header" style={{ padding: '3rem 0', minHeight: 'auto' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="animate-fade-in-up">Admin Dashboard</h1>
          <button className="btn btn-admin-outline" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <section className="section container">
        <div className="admin-tabs">
          <button 
            className={`btn ${activeTab === 'destinations' ? 'btn-primary' : 'btn-admin-outline'}`}
            onClick={() => setActiveTab('destinations')}
          >
            Manage Destinations
          </button>
          <button 
            className={`btn ${activeTab === 'contacts' ? 'btn-primary' : 'btn-admin-outline'}`}
            onClick={() => setActiveTab('contacts')}
            style={{ marginLeft: '1rem' }}
          >
            Manage Contacts
          </button>
        </div>

        <div className="admin-content" style={{ marginTop: '2rem' }}>
          {activeTab === 'destinations' && <AdminDestinations />}
          {activeTab === 'contacts' && <AdminContacts />}
        </div>
      </section>
    </div>
  );
};

export default Admin;
