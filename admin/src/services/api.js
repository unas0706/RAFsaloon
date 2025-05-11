import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getDashboardStats = async () => {
  try {
    const response = await api.get('/dashboard/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

export const getFranchiseStats = async () => {
  try {
    const response = await api.get('/franchises/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching franchise stats:', error);
    throw error;
  }
};

export const getMemberStats = async () => {
  try {
    const response = await api.get('/members/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching member stats:', error);
    throw error;
  }
};

export default api; 