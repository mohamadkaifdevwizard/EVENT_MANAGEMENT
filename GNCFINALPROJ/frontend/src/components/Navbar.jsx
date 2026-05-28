import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logout successful!');
    navigate('/login');
  };

  return (
    <nav style={{ background: '#1a1a1a', borderBottom: '1px solid #2a2a2a' }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span style={{
            background: '#f84464',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '8px',
            fontWeight: '800',
            fontSize: '20px',
            letterSpacing: '-0.5px'
          }}>
            Event
          </span>
          <span style={{ color: 'white', fontWeight: '800', fontSize: '20px' }}>Hub</span>
        </Link>

        {/* Search Bar — Desktop */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
          <div style={{
            background: '#2a2a2a',
            border: '1px solid #3a3a3a',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            flex: 1,
            gap: '8px'
          }}>
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search events, artists, venues..."
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'white',
                width: '100%',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" style={{ color: '#aaa', fontSize: '14px', fontWeight: '500' }}
            className="hover:text-white transition">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/my-tickets" style={{ color: '#aaa', fontSize: '14px', fontWeight: '500' }}
                className="hover:text-white transition">
                My Tickets
              </Link>

              {user.role === 'admin' && (
                <>
                  <Link to="/create-event" style={{
                    background: '#f84464',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    ➕ Create
                  </Link>
                  <Link to="/admin" style={{
                    background: '#2a2a2a',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    border: '1px solid #3a3a3a'
                  }}>
                    📊 Dashboard
                  </Link>
                </>
              )}

              <div style={{
                background: '#f84464',
                color: 'white',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '16px',
                cursor: 'pointer'
              }}>
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: '1px solid #3a3a3a',
                  color: '#aaa',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                background: 'transparent',
                border: '1px solid #f84464',
                color: '#f84464',
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                Login
              </Link>
              <Link to="/register" style={{
                background: '#f84464',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: '#1a1a1a', borderTop: '1px solid #2a2a2a' }}
          className="md:hidden px-6 pb-4 flex flex-col gap-3">
          <Link to="/" style={{ color: '#aaa', padding: '12px 0', borderBottom: '1px solid #2a2a2a' }}
            onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          {user ? (
            <>
              <Link to="/my-tickets" style={{ color: '#aaa', padding: '12px 0', borderBottom: '1px solid #2a2a2a' }}
                onClick={() => setMenuOpen(false)}>
                My Tickets
              </Link>
              {user.role === 'admin' && (
                <>
                  <Link to="/create-event" style={{
                    background: '#f84464', color: 'white',
                    padding: '10px 16px', borderRadius: '8px', textAlign: 'center'
                  }} onClick={() => setMenuOpen(false)}>
                    ➕ Create Event
                  </Link>
                  <Link to="/admin" style={{
                    background: '#2a2a2a', color: 'white',
                    padding: '10px 16px', borderRadius: '8px', textAlign: 'center',
                    border: '1px solid #3a3a3a'
                  }} onClick={() => setMenuOpen(false)}>
                    📊 Dashboard
                  </Link>
                </>
              )}
              <button onClick={handleLogout} style={{
                background: 'transparent', border: '1px solid #3a3a3a',
                color: '#aaa', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer'
              }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                border: '1px solid #f84464', color: '#f84464',
                padding: '10px 16px', borderRadius: '8px', textAlign: 'center'
              }} onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" style={{
                background: '#f84464', color: 'white',
                padding: '10px 16px', borderRadius: '8px', textAlign: 'center'
              }} onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;