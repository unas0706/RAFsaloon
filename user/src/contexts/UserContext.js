import React, { createContext } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  return (
    <UserContext.Provider value={{ unas: "ali" }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
