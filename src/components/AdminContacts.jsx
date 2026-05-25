import React, { useState, useEffect } from 'react';
import { StickyNote, Trash2 } from 'lucide-react';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Table Collapse States
  const [expandedMessages, setExpandedMessages] = useState({});
  const [expandedNotes, setExpandedNotes] = useState({});

  const toggleMessageExpand = (id) => {
    setExpandedMessages(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleNoteExpand = (id) => {
    setExpandedNotes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contact');
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/contact/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete message');
      await fetchContacts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleOpenModal = (contact) => {
    setSelectedContact(contact);
    setNoteText(contact.notes || '');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
    setNoteText('');
  };

  const handleSaveNote = async (e) => {
    e.preventDefault();
    if (!selectedContact) return;
    try {
      const response = await fetch(`http://localhost:5000/api/contact/${selectedContact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: noteText })
      });
      if (!response.ok) throw new Error('Failed to save note');
      await fetchContacts();
      handleCloseModal();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading contacts...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Contact Submissions ({contacts.length})</h2>
        <button onClick={fetchContacts} className="btn btn-admin-outline" style={{ padding: '0.5rem 1rem' }}>Refresh</button>
      </div>

      {contacts.length === 0 ? (
        <p>No contact submissions yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td style={{ whiteSpace: 'nowrap', fontSize: '0.9rem', color: '#6b7280' }}>
                    {contact.submitted_at ? new Date(contact.submitted_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'N/A'}
                  </td>
                  <td style={{ fontWeight: '500' }}>{contact.name}</td>
                  <td><a href={`mailto:${contact.email}`} style={{ color: 'var(--color-primary)' }}>{contact.email}</a></td>
                  <td><a href={`tel:${contact.phone}`} style={{ color: 'var(--color-primary)' }}>{contact.phone}</a></td>
                  <td style={{ maxWidth: '250px' }}>
                    <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                      {contact.message.length > 80 && !expandedMessages[contact.id] ? (
                        <>
                          {contact.message.substring(0, 80)}...{' '}
                          <button 
                            onClick={() => toggleMessageExpand(contact.id)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', padding: 0, font: 'inherit', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'underline' }}
                          >
                            more
                          </button>
                        </>
                      ) : (
                        <>
                          {contact.message}
                          {contact.message.length > 80 && (
                            <>
                              {' '}
                              <button 
                                onClick={() => toggleMessageExpand(contact.id)}
                                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', padding: 0, font: 'inherit', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'underline' }}
                              >
                                less
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                  <td style={{ maxWidth: '250px' }}>
                    {contact.notes ? (
                      <div style={{ 
                        background: '#fef3c7', 
                        borderLeft: '4px solid #f59e0b', 
                        padding: '0.5rem 0.75rem', 
                        borderRadius: '4px', 
                        fontSize: '0.9rem', 
                        color: '#78350f',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}>
                        {contact.notes.length > 80 && !expandedNotes[contact.id] ? (
                          <>
                            {contact.notes.substring(0, 80)}...{' '}
                            <button 
                              onClick={() => toggleNoteExpand(contact.id)}
                              style={{ background: 'none', border: 'none', color: '#b45309', cursor: 'pointer', padding: 0, font: 'inherit', fontWeight: '600', fontSize: '0.8rem', textDecoration: 'underline' }}
                            >
                              more
                            </button>
                          </>
                        ) : (
                          <>
                            {contact.notes}
                            {contact.notes.length > 80 && (
                              <>
                                {' '}
                                <button 
                                  onClick={() => toggleNoteExpand(contact.id)}
                                  style={{ background: 'none', border: 'none', color: '#b45309', cursor: 'pointer', padding: 0, font: 'inherit', fontWeight: '600', fontSize: '0.8rem', textDecoration: 'underline' }}
                                >
                                  less
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                      <span style={{ color: '#9ca3af', fontStyle: 'italic', fontSize: '0.9rem' }}>No notes yet</span>
                    )}
                  </td>
                  <td>
                    <button 
                      onClick={() => handleOpenModal(contact)} 
                      style={{ 
                        marginRight: '0.75rem', 
                        background: 'none', 
                        border: 'none', 
                        color: contact.notes ? '#d97706' : '#3b82f6', 
                        cursor: 'pointer', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                      title={contact.notes ? 'Edit Internal Note' : 'Add Internal Note'}
                      aria-label={contact.notes ? 'Edit Internal Note' : 'Add Internal Note'}
                    >
                      <StickyNote size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(contact.id)} 
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#ef4444', 
                        cursor: 'pointer', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                      title="Delete Message"
                      aria-label="Delete Message"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{selectedContact?.notes ? 'Edit Internal Note' : 'Add Internal Note'}</h3>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.2rem' }}>
              Adding reference note for submission from <strong>{selectedContact?.name}</strong>.
            </p>
            <form onSubmit={handleSaveNote}>
              <div className="form-group">
                <label>Admin Notes</label>
                <textarea 
                  value={noteText} 
                  onChange={(e) => setNoteText(e.target.value)} 
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'inherit', minHeight: '120px', resize: 'vertical' }} 
                  placeholder="Write admin reference notes here (e.g. 'Called back, client interested in private luxury package')..."
                ></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-admin-outline" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Note</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
