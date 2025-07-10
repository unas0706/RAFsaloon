import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthApi from "../API/AuthApi";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("FranchiseOwner");

    if (storedToken) {
      setToken(storedToken);
      AuthApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;
      getOwner(storedToken);
    } else {
      setLoading(false);
    }

    //getOwner();
  }, []);

  const getOwner = async (authToken = token) => {
    try {
      const response = await AuthApi.get("/api/owners/me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

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

      console.log(response.data);

      const receivedToken = response.data.token;

      localStorage.setItem("FranchiseOwner", receivedToken);
      AuthApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${receivedToken}`;
      setToken(receivedToken);
      setUser(response.data.owner);
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      const token = localStorage.getItem("FranchiseOwner");

      await AuthApi.get("/api/owners/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("FranchiseOwner");
      delete AuthApi.defaults.headers.common["Authorization"];
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
    token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
