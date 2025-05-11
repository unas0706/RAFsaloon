import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthApi from "../API/AuthApi";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOwner();
  }, []);

  const getOwner = async () => {
    try {
      const response = await AuthApi.get("/api/owners/me");
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await AuthApi.post("/api/owners/login", {
        email,
        password,
      });
      setUser(response.data);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        "/api/auth/register",
        { name, email, password },
        { withCredentials: true }
      );
      setUser(response.data);
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      let val = await AuthApi.get("/api/owners/logout", {
        withCredentials: true,
      });
      setUser(null);
      return true;
    } catch (error) {
      console.error("Logout failed:", error);
      return false;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    getOwner,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
