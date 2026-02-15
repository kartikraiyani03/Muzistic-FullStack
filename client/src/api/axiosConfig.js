import axios from 'axios';

// Create axios instance with default base URL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
});

// Add request interceptor to include token in headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear auth data and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // You can dispatch a logout action here if needed
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
