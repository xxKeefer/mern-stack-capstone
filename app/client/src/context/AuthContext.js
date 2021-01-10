import React, { useState, createContext } from "react";
import { publicFetch } from "../util/fetch";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({});

  const setAuthInfo = (currentUserInfo) => {
    setAuthState(currentUserInfo);
  };

  const isAuthenticated = () => {
    console.log("authenticated");
    return true;
  };

  const isAdmin = () => {
    return authState.roles[0] === "admin";
  };

  const isSuper = () => {
    return authState.roles[0] === "super";
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
        isAdmin,
        isSuper,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
