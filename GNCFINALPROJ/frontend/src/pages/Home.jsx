import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../services/api';

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Music', 'Tech', 'Food', 'Art', 'Sports', 'Wedding', 'Comedy'];

  const categoryEmoji = {
    Music: '🎵', Tech: '💻', Food: '🍕',
    Art: '🎨', Sports: '⚽', Wedding: '💍',
    Comedy: '😂', All: '🎉'
  };

  const categoryColor = {
    Music: '#8b5cf6', Tech: '#3b82f6', Food: '#f59e0b',
    Art: '#ec4899', Sports: '#10b981', Wedding: '#f84464',
    Comedy: '#f97316', All: '#f84464'
  };

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = events.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || e.category === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh' }}>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1f1f 50%, #1a1a1a 100%)',
        padding: '60px 24px',
        textAlign: 'center',
        borderBottom: '1px solid #2a2a2a',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(248,68,100,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <p style={{ color: '#f84464', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', marginBottom: '16px' }}>
          DISCOVER • BOOK • EXPERIENCE
        </p>
        <h1 style={{
          fontSize: '52px', fontWeight: '800', color: 'white',
          lineHeight: '1.1', marginBottom: '16px', letterSpacing: '-1px'
        }}>
          Find Your Next <br />
          <span style={{ color: '#f84464' }}>Amazing Event</span>
        </h1>
        <p style={{ color: '#888', fontSize: '18px', marginBottom: '40px' }}>
          Book tickets instantly, get QR codes, attend unforgettable events
        </p>

        {/* Search Bar */}
        <div style={{
          maxWidth: '600px', margin: '0 auto',
          display: 'flex', gap: '12px'
        }}>
          <div style={{
            flex: 1, background: '#2a2a2a',
            border: '1px solid #3a3a3a', borderRadius: '12px',
            display: 'flex', alignItems: 'center',
            padding: '0 16px', gap: '10px'
          }}>
            <span style={{ fontSize: '18px' }}>🔍</span>
            <input
              type="text"
              placeholder="Search events, artists, venues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'transparent', border: 'none',
                outline: 'none', color: 'white', width: '100%',
                fontSize: '15px', padding: '14px 0'
              }}
            />
          </div>
          <button style={{
            background: '#f84464', color: 'white',
            border: 'none', borderRadius: '12px',
            padding: '0 28px', fontSize: '15px',
            fontWeight: '600', cursor: 'pointer'
          }}>
            Search
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px', marginBottom: '48px'
        }}>
          {[
            { num: events.length, label: 'Total Events', icon: '🎪' },
            { num: '8.2k+', label: 'Tickets Sold', icon: '🎟️' },
            { num: '340+', label: 'Happy Attendees', icon: '😊' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#1a1a1a', border: '1px solid #2a2a2a',
              borderRadius: '16px', padding: '24px', textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#f84464' }}>{stat.num}</div>
              <div style={{ color: '#888', fontSize: '14px', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '10px 20px', borderRadius: '50px',
                border: filter === cat ? 'none' : '1px solid #2a2a2a',
                background: filter === cat ? categoryColor[cat] : '#1a1a1a',
                color: filter === cat ? 'white' : '#888',
                fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
              {categoryEmoji[cat]} {cat}
            </button>
          ))}
        </div>

        {/* Section Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'white' }}>
            Upcoming Events
          </h2>
          <span style={{ color: '#888', fontSize: '14px' }}>
            {filtered.length} events found
          </span>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                background: '#1a1a1a', borderRadius: '16px',
                height: '320px', border: '1px solid #2a2a2a',
                animation: 'pulse 1.5s infinite'
              }}></div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>😕</div>
            <p style={{ color: '#888', fontSize: '18px' }}>No events found</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filtered.map((event) => (
              <div key={event._id}
                onClick={() => navigate(`/events/${event._id}`)}
                style={{
                  background: '#1a1a1a', border: '1px solid #2a2a2a',
                  borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = '1px solid #f84464';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = '1px solid #2a2a2a';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>

                {/* Card Banner */}
                <div style={{
                  height: '160px',
                  background: `linear-gradient(135deg, ${categoryColor[event.category] || '#f84464'}33, ${categoryColor[event.category] || '#f84464'}11)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '64px', position: 'relative'
                }}>
                  {categoryEmoji[event.category] || '🎉'}
                  <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: event.availableTickets === 0 ? '#ef4444' : event.availableTickets < 10 ? '#f59e0b' : '#10b981',
                    color: 'white', padding: '4px 10px',
                    borderRadius: '20px', fontSize: '11px', fontWeight: '700'
                  }}>
                    {event.availableTickets === 0 ? 'SOLD OUT' : event.availableTickets < 10 ? 'FEW LEFT' : 'AVAILABLE'}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '20px' }}>
                  <div style={{
                    display: 'inline-block',
                    background: `${categoryColor[event.category] || '#f84464'}22`,
                    color: categoryColor[event.category] || '#f84464',
                    padding: '3px 10px', borderRadius: '20px',
                    fontSize: '11px', fontWeight: '700',
                    marginBottom: '10px', letterSpacing: '1px'
                  }}>
                    {event.category?.toUpperCase()}
                  </div>

                  <h3 style={{
                    fontSize: '18px', fontWeight: '700',
                    color: 'white', marginBottom: '12px', lineHeight: '1.3'
                  }}>
                    {event.title}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                    <p style={{ color: '#888', fontSize: '13px' }}>
                      📅 {new Date(event.date).toDateString()}
                    </p>
                    <p style={{ color: '#888', fontSize: '13px' }}>
                      📍 {event.venue}
                    </p>
                    <p style={{ color: '#888', fontSize: '13px' }}>
                      🎟️ {event.availableTickets} tickets left
                    </p>
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #2a2a2a', paddingTop: '16px'
                  }}>
                    <div>
                      <p style={{ color: '#888', fontSize: '11px' }}>STARTING FROM</p>
                      <p style={{ color: '#f84464', fontSize: '22px', fontWeight: '800' }}>
                        ₹{event.ticketPrice}
                      </p>
                    </div>
                    <button
                      disabled={event.availableTickets === 0}
                      style={{
                        background: event.availableTickets === 0 ? '#2a2a2a' : '#f84464',
                        color: event.availableTickets === 0 ? '#555' : 'white',
                        border: 'none', borderRadius: '10px',
                        padding: '10px 20px', fontSize: '14px',
                        fontWeight: '700', cursor: event.availableTickets === 0 ? 'not-allowed' : 'pointer'
                      }}>
                      {event.availableTickets === 0 ? 'Sold Out' : 'Book Now →'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;