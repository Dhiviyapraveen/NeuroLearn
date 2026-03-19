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

export default api;
