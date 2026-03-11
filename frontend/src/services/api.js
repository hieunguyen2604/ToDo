import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const taskService = {
  getTasks: () => api.get('/tasks'),
  getTask: (id) => api.get(`/tasks/${id}`),
  createTask: (task) => api.post('/tasks', task),
  updateTask: (id, task) => api.put(`/tasks/${id}`, task),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export const authService = {
  login: async (username, password) => {
    // Mock login for demo purposes
    // In a real app, this would call /api/auth/login
    if (username === 'admin' && password === 'password') {
      const mockToken = 'mock-jwt-token-for-demo';
      localStorage.setItem('token', mockToken);
      return { success: true, token: mockToken };
    }
    return { success: false, message: 'Invalid credentials' };
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};

export default api;
