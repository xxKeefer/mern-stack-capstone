import React, { useState, createContext, useEffect } from "react";
import { API } from "../util/fetch";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({});

  const setAuthInfo = (currentUserInfo) => {
    setAuthState(currentUserInfo);
  };

  const currentSessionId = async () => {
    try {
      const {
        data: { _id: currentUserId },
      } = await API("/auth/session");
      console.loAPIerId);
      return currentUserId;
    } catch (error) {
      console.log(error);
    }
  };

  const isAuthenticated = async () => {
    const currentUserId = await currentSessionId();
    return currentUserId === true;
  };

  const isAdmin = () => {
    // return authState && authState.roles[0] === "admin";
  };

  const isSuper = () => {
    // return authState && authState.roles[0] === "super";
  };

  const logUserOut = async () => {
    const resp = await API("api/auth/logout");
    console.log(resp);
    setAuthState({});
  };

  useEffect(() => {
    const isAuthenticated = async () => {
      const currentUserId = await currentSessionId();
      return currentUserId ? true : setAuthState({}) && false;
    };
  }, [authState]);

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
