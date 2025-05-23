import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/journal'; // Base URL from backend analysis

// Helper to get the auth token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); 
  // TODO: Add proper token handling/validation
  if (!token) {
    console.warn("No auth token found in localStorage. API calls might fail.");
    // Optionally redirect to login or handle appropriately
    return { 'Accept': 'application/json', 'Content-Type': 'application/json' };
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
};

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor to add auth headers to every request
apiClient.interceptors.request.use(
  config => {
    config.headers = { ...config.headers, ...getAuthHeaders() };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// API Service Functions

export const getJournalEntries = () => {
  return apiClient.get('/journal');
};

export const addJournalEntry = (entryData) => {
  // entryData should be { title: '...', content: '...' }
  return apiClient.post('/journal', entryData);
};

export const updateJournalEntry = (id, entryData) => {
  return apiClient.put(`/journal/id/${id}`, entryData);
};

export const deleteJournalEntry = (id) => {
  return apiClient.delete(`/journal/id/${id}`);
};

// Placeholder for potential user/auth related calls
export const getUserInfo = () => {
  return apiClient.get('/user');
};

// You might need login/signup functions later
export const loginUser = (credentials) => {
  // credentials should be { username: '...', password: '...' }
  // Note: This call is to the public endpoint, so it shouldn't use the interceptor's Auth header.
  // We create a separate call or potentially configure the interceptor to exclude this path.
  // For simplicity here, we call directly using axios without the pre-configured apiClient.
  return axios.post(`${API_BASE_URL}/public/login`, credentials, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
};

export const signUpUser = (userData) => {
  // userData should be { username: '...', password: '...' }
  return axios.post(`${API_BASE_URL}/public/signup`, userData, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
};

export default apiClient; // Export the configured instance if needed elsewhere 