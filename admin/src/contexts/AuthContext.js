import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTimeout(() => {
        setUser({ name: "Admin", email: "admin@rafsaloon.com" });
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (email === "admin@example.com" && password === "password") {
      localStorage.setItem("token", "dummy-token");
      setUser({ name: "Admin", email });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 