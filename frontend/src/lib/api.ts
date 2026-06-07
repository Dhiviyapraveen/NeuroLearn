import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('neuro_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  forgotPassword: (data: { email: string }) =>
    api.post('/auth/forgot-password', data),
  profile: () => api.get('/auth/profile'),
  updateProfile: (data: Record<string, unknown>) => api.put('/auth/profile', data),
};

export const trackingApi = {
  send: (data: { typingSpeed: number; backspaceCount: number; mouseSpeed: number; pauseTime: number }) =>
    api.post('/tracking', data),
};

export const learningApi = {
  get: (level: 'basic' | 'intermediate' | 'advanced') =>
    api.get(`/learning?level=${level}`),
  analyzeCode: (code: string, lessonId: number) =>
    api.post('/learning/code', { code, lessonId }),
};

export const taskApi = {
  list: (date?: string) => api.get('/tasks', { params: { date } }),
  todaySummary: () => api.get('/tasks/summary/today'),
  create: (data: Record<string, unknown>) => api.post('/tasks', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/tasks/${id}`, data),
  remove: (id: string) => api.delete(`/tasks/${id}`),
};

export const journalApi = {
  list: () => api.get('/journals'),
  create: (data: Record<string, unknown>) => api.post('/journals', data),
  detail: (id: string) => api.get(`/journals/${id}`),
};

export const answerApi = {
  list: () => api.get('/answers'),
  submit: (questionId: string, answer: string) => api.post(`/answers/${questionId}`, { answer }),
};

export const analyticsApi = {
  dashboard: () => api.get('/analytics'),
};

export const recommendationApi = {
  list: () => api.get('/recommendations'),
};

export const adminApi = {
  stats: () => api.get('/admin/stats'),
  users: () => api.get('/admin/users'),
  updateRole: (id: string, role: string) => api.put(`/admin/users/${id}/role`, { role }),
};

export default api;
