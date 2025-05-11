import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Important for cookies
});

// Add request interceptor to handle authentication
api.interceptors.request.use(
  (config) => {
    // You can add auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (data) => api.post('/owners/register', data),
  login: (data) => api.post('/owners/login', data),
  logout: () => api.get('/owners/logout'),
};

// Franchise API calls
export const franchiseAPI = {
  getFranchise: (franchiseId) => api.get(`/franchise/${franchiseId}`),
  updateFranchise: (franchiseId, data) => api.put(`/franchise/${franchiseId}`, data),
};

// Booking API calls
export const bookingAPI = {
  createBooking: (data) => api.post('/bookings', data),
  getBookings: () => api.get('/bookings'),
  getBookingsByUser: (userId) => api.get(`/bookings/user/${userId}`),
};

// Member API calls
export const memberAPI = {
  addMember: (data) => api.post('/members', data),
  getMembers: () => api.get('/members'),
  updateMember: (memberId, data) => api.put(`/members/${memberId}`, data),
};

// Slot API calls
export const slotAPI = {
  getAvailableSlots: (date) => api.get(`/slots/${date}`),
  createSlot: (data) => api.post('/slots', data),
  bookSlot: (slotId) => api.put(`/slots/${slotId}/book`),
};

export default api; 