import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});


apiClient.interceptors.request.use(
  config => {
    const token = Cookies.get('authToken');

    if (token) {
      console.log(token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Use getUri to see the full URL with params before sending
    const fullUrl = apiClient.getUri(config);
    console.log('Starting Request to: ', fullUrl);

    return config;
  },
  error => Promise.reject(error)
);

apiClient.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response.data
  },
  error => {
    const message = error.response?.data?.message || error.message;
    console.error('API Error: ', message);
    return Promise.reject(message);
  }
);

export default apiClient;
