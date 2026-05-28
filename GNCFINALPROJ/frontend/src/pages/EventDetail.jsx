import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, bookTicket } from '../services/api';
import toast from 'react-hot-toast';

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const categoryColor = {
    Music: '#8b5cf6', Tech: '#3b82f6', Food: '#f59e0b',
    Art: '#ec4899', Sports: '#10b981', Wedding: '#f84464',
    Comedy: '#f97316'
  };

  const categoryEmoji = {
    Music: '🎵', Tech: '💻', Food: '🍕',
    Art: '🎨', Sports: '⚽', Wedding: '💍', Comedy: '😂'
  };

  useEffect(() => {
    getEventById(id)
      .then((res) => setEvent(res.data))
      .catch(() => toast.error('Event not found!'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBook = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Pehle login karo!');
      navigate('/login');
      return;
    }
    setBooking(true);
    try {
      await bookTicket(id, qty);
      toast.success('Ticket booked! 🎉');
      navigate('/my-tickets');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed!');
    } finally {
      setBooking(false);
    }
  };

  if (loading) return (
    <div style={{
      minHeight: '100vh', background: '#0f0f0f',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '48px', height: '48px',
          border: '4px solid #f84464',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }}></div>
        <p style={{ color: '#888' }}>Loading event...</p>
      </div>
    </div>
  );

  if (!event) return (
    <div style={{
      minHeight: '100vh', background: '#0f0f0f',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '64px', marginBottom: '16px' }}>😕</p>
        <p style={{ color: '#888', fontSize: '18px' }}>Event not found!</p>
        <button onClick={() => navigate('/')} style={{
          marginTop: '16px', background: '#f84464', color: 'white',
          border: 'none', borderRadius: '12px', padding: '12px 24px',
          fontSize: '15px', cursor: 'pointer', fontWeight: '600'
        }}>
          Go Back
        </button>
      </div>
    </div>
  );

  const color = categoryColor[event.category] || '#f84464';

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh' }}>

      {/* Hero Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${color}33 0%, #1a1a1a 60%)`,
        padding: '60px 24px 40px',
        borderBottom: '1px solid #2a2a2a',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-50px', right: '-50px',
          width: '300px', height: '300px',
          background: `radial-gradient(circle, ${color}22, transparent 70%)`,
          pointerEvents: 'none'
        }}></div>

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <button onClick={() => navigate('/')} style={{
            background: '#2a2a2a', border: '1px solid #3a3a3a',
            color: '#aaa', padding: '8px 16px', borderRadius: '8px',
            cursor: 'pointer', fontSize: '14px', marginBottom: '24px',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            ← Back to Events
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '56px' }}>{categoryEmoji[event.category] || '🎉'}</span>
            <div>
              <div style={{
                display: 'inline-block',
                background: `${color}22`, color: color,
                padding: '4px 12px', borderRadius: '20px',
                fontSize: '12px', fontWeight: '700',
                letterSpacing: '1px', marginBottom: '10px'
              }}>
                {event.category?.toUpperCase()}
              </div>
              <h1 style={{
                fontSize: '36px', fontWeight: '800',
                color: 'white', lineHeight: '1.2'
              }}>
                {event.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>

          {/* Left — Event Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Details Card */}
            <div style={{
              background: '#1a1a1a', border: '1px solid #2a2a2a',
              borderRadius: '16px', padding: '24px'
            }}>
              <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
                Event Details
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: '📅', label: 'Date', value: new Date(event.date).toDateString() },
                  { icon: '📍', label: 'Venue', value: event.venue },
                  { icon: '🎟️', label: 'Available Tickets', value: `${event.availableTickets} remaining` },
                  { icon: '📝', label: 'Description', value: event.description },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      background: '#2a2a2a', borderRadius: '10px',
                      width: '40px', height: '40px', minWidth: '40px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '18px'
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ color: '#555', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px' }}>
                        {item.label.toUpperCase()}
                      </p>
                      <p style={{ color: '#ddd', fontSize: '15px', marginTop: '2px' }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Packages */}
            {event.packages && event.packages.length > 0 && (
              <div style={{
                background: '#1a1a1a', border: '1px solid #2a2a2a',
                borderRadius: '16px', padding: '24px'
              }}>
                <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
                  💎 Available Packages
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {event.packages.map((pkg, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedPackage(selectedPackage === i ? null : i)}
                      style={{
                        background: selectedPackage === i ? `${color}11` : '#2a2a2a',
                        border: selectedPackage === i ? `1px solid ${color}` : '1px solid #3a3a3a',
                        borderRadius: '12px', padding: '16px', cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>{pkg.name}</p>
                          <p style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>{pkg.features}</p>
                        </div>
                        <p style={{ color: '#f84464', fontWeight: '800', fontSize: '20px' }}>
                          ₹{pkg.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — Booking Card */}
          <div style={{
            background: '#1a1a1a', border: '1px solid #2a2a2a',
            borderRadius: '16px', padding: '24px',
            height: 'fit-content', position: 'sticky', top: '24px'
          }}>
            <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
              🎟️ Book Tickets
            </h2>

            {/* Price */}
            <div style={{
              background: '#2a2a2a', borderRadius: '12px',
              padding: '16px', textAlign: 'center', marginBottom: '20px'
            }}>
              <p style={{ color: '#888', fontSize: '12px', letterSpacing: '1px' }}>BASE PRICE</p>
              <p style={{ color: '#f84464', fontSize: '36px', fontWeight: '800' }}>
                ₹{selectedPackage !== null ? event.packages[selectedPackage].price : event.ticketPrice}
              </p>
              <p style={{ color: '#555', fontSize: '12px' }}>per ticket</p>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: '#aaa', fontSize: '13px', fontWeight: '600', marginBottom: '12px', letterSpacing: '0.5px' }}>
                QUANTITY
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: '#2a2a2a', border: '1px solid #3a3a3a',
                    color: 'white', fontSize: '20px', cursor: 'pointer'
                  }}>−</button>
                <span style={{ color: 'white', fontSize: '28px', fontWeight: '800', minWidth: '40px', textAlign: 'center' }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(event.availableTickets, qty + 1))}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: '#2a2a2a', border: '1px solid #3a3a3a',
                    color: 'white', fontSize: '20px', cursor: 'pointer'
                  }}>+</button>
              </div>
            </div>

            {/* Total */}
            <div style={{
              borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a',
              padding: '16px 0', marginBottom: '20px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span style={{ color: '#888', fontSize: '15px' }}>Total Amount</span>
              <span style={{ color: 'white', fontSize: '24px', fontWeight: '800' }}>
                ₹{qty * (selectedPackage !== null ? event.packages[selectedPackage].price : event.ticketPrice)}
              </span>
            </div>

            <button
              onClick={handleBook}
              disabled={booking || event.availableTickets === 0}
              style={{
                width: '100%', padding: '16px',
                background: event.availableTickets === 0 ? '#2a2a2a' : booking ? '#c0334f' : '#f84464',
                color: event.availableTickets === 0 ? '#555' : 'white',
                border: 'none', borderRadius: '12px', fontSize: '16px',
                fontWeight: '700', cursor: event.availableTickets === 0 || booking ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}>
              {event.availableTickets === 0 ? '😔 Sold Out' : booking ? 'Booking...' : '🎟️ Book Now'}
            </button>

            <p style={{ color: '#555', fontSize: '12px', textAlign: 'center', marginTop: '12px' }}>
              🔒 Secure booking • Instant QR code
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;