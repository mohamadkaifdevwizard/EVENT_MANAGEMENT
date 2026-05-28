import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyTickets } from '../services/api';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Pehle login karo!');
      navigate('/login');
      return;
    }
    getMyTickets()
      .then((res) => setTickets(res.data))
      .catch(() => toast.error('Tickets load nahi hue!'))
      .finally(() => setLoading(false));
  }, [navigate]);

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
        <p style={{ color: '#888' }}>Loading your tickets...</p>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a1a, #2d1f1f)',
        padding: '48px 24px',
        borderBottom: '1px solid #2a2a2a',
        textAlign: 'center'
      }}>
        <p style={{ color: '#f84464', fontSize: '13px', fontWeight: '700', letterSpacing: '3px', marginBottom: '12px' }}>
          YOUR BOOKINGS
        </p>
        <h1 style={{ color: 'white', fontSize: '36px', fontWeight: '800' }}>My Tickets 🎟️</h1>
        <p style={{ color: '#888', marginTop: '8px' }}>All your booked event tickets with QR codes</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>

        <button onClick={() => navigate('/')} style={{
          background: '#2a2a2a', border: '1px solid #3a3a3a',
          color: '#aaa', padding: '8px 16px', borderRadius: '8px',
          cursor: 'pointer', fontSize: '14px', marginBottom: '32px'
        }}>
          ← Back to Events
        </button>

        {tickets.length === 0 ? (
          <div style={{
            background: '#1a1a1a', border: '1px solid #2a2a2a',
            borderRadius: '20px', padding: '80px 24px', textAlign: 'center'
          }}>
            <p style={{ fontSize: '64px', marginBottom: '16px' }}>🎫</p>
            <p style={{ color: 'white', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
              No tickets yet!
            </p>
            <p style={{ color: '#888', marginBottom: '24px' }}>Abhi tak koi event book nahi kiya</p>
            <button onClick={() => navigate('/')} style={{
              background: '#f84464', color: 'white', border: 'none',
              borderRadius: '12px', padding: '14px 32px',
              fontSize: '15px', fontWeight: '700', cursor: 'pointer'
            }}>
              Browse Events →
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
            {tickets.map((ticket) => (
              <div key={ticket._id} style={{
                background: '#1a1a1a', border: '1px solid #2a2a2a',
                borderRadius: '20px', overflow: 'hidden'
              }}>

                {/* Ticket Header */}
                <div style={{
                  background: 'linear-gradient(135deg, #f84464, #c0334f)',
                  padding: '20px 24px'
                }}>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', marginBottom: '6px' }}>
                    EVENT TICKET
                  </p>
                  <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '800', lineHeight: '1.3' }}>
                    {ticket.event?.title}
                  </h2>
                </div>

                {/* Dashed Divider */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  padding: '0 16px', margin: '0'
                }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#0f0f0f', minWidth: '20px' }}></div>
                  <div style={{ flex: 1, borderTop: '2px dashed #2a2a2a', margin: '0 8px' }}></div>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#0f0f0f', minWidth: '20px' }}></div>
                </div>

                {/* Ticket Body */}
                <div style={{ padding: '20px 24px' }}>

                  {/* Event Info Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    {[
                      { label: 'DATE', value: new Date(ticket.event?.date).toDateString() },
                      { label: 'VENUE', value: ticket.event?.venue },
                      { label: 'QUANTITY', value: `${ticket.quantity} ticket${ticket.quantity > 1 ? 's' : ''}` },
                      { label: 'TOTAL PAID', value: `₹${ticket.totalPrice}`, highlight: true },
                    ].map((item, i) => (
                      <div key={i}>
                        <p style={{ color: '#555', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', marginBottom: '4px' }}>
                          {item.label}
                        </p>
                        <p style={{ color: item.highlight ? '#f84464' : '#ddd', fontSize: '14px', fontWeight: item.highlight ? '800' : '500' }}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Status */}
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{
                      background: ticket.status === 'confirmed' ? '#10b98122' : '#f59e0b22',
                      color: ticket.status === 'confirmed' ? '#10b981' : '#f59e0b',
                      padding: '6px 14px', borderRadius: '20px',
                      fontSize: '13px', fontWeight: '700'
                    }}>
                      {ticket.status === 'confirmed' ? '✅ Confirmed' : '⏳ Pending'}
                    </span>
                  </div>

                  {/* QR Code */}
                  <div style={{
                    background: '#2a2a2a', borderRadius: '16px',
                    padding: '20px', textAlign: 'center'
                  }}>
                    <p style={{ color: '#888', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', marginBottom: '16px' }}>
                      SCAN AT ENTRY
                    </p>
                    <div style={{
                      background: 'white', padding: '12px',
                      borderRadius: '12px', display: 'inline-block'
                    }}>
                      <QRCodeSVG
                        value={ticket._id}
                        size={150}
                        bgColor="#ffffff"
                        fgColor="#0f0f0f"
                        level="H"
                      />
                    </div>
                    <p style={{ color: '#555', fontSize: '11px', marginTop: '12px', fontFamily: 'monospace', letterSpacing: '2px' }}>
                      {ticket._id?.slice(-12).toUpperCase()}
                    </p>
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

export default MyTickets;