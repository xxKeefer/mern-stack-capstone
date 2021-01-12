import React, { useState, createContext } from "react";
import { API } from "../util/fetch";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);

  const setAuthInfo = (currentUserInfo) => {
    setAuthState(currentUserInfo);
  };

  const fetchSessionUser = async () => {
    try {
      const {
        data: { user },
      } = await API.get("auth/session");
      console.log("fetchsession:", user);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const isAuthenticated = () => {
    return authState && true;
  };

  const isAdmin = () => {
    return authState && authState.roles[0] === "admin";
  };

  const isSuper = () => {
    return authState && authState.roles[0] === "super";
  };

  const logUserOut = async () => {
    try {
      const { data } = await API.get("/auth/logout");

      console.log("loguserout", data);
      setAuthState(null);
    } catch (error) {
      console.log(error);
    }
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
        fetchSessionUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
