// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { login as apiLogin, logout as apiLogout, getProfile, refreshToken } from '../services/api';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           const profile = await getProfile();
//           setUser(profile);
//         }
//       } catch (error) {
//         console.error('Failed to initialize auth:', error);
//         localStorage.removeItem('token');
//       } finally {
//         setLoading(false);
//       }
//     };

//     initAuth();
//   }, []);

//   const login = async (credentials) => {
//     try {
//       setError(null);
//       const response = await apiLogin(credentials);
//       localStorage.setItem('token', response.token);
//       setUser(response.user);
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Login failed');
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await apiLogout();
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       localStorage.removeItem('token');
//       setUser(null);
//     }
//   };

//   const refreshUserToken = async () => {
//     try {
//       const response = await refreshToken();
//       localStorage.setItem('token', response.token);
//       return response;
//     } catch (error) {
//       console.error('Token refresh failed:', error);
//       logout();
//       throw error;
//     }
//   };

//   const value = {
//     user,
//     loading,
//     error,
//     login,
//     logout,
//     refreshUserToken,
//     isAuthenticated: !!user
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export default AuthContext;
