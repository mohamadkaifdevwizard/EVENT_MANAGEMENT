import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      toast.error('Admin access only!');
      navigate('/');
      return;
    }
    Promise.all([
      API.get('/admin/events'),
      API.get('/admin/bookings')
    ])
      .then(([eventsRes, bookingsRes]) => {
        setEvents(eventsRes.data);
        setBookings(bookingsRes.data);
      })
      .catch(() => toast.error('Data load nahi hua!'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await API.delete(`/events/${id}`);
      setEvents(events.filter((e) => e._id !== id));
      toast.success('Event deleted!');
    } catch {
      toast.error('Delete failed!');
    }
  };

  const handleConfirm = async (bookingId) => {
    try {
      await API.patch(`/admin/bookings/${bookingId}/confirm`);
      setBookings(bookings.map(b =>
        b._id === bookingId ? { ...b, status: 'confirmed' } : b
      ));
      toast.success('Booking confirmed! ✅');
    } catch {
      toast.error('Failed to confirm!');
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await API.patch(`/admin/bookings/${bookingId}/reject`);
      setBookings(bookings.map(b =>
        b._id === bookingId ? { ...b, status: 'rejected' } : b
      ));
      toast.success('Booking rejected!');
    } catch {
      toast.error('Failed to reject!');
    }
  };

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((acc, b) => acc + (b.totalPrice || 0), 0);

  const paidClients = bookings.filter(b => b.status === 'confirmed').length;
  const pendingRequests = bookings.filter(b => b.status === 'pending').length;

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
        <p style={{ color: '#888' }}>Loading dashboard...</p>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh' }}>

      {/* Top Banner */}
      <div style={{
        background: '#1a1a1a',
        borderBottom: '1px solid #2a2a2a',
        padding: '32px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '800' }}>Admin Dashboard</h1>
          <p style={{ color: '#888', marginTop: '6px' }}>Manage events and manually confirm bookings.</p>
        </div>
        <button
          onClick={() => navigate('/create-event')}
          style={{
            background: 'white', color: '#0f0f0f',
            border: 'none', borderRadius: '12px',
            padding: '14px 28px', fontSize: '15px',
            fontWeight: '700', cursor: 'pointer'
          }}>
          + Create New Event
        </button>
      </div>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>

          {/* Total Revenue */}
          <div style={{
            background: '#1a1a1a', border: '1px solid #2a2a2a',
            borderRadius: '16px', padding: '28px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div>
              <p style={{ color: '#888', fontSize: '13px', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '10px' }}>
                TOTAL REVENUE
              </p>
              <p style={{ color: '#10b981', fontSize: '36px', fontWeight: '800' }}>
                ₹{totalRevenue.toLocaleString()}
              </p>
            </div>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: '#10b98122',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px'
            }}>₹</div>
          </div>

          {/* Paid Clients */}
          <div style={{
            background: '#1a1a1a', border: '1px solid #2a2a2a',
            borderRadius: '16px', padding: '28px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div>
              <p style={{ color: '#888', fontSize: '13px', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '10px' }}>
                PAID CLIENTS
              </p>
              <p style={{ color: '#3b82f6', fontSize: '36px', fontWeight: '800' }}>
                {paidClients}
              </p>
            </div>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: '#3b82f622',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px'
            }}>👤</div>
          </div>

          {/* Pending Requests */}
          <div style={{
            background: '#1a1a1a', border: '1px solid #2a2a2a',
            borderRadius: '16px', padding: '28px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div>
              <p style={{ color: '#888', fontSize: '13px', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '10px' }}>
                PENDING REQUESTS
              </p>
              <p style={{ color: '#f59e0b', fontSize: '36px', fontWeight: '800' }}>
                {pendingRequests}
              </p>
            </div>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: '#f59e0b22',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px'
            }}>⏳</div>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* All Events */}
          <div style={{
            background: '#1a1a1a', border: '1px solid #2a2a2a',
            borderRadius: '20px', overflow: 'hidden'
          }}>
            <div style={{
              padding: '20px 24px', borderBottom: '1px solid #2a2a2a',
              display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              <div style={{
                background: '#f84464', color: 'white',
                width: '28px', height: '28px', borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '800', fontSize: '14px'
              }}>
                {events.length}
              </div>
              <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>All Events</h2>
            </div>

            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {events.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <p style={{ fontSize: '40px', marginBottom: '12px' }}>📭</p>
                  <p style={{ color: '#888' }}>Koi event nahi hai</p>
                </div>
              ) : (
                events.map((event) => (
                  <div key={event._id} style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid #2a2a2a',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    transition: 'background 0.2s'
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#2a2a2a'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <div>
                      <p style={{ color: 'white', fontWeight: '600', fontSize: '15px', marginBottom: '6px' }}>
                        {event.title}
                      </p>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <span style={{ color: '#888', fontSize: '12px' }}>
                          📅 {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            background: event.availableTickets > 0 ? '#10b981' : '#ef4444',
                            display: 'inline-block'
                          }}></span>
                          <span style={{ color: '#888', fontSize: '12px' }}>
                            {event.availableTickets}/{event.totalTickets || '?'} seats
                          </span>
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(event._id)}
                      style={{
                        background: '#ef444422', color: '#ef4444',
                        border: '1px solid #ef444444',
                        borderRadius: '8px', padding: '6px 16px',
                        fontSize: '13px', fontWeight: '700', cursor: 'pointer'
                      }}>
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Booking Requests */}
          <div style={{
            background: '#1a1a1a', border: '1px solid #2a2a2a',
            borderRadius: '20px', overflow: 'hidden'
          }}>
            <div style={{
              padding: '20px 24px', borderBottom: '1px solid #2a2a2a',
              display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              <div style={{
                background: '#f59e0b', color: 'white',
                width: '28px', height: '28px', borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '800', fontSize: '14px'
              }}>
                {bookings.length}
              </div>
              <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>Booking Requests</h2>
            </div>

            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {bookings.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <p style={{ fontSize: '40px', marginBottom: '12px' }}>📭</p>
                  <p style={{ color: '#888' }}>Koi booking nahi hai</p>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking._id} style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid #2a2a2a',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <p style={{ color: 'white', fontWeight: '600', fontSize: '15px' }}>
                        {booking.event?.title}
                      </p>
                      <span style={{
                        background: booking.status === 'confirmed' ? '#10b98122'
                          : booking.status === 'rejected' ? '#ef444422' : '#f59e0b22',
                        color: booking.status === 'confirmed' ? '#10b981'
                          : booking.status === 'rejected' ? '#ef4444' : '#f59e0b',
                        padding: '3px 10px', borderRadius: '20px',
                        fontSize: '11px', fontWeight: '700'
                      }}>
                        {booking.status === 'confirmed' ? 'CONFIRMED'
                          : booking.status === 'rejected' ? 'REJECTED' : 'PAID'}
                      </span>
                    </div>

                    <p style={{ color: '#888', fontSize: '12px', marginBottom: '10px' }}>
                      USER: {booking.user?.email}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#f84464', fontWeight: '700', fontSize: '15px' }}>
                        ₹{booking.totalPrice}
                      </span>

                      {booking.status === 'pending' && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleConfirm(booking._id)}
                            style={{
                              background: '#10b98122', color: '#10b981',
                              border: '1px solid #10b98144',
                              borderRadius: '8px', padding: '6px 14px',
                              fontSize: '12px', fontWeight: '700', cursor: 'pointer'
                            }}>
                            ✅ Confirm
                          </button>
                          <button
                            onClick={() => handleReject(booking._id)}
                            style={{
                              background: '#ef444422', color: '#ef4444',
                              border: '1px solid #ef444444',
                              borderRadius: '8px', padding: '6px 14px',
                              fontSize: '12px', fontWeight: '700', cursor: 'pointer'
                            }}>
                            ❌ Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;