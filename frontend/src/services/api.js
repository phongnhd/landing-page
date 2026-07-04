import axios from 'axios';

const api = axios.create({
 baseURL: "https://landing-page-4jj0.onrender.com",
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export async function subscribeNewsletter(data) {
  const response = await api.post('/newsletter/subscribe', data);
  return response.data;
}

export default api;
