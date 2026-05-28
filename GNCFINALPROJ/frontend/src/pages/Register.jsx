import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import toast from 'react-hot-toast';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerUser(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Registration successful! 🎉');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0f0f0f',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{
              background: '#f84464', color: 'white',
              padding: '6px 12px', borderRadius: '8px',
              fontWeight: '800', fontSize: '20px'
            }}>Event</span>
            <span style={{ color: 'white', fontWeight: '800', fontSize: '20px' }}>Hub</span>
          </div>
          <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>
            Create Account
          </h1>
          <p style={{ color: '#888', fontSize: '15px' }}>Join EventHub and start booking!</p>
        </div>

        {/* Card */}
        <div style={{
          background: '#1a1a1a', border: '1px solid #2a2a2a',
          borderRadius: '20px', padding: '36px'
        }}>
          <form onSubmit={handleSubmit}>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: '#aaa', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>
                FULL NAME
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                style={{
                  width: '100%', padding: '14px 16px',
                  background: '#2a2a2a', border: '1px solid #3a3a3a',
                  borderRadius: '12px', color: 'white', fontSize: '15px',
                  outline: 'none', boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f84464'}
                onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: '#aaa', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                style={{
                  width: '100%', padding: '14px 16px',
                  background: '#2a2a2a', border: '1px solid #3a3a3a',
                  borderRadius: '12px', color: 'white', fontSize: '15px',
                  outline: 'none', boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f84464'}
                onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
              />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ color: '#aaa', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                required
                style={{
                  width: '100%', padding: '14px 16px',
                  background: '#2a2a2a', border: '1px solid #3a3a3a',
                  borderRadius: '12px', color: 'white', fontSize: '15px',
                  outline: 'none', boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f84464'}
                onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
              />
              <p style={{ color: '#555', fontSize: '12px', marginTop: '8px' }}>
                💡 💡 Use letters, numbers and symbols
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px',
                background: loading ? '#c0334f' : '#f84464',
                color: 'white', border: 'none',
                borderRadius: '12px', fontSize: '16px',
                fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}>
              {loading ? 'Creating account...' : 'Register →'}
            </button>
          </form>

          <div style={{
            borderTop: '1px solid #2a2a2a',
            marginTop: '24px', paddingTop: '24px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#888', fontSize: '14px' }}>
              Already account hai?{' '}
              <Link to="/login" style={{ color: '#f84464', fontWeight: '700', textDecoration: 'none' }}>
                Login karo
              </Link>
            </p>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#555', fontSize: '12px', marginTop: '24px' }}>
          EventHub — Book events with ease 🎉
        </p>
      </div>
    </div>
  );
}

export default Register;