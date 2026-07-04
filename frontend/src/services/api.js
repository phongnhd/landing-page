import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export async function subscribeNewsletter(data) {
  const response = await api.post('/newsletter/subscribe', data);
  return response.data;
}

export default api;
