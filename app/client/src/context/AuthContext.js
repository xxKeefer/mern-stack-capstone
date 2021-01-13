import React, { useState, useContext } from "react";
import { API } from "../util/fetch";

const GlobalAuthContext = React.createContext();

export const useAuth = () => {
  return useContext(GlobalAuthContext);
};

const AuthContext = ({ children }) => {
  const [authState, setAuthState] = useState(null);

  const setAuthInfo = (currentUserInfo) => {
    setAuthState(currentUserInfo);
  };

  const fetchSessionUser = async () => {
    try {
      const {
        data: { user },
      } = await API.get("auth/session");
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const isAuthenticated = () => {
    return authState && true;
  };

  const isAdmin = () => {
    return authState && authState.roles.includes("admin");
  };

  const isSuper = () => {
    return authState && authState.roles.includes("super");
  };

  const logUserOut = async () => {
    try {
      await API.get("/auth/logout");
      setAuthState(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GlobalAuthContext.Provider
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
    </GlobalAuthContext.Provider>
  );
};
export default AuthContext;
