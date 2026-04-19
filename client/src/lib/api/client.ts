import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add Authorization header
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors and normalization
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Auto Logout)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        localStorage.removeItem('access_token');
        window.location.href = '/login?expired=true';
      }
    }

    // Network error / Retry logic (Simplified)
    if (!error.response && originalRequest && !originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    if (!error.response && originalRequest && originalRequest._retryCount < 3) {
      originalRequest._retryCount++;
      // Exponential backoff
      const delay = Math.pow(2, originalRequest._retryCount) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      return apiClient(originalRequest);
    }

    // Normalize error message
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    const normalizedError = new Error(message);
    (normalizedError as any).status = error.response?.status;
    (normalizedError as any).data = error.response?.data;

    return Promise.reject(normalizedError);
  }
);

export { apiClient };
export default apiClient;
