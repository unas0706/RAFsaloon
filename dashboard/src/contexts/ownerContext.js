import React, { createContext, useContext, useEffect, useState } from "react";
import OwnerApi from "../API/OwnerApi";
import { useAuth } from "./AuthContext";

export const OwnerContext = createContext();

const OwnerContextProvider = ({ children }) => {
  const [members, setMembers] = useState();
  const [bookings, setBookings] = useState();
  const { user } = useAuth();

  useEffect(() => {
    const fetchMembers = async () => {
      if (user) {
        await getMembers();
        await getBookings();
      }
    };

    fetchMembers();
  }, [user]); // Add dependencies to avoid infinite re-renders

  const getMembers = async () => {
    try {
      let res = await OwnerApi.get("/api/members/", { withCredentials: true });

      setMembers(res.data.members);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookings = async () => {
    try {
      let res = await OwnerApi.get("/api/bookings", {
        withCredentials: true,
      });
      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addMember = async (
    name,
    joinDate,
    visits,
    membership,
    subscription,
    subscriptionEnd
  ) => {
    try {
      let res = await OwnerApi.post(
        "/api/members/",
        { name, joinDate, visits, membership, subscription, subscriptionEnd },
        {
          withCredentials: true,
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

  const editMember = async (
    name,
    visits,
    membership,
    subscription,
    subscriptionEnd
  ) => {
    try {
      let id = members.filter((ele) => {
        return ele.name === name;
      });

      let res = await OwnerApi.patch(
        `/api/members/${id[0]._id}`,
        { visits, membership, subscription, subscriptionEnd },
        { withCredentials: true }
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
  const editFranchise = async (name, location, owner, contact, address) => {
    try {
      let res = await OwnerApi.patch(
        `/api/franchise/${user.owner.franchise._id}`,
        { name, location, owner, contact, address },
        {
          withCredentials: true,
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

  const changePassword = async (oldPassword, newPassword) => {
    try {
      let res = await OwnerApi.post(
        "/api/owners/changepass",
        { oldPassword, newPassword },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
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
    members,
    setMembers,
    addMember,
    getBookings,
    bookings,
    editFranchise,
    editMember,
    changePassword,
  };

  return (
    <OwnerContext.Provider value={value}>{children}</OwnerContext.Provider>
  );
};

export const useOwner = () => {
  return useContext(OwnerContext);
};

export default OwnerContextProvider;
