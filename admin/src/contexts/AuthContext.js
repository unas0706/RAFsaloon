import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../Api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(
    localStorage.getItem("AdminToken") || null
  );

  // const [franchises, setFranchises] = useState();

  useEffect(() => {
    // getFranchises();

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getAdmin();
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // if (email === "admin@example.com" && password === "password") {
    //   setUser({ name: "Admin", email });
    //   return true;
    // }
    try {
      let res = await api.post("/api/admin/login", { email, password });

      const receivedToken = res.data.token;

      // Save token in localStorage and set in headers
      localStorage.setItem("AdminToken", receivedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${receivedToken}`;
      setToken(receivedToken);
      setUser(res.data.owner);
      return true;
    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside 2xx
        console.error("Server error:", error.response.data.message);
        // alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made but no response (server down or no internet)
        console.error("No response from server");
        alert("No response from server. Please try again later.");
      } else {
        // Something else went wrong while setting up the request
        console.error("Error:", error.message);
        alert(`Unexpected error: ${error.message}`);
      }
    }
    return false;
  };

  const getAdmin = async () => {
    try {
      //
      let res = await api.get("/api/admin/getAdmin");
      setUser(res.data.owner);

      return true;
    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside 2xx
        console.error("Server error:", error.response.data.message);
        // alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made but no response (server down or no internet)
        console.error("No response from server");
        alert("No response from server. Please try again later.");
      } else {
        // Something else went wrong while setting up the request
        console.error("Error:", error.message);
        alert(`Unexpected error: ${error.message}`);
      }
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      let res = await api.post(
        "/api/admin/changePassword",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside 2xx
        console.error("Server error:", error.response.data.message);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made but no response (server down or no internet)
        console.error("No response from server");
        alert("No response from server. Please try again later.");
      } else {
        // Something else went wrong while setting up the request
        console.error("Error:", error.message);
        alert(`Unexpected error: ${error.message}`);
      }
    }
  };

  const editAdmin = async (email, name) => {
    try {
      let res = await api.post(
        "/api/admin/edit",
        {
          email,
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside 2xx
        console.error("Server error:", error.response.data.message);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made but no response (server down or no internet)
        console.error("No response from server");
        alert("No response from server. Please try again later.");
      } else {
        // Something else went wrong while setting up the request
        console.error("Error:", error.message);
        alert(`Unexpected error: ${error.message}`);
      }
    }
  };

  // const getFranchises = async () => {
  //   try {
  //     let res = await api.get("/api/admin/franchises");
  //     setFranchises(res.data.franchises);
  //   } catch (error) {
  //     if (error.response) {
  //       // The server responded with a status code outside 2xx
  //       console.error("Server error:", error.response.data.message);
  //       alert(`Error: ${error.response.data.message}`);
  //     } else if (error.request) {
  //       // Request was made but no response (server down or no internet)
  //       console.error("No response from server");
  //       alert("No response from server. Please try again later.");
  //     } else {
  //       // Something else went wrong while setting up the request
  //       console.error("Error:", error.message);
  //       alert(`Unexpected error: ${error.message}`);
  //     }
  //   }
  // };

  const logout = async () => {
    try {
      let res = await api.get("/api/admin/logout");
      localStorage.removeItem("AdminToken");
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
      return true;
    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside 2xx
        console.error("Server error:", error.response.data.message);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made but no response (server down or no internet)
        console.error("No response from server");
        alert("No response from server. Please try again later.");
      } else {
        // Something else went wrong while setting up the request
        console.error("Error:", error.message);
        alert(`Unexpected error: ${error.message}`);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        changePassword,
        editAdmin,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
