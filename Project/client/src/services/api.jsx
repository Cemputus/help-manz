import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  logout: () => api.post('/auth/logout')
};

// User endpoints
export const users = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`)
};

// Child endpoints
export const children = {
  getAll: () => api.get('/children'),
  getById: (id) => api.get(`/children/${id}`),
  create: (data) => api.post('/children', data),
  update: (id, data) => api.put(`/children/${id}`, data),
  delete: (id) => api.delete(`/children/${id}`)
};

// Babysitter endpoints
export const babysitters = {
  getAll: () => api.get('/babysitters'),
  getById: (id) => api.get(`/babysitters/${id}`),
  create: (data) => api.post('/babysitters', data),
  update: (id, data) => api.put(`/babysitters/${id}`, data),
  delete: (id) => api.delete(`/babysitters/${id}`)
};

// Finance endpoints
export const finances = {
  getAll: () => api.get('/finances'),
  getById: (id) => api.get(`/finances/${id}`),
  create: (data) => api.post('/finances', data),
  update: (id, data) => api.put(`/finances/${id}`, data),
  delete: (id) => api.delete(`/finances/${id}`),
  getSummary: () => api.get('/finances/summary'),
  getReports: (params) => api.get('/finances/reports', { params })
};

// Attendance endpoints
export const attendance = {
  getAll: () => api.get('/attendance'),
  getById: (id) => api.get(`/attendance/${id}`),
  create: (data) => api.post('/attendance', data),
  update: (id, data) => api.put(`/attendance/${id}`, data),
  delete: (id) => api.delete(`/attendance/${id}`),
  getRecent: () => api.get('/attendance/recent')
};

// Schedule endpoints
export const schedules = {
  getAll: () => api.get('/schedules'),
  getById: (id) => api.get(`/schedules/${id}`),
  create: (data) => api.post('/schedules', data),
  update: (id, data) => api.put(`/schedules/${id}`, data),
  delete: (id) => api.delete(`/schedules/${id}`),
  getUpcoming: () => api.get('/schedules/upcoming')
};

// Notification endpoints
export const notifications = {
  getAll: () => api.get('/notifications'),
  getById: (id) => api.get(`/notifications/${id}`),
  create: (data) => api.post('/notifications', data),
  update: (id, data) => api.put(`/notifications/${id}`, data),
  delete: (id) => api.delete(`/notifications/${id}`),
  markAsRead: (id) => api.put(`/notifications/${id}/read`)
};

// Dashboard endpoints
export const dashboard = {
  getStats: () => api.get('/dashboard/stats')
};

export default api; 