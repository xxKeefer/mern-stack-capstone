import React, { useState, createContext, useEffect } from "react";
import { API } from "../util/fetch";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);

  const setAuthInfo = (currentUserInfo) => {
    setAuthState(currentUserInfo);
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await API.get("/auth/session");
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const isAuthenticated = async () => {
      const currentUser = await getCurrentUser();
      return currentUser
        ? setAuthState(currentUser) && true
        : setAuthState(null) && false;
    };
    isAuthenticated();
  }, []);

  // const isAuthenticated = async () => {
  //   const currentUserId = await currentSessionId();
  //   console.log({ currentUserId });

  //   return currentUserId;
  // };

  const isAdmin = () => {
    // return authState && authState.roles[0] === "admin";
  };

  const isSuper = () => {
    // return authState && authState.roles[0] === "super";
  };

  const logUserOut = async () => {
    const { data } = await API.get("/auth/logout");
    console.log(data);
    setAuthState({});
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        // isAuthenticated,
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
