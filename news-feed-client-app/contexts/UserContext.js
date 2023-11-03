import React, { createContext, useContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [hasToken, setHasToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Since useEffect runs on the client-side, localStorage will be defined here
    const token = localStorage.getItem("jwt");
    setHasToken(!!token);
    if (token) {
      try {
        // Decode the token to get user data
        const decoded = jwt.decode(token);
        setUserId(decoded.userId);
        setHasToken(true);
        setAuthChecked(true);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      setAuthChecked(true);
    }
  }, [hasToken]);

  const value = {
    hasToken,
    setHasToken,
    userId,
    authChecked,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
