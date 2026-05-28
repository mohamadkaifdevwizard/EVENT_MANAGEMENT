import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Har request mein token automatically lagao
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getEvents = () => API.get('/events');
export const getEventById = (id) => API.get(`/events/${id}`);
export const bookTicket = (eventId, qty) => API.post(`/events/${eventId}/book`, { qty });
export const getMyTickets = () => API.get('/tickets/mine');
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);

export default API;