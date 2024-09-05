import axios from 'axios';

const API_URL = "http://localhost:8000/api";

// Login function to authenticate and receive JWT tokens
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/token/`, {
      username,
      password
    });
    
    const { access, refresh } = response.data;
    
    // Store tokens (either in localStorage or cookies)
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    
    return response.data;
  } catch (error) {
    console.error("Login error", error);
  }
};

// Function to get an access token from refresh token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await axios.post(`${API_URL}/token/refresh/`, {
      refresh: refreshToken
    });
    
    localStorage.setItem("access_token", response.data.access);
    return response.data.access;
  } catch (error) {
    console.error("Token refresh error", error);
  }
};

// Axios instance with interceptors for adding tokens to requests
const apiClient = axios.create({
  baseURL: API_URL
});

// Interceptor to add Authorization header with access token
apiClient.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("access_token");

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor to handle expired tokens and refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
      return apiClient(originalRequest);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
