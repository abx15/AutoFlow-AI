import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

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
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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

    // Handle 401 Unauthorized - Try token refresh first
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken, token } = useAuthStore.getState();
      
      if (refreshToken && token) {
        try {
          // Attempt to refresh the token
          const refreshResponse = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken
          });

          const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data.data;
          
          // Update store with new tokens
          useAuthStore.getState().setAuth(
            useAuthStore.getState().user!,
            useAuthStore.getState().org!,
            accessToken,
            newRefreshToken
          );

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Refresh failed, logout user
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
            useAuthStore.getState().logout();
            window.location.href = '/login?expired=true';
          }
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, logout user
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          useAuthStore.getState().logout();
          window.location.href = '/login?expired=true';
        }
      }
    }

    // Normalize error message from backend successResponse/errorResponse structure
    const backendMessage = error.response?.data?.error?.message || error.response?.data?.message;
    const message = backendMessage || error.message || 'An unexpected error occurred';
    
    const normalizedError = new Error(message) as Error & {
      status?: number;
      data?: unknown;
      code?: string;
    };
    normalizedError.status = error.response?.status;
    normalizedError.data = error.response?.data;
    normalizedError.code = (error.response?.data?.error as { code?: string })?.code;

    return Promise.reject(normalizedError);
  }
);

export { apiClient };
export default apiClient;
