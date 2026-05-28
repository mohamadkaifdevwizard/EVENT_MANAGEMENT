import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../services/api';

function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Music',
    date: '',
    venue: '',
    ticketPrice: '',
    availableTickets: '',
    packages: [{ name: '', price: '', features: '' }]
  });

  const categories = ['Music', 'Tech', 'Food', 'Art', 'Sports', 'Wedding', 'Conference', 'Comedy'];

  const categoryEmoji = {
    Music: '🎵', Tech: '💻', Food: '🍕', Art: '🎨',
    Sports: '⚽', Wedding: '💍', Conference: '🎤', Comedy: '😂'
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePackageChange = (index, field, value) => {
    const updated = [...form.packages];
    updated[index][field] = value;
    setForm({ ...form, packages: updated });
  };

  const addPackage = () => {
    setForm({
      ...form,
      packages: [...form.packages, { name: '', price: '', features: '' }]
    });
  };

  const removePackage = (index) => {
    const updated = form.packages.filter((_, i) => i !== index);
    setForm({ ...form, packages: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/events', form);
      toast.success('Event created! 🎉');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Event creation failed!');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: '#2a2a2a', border: '1px solid #3a3a3a',
    borderRadius: '12px', color: 'white', fontSize: '15px',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border 0.2s'
  };

  const labelStyle = {
    color: '#aaa', fontSize: '12px', fontWeight: '700',
    letterSpacing: '1px', display: 'block', marginBottom: '8px'
  };

  const cardStyle = {
    background: '#1a1a1a', border: '1px solid #2a2a2a',
    borderRadius: '20px', padding: '28px', marginBottom: '20px'
  };

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{
        background: '#1a1a1a', borderBottom: '1px solid #2a2a2a',
        padding: '32px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '800' }}>
            Create New Event
          </h1>
          <p style={{ color: '#888', marginTop: '6px' }}>
            Fill in the details to publish your event
          </p>
        </div>
        <button
          onClick={() => navigate('/admin')}
          style={{
            background: '#2a2a2a', border: '1px solid #3a3a3a',
            color: '#aaa', padding: '10px 20px', borderRadius: '10px',
            cursor: 'pointer', fontSize: '14px', fontWeight: '600'
          }}>
          ← Back to Dashboard
        </button>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        <form onSubmit={handleSubmit}>

          {/* Basic Info */}
          <div style={cardStyle}>
            <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#f84464', padding: '4px 10px', borderRadius: '8px', fontSize: '14px' }}>01</span>
              Basic Information
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>EVENT TITLE</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Sunburn Music Festival 2026"
                required
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#f84464'}
                onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>DESCRIPTION</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Event ke baare mein detail mein likho..."
                rows={4}
                required
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#f84464'}
                onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
              />
            </div>

            <div>
              <label style={labelStyle}>CATEGORY</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setForm({ ...form, category: cat })}
                    style={{
                      padding: '12px 8px',
                      background: form.category === cat ? '#f8446422' : '#2a2a2a',
                      border: form.category === cat ? '1px solid #f84464' : '1px solid #3a3a3a',
                      borderRadius: '12px', color: form.category === cat ? '#f84464' : '#888',
                      fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                      transition: 'all 0.2s', textAlign: 'center'
                    }}>
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{categoryEmoji[cat]}</div>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Date & Venue */}
          <div style={cardStyle}>
            <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#f84464', padding: '4px 10px', borderRadius: '8px', fontSize: '14px' }}>02</span>
              Date & Venue
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>EVENT DATE & TIME</label>
              <input
                type="datetime-local"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                style={{ ...inputStyle, colorScheme: 'dark' }}
                onFocus={(e) => e.target.style.borderColor = '#f84464'}
                onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
              />
            </div>

            <div>
              <label style={labelStyle}>VENUE</label>
              <input
                type="text"
                name="venue"
                value={form.venue}
                onChange={handleChange}
                placeholder="e.g. NSCI Dome, Mumbai"
                required
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#f84464'}
                onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
              />
            </div>
          </div>

          {/* Tickets */}
          <div style={cardStyle}>
            <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#f84464', padding: '4px 10px', borderRadius: '8px', fontSize: '14px' }}>03</span>
              Ticket Details
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>BASE PRICE (₹)</label>
                <input
                  type="number"
                  name="ticketPrice"
                  value={form.ticketPrice}
                  onChange={handleChange}
                  placeholder="e.g. 999"
                  required
                  min="0"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#f84464'}
                  onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
                />
              </div>
              <div>
                <label style={labelStyle}>TOTAL TICKETS</label>
                <input
                  type="number"
                  name="availableTickets"
                  value={form.availableTickets}
                  onChange={handleChange}
                  placeholder="e.g. 500"
                  required
                  min="1"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#f84464'}
                  onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
                />
              </div>
            </div>
          </div>

          {/* Packages */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: '#f84464', padding: '4px 10px', borderRadius: '8px', fontSize: '14px' }}>04</span>
                Packages
              </h2>
              <button
                type="button"
                onClick={addPackage}
                style={{
                  background: '#f8446422', color: '#f84464',
                  border: '1px solid #f8446444',
                  borderRadius: '10px', padding: '8px 16px',
                  fontSize: '13px', fontWeight: '700', cursor: 'pointer'
                }}>
                + Add Package
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {form.packages.map((pkg, index) => (
                <div key={index} style={{
                  background: '#2a2a2a', border: '1px solid #3a3a3a',
                  borderRadius: '16px', padding: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ color: '#f84464', fontSize: '13px', fontWeight: '700', letterSpacing: '1px' }}>
                      PACKAGE {index + 1}
                    </span>
                    {form.packages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePackage(index)}
                        style={{
                          background: '#ef444422', color: '#ef4444',
                          border: 'none', borderRadius: '8px',
                          padding: '4px 12px', fontSize: '12px',
                          fontWeight: '700', cursor: 'pointer'
                        }}>
                        Remove
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <input
                      type="text"
                      placeholder="Package name (e.g. Silver, Gold, Platinum)"
                      value={pkg.name}
                      onChange={(e) => handlePackageChange(index, 'name', e.target.value)}
                      style={{ ...inputStyle, background: '#1a1a1a' }}
                      onFocus={(e) => e.target.style.borderColor = '#f84464'}
                      onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
                    />
                    <input
                      type="number"
                      placeholder="Package price (₹)"
                      value={pkg.price}
                      onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                      style={{ ...inputStyle, background: '#1a1a1a' }}
                      onFocus={(e) => e.target.style.borderColor = '#f84464'}
                      onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
                    />
                    <textarea
                      placeholder="Features (e.g. Front row seats, Free dinner, VIP lounge)"
                      value={pkg.features}
                      onChange={(e) => handlePackageChange(index, 'features', e.target.value)}
                      rows={2}
                      style={{ ...inputStyle, background: '#1a1a1a', resize: 'none' }}
                      onFocus={(e) => e.target.style.borderColor = '#f84464'}
                      onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '18px',
              background: loading ? '#c0334f' : '#f84464',
              color: 'white', border: 'none',
              borderRadius: '16px', fontSize: '18px',
              fontWeight: '800', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s', letterSpacing: '0.5px'
            }}>
            {loading ? 'Creating Event...' : '🚀 Publish Event'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateEvent;