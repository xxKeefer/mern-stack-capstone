import React, { useState, createContext, useEffect } from "react";
import { API } from "../util/fetch";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);
  const [sessionExpiry, setSessionExpiry] = useState(null);

  const currentDate = new Date();
  let expiryDate = new Date();

  const setAuthInfo = (currentUserInfo) => {
    setAuthState(currentUserInfo);
    expiryDate.setDate(expiryDate.getDate() + 1).toLocaleString();
    setSessionExpiry(expiryDate);
    console.log(expiryDate);
    console.log(currentDate);
  };

  // const currentSessionId = async () => {
  //   try {
  //     const {
  //       data: { _id: currentUserId },
  //     } = await publicFetch("/api/auth/session");
  //     console.log(currentUserId);
  //     return currentUserId;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const isAuthenticated = () => {
    if (currentDate < sessionExpiry) {
      return true;
    } else {
      setAuthState(null);
      return false;
    }
  };

  const isAdmin = () => {
    // return authState && authState.roles[0] === "admin";
  };

  const isSuper = () => {
    // return authState && authState.roles[0] === "super";
  };

  const logUserOut = async () => {
    const { data } = await API.get("/auth/logout");
    console.log(data);
    setAuthState(null);
    setSessionExpiry(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
        isAdmin,
        isSuper,
        logUserOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
