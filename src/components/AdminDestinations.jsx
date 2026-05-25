import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDest, setCurrentDest] = useState(null);
  const [formData, setFormData] = useState({
    title: '', location: '', image: '', price: '', rating: '', days: '', description: '', highlights: ''
  });

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/destinations');
      if (!response.ok) throw new Error('Failed to fetch destinations');
      const data = await response.json();
      setDestinations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleOpenModal = (dest = null) => {
    if (dest) {
      setCurrentDest(dest);
      setFormData({
        title: dest.title,
        location: dest.location,
        image: dest.image,
        price: dest.price,
        rating: dest.rating,
        days: dest.days,
        description: dest.description || '',
        highlights: dest.highlights ? dest.highlights.join(', ') : ''
      });
    } else {
      setCurrentDest(null);
      setFormData({ title: '', location: '', image: '', price: '', rating: '', days: '', description: '', highlights: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'rating' || name === 'days' ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = currentDest 
        ? `http://localhost:5000/api/destinations/${currentDest.id}`
        : `http://localhost:5000/api/destinations`;
      const method = currentDest ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        highlights: formData.highlights.split(',').map(item => item.trim()).filter(item => item.length > 0)
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to save destination');
      
      await fetchDestinations();
      handleCloseModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this destination?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/destinations/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete destination');
      await fetchDestinations();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading && destinations.length === 0) return <div>Loading destinations...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Destinations ({destinations.length})</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Add New</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Location</th>
              <th>Price (₹)</th>
              <th>Days</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map(dest => (
              <tr key={dest.id}>
                <td><img src={dest.image} alt={dest.title} /></td>
                <td>{dest.title}</td>
                <td>{dest.location}</td>
                <td>{dest.price}</td>
                <td>{dest.days}</td>
                <td>{dest.rating}</td>
                <td>
                  <button 
                    onClick={() => handleOpenModal(dest)} 
                    style={{ marginRight: '0.75rem', background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Edit Destination"
                    aria-label="Edit Destination"
                  >
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(dest.id)} 
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Delete Destination"
                    aria-label="Delete Destination"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{currentDest ? 'Edit Destination' : 'Add New Destination'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input type="url" name="image" value={formData.image} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'inherit', minHeight: '100px' }} required placeholder="Enter a detailed tour description..."></textarea>
              </div>
              <div className="form-group">
                <label>Highlights (comma separated)</label>
                <input type="text" name="highlights" value={formData.highlights} onChange={handleInputChange} required placeholder="Highlight 1, Highlight 2, Highlight 3" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Price</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Days</label>
                  <input type="number" name="days" value={formData.days} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <input type="number" step="0.1" max="5" name="rating" value={formData.rating} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-admin-outline" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{currentDest ? 'Update' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDestinations;
