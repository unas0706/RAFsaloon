import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../Api/api";
import { useAuth } from "../contexts/AuthContext";

const FranchiseContext = createContext();

export const useFranchise = () => {
  const context = useContext(FranchiseContext);
  if (!context) {
    throw new Error("useFranchise must be used within a FranchiseProvider");
  }
  return context;
};

export const FranchiseProvider = ({ children }) => {
  let { user } = useAuth();

  useEffect(() => {
    if (user) getFranchises();
  }, [user]);
  // Franchise state
  const [franchises, setFranchises] = useState();

  // Member state
  const [members] = useState({
    total: 1250,
    active: 1180,
    premium: 320,
    regular: 930,
    growth: "+12%",
  });

  // Franchise actions
  const addFranchise = (newFranchise) => {
    setFranchises((prev) => [
      ...prev,
      { ...newFranchise, id: prev.length + 1 },
    ]);
  };

  const updateFranchise = (id, updatedData) => {
    setFranchises((prev) =>
      prev.map((franchise) =>
        franchise.id === id ? { ...franchise, ...updatedData } : franchise
      )
    );
  };

  const deleteFranchise = (id) => {
    setFranchises((prev) => prev.filter((franchise) => franchise.id !== id));
  };

  const getFranchises = async () => {
    try {
      let res = await api.get("/api/admin/franchises");
      setFranchises(res.data.franchises);
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

  const createFrnachise = async (
    name,
    location,
    owner,
    contact,
    address,
    established,
    stats,
    email,
    password
  ) => {
    try {
      let res = await api.post("/api/franchise/addFranchise", {
        franchise: {
          name,
          location,
          owner,
          contact,
          address,
          established,
          stats,
        },
        owner: { email, password },
      });
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

  const value = {
    franchises,
    members,
    addFranchise,
    updateFranchise,
    deleteFranchise,
    createFrnachise,
  };

  return (
    <FranchiseContext.Provider value={value}>
      {children}
    </FranchiseContext.Provider>
  );
};
